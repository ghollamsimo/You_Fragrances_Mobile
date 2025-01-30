import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import React from "react"
import { Text, View , StyleSheet} from "react-native"

const ProfileNavbar = () => {
    const [fontsLoaded] = useFonts({
        'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
      });
      if (!fontsLoaded) {
        return <AppLoading />;
      }
    return(
        <>
            <View style={styles.container}>
                <View>
                    <Text style={[styles.title, {fontFamily: 'Poppins-SemiBold'}]}>Profile Screen</Text>
                </View>    
            </View>
        </>
    )
} 
export default ProfileNavbar

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingTop: 60,
        paddingBottom:20,
        borderBottomColor: '#d9dadb',
        borderWidth: 0.5,
      },
      
      title :{
        fontSize:18,
        fontWeight: '100',
      }
})