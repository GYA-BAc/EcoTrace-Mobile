import { React, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchWithTimeout, getCurrentUserID, asyncFetchPosts } from '../../Utils';
import PostList from '../../components/postList/postList';
import AsyncStorage from '@react-native-async-storage/async-storage';


const styles = StyleSheet.create({
    baseContainer: {
      backgroundColor: '#fff',
      
    },
});


const SAVED = 3


const GroupView = ({route}) => {
  const navigation = useNavigation();

  const groupID = route.params.groupID
  // console.log(groupID)

  var [posts, setPosts] = useState([])

  // try loading from localstorage
  // useEffect(() => {
  //   AsyncStorage.getItem(`G${groupID}`).then(
  //     (val) => {
  //       setState(val)
  //     }
  //   ).catch(
  //     () => {
  //       console.log("Error retrieving from local storage")
  //       setState(null)
  //     }
  //   )

  //   var upToDate = false

  //   if (val === null) return
    
  // }, [])

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
          // console.log(res.status)
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

  useEffect(() => {

    var start_id = null 
    
    fetchWithTimeout(
      `${process.env.EXPO_PUBLIC_API_URL}/groups/fetchLatestPostID/${groupID}`
    ).then(
      (res) => {

        if (!res.ok) {
          // TODO: add bad case where server fails
          // console.log(res.status)
          throw "ServerError"
        }
        return res.json()
      }
    ).then(
      (data) => {
        // console.log(data)
        start_id = data.id

        if (start_id === null) {
          throw "could not fetch latest post id"
        }
        return start_id
      }
    ).then(
      (start_id) => {
        fetchWithTimeout(
          `${process.env.EXPO_PUBLIC_API_URL}/groups/fetchPostRange/${groupID}?`
          + new URLSearchParams({start_id: start_id, requested_posts: 15})
        ).then(
          (res) => {
    
            if (!res.ok) {
              // TODO: add bad case where server fails
              throw "ServerError"
            }
            return res.json()
          }
        ).then(
          async (data) => {
            setPosts(await asyncFetchPosts(data.map((item) => {return item.id})))
            console.log(posts)
          }
        )
      }
    )
    
  }, [])

  return (
    <View style={styles.baseContainer}>
      <PostList posts={posts}/>
    </View>
  );
}


export default GroupView;