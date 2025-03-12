import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';

const PopularPerfume = ({perfumes}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.popular_section}>
        <Text style={styles.title}>Popular Perfume</Text>

        <TouchableOpacity style={styles.proBadge}>
          <Text style={styles.proBadge_text}>See All</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {perfumes.length === 0 ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 16 }}>No Perfumes Found</Text>
        </View>
        
        ) : (
          perfumes.slice(0, 5).map((perfume) => (
            <TouchableOpacity
              key={perfume._id}
              style={styles.productCard}
              onPress={() => navigation.navigate('PerfumeDetails', { perfume: perfume })}
            >
              <Image source={{ uri: perfume.image.replace('127.0.0.1', '192.168.1.116') }} style={styles.image} />
              <View style={styles.cardContent}>
                <Text style={styles.ratingBadge}>Rating: {perfume.averageRating}</Text>
                <Text style={styles.cardTitle}>{perfume.name}</Text>
                <Text style={styles.cardSubtitle}>{perfume.brand.name}</Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
    marginBottom: 100,
  },
  popular_section: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productCard: {
    width: 160,
    borderRadius: 10,
    backgroundColor: '#FFF',
    marginHorizontal: 10,
    elevation: 2,
    overflow: 'hidden',
    borderColor: '#E8E9EB',
    borderWidth: 1,
  },
  image: {
    padding: 10,
    borderRadius: 15,
    width: '100%',
    height: 170,
    resizeMode: 'cover',
    // borderBottomColor: '#E8E9EB',
    // borderBottomWidth: 1,
  },
  cardContent: {
    padding: 10,
  },
  ratingBadge: {
    backgroundColor: '#3E7796',
    color: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    fontSize: 12,
    marginBottom: 5,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#666',
  },
  proBadge_text: {
    color: '#FFFFFF',
  },
  proBadge: {
    backgroundColor: '#3E7796',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
});

export default PopularPerfume;
