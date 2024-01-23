import { useState } from 'react';
import { StyleSheet, FlatList, Image, Platform, Pressable } from 'react-native';

import Post from './post';

const PostList = () => {
  const [posts] = useState([
    {
      author: {
        picture: require('../../../assets/favicon.png'),
        name: "test"
      },
      message: {
        picture: require('../../../assets/favicon.png'),
        content: "test message content"
      }
    },
    {
      author: {
        picture: require('../../../assets/favicon.png'),
        name: "test"
      },
      message: {
        picture: require('../../../assets/favicon.png'),
        content: "test message content"
      }
    },
    {
      author: {
        picture: require('../../../assets/favicon.png'),
        name: "test"
      },
      message: {
        picture: require('../../../assets/favicon.png'),
        content: "test message content"
      }
    },
    {
      author: {
        picture: require('../../../assets/favicon.png'),
        name: "test"
      },
      message: {
        picture: require('../../../assets/favicon.png'),
        content: "test message content"
      }
    }
  ]);

  return (
    
    <FlatList
      vertical
      showsVerticalScrollIndicator={Platform.OS === 'web'}
      data={posts}
      contentContainerStyle={styles.listContainer}
      style={styles.parent}
      renderItem={({ item, index }) => (
        // <Pressable
        //   onPress={() => {
        //   }}>
        //   {/* <Image source={item} key={index} style={styles.image} /> */}
        // </Pressable>
        
        <Post content={item} key={index}/>
      )}
    />
  );
}

const styles = StyleSheet.create({
  parent: {
    maxHeight: 500,
  },
  listContainer: {
    justifyContent: 'center',
    alignItems: 'center'
    // paddingBottom: 200
    // maxHeight: 50,
    // borderTopRightRadius: 10,
    // borderTopLeftRadius: 10,
    // paddingHorizontal: 20,
    // flexDirection: 'column',
    // flexGrow: 0
    // alignItems: 'top',
    // justifyContent: 'space-between',
  },
  image: {
    width: 70,
    height: 70,
    backgroundColor: "#aaa",
    borderRadius: 20,
    marginBottom: 20,

  },
});

export default PostList