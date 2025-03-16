import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Search from '../components/SearchBar';
import { useDispatch, useSelector } from 'react-redux';
import { indexPerfumes } from "../redux/slices/PerfumeSlice";
import { AppDispatch, RootState } from "../redux/Store";

const SearchScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const perfumes = useSelector((state: RootState) => state.perfumes.perfumesData);
  const perfumesLoading = useSelector((state: RootState) => state.perfumes.loading);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    dispatch(indexPerfumes());
  }, [dispatch]);

  const filteredPerfumes = perfumes.filter((perfume) => {
    return perfume.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        perfume.brand.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const toggleFavorite = (perfumeId: string) => {
    if (favorites.includes(perfumeId)) {
      setFavorites(favorites.filter(id => id !== perfumeId));
    } else {
      setFavorites([...favorites, perfumeId]);
    }
  };

  const renderPerfumeCard = ({ item }: any) => {
    const isFavorite = favorites.includes(item._id);

    return (
        <TouchableOpacity style={styles.productCard}>
          <Image
              source={{ uri: item.image.replace('127.0.0.1', '192.168.1.116') }}
              style={styles.productImage}
          />

          <View style={styles.productInfo}>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.brandName}>{item.brand.name}</Text>
          </View>

          <View style={styles.rightSection}>
            <View style={styles.ratingBadge}>
              <Text style={styles.ratingText}>{item.averageRating}/5</Text>
            </View>

            <TouchableOpacity
                style={styles.favoriteButton}
                onPress={() => toggleFavorite(item._id)}
            >
              <Ionicons
                  name={isFavorite ? "heart" : "heart-outline"}
                  size={24}
                  color={isFavorite ? "#ccc" : "#ccc"}
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
    );
  };

  return (
      <View style={styles.container}>
        <Search onSearch={(text) => setSearchQuery(text)} />
        {searchQuery.length === 0 ? (
            <View style={styles.hello}>
              <Image
                  source={{
                    uri: 'https://cdni.iconscout.com/illustration/premium/thumb/perfume-aroma-composition-illustration-download-in-svg-png-gif-file-formats--create-fragrance-maker-beauty-and-fashion-pack-equipment-illustrations-3916230.png',
                  }}
                  style={styles.heroImage}
              />
              <View style={styles.textContainer}>
                <Text style={[styles.text, { fontFamily: 'Poppins-SemiBold' }]}>Search by name or with brand</Text>
                <Text style={[styles.textContent]}>
                  Browse our comprehensive database of analyzed perfumes.
                </Text>
              </View>
            </View>
        ) : (
            <>
              <View style={styles.popularSection}>
                <Text style={styles.title}>Perfume Results</Text>
              </View>

              {perfumesLoading ? (
                  <ActivityIndicator size="large" color="#3E7796" style={styles.loader} />
              ) : filteredPerfumes.length === 0 ? (
                  <Text style={styles.noResultsText}>Perfume not found</Text>
              ) : (
                  <FlatList
                      data={filteredPerfumes}
                      renderItem={renderPerfumeCard}
                      keyExtractor={(item) => item._id.toString()}
                      numColumns={1}
                      showsVerticalScrollIndicator={false}
                      contentContainerStyle={styles.flatListContainer}
                  />
              )}
            </>
        )}

      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 30,
  },
  hello: {
    alignItems: 'center',
    padding: 20,
    marginBottom: 40,
  },
  noResultsText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginTop: 20,
  },

  heroImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
    borderRadius: 15,
  },
  textContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 22,
    textAlign: 'center',
    color: '#333',
    marginBottom: 5,
  },
  textContent: {
    textAlign: 'center',
    fontWeight: '500',
    color: '#666',
    fontSize: 16,
  },
  popularSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 10,
    fontWeight: '300',
    color: '#333',
    // paddingVertical: 30
  },
  flatListContainer: {
    // paddingHorizontal: 15,
    paddingBottom: 30,
  },

  productCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingVertical: 15,
    paddingHorizontal: 10,
    alignItems: 'center',
    marginBottom: 5,
    width: '100%',
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 5,
  },
  productInfo: {
    flex: 1,
    paddingHorizontal: 15,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  brandName: {
    fontSize: 14,
    color: '#777',
  },
  rightSection: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  ratingText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  favoriteButton: {
    padding: 5,
  },

  // Keep the loader style
  loader: {
    marginTop: 30,
  },

  // These styles are no longer used but kept for reference
  image: {
    width: '100%',
    height: 150,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#777',
  },
  ratingBadge: {
    backgroundColor: '#3E7796',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 10,
  },
});

export default SearchScreen;