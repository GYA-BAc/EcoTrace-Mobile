import { useState } from 'react';
import { StyleSheet, FlatList, Image, Platform, Pressable } from 'react-native';

import Post from './post';

const PostList = ({posts}) => {
  // const [posts] = useState([
  //   {
  //     author: {
  //       picture: require('../../../assets/favicon.png'),
  //       name: "test"
  //     },
  //     message: {
  //       image: require('../../../assets/favicon.png'),
  //       text: "test message content1"
  //     }
  //   },
  //   {
  //     author: {
  //       picture: require('../../../assets/favicon.png'),
  //       name: "test"
  //     },
  //     message: {
  //       image: require('../../../assets/favicon.png'),
  //       text: "test message content"
  //     }
  //   },
  //   {
  //     author: {
  //       picture: require('../../../assets/favicon.png'),
  //       name: "test"
  //     },
  //     message: {
  //       image: null,
  //       text: "test message content"
  //     }
  //   },
  //   {
  //     author: {
  //       picture: require('../../../assets/favicon.png'),
  //       name: "test"
  //     },
  //     message: {
  //       image: require('../../../assets/favicon.png'),
  //       text: null
  //     }
  //   }
  // ]);

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
    maxHeight: 600,
  },
  listContainer: {
    justifytext: 'center',
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