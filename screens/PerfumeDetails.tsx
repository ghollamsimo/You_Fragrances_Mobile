import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import PerfumeNavbar from "../components/PerfumeNavbar";
import UserReviewSection from "../components/UserReviewSection";
import Notes from "../components/Notes(Ingredients)";
import { useDispatch } from "react-redux";
import { useRoute } from "@react-navigation/native";
import { AppDispatch } from "../redux/Store";
import { setSelectedPerfume } from "../redux/slices/PerfumeSlice";

const PerfumeDetails: React.FC = () => {
  const route = useRoute();
  const dispatch = useDispatch<AppDispatch>();

  const perfume = route.params?.perfume;

  useEffect(() => {
    if (perfume) {
      dispatch(setSelectedPerfume(perfume));
    }
  }, [dispatch, perfume]);

  if (!perfume) {
    return (
        <View style={styles.centeredContainer}>
          <Text style={styles.errorText}>Perfume not found</Text>
        </View>
    );
  }

  return (
      <>
        <PerfumeNavbar perfumeId={perfume._id} />
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.contentContainer}>
            <Image
                style={styles.image}
                source={{ uri: perfume.image?.replace("127.0.0.1", "192.168.1.116") }}
            />

            <View style={styles.rating}>
              <Text style={styles.ratingText}>Rating: {perfume.averageRating ?? "N/A"}</Text>
            </View>

            <Text style={styles.title}>{perfume.name}</Text>
            <Text style={styles.brandName}>{perfume.brand?.name ?? "Unknown Brand"}</Text>
          </View>

          <View style={styles.specsContainer}>
            <Text style={styles.sectionTitle}>Specifications</Text>
            <View style={styles.specsCard}>
              {[
                { label: "Target Audience", value: perfume.TargetAudience ?? "Not specified" },
                { label: "Volume", value: perfume.Volume ?? "N/A" },
                { label: "Concentration", value: perfume.Concentration ?? "N/A" },
                { label: "Sillage", value: perfume.sillage ?? "N/A" },
              ].map((spec, index) => (
                  <View key={index} style={styles.specItem}>
                    <Text style={styles.specLabel}>{spec.label}</Text>
                    <Text style={styles.specValue}>{spec.value}</Text>
                  </View>
              ))}
            </View>
          </View>

          <View style={styles.reviewSection}>
            <UserReviewSection averageRating={perfume.averageRating} reviews={perfume.reviews ?? []} />
          </View>

          <Notes
              topNotes={perfume.topNotes ?? []}
              middleNotes={perfume.middleNotes ?? []}
              baseNotes={perfume.baseNotes ?? []}
          />
        </ScrollView>
      </>
  );
};

export default PerfumeDetails;

const styles = StyleSheet.create({
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "red",
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  contentContainer: {
    backgroundColor: "#F5F5F5",
    padding: 40,
    alignItems: "center",
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomWidth: 1,
    borderBottomColor: "#DEDEDE",
  },
  image: {
    width: 200,
    height: 220,
    resizeMode: "cover",
    borderRadius: 15,
  },
  rating: {
    backgroundColor: "#3E7796",
    paddingVertical: 10,
    paddingHorizontal: 43,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    marginTop: 10,
  },
  ratingText: {
    color: "white",
    fontSize: 15,
    fontWeight: "700",
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
    marginVertical: 10,
  },
  brandName: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    color: "#666",
  },
  specsContainer: {
    marginHorizontal: 20,
    marginVertical: 15,
    borderWidth: 2,
    borderColor: "#3E7796",
    paddingVertical: 20,
    borderRadius: 20,
    paddingHorizontal: 15,
    backgroundColor: "#FFFFFF",
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
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#DEDEDE",
  },
  specLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: "#3E7796",
  },
  specValue: {
    fontSize: 15,
    fontWeight: "500",
  },
  reviewSection: {
    paddingVertical: 20,
  },
});
