import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../consts/colors';
import axios from 'axios';

export default function BagScreen({navigation}) {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const url = 'http://10.0.2.2:3000/favorite';
    try {
      const response = await axios.get(url);
      const newData = response.data;
      setData(newData);
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    });
    return unsubscribe;
  }, [navigation]);

  const CartItem = ({item}) => {
    const handleDeleteTodo = async id => {
      try {
        Alert.alert(
          'Confirm Deletion',
          'Are you sure you want to remove this item from favorites?',
          [
            {
              text: 'Cancel',
            },
            {
              text: 'OK',
              onPress: async () => {
                await axios.delete(`http://10.0.2.2:3000/favorite/${id}`);
                await fetchData();
              },
            },
          ],
        );
      } catch (error) {
        console.log('Error deleting todo: ', error);
      }
    };
    return (
      <View style={style.cartItems}>
        <Image style={style.cartImage} source={item.image} />
        <View
          style={{height: 100, marginLeft: 10, paddingVertical: 13, flex: 1}}>
          <Text style={style.itemName}>{item.name}</Text>
          <Text style={{fontSize: 13}}>{item.ingredients}</Text>
          <Text style={style.itemPrice}>${item.price}</Text>
        </View>
        <View style={{marginRight: 6, alignItems: 'center'}}>
          <TouchableOpacity onPress={() => handleDeleteTodo(item.id)}>
            <Icon name="favorite" style={{}} size={30} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
      <View style={style.header}>
        <Icon
          onPress={navigation.goBack}
          style={{color: COLORS.dark}}
          name="arrow-back-ios"
          size={28}
        />
        <Text style={style.CartTitle}>Favorite</Text>
      </View>
      {data.length == 0 ? (
        <View style={style.emptyView}>
          <Text style={{fontSize: 25, color: COLORS.gray}}>No items in Bag.</Text>
        </View>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 80}}
          data={data}
          renderItem={({item}) => <CartItem item={item} />}
        />
      )}
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  CartTitle: {
    // height: 50,
    top: -2,
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.dark,
  },
  cartImage: {
    height: 70,
    width: 70,
  },
  cartItems: {
    height: 90,
    elevation: 10,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    marginVertical: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemName: {
    fontSize: 19,
    fontWeight: 'bold',
    color: COLORS.dark,
  },
  itemPrice: {
    fontSize: 19,
    fontWeight: 'bold',
    color: COLORS.dark,
  },
  countBtn: {
    width: 80,
    height: 30,
    backgroundColor: COLORS.primary,
    borderRadius: 15,
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  emptyView :{
    backgroundColor: COLORS.secondary,
    marginVertical: 50,
    paddingVertical: 20,
    marginHorizontal: 40,
    borderRadius: 20,
    alignItems: 'center',
    // opacity: 0.5

  }
});
