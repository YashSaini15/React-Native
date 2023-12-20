import {View, Text, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';

const ListAPI = () => {
  const [data, setData] = useState([]);
  const getAPIData = async () => {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    let result = await fetch(url);
    result = await result.json();
    setData(result);
  };
  useEffect(() => {
    getAPIData();
  }, []);
  return (
    <ScrollView>
      <Text style={{fontSize: 30}}>List with API Call</Text>
      {data.length
        ? data.map((item,index) => (
            <View key={index}
              style={{
                padding: 10,
                borderBottomColor: '#ccc',
                borderBottomWidth: 1,
              }}>
              <Text style={{fontSize: 20, backgroundColor: '#ddd'}}>
                id: {item.id}
              </Text>
              <Text style={{fontSize: 20}}> Title: {item.title}</Text>
              <Text style={{fontSize: 20}}> Body: {item.body}</Text>
            </View>
          ))
        : null}
    </ScrollView>
  );
};

export default ListAPI;
