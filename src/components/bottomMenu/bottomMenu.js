import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const styles = StyleSheet.create({
    parentContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      flexGrow: 1,
      zIndex: 2,
      bottom: 0,
      backgroundColor: "#ddd",
      alignItems: "center"
    },
    cameraButton: {
      width: 75,
      height: 75,
      backgroundColor: "#fff",
      borderRadius: 50,
      overflow: "hidden"
    }
});


const BottomMenu = () => {
  const navigation = useNavigation();


  return (
    <View style={styles.parentContainer}>
      <TouchableOpacity
        style={{ padding: 10 }}
        onPress={() => {
          alert('Left');
        }}>
        <Text>Left</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.cameraButton}
        onPress={() => {
          navigation.navigate("Camera")
        }}>
        {/* <Text style={{backgroundColor: "#a00"}}>Camera</Text> */}
        <ImageBackground 
          resizeMode='stretch'
          source={require('../../../assets/favicon.png')}
          style={{flex: 1}}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={{ padding: 10 }}
        onPress={() => {
          alert('Right');
        }}>
        <Text>Right</Text>
      </TouchableOpacity>
    </View>
  );
}



export default BottomMenu;