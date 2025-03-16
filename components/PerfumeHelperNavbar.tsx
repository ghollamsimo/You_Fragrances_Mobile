import { useNavigation } from "@react-navigation/native";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import { View , StyleSheet,Text, TouchableOpacity} from "react-native"
import Ionicons from "react-native-vector-icons/Ionicons";

const PerfumeHelperNavbar = () => {
      const navigation = useNavigation();
      const [fontsLoaded] = useFonts({
        'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
      });
      if (!fontsLoaded) {
        return <AppLoading />;
      }
    return (
        <View style={styles.container}>

            <View style={styles.textContainer}>
                <Text style={[styles.title, {fontFamily: 'Poppins-SemiBold'}]}>Perfume Helper</Text>
            </View>

            <TouchableOpacity style={styles.iconHeart}>
              <Ionicons name="document-text-outline" color="gray" size={24} />
            </TouchableOpacity>
        </View>
    )
}

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
        backgroundColor: '#fff'
      },
      iconWrapper: {
        borderWidth:1,
        padding:8,
        borderColor:"#d9dadb",
        borderRadius:50,
      },
      iconHeart:{
        padding:8,
        borderColor:"#d9dadb",
        borderRadius:50,
        borderWidth:1,
      },
      textContainer: {
        borderColor: '#ccc',
        borderRadius: 25,
        paddingHorizontal: 15,
      },
      title :{
        fontSize:18,
        fontWeight: '100',
      }
})

export default PerfumeHelperNavbar