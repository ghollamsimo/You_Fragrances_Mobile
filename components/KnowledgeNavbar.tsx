import { useNavigation } from "@react-navigation/native";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import React from "react"
import { Text, View , StyleSheet, TouchableOpacity} from "react-native"
import Ionicons from "react-native-vector-icons/Ionicons";

const KnowledgeNavbar  = () => {
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
                 <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')} style={styles.iconWrapper}>
                               <Ionicons name="arrow-back" size={24} color="gray" />
                            </TouchableOpacity>
                <View>
                    <Text style={[styles.title, {fontFamily: 'Poppins-SemiBold'}]}>knowledge Screen</Text>
                </View>    
            </View>
        </>
    )
} 
export default KnowledgeNavbar

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingTop: 60,
        paddingBottom:20,
        borderBottomColor: '#d9dadb',
        borderBottomWidth: 0.5,
        gap: 15
      },
      iconWrapper: {
        borderWidth:1,
        padding:8,
        borderColor:"#d9dadb",
        borderRadius:50,
      },
      title :{
        fontSize:18,
        fontWeight: '100',
      }
})