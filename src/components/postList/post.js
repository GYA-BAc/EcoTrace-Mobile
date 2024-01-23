import { useState } from 'react';
import { View, Text, Image, StyleSheet} from 'react-native';


// TODO: abstract the datatype of a Post into its own datatype

const Post = (content) => {
    return (
        <View style={styles.parent}>

            <View>
                <Image source={content.content.author.picture} style={styles.image}/>
                <Text>{content.content.author.name}</Text>
            </View>

            <View>
                <Image source={content.content.message.picture} style={styles.image}/>
                <Text>{content.content.message.content}</Text>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    parent: {
    //   backgroundColor: "#aaa"
    },
    listContainer: {
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


export default Post