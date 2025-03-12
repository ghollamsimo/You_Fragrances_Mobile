import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import KnowledgeNavbar from '../components/KnowledgeNavbar';
const knowledgeScreen: React.FC = () => {
  return (
    <>
          <KnowledgeNavbar/>
      <View style={styles.container}>
        <Text>How to get started        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#f4f4f4',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default knowledgeScreen;
