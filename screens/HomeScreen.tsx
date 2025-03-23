import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Text, ActivityIndicator, Alert } from 'react-native';
import Header from '../components/Header';
import Card from '../components/Card';
import PopularBrands from '../components/PopularBrands';
import PopularPerfume from '../components/PopularPerfume';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/Store";
import { index } from "../redux/slices/BrandSlice";
import { indexPerfumes } from "../redux/slices/PerfumeSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ScanModal from '../modals/ScanModal';

const HomeScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [scanModal, setScanModal] = useState(false);
    const token = useSelector((state: RootState)=> state.auth.token)
  const brands = useSelector((state: RootState) => state.brands.brandData);
  const perfumes = useSelector((state: RootState) => state.perfumes.perfumesData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    dispatch(index());
    dispatch(indexPerfumes());
  }, [dispatch]);

  useEffect(() => {
    if (brands.length > 0 && perfumes.length > 0) {
      setLoading(false);
    }
  }, [brands, perfumes]);

  if (loading) {
    return (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#3E7796" />
        </View>
    );
  }

  return (
      <View style={styles.container}>
        <Header
            title="HomeScreen"
            avatarUrl="https://static.wikia.nocookie.net/gorillatag/images/3/33/SnowOwlMaskSprite.png/revision/latest/thumbnail/width/360/height/450?cb=20230127222407'"
            showProBadge={false}
        />
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
                navigateTo="PerHelper"

            />
            <Card
                title="Brand Lab"
                description="Check if a Brand and follow them."
                color="#EDD7C9"
                icon="🖌️"
                navigateTo="AllBrands"
                params={{ brands: brands }}
            />

          </View>
          <View style={styles.section}>
            <Card
                title="Search"
                description="Type a perfume and see if it’s your match."
                color="#3E7796"
                icon="🔍"
                navigateTo="SearchScreen"
            />
            {token ? (
                <Card
                title="Scanner"
                description="Analyze a perfume by photo or barcode."
                color="#25354F"
                icon="📷"
                onPress={() => setScanModal(true)}
              />
            ): (
              <Card
              title="Scanner"
              description="Analyze a perfume by photo or barcode."
              color="#25354F"
              icon="📷"
              onPress={() =>  Alert.alert("Access Denied",
                                                  "You need to be logged in to use this feature.",) }
            />
            )}
       

          </View>
          <PopularBrands brands={brands} />
          <PopularPerfume perfumes={perfumes} />
        </ScrollView>
        {scanModal && <ScanModal modalVisible={scanModal} setModalVisible={setScanModal} />}



      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  explore: {
    padding: 10,
    flexDirection: 'row',
    paddingHorizontal: 12,
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
  },
});

export default HomeScreen;
