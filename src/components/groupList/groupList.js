import { useState } from 'react';
import { StyleSheet, FlatList, Image, Platform, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const GroupList = () => {
  const [groups] = useState([
    require('../../../assets/favicon.png'),
    require('../../../assets/favicon.png'),
    require('../../../assets/favicon.png'),
    require('../../../assets/favicon.png'),
    require('../../../assets/favicon.png'),
    require('../../../assets/favicon.png'),
  ]);

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
                navigation.navigate("Group", {groupID: 1})
              }}>
              <Image source={item} key={index} style={styles.image} />
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