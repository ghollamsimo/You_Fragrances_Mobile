import React from 'react';
import { View, StyleSheet, TouchableOpacity , Text} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './screens/HomeScreen';
import PerfumeHelperScreen from './screens/PerfumeHelperScreen';
import ScanScreen from './screens/ScanScreen';
import SearchScreen from './screens/SearchScreen'; 
import PerfumeDetails from './screens/PerfumeDetails';
import ProfileScreen from './screens/ProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HistoryScreen = () => <View><Text>History</Text></View>;

const CustomTabBarButton = ({ children, onPress }: any) => (
  <TouchableOpacity
    style={{
      top: -30,
      justifyContent: 'center',
      alignItems: 'center',
      ...styles.shadow,
    }}
    onPress={onPress}
  >
    <View
      style={{
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#3E7796',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {children}
    </View>
  </TouchableOpacity>
);

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarShowLabel: true,
      tabBarStyle: {
        position: 'absolute',
        backgroundColor: '#F2F4F7',
        height: 80,
        borderTopWidth: 0,
      },
      tabBarIcon: ({ color, size }) => {
        let iconName;
        if (route.name === 'Home') {
          iconName = 'leaf-outline';
        } else if (route.name === 'PerHelper') {
          iconName = 'sparkles-outline';
        } else if (route.name === 'History') {
          iconName = 'time-outline';
        } else if (route.name === 'Profile') {
          iconName = 'person-outline';
        }
        return <Ionicons name={iconName} size={25} color={color} />;
      },
      tabBarActiveTintColor: '#3E7796',
      tabBarInactiveTintColor: 'black',
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
    <Tab.Screen name="PerHelper" component={PerfumeHelperScreen} options={{ headerShown: false }} />
    <Tab.Screen
      name="scan"
      component={ScanScreen}
      options={{
        headerShown: false,
        tabBarButton: (props) => <CustomTabBarButton {...props} />,
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="camera-outline" color="#FFFFFF" size={30} />
        ),
        tabBarLabel: () => null,
      }}
    />
    <Tab.Screen name="History" component={HistoryScreen} options={{ headerShown: false }} />
    <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
  </Tab.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={TabNavigator} />
        <Stack.Screen name="SearchScreen" component={SearchScreen} />
        <Stack.Screen name="PerfumeDetails" component={PerfumeDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
