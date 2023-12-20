import {StyleSheet, Text, View, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';


const FlatlistAPI = () => {
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
    <View>
      <Text style={{fontSize: 30}}>FlatlistAPI</Text>
      {data.length ? (
        <FlatList
          data={data}
          renderItem={({item}) => (
            <View style={{borderBottomColor:'orange', borderBottomWidth:1, padding:10}}>
              <Text style={{fontSize: 24, backgroundColor:'orange'}}>{item.id}</Text>
              <Text style={{fontSize: 18}}>{item.title}</Text>
              <Text style={{fontSize: 18}}>{item.body}</Text>
            </View>
          )}
        />
      ) : null}
    </View>
  );
};

export default FlatlistAPI;

const styles = StyleSheet.create({});
