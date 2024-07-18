import { useState } from 'react';
import { View, Text, Image, StyleSheet} from 'react-native';


// TODO: abstract the datatype of a Post into its own datatype

const Post = ({content}) => {
  return (
    <View style={styles.parent}>

      <View style={styles.userInfo}>
          {/* <Image source={content.author.picture} style={styles.userInfo.picture}/> */}
          <Text style={styles.userInfo.name}>{content.username}</Text>
          {/*TODO: add caption*/} 
      </View>

      <View style={styles.messageContent}>

        {(content.data_url !== null) ?
        <View style={styles.messageContent.imageView}>
          <Image source={content.data_url} style={styles.messageContent.imageView.image}/>
        </View>
        :<></>}

        {(content.body !== null) ?
        <Text style={styles.messageContent.text}>{content.body}</Text>
        :<></>}
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
    parent: {
      padding: 10,
      marginBottom: 20,
      borderBottomWidth: 1,
      borderBottomColor: "#000",
    },

    userInfo: {
      flex: 1,
      flexDirection: "row",

      picture: {
        width: 70,
        height: 70,
        backgroundColor: "#aaa",
        borderRadius: 100,
        marginBottom: 20,
      },

      name: {
        marginLeft: 10,
        fontSize: 30
      }
    },
    
    messageContent: {

      imageView: {
        alignItems: 'center',
      
        image: {
          marginBottom: 20,
          borderRadius: 15,
          width: '100%',
          height: undefined,
          maxHeight: 300,
          aspectRatio: 1,
        },
      },

      

      text: {

        marginBottom: 20,
        fontSize: 17
      }
    }
  });


export default Post