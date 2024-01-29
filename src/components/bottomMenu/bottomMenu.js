import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';


const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        // height: 100,
        flexGrow: 1,
        zIndex: 2,
        bottom: 0,
        backgroundColor: "#ddd",
    },
});


const BottomMenu = () => {
  return (
    <View
    style={styles.container}>
    <TouchableOpacity
      style={{ padding: 10 }}
      onPress={() => {
        alert('Left');
      }}>
      <Text>Left</Text>
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