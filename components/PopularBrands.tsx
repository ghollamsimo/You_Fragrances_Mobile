import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';

interface Brands {
  id: number;
  image: string;
  title: string;
  description : string;
}

const PopularBrands: React.FC = () => {
  const products: Brands[] = [
    { id: 1, image: 'https://perfumedefrance.com/cdn/shop/collections/zoologist_1024x1024.jpg?v=1639834594', title: 'Zoologist' , description: 'Here at Zoologist Perfumes, our fascination with animals is boundless. Their habitats, behaviours and looks; their similarities and differences with humans, even their smells give us a lot to ponder. Their cunning inspires us, their agility resonates with our primal instincts, and their cuteness makes us giggle'},
    { id: 2, image: 'https://logo-marque.com/wp-content/uploads/2021/01/Jean-Paul-Gaultier-Logo.png' ,  title: 'Jean Paul Gaultier', description: 'Here at Zoologist Perfumes, our fascination with animals is boundless. Their habitats, behaviours and looks; their similarities and differences with humans, even their smells give us a lot to ponder. Their cunning inspires us, their agility resonates with our primal instincts, and their cuteness makes us giggle'},
    { id: 3, image: 'https://logo-marque.com/wp-content/uploads/2020/11/Giorgio-Armani-Logo.png' ,  title: 'Giorgio Armani', description: 'Here at Zoologist Perfumes, our fascination with animals is boundless. Their habitats, behaviours and looks; their similarities and differences with humans, even their smells give us a lot to ponder. Their cunning inspires us, their agility resonates with our primal instincts, and their cuteness makes us giggle'},
    { id: 4, image: 'https://www.luxeperfumeoils.lk/wp-content/uploads/2023/01/LouisVuitton.png' ,  title: 'Louis Vuitton', description: 'Here at Zoologist Perfumes, our fascination with animals is boundless. Their habitats, behaviours and looks; their similarities and differences with humans, even their smells give us a lot to ponder. Their cunning inspires us, their agility resonates with our primal instincts, and their cuteness makes us giggle'},
  ];

  return (
    <View style={styles.container}>
      <View style={styles.popular_section}>
        <Text style={styles.title}>Popular Brands</Text>

        <TouchableOpacity style={styles.proBadge}>
          <Text style={styles.proBadge_text}>See All</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {products.map((product) => (
          <View key={product.id} style={styles.productCard}>
            <View style={styles.imageContainer}>
              <Image source={{ uri: product.image }} style={styles.image} />
            </View>
            <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{product.title}</Text>
                <Text style={styles.cardSubtitle} numberOfLines={2}>{product.description}</Text>
            </View> 
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginVertical: 20,
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
    width: 300,
    borderRadius: 10,
    backgroundColor: '#FFF',
    marginHorizontal: 10,
    elevation: 2,
    overflow: 'hidden',
    borderColor: '#E8E9EB',
    borderWidth: 1,
    height: 250,
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    padding: 10, 
    resizeMode: 'cover',
    borderBottomColor: "#E8E9EB",
    borderBottomWidth: 1,
  },
  cardContent: {
    padding: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
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

export default PopularBrands;
