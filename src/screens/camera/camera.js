import { React, useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { Camera, CameraType} from 'expo-camera';
import { useNavigation } from '@react-navigation/native';



const styles = StyleSheet.create({
    baseContainer: {
      backgroundColor: '#fff',
      height: "100%"

    },
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

  return (
    <View style={styles.baseContainer}>
      {
        true ? (
          <Camera
            //TODO fix camera preview ratios  
            // https://stackoverflow.com/questions/58634905/camera-preview-in-expo-is-distorted
            style={{flex: 1, maxHeight: "70%"}}
            type={CameraType.back}
            // ref={(r) => {camera = r}}
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