import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Search from '../components/SearchBar';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading'; 

const SearchScreen: React.FC = () => {
  const [fontsLoaded] = useFonts({
    'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <View style={styles.container}>
      <Search />
      <View style={styles.hello}>
        <Image
          source={{
            uri: 'https://cdni.iconscout.com/illustration/premium/thumb/perfume-aroma-composition-illustration-download-in-svg-png-gif-file-formats--create-fragrance-maker-beauty-and-fashion-pack-equipment-illustrations-3916230.png',
          }}
          style={styles.image}
          />
          <View style={styles.textContainer}>
            <Text style={[styles.text, { fontFamily: 'Poppins-SemiBold' }]}>Search by name or with brand</Text>
            <Text style={[styles.textContent ]}>Brows our comprehensive database of analyzed more sexy perfumes .</Text>
          </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  hello: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', 
    padding:20,

  },
  textContainer:{
    paddingTop: 30,
    paddingBottom: 100,
  },
  image: {
    width: '100%',
    height: 300,
    // borderRadius: 15,
    resizeMode: 'cover',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
  },
  textContent:{
    textAlign: 'center',
    fontWeight: '500',
  }
});

export default SearchScreen;
