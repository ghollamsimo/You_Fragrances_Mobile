import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';

interface Brands {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  rating: string;
}

const PopularPerfume: React.FC = () => {
  const products: Brands[] = [
    { 
      id: 1, 
      image: 'https://pimages.parfumo.de/720/115431_img-4376-zoologist-tyrannosaurus_rex_720.jpg',
      title: 'zoologist', 
      subtitle: 'Tyrannosaurus Rex parfumo', 
      rating: '92/100' 
    },
    { 
      id: 4, 
      image: 'https://hrd-live.cdn.scayle.cloud/images/b1fd7681abe26f96dd97fa3da2d0effb.jpg?brightness=1&width=922&height=1230&quality=75&bg=ffffff', 
      title: 'jean paul gaultier', 
      subtitle: 'Le male elixir', 
      rating: '100/100' 
    },
    { 
      id: 2, 
      image: 'https://pimages.parfumo.de/720/130942_img-9622-zoologist-squid_720.jpg', 
      title: 'zoologist', 
      subtitle: 'Squid', 
      rating: '92/100' 
    },
    { 
      id: 3, 
      image: 'https://marionnaud.ma/cdn/shop/products/Capture_d_ecran_2022-01-18_a_12.07.10_1080x.png?v=1709896668', 
      title: 'Armani', 
      subtitle: 'Stronger with you intensely', 
      rating: '100/100' 
    },
   
  ];

  return (
    <View style={styles.container}>
      <View style={styles.popular_section}>
        <Text style={styles.title}>Popular Perfume</Text>

        <TouchableOpacity style={styles.proBadge}>
          <Text style={styles.proBadge_text}>See All</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {products.map((product) => (
          <View key={product.id} style={styles.productCard}>
            <Image source={{ uri: product.image }} style={styles.image} />
            <View style={styles.cardContent}>
              <Text style={styles.ratingBadge}>Rating: {product.rating}</Text>
              <Text style={styles.cardTitle}>{product.title}</Text>
              <Text style={styles.cardSubtitle}>{product.subtitle}</Text>
            </View>
          </View>
        ))}
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
    borderBottomColor: "#E8E9EB",
    borderBottomWidth: 1,
  },
  cardContent: {
    padding: 10,
  },
  ratingBadge: {
    backgroundColor: '#3E7796',
    // padding: ,
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
