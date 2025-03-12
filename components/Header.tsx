import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { ProModal } from "../modals/ProModal";

const Header = ({ title, avatarUrl, showProBadge = false }: any) => {
  const [proModal, setProModal] = useState(false);

  return (
      <View style={styles.container}>
        <View style={styles.leftBar}>
          {avatarUrl && (
              <Image source={{ uri: avatarUrl }} style={styles.avatar} />
          )}
          <Text style={styles.greeting}>{title}</Text>
        </View>

        {showProBadge && (
            <TouchableOpacity onPress={() => setProModal(true)} style={styles.proBadge}>
              <Text style={styles.proText}>PRO</Text>
            </TouchableOpacity>
        )}

        {proModal && <ProModal setModalVisible={setProModal} modalVisible={proModal} />}
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    marginTop: 30,
    borderBottomWidth: 0.5,
    borderBottomColor: '#d9dadb',
  },
  leftBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  greeting: {
    fontSize: 18,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
  },
  proBadge: {
    backgroundColor: '#3E7796',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  proText: {
    color: '#FFFF',
    fontWeight: 'bold',
  },
});

export default Header;
