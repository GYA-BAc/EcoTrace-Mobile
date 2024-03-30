import { React, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchWithTimeout, getCurrentUserID } from '../../Utils';
import PostList from '../../components/postList/postList';
import AsyncStorage from '@react-native-async-storage/async-storage';


const styles = StyleSheet.create({
    baseContainer: {
      backgroundColor: '#fff',
      
    },
});


const GroupView = ({route}) => {
  const navigation = useNavigation();

  const groupID = route.params.groupID

  var [state, setState] = useState(null)

  // try loading from localstorage
  useEffect(() => {
    AsyncStorage.getItem(`G${groupID}`).then(
      (val) => {
        setState(val)
      }
    ).catch(
      () => {
        console.log("Error retrieving from local storage")
        setState(null)
      }
    )
  }, [])

  useEffect(() => {

    navigation.setOptions({
      title: ""
    })

    var name
    
    fetchWithTimeout(
      `${process.env.EXPO_PUBLIC_API_URL}/groups/fetch/${groupID}`,
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
      <PostList posts={[]}/>
    </View>
  );
}


export default GroupView;