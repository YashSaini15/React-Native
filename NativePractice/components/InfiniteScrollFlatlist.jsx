import {FlatList, StyleSheet, Text, View, Image, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';

const InfiniteScrollFlatlist = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const getUsers = async () => {
    setIsLoading(true)
    try {
      let res = await axios.get(
        `https://randomuser.me/api/?page=${currentPage}&results=10`,
      );
      res = await res.data.results;
      setUsers([...users, ...res]);
      setIsLoading(false)
    } catch (error) {
      console.log(error);
    }
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles.itemWrapperStyle}>
        <Image style={styles.itemImageStyle} source={{uri: item.picture.large}} />
        <View style={styles.contentWrapperStyle}>
          <Text style={styles.textStyle}>
            {`${item.name.title} ${item.name.first} ${item.name.last}`}
          </Text>
          <Text style={styles.emailStyle}>{item.email}</Text>
        </View>
      </View>
    );
  };

  const renderLoader = () =>{
    return(
      isLoading&&
      <View style={styles.loaderStyle}>
        <ActivityIndicator size={'large'} color={'blue'} />
      </View>
    )
  }

  const loadMoreItem = () =>{
    setCurrentPage(currentPage + 1)
  }
  useEffect(() => {
    getUsers();
  }, [currentPage]);

  return ( 
  <FlatList 
    data={users} 
    renderItem={renderItem}
    keyExtractor={item => item.email} 
    ListFooterComponent={renderLoader}
    onEndReached={loadMoreItem}
    onEndReachedThreshold={0}
  />
  )
};

export default InfiniteScrollFlatlist;

const styles = StyleSheet.create({
  itemWrapperStyle:{
    flexDirection:'row',
    paddingHorizontal:16,
    paddingVertical:16,
    borderBottomWidth:1,
    borderColor: "grey",
  },
  itemImageStyle:{
    width:50,
    height:50,
    marginRight:16
  },
  contentWrapperStyle:{
    justifyContent:'space-around',
  },
  textStyle:{
    fontSize:18,
    color:'black'
  },
  emailStyle:{
    fontSize:16,
    color:'black'
  },
  loaderStyle:{
    marginVertical:16,
    alignItems:'center'
  }
});
