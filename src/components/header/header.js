import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';


const styles = StyleSheet.create({
    container: {
      width: "90%",
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      height: 50,
    },
    title: {
      fontSize: 35,
      fontWeight: "bold"
    }
});


const Header = () => {
    return (
        <View style={styles.container}>
          
        <TouchableOpacity
          onPress={() => {
            alert('Left');
          }}>
          <Text>Left</Text>
        </TouchableOpacity>

        <Text style={styles.title}>
          EcoTrace
        </Text>

        <TouchableOpacity
          onPress={() => {
            alert('Right');
          }}>
          <Text>Right</Text>
        </TouchableOpacity>
      </View>
    )
}


export default Header;