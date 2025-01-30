import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import PerfumeNavbar from "../components/PerfumeNavbar";
import UserReviewSection from "../components/UserReviewSection";
import Notes from "../components/Notes(Ingredients)";

const PerfumeDetails: React.FC = ({ route }) => {
  const { perfume } = route.params;
  return (
    <>
      <View style={styles.container}>
        <PerfumeNavbar />
        <View style={styles.contentContainer}>
          <Image
            style={{
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
              resizeMode: "center",
            }}
            source={{ uri: perfume.image }}
            width={200}
            height={220}
          />
          <View style={styles.rating}>
            <Text style={{ color: "white", fontSize: 15, fontWeight: "700" }}>
              Rating: {perfume.rating}
            </Text>
          </View>
          <Text style={{ fontSize: 18, fontWeight: "800", margin: 10 }}>
            {perfume.subtitle}
          </Text>
          <Text style={styles.bottomTitle}>{perfume.title}</Text>
        </View>
        
        <View style={{paddingVertical: 20,}}>
            <UserReviewSection/>
        </View>
        <Notes/>
      </View>

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
    // borderWidth: 1,
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
});
