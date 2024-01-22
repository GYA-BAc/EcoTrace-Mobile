import { useState } from 'react';
import { StyleSheet, FlatList, Image, Platform, Pressable } from 'react-native';

const PostList = () => {
  const [events] = useState([
    require('../../../assets/favicon.png'),
    require('../../../assets/favicon.png'),
    require('../../../assets/favicon.png'),
    require('../../../assets/favicon.png'),
    require('../../../assets/favicon.png'),
    require('../../../assets/favicon.png'),
    require('../../../assets/favicon.png'),
    require('../../../assets/favicon.png'),
    require('../../../assets/favicon.png'),
    require('../../../assets/favicon.png'),
    require('../../../assets/favicon.png'),
    require('../../../assets/favicon.png'),
    require('../../../assets/favicon.png'),
  ]);

  return (
    
    <FlatList
      vertical
      showsVerticalScrollIndicator={Platform.OS === 'web'}
      data={events}
      contentContainerStyle={styles.listContainer}
      style={styles.parent}
      renderItem={({ item, index }) => (
        <Pressable
          onPress={() => {
          }}>
          <Image source={item} key={index} style={styles.image} />
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  parent: {
    maxHeight: 500,
  },
  listContainer: {
    backgroundColor: '#a00',
    alignItems: 'center',

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