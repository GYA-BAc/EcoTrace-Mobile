import { useEffect, useState } from 'react';
import { StyleSheet, FlatList, Image, Platform, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchWithTimeout, asyncFetchGroups } from '../../Utils';


const GroupList = () => {

  const [groups, setGroups] = useState([]);

  useEffect(
    ()=>{
      fetchWithTimeout(`${process.env.EXPO_PUBLIC_API_URL}/groups/fetchUserGroups`).then(
        (res) => {
          if (!res.ok) {
            return
          }
          return res.json()
        }
      ).then(
        async (data) => {
          setGroups(await asyncFetchGroups(data.map((item) => {return item.group_id})))
        }
      )
    },[])

  

  const navigation = useNavigation()

  return (
    <View style={styles.parentContainer}>
      <FlatList
          horizontal
          showsHorizontalScrollIndicator={Platform.OS === 'web'}
          data={groups}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Group", {groupID: item.id})
              }}>
              <Image source={require('../../../assets/favicon.png')} key={index} style={styles.image} />
            </TouchableOpacity>
          )}
        />
    </View>
    );
}

const styles = StyleSheet.create({
  parentContainer: {
    backgroundColor: "#ddd",
  },
  listContainer: {
    maxHeight: 70,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    alignItems: 'top',
    justifyContent: 'space-between',
  },
  image: {
    width: 70,
    height: 70,
    marginRight: 20,
    backgroundColor: "#aaa",
    borderRadius: 20,
  },
});

export default GroupList