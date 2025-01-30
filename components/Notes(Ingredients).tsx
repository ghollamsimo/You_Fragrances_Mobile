import { useNavigation } from "@react-navigation/native";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import React from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"

const Notes = () => {
    const navigation = useNavigation();
    const [fontsLoaded] = useFonts({
        'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
      });
      if (!fontsLoaded) {
        return <AppLoading />;
      }
    return(
    <>
            <View style={styles.container}>
            <View style={{flexDirection: 'row', justifyContent: "space-between", alignItems: 'center'}}>
                <Text style={{fontSize: 18, fontWeight: "300", fontFamily: 'Poppins-SemiBold'}}>Notes</Text>
                <Text>See All</Text>
            </View>
        </View>
    </>
    )
}

export default Notes

const styles = StyleSheet.create({
    container:{
        paddingHorizontal: 20,
        padding: 10,
        margin: 15,
        borderWidth: 5,
        borderColor: '#3E7796',
        borderRadius: 20
    }
})