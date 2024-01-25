import { useState } from 'react';
import { View, Text, Image, StyleSheet} from 'react-native';


// TODO: abstract the datatype of a Post into its own datatype

const Post = ({content}) => {
    return (
        <View style={styles.parent}>

            <View style={styles.userInfo}>
                <Image source={content.author.picture} style={styles.image}/>
                <Text style={styles.userInfo.userName}>{content.author.name}</Text>
            </View>

            <View>
                <Image source={content.message.picture} style={styles.image}/>
                <Text>{content.message.content}</Text>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    parent: {
      borderRadius: 20,
      borderColor: "#000",
      borderWidth: 1,
      padding: 10,
      marginBottom: 20,
    },
    userInfo: {
      flex: 1,
      flexDirection: "row",

      userName: {
        marginLeft: 10,
        fontSize: 30
        
      }

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