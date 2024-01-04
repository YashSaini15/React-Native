import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TextInput} from 'react-native-gesture-handler';
import CustomButton from '../components/CustomButton';
import axios from 'axios';
import {BASE_API_URL} from '../utils/constants';

const Task = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [data, setData] = useState('');

  useEffect(() => {
    getTask();
  }, []);

  const getTask = async () => {
    try {
      const response = await axios.get(`${BASE_API_URL}/Task`);
      console.log(response.data);
      setData(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const setTask = async () => {
    if (title.length == 0) {
      Alert.alert('Warning!', 'Please enter title.');
    } else if (desc.length == 0) {
      Alert.alert('Warning!', 'Please enter description');
    } else {
      try {
        let Task = {
          title: title,
          description: desc,
        };
        axios.post(`${BASE_API_URL}/Task`, Task);
        Alert.alert('Success!', 'Task saved successfully.');
        getTask();
        setTitle('');
        setDesc('');
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <View style={styles.body}>
      <TextInput
        value={title}
        style={styles.inputText}
        placeholder="Title"
        onChangeText={value => setTitle(value)}
      />
      <TextInput
        value={desc}
        style={styles.inputText}
        placeholder="Description"
        multiline
        onChangeText={value => setDesc(value)}
      />
      <CustomButton
        title="Save Task"
        color="#1eb900"
        style={{width: '100%'}}
        onPressFunction={setTask}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  checkbox: {
    flexDirection: 'row',
    margin: 10,
  },
  inputText: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#555555',
    borderRadius: 10,
    backgroundColor: '#ffffff',
    textAlign: 'left',
    fontSize: 20,
    margin: 10,
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 20,
    color: '#000000',
  },
});

export default Task;
