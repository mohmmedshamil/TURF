import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const CardItems = () => {
  return (
    <View style={styles.card}>
      <Image 
        source={{ uri: 'https://link-to-image.com/image.jpg' }} 
        style={styles.image} 
      />
      <View style={styles.content}>
        <Text style={styles.title}>Project A</Text>
        <Text style={styles.subTitle}>Thalassery, kannur</Text>
        <Text style={styles.feature}>✔️ cricket</Text>
        <Text style={styles.feature}>✔️ football</Text>
        <Text style={styles.feature}>✔️ badminton</Text>
        <View style={styles.line} />
        <Text style={styles.price}>Total Investment</Text>
        <Text style={styles.amount}>₹62k</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(31, 31, 31, 0.7)',
    borderRadius: 10,
    overflow: 'hidden',
    margin: 10,
    width: 300,
  },
  image: {
    height: 200,
    width: '100%',
  },
  content: {
    padding: 10,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  line: {
    borderBottomColor: '#EEEDEB',
    borderBottomWidth: 1,
    marginVertical: 10, // Adjust spacing as needed
  },
  subTitle: {
    color: '#405D72',
    fontSize: 24,
    fontWeight: 'bold',
  },
  feature: {
    color: '#939185',
    fontSize: 14,
    marginTop: 5,
  },
  price: {
    color: '#7D8ABC',
    fontSize: 16,
    marginTop: 10,
  },
  amount: {
    color: '#7D8ABC',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CardItems;
