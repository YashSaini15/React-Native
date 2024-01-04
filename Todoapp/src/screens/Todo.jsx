import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {FlatList} from 'react-native-gesture-handler';
import {useEffect} from 'react';
import axios from 'axios';
import {BASE_API_URL} from '../utils/constants';
import CustomButton from '../components/CustomButton';

const Todo = ({navigation}) => {
  const [data, setData] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [tasks, setTasks] = useState('');
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDesc, setEditedDesc] = useState('');
  const [todoList, setTodoList] = useState('');
  const [searchmode, setSearchMode] = useState(false);

  const getTask = async () => {
    try {
      const response = await axios.get(`${BASE_API_URL}/Task`);
      setData(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTask();
  }, [data]);

  const updateTask = async id => {
    setEditMode(true);

    const Task = data.find(task => task.id == id);
    setTasks(Task);

    let updatedData = {
      title: editedTitle,
      description: editedDesc,
    };

    if (Task) {
      setEditedTitle(Task.title);
      setEditedDesc(Task.description);
    }
    try {
      if (tasks) {
        await axios.put(`${BASE_API_URL}/Task/${tasks.id}`, updatedData);
        Alert.alert('Success!', 'Task updated successfully.');
        getTask();
      }
    } catch (err) {
      console.log(err);
    }
  };
  const deleteTask = id => {
    try {
      axios.delete(`${BASE_API_URL}/Task/${id}`).then(res => {
        Alert.alert('Success!', 'Task removed successfully.');
        getTask();
      });
    } catch (err) {
      console.log(err);
    }
  };

  const ReadTask = async id => {
    try {
      await axios.patch(`${BASE_API_URL}/Task/${id}`, {isRead: true});
      getTask();
    } catch (err) {
      console.log(err);
    }
  };

  const handleFilter = text => {
    setSearchMode(true);
    if (text) {
      let filterdList = data.filter(todo =>
        todo.title.toLowerCase().includes(text.toLowerCase()),
      );
      setTodoList(filterdList);
    } else {
      setTodoList(data);
    }
  };
  return editMode ? (
    <View style={styles.main}>
      <Modal transparent={true} visible={editMode} animationType="slide">
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.text}>Title</Text>
            <TextInput
              value={editedTitle}
              style={styles.inputText}
              placeholder="Title"
              onChangeText={value => setEditedTitle(value)}
            />
            <Text style={styles.text}>Description</Text>
            <TextInput
              value={editedDesc}
              style={styles.inputText}
              placeholder="Description"
              multiline
              onChangeText={value => setEditedDesc(value)}
            />
            <CustomButton
              title="Update Task"
              color="#1eb900"
              style={{width: '97%'}}
              onPressFunction={updateTask}
            />
            <CustomButton
              title="Close"
              color="red"
              style={{width: '97%'}}
              onPressFunction={() => setEditMode(false)}
            />
          </View>
        </View>
      </Modal>
    </View>
  ) : (
    <View style={styles.body}>
      <View>
        <TextInput
          style={{
            borderColor: 'skyblue',
            borderWidth: 1,
            margin: 15,
            fontSize: 20,
          }}
          placeholder="Search Todos"
          onChangeText={text => {
            handleFilter(text);
          }}
        />
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={searchmode ? todoList : data}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => updateTask(item.id)}>
            <View style={styles.item_row}>
              <View style={styles.item_body}>
                <Text style={styles.title} numberOfLines={1}>
                  {item.title}
                </Text>
                <Text style={styles.subtitle} numberOfLines={1}>
                  {item.description}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  ReadTask(item.id);
                }}>
                <AntDesign
                  name={'checksquare'}
                  size={25}
                  color={item.isRead ? 'green' : 'blue'}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.delete}
                onPress={() => {
                  deleteTask(item.id);
                }}>
                <FontAwesome5 name={'trash'} size={25} color={'#ff3636'} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate('Task');
        }}>
        <FontAwesome5 name={'plus'} size={20} color={'white'} />
      </TouchableOpacity>
    </View>
  );
};

export default Todo;

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    right: 10,
    elevation: 5,
  },
  item: {
    marginHorizontal: 10,
    marginVertical: 7,
    paddingHorizontal: 10,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    borderRadius: 10,
    elevation: 5,
  },
  item_row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  item_body: {
    flex: 1,
  },
  delete: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#000000',
    fontSize: 30,
    margin: 5,
  },
  subtitle: {
    color: '#999999',
    fontSize: 20,
    margin: 5,
  },
  main: {
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 13,
  },
  modalView: {
    paddingVertical: 70,
    marginHorizontal: 15,
    marginLeft: 1,
    marginRight: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: 'black',
    elevation: 5,
    paddingRight: 11,
  },
  inputText: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#555555',
    borderRadius: 10,
    backgroundColor: '#ffffff',
    textAlign: 'left',
    fontSize: 20,
    marginHorizontal: 5,
    marginVertical: 8,
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 20,
    color: 'black',
    marginLeft: 10,
  },
});
