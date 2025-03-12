import React, {useEffect} from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import PerfumeNavbar from "../components/PerfumeNavbar";
import UserReviewSection from "../components/UserReviewSection";
import Notes from "../components/Notes(Ingredients)";
import {AppDispatch} from "../redux/Store";
import {useDispatch} from "react-redux";
import {setSelectedPerfume} from "../redux/slices/PerfumeSlice";

const PerfumeDetails: React.FC = ({ route }) => {
  const { perfume } = route.params;
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(setSelectedPerfume(perfume))
    console.log('tick or treat' , setSelectedPerfume(perfume))
  }, [dispatch, perfume]);
  return (
      <>
        <PerfumeNavbar />
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.contentContainer}>
            <Image
                style={{
                  borderTopLeftRadius: 15,
                  borderTopRightRadius: 15,
                  resizeMode: "center",
                }}
                source={{ uri: perfume.image.replace('127.0.0.1', '192.168.1.116') }}
                width={200}
                height={220}
            />
            <View style={styles.rating}>
              <Text style={{ color: "white", fontSize: 15, fontWeight: "700" }}>
                Rating: {perfume.averageRating}
              </Text>
            </View>
            <Text style={{ fontSize: 18, fontWeight: "800", margin: 10 }}>
              {perfume.name}
            </Text>
            <Text style={styles.bottomTitle}>{perfume.brand.name}</Text>
          </View>

          <View style={styles.specsContainer}>
            <Text style={styles.sectionTitle}>Specifications</Text>
            <View style={styles.specsCard}>
              <View style={styles.specItem}>
                <Text style={styles.specLabel}>Target Audience</Text>
                <Text style={styles.specValue}>
                  {perfume.TargetAudience}
                </Text>
              </View>

              <View style={styles.specItem}>
                <Text style={styles.specLabel}>Volume</Text>
                <Text style={styles.specValue}>
                  {perfume.Volume}
                </Text>
              </View>

              <View style={styles.specItem}>
                <Text style={styles.specLabel}>Concentration</Text>
                <Text style={styles.specValue}>
                  {perfume.Concentration}
                </Text>
              </View>

              <View style={styles.specItem}>
                <Text style={styles.specLabel}>Sillage</Text>
                <Text style={styles.specValue}>
                  {perfume.sillage}
                </Text>
              </View>
            </View>
          </View>

          <View style={{paddingVertical: 20,}}>
            <UserReviewSection averageRating={perfume.averageRating}/>
          </View>
          <Notes/>
        </ScrollView>
      </>
  );
};

export default PerfumeDetails;

const styles = StyleSheet.create({
  container: {},
  contentContainer:{
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 46,
    paddingVertical:40,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomRightRadius:30,
    borderBottomLeftRadius:30,
    borderBottomColor: '#DEDEDE',
    borderBottomWidth: 1,
    borderEndWidth: 1,
    borderEndColor: '#DEDEDE',
    borderStartWidth: 1,
    borderStartColor: '#DEDEDE',
  },
  rating: {
    backgroundColor: "#3E7796",
    paddingVertical: 10,
    paddingHorizontal: 43,
    margin: 5,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  bottomTitle: {
    position: "absolute",
    bottom: 0,
    margin: 17,
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  specsContainer: {
    marginHorizontal: 20,
    marginVertical: 15,
    borderWidth: 2,
    borderColor:'#3E7796',
    paddingVertical: 20,
    borderRadius: 20,
    paddingHorizontal: 15,
    backgroundColor: '#FFFFFF',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
  },
  specsCard: {
    borderRadius: 15,
    padding: 15,
  },
  specItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#DEDEDE',
  },
  specLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: '#3E7796',
  },
  specValue: {
    fontSize: 15,
    fontWeight: "500",
  }
});