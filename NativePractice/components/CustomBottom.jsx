import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Modal from 'react-native-modal';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CustomBottom = () => {
  const [visible, setVisible] = useState(false);
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity
        style={{
          width: 100,
          height: 100,
          borderRadius: 50,
          backgroundColor: '#000',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => setVisible(true)}>
        <Text style={{fontSize: 35, fontWeight: '700', color: '#fff'}}>+</Text>
      </TouchableOpacity>
      <Modal
        animationIn={'slideInUp'}
        style={{width: '100%', marginLeft: 0, marginBottom: 0}}
        isVisible={visible}
        onBackButtonPress={() => setVisible(false)}>
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            backgroundColor: 'white',
            width: '100%',
          }}>
          <TouchableOpacity style={styles.items}>
            <FontAwesome name="camera" size={30} color="orange" />
            <Text style={[styles.iconText, {color: 'orange'}]}>Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.items}>
            <FontAwesome name="folder" size={30} color="#909" />
            <Text style={[styles.iconText, {color: 'purple'}]}>Folder</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.items}>
            <FontAwesome name="image" size={30} color="#903" />
            <Text style={[styles.iconText, {color: '#903'}]}>Image</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.items}>
            <MaterialCommunityIcons name="view-gallery" size={30} color="blue" />
            <Text style={[styles.iconText, {color: 'blue'}]}>Gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.items}>
            <Ionicons name="document" size={30} color="red" />
            <Text style={[styles.iconText, {color: 'red'}]}>Document</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  items: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5,
  },
  iconText: {
    marginLeft: 15,
    fontSize: 18,
    fontWeight: '600',
  },
});

export default CustomBottom;