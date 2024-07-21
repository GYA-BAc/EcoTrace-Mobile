import { React, useState, useEffect} from 'react';
import { StyleSheet, View, Dimensions, Platform} from 'react-native';
import { CameraView, Camera } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';



const styles = StyleSheet.create({
  baseContainer: {
    backgroundColor: '#000',
    height: "100%",
    flex: 1
  },
  cameraPreview: {
    flex: 1,
  },
  cameraInactive: {
    opacity: 0,
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
  const [ratio, setRatio] = useState('4:3'); 
  const { height, width } = Dimensions.get('window');
  const screenRatio = height / width;
  const [isRatioSet, setIsRatioSet] =  useState(false);

  const prepareRatio = async () => {
    let desiredRatio = '4:3';  // Start with the system default
    if (Platform.OS === 'android') {
      setTimeout(async () => {}, 10) // for some reason, needed to make next line work
      

      camera.getAvailablePictureSizesAsync().then(
        (ratios) => {

          // find the ratio that is closest to the screen ratio without going over
          let distances = {};
          let realRatios = {};
          let minDistance = null;
          for (const ratio of ratios) {
            const parts = ratio.split(':');
            const realRatio = parseInt(parts[0]) / parseInt(parts[1]);
            realRatios[ratio] = realRatio;
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

          setImagePadding(remainder);
          setRatio(desiredRatio);
          setIsRatioSet(true);
        }
      )
    }
  };

  const setCameraReady = async () => {
    if (!isRatioSet) {
      await prepareRatio();
    }
  };


  return (
    <View style={styles.baseContainer}>
      {
        startCamera ? (
          <CameraView
            style={
              (isRatioSet ?
              [styles.cameraPreview, imagePadding ? {marginTop: imagePadding, marginBottom: imagePadding}:{}]
              :
              styles.cameraInactive
              )
            }
            onCameraReady={setCameraReady}
            ratio={ratio}
            ref={setCamera}
          > 
          </CameraView>
        ) : (
          <></>
        )
      }
    </View>
  );
}


export default CameraScreen;