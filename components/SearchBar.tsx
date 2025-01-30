import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Search = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');

  const updateSearch = (value) => {
    setSearch(value);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Main')} style={styles.iconWrapper}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type here..."
          value={search}
          onChangeText={updateSearch}
        />
      </View>

      <TouchableOpacity style={styles.proBadge}>
        <Text style={styles.proText}>PRO</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 60,
    paddingBottom:20,
    borderBottomColor: '#d9dadb',
    borderWidth: 0.5,
  },
  iconWrapper: {
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
  },
  input: {
    height: 40,
    fontSize: 16,
    paddingVertical: 0,
    // gap:10,

  },
  proBadge: {
    backgroundColor: '#3E7796',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  proText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
});

export default Search;