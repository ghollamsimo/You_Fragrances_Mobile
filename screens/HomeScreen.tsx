import React from 'react';
import { View, StyleSheet, ScrollView , Text} from 'react-native';
import Header from '../components/Header';
import Card from '../components/Card';
import PopularBrands from '../components/PopularBrands';
import PopularPerfume from '../components/PopularPerfume';
const HomeScreen: React.FC = () => {
    return (
      <View style={styles.container}>
        <Header />
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.explore}>
            <Text style={styles.greeting}>Explore</Text>
          </View>
          <View style={styles.section}>
            <Card
              title="Perfume Helper"
              description="Got a Fragrance query? AI will get you sorted."
              color="#627890"
              icon="✨"
            />
            <Card
              title="Brand Lab"
              description="Check if a Brands and follow them ."
              color="#EDD7C9"
              icon="🖌️"
            />
          </View>
          <View style={styles.section}>
            <Card
              title="Search"
              description="Type a perfume and see if it’s your match."
              color="#3E7796"
              icon="🔍"
            />
            <Card
              title="Scanner"
              description="Analyze a perfum by photo or barcode."
              color="#25354F"
              icon="📷"
            />
          </View>
          <PopularBrands />
          <PopularPerfume />
        </ScrollView>
        {/* <BottomNavBar />  */}
      </View>
    );
  };
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  explore: {
    padding: 10,
    flexDirection: 'row',
    paddingHorizontal: 12
  },
  greeting: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    paddingBottom: 20,
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // paddingHorizontal: 10,
  },
});

export default HomeScreen;
