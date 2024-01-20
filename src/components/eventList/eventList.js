import { useState } from 'react';
import { StyleSheet, FlatList, Image, Platform, Pressable } from 'react-native';

const EventList = () => {
  const [events] = useState([
    require('../../../assets/favicon.png'),
    require('../../../assets/favicon.png'),
    require('../../../assets/favicon.png'),
    require('../../../assets/favicon.png'),
    require('../../../assets/favicon.png'),
    require('../../../assets/favicon.png'),
  ]);

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={Platform.OS === 'web'}
      data={events}
      contentContainerStyle={styles.listContainer}
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
  listContainer: {
    maxHeight: 70,
    marginTop: 20,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
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

export default EventList