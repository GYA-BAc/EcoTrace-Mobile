import React from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';

const styles = StyleSheet.create({
    baseContainer: {
      backgroundColor: '#fff',
      
    },
});


const ProfileView = ({route}) => {
//   const navigation = useNavigation();
  // console.log(route)

  return (
    <View style={styles.baseContainer}>
      <Text>{route.params.test}</Text>
    </View>
  );
}


export default ProfileView;