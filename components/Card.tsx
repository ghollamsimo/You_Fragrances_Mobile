import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface CardProps {
  title: string;
  description: string;
  color: string;
  icon: string;
}

const Card: React.FC<CardProps> = ({ title, description, color, icon }) => {
  return (
    <TouchableOpacity style={[styles.card, { backgroundColor: color }]}>
      <View style={styles.icon_card}>
      <Text style={styles.icon}>{icon}</Text>

      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 20,
    padding: 15,
    margin: 10,
    justifyContent: 'space-between',
    height: 150,
    width: 180
  },
  icon_card: {
    alignItems: 'baseline',
    borderColor: '#FFFFFF',
    // borderRadius: 5,
    padding: 3,
    // borderWidth: 0.3,
    alignSelf: 'flex-start', 
  },
  
  icon: {
    fontSize: 30,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: 'white',
  },
  description: {
    fontSize: 14,
    color: '#FFF',
  },
});

export default Card;
