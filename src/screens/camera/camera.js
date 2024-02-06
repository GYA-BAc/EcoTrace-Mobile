import { React, useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { Camera, CameraType} from 'expo-camera';
import { useNavigation } from '@react-navigation/native';



const styles = StyleSheet.create({
    baseContainer: {
      backgroundColor: '#fff',
      flexGrow: 1,

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
            style={{flex: 1}}
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