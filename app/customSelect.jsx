import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, FlatList } from 'react-native';

const CustomSelectPicker = ({ data, selectedValue, onValueChange }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.modalItem}
      onPress={() => {
        onValueChange(item.value);
        setModalVisible(false);
      }}
    >
      <Text style={styles.modalItemText}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{marginTop: 5}}>
      <TouchableOpacity style={styles.picker} onPress={() => setModalVisible(true)}>
        <Text style={styles.pickerText}>
          {data.find(option => option.value === selectedValue)?.label || 'Select an option'}
        </Text>
      </TouchableOpacity>
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={item => item.value}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  picker: {
    backgroundColor: "rgba(46, 46, 46, 0.8)",
    color: "white",
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
  },
  pickerText: {
    color: 'white',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#3C5B6F',
    borderRadius: 5,
    padding: 10,
  },
  modalItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  modalItemText: {
    fontSize: 16,
  },
});

export default CustomSelectPicker;
