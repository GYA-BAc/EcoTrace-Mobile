import { React, useEffect } from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchWithTimeout, getCurrentUserID } from '../../Utils';

const styles = StyleSheet.create({
    baseContainer: {
      backgroundColor: '#fff',
      
    },
});


const GroupView = ({route}) => {
  const navigation = useNavigation();

  useEffect(() => {

    var name
    
    fetchWithTimeout(
      `${process.env.EXPO_PUBLIC_API_URL}/groups/fetch/${route.params.groupID}`,
    ).then(
      (res) => {
        if (!res.ok) {
          console.log(res.status)
          throw "could not fetch group"
        } 
        return res.json()
      }
    ).then(
      (data) => {
        name = data.title
        navigation.setOptions({
          title: name
        })
      }
    )

    
  }, [])
  
  // console.log(route)

  return (
    <View style={styles.baseContainer}>
      <Text>{route.params.test}</Text>
    </View>
  );
}


export default GroupView;