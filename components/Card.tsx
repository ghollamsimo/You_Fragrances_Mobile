import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface CardProps {
  title: string;
  description: string;
  color: string;
  icon: string;
  navigateTo?: string;
}

const Card: React.FC<CardProps> = ({ title, description, color, icon, navigateTo }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    if (navigateTo) {
      navigation.navigate(navigateTo);
    }
  };

  return (
    <TouchableOpacity style={[styles.card, { backgroundColor: color }]} onPress={handlePress}>
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
    width: 180,
  },
  icon_card: {
    alignItems: 'baseline',
    padding: 3,
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
