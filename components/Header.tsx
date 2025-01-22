import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Platform } from 'react-native';
const Header = () => {
  return (
    <View style={styles.container}>
      <View style={styles.left_bar}>
        <Image
          source={{uri: 'https://static.wikia.nocookie.net/gorillatag/images/3/33/SnowOwlMaskSprite.png/revision/latest/thumbnail/width/360/height/450?cb=20230127222407'}}
          style={styles.avatar}
        />
        <Text style={styles.greeting}>Hi, Med Ghollam </Text>
      </View>
      <View></View>
      <TouchableOpacity style={styles.proBadge}>
        <Text style={styles.proText}>PRO</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor:'#f4f4f4',
    marginTop: 30,
    borderBottomWidth: 0.5,
    borderBottomColor: '#d9dadb',
    filter: 'blur(50)',
  },
  left_bar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  greeting: {
    fontSize: 18,
    fontFamily: 'Roboto',
  },
  
  proBadge: {
    backgroundColor: '#3E7796',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  proText: {
    color: '#FFFF',
    fontWeight: 'bold',
  },
});

export default Header;
