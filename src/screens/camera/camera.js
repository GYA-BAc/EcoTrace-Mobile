import { React, useState, useEffect} from 'react';
import { StyleSheet, View, Dimensions, Platform} from 'react-native';
import { Camera, CameraType} from 'expo-camera';
import { useNavigation } from '@react-navigation/native';



const styles = StyleSheet.create({
  baseContainer: {
    backgroundColor: '#000',
    height: "100%",
    flex: 1
  },
  cameraPreview: {
    flex: 1,
  }
});


const CameraScreen = () => {
  const navigation = useNavigation();
  const [startCamera, setStartCamera] = useState(false)

  const __startCamera = async () => {
    const {status} = await Camera.requestCameraPermissionsAsync()

    if (status === 'granted') {
      setStartCamera(true)
    } else {
      navigation.goBack()
      alert("Camera Permissions denied")
    }

  } 

  useEffect(() => {
    __startCamera(navigation)
  }, [])

  const [camera, setCamera] = useState(null);

  // Screen Ratio and image padding
  const [imagePadding, setImagePadding] = useState(0);
  const [ratio, setRatio] = useState('4:3');  // default is 4:3
  const { height, width } = Dimensions.get('window');
  const screenRatio = height / width;
  const [isRatioSet, setIsRatioSet] =  useState(false);

  // set the camera ratio and padding.
  // this code assumes a portrait mode screen
  const prepareRatio = async () => {
    console.log("doing")
    let desiredRatio = '4:3';  // Start with the system default
    // This issue only affects Android
    if (Platform.OS === 'android') {
      const ratios = await camera.getSupportedRatiosAsync();

      // Calculate the width/height of each of the supported camera ratios
      // These width/height are measured in landscape mode
      // find the ratio that is closest to the screen ratio without going over
      let distances = {};
      let realRatios = {};
      let minDistance = null;
      for (const ratio of ratios) {
        const parts = ratio.split(':');
        const realRatio = parseInt(parts[0]) / parseInt(parts[1]);
        realRatios[ratio] = realRatio;
        // ratio can't be taller than screen, so we don't want an abs()
        const distance = screenRatio - realRatio; 
        distances[ratio] = distance;
        if (minDistance == null) {
          minDistance = ratio;
        } else {
          if (distance >= 0 && distance < distances[minDistance]) {
            minDistance = ratio;
          }
        }
      }
      // set the best match
      desiredRatio = minDistance;
      //  calculate the difference between the camera width and the screen height
      const remainder = Math.floor(
        (height - realRatios[desiredRatio] * width) / 2
      );
      // set the preview padding and preview ratio
      setImagePadding(remainder);
      setRatio(desiredRatio);
      // Set a flag so we don't do this 
      // calculation each time the screen refreshes
      setIsRatioSet(true);
    }
  };

  const setCameraReady = async() => {
    if (!isRatioSet) {
      await prepareRatio();
    }
  };


  return (
    <View style={styles.baseContainer}>
      {
        true ? (
          <Camera
            //TODO fix camera preview ratios  
            // https://stackoverflow.com/questions/58634905/camera-preview-in-expo-is-distorted
            // style={styles.cameraPreview}
            // type={CameraType.back}
            // // ref={(r) => {camera = r}}
            style={[styles.cameraPreview, {marginTop: imagePadding, marginBottom: imagePadding}]}
            type={CameraType.back}
            onCameraReady={setCameraReady}
            ratio={ratio}
            ref={(ref) => {
              setCamera(ref);
            }}
          > 
          </Camera>
        ) : (
          <></>
        )
      }
    </View>
  );
}


export default CameraScreen;