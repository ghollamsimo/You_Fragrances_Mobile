import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ScanScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Camer Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default ScanScreen;
