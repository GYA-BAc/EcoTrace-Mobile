import { React, useEffect } from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
    baseContainer: {
      backgroundColor: '#fff',
      
    },
});


const GroupView = ({route}) => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: "hi"
    })
  }, [])
  
  // console.log(route)

  return (
    <View style={styles.baseContainer}>
      <Text>{route.params.test}</Text>
    </View>
  );
}


export default GroupView;