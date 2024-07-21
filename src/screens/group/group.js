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



const GroupView = ({route}) => {
  const navigation = useNavigation();

  const groupID = route.params.groupID

  var [posts, setPosts] = useState([])
  const [latestPostID, setLatestPostID] = useState(null)
  const [oldestPostID, setOldestPostID] = useState(null)

  const reloadPosts = async () => {

    var localState = JSON.parse(await AsyncStorage.getItem(`Group${groupID}`))

    var latest = latestPostID

    if (!(localState === null)) {
        // check to make sure is up to date
        
        fetchWithTimeout(
            `${process.env.EXPO_PUBLIC_API_URL}/groups/fetchLatestPostID/${groupID}`
        ).then(
            (res) => {
                if (!res.ok) {
                    // TODO: add bad case where server fails
                    // probably where fails to fetch due to incorrect session cookie
                    console.log(res.status)
                    throw Error("ServerError")
                }

                return res.json()
            }
        ).then(
            (data) => {
                latest = data.id
                setLatestPostID(data.id)

                if (localState.latestPostID === latest) {
                    setPosts(localState.posts)
                    setOldestPostID(localState.oldestPostID)
                    return true
                }

                return false
            }
        ).then(
            // where localstate either doesn't exist or is out of date
            // overwrite localstorage
            (localExists) => {
                if (localExists) return

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
                      }
                    )
                  }
                ).catch(
                    (e) => {
                        console.log(e)
                    }
                )
            }
        ).catch(
            (e) => {
                console.log(e)
            }
        )
      }
  }

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
    (async () => {
      await reloadPosts()
    })()
  }, [])


  useEffect(() => {
    (async () => {
      await AsyncStorage.setItem(
        `Group${groupID}`, 
        JSON.stringify({
            posts: posts,
            latestPostID: latestPostID,
            oldestPostID: oldestPostID
        })
      )
    })()
  }, [posts, latestPostID, oldestPostID])

  return (
    <View style={styles.baseContainer}>
      <PostList posts={posts}/>
    </View>
  );
}


export default GroupView;