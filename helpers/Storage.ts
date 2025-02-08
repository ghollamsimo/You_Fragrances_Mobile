import AsyncStorage from '@react-native-async-storage/async-storage';


const getAsyncStorageValue = async (key: string): Promise<string | false> => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value !== null ? value : false;
  } catch (error) {
    console.error('Error fetching the value from AsyncStorage:', error);
    return false;
  }
};

export default getAsyncStorageValue;
