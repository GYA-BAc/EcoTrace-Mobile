import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';


const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 50,
    },
});


class Header extends React.Component {
  render() {
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
}


export default Header;