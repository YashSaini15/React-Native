import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Modal,
  
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import COLORS from '../../consts/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import categories from '../../consts/categories';
import foods from '../../consts/foods';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width} = Dimensions.get('screen');
const cardWidth = width / 2 - 20;

export default function HomeScreen({navigation}) {
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [favoriteStates, setFavoriteStates] = useState([]);
  const [data, setData] = useState(undefined);
  const [sortModalVisible, setSortModalVisible] = useState(false);
  // const [sortBy, setSortBy] = useState(null);

  const openSortModal = () => {
    setSortModalVisible(true);
  };

  const handleClose = () => {
    setSortModalVisible(false);
  };
  const handleSort = (sortType) => {
    let sortedData = [...data];
  
    // if(sortType=="nameAscending"){
    //   console.log("running")
    // }
    switch (sortType) {
      case 'nameAscending':
        sortedData.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'nameDescending':
        sortedData.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'priceLowToHigh':
        sortedData.sort((a, b) => a.price - b.price);
        break;
      case 'priceHighToLow':
        sortedData.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }
    setData(sortedData);
    // setSortBy(sortType);
    handleClose();
  };

  const ListCategories = () => {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={style.categoriesListContainer}>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => setSelectedCategoryIndex(index)}>
            <View
              style={{
                backgroundColor:
                  selectedCategoryIndex == index
                    ? COLORS.primary
                    : COLORS.secondary,
                ...style.categoryBtn,
              }}>
              <View style={style.categoryBtnImgCon}>
                <Image
                  source={category.image}
                  style={{height: 35, width: 35, resizeMode: 'cover'}}
                />
              </View>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: 'bold',
                  marginLeft: 10,
                  color:
                    selectedCategoryIndex == index
                      ? COLORS.white
                      : COLORS.primary,
                }}>
                {category.name}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  const Card = ({food, index}) => {
    const isFavorite = favoriteStates[index];

    const handleFavorite = async (food, index) => {
      try {
        food.favorite = true;
        await axios.post('http://10.0.2.2:3000/favorite', food);

        const updatedFavorites = [...favoriteStates];
        updatedFavorites[index] = true;
        setFavoriteStates(updatedFavorites);
        await AsyncStorage.setItem(
          'favoriteStates',
          JSON.stringify(updatedFavorites),
        );
        console.log('Item added to favorites');
      } catch (error) {
        console.log('Food already added on favorite');
      }
    };
    const handleRemoveFavorite = async (id, index) => {
      try {
        await axios.delete(`http://10.0.2.2:3000/favorite/${id}`);

        const updatedFavorites = [...favoriteStates];
        updatedFavorites[index] = false;
        setFavoriteStates(updatedFavorites);
        await AsyncStorage.setItem(
          'favoriteStates',
          JSON.stringify(updatedFavorites),
        );
        console.log('Item removed from favorites');
      } catch (error) {
        console.log('Error removing item from favorites:', error);
      }
    };

    return (
      <View style={style.card}>
        <TouchableOpacity
          onPress={() => navigation.navigate('DetailsScreen', food)}>
          <View style={{alignItems: 'center', top: -40}}>
            <Image source={food.image} style={{height: 120, width: 120}} />
          </View>
          <View style={{marginHorizontal: 20}}>
            <Text
              style={{fontSize: 18, fontWeight: 'bold', color: COLORS.dark}}>
              {food.name}
            </Text>
            <Text style={{fontSize: 14, color: COLORS.gray, marginTop: 2}}>
              {food.ingredients}
            </Text>
          </View>
        </TouchableOpacity>
        <View
          style={{
            marginTop: 10,
            marginHorizontal: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={{fontSize: 18, fontWeight: 'bold', color: COLORS.dark}}>
            ${food.price}
          </Text>
          {isFavorite ? (
            <TouchableOpacity
              onPress={() => handleRemoveFavorite(food.id, index)}>
              <Icon name={'favorite'} color={COLORS.primary} size={25} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => handleFavorite(food, index)}>
              <Icon name={'favorite-border'} color={COLORS.primary} size={25} />
            </TouchableOpacity>
          )}
          <View style={style.addToCartBtn}>
            <Icon style={{color: COLORS.white}} name="add" size={22} />
          </View>
        </View>
      </View>
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      
      try {
        const response = await axios.get('http://10.0.2.2:3000/favorite');
        const favorites = response.data;
        // console.log("fav:",favorites)
        setFavoriteStates(favorites);
      } catch (error) {
        console.log('Error fetching favorites:', error);
      }
      setData(foods);
    };

    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    });
    return unsubscribe;
  }, [navigation]);

  const handleSearchText = text => {
    let data = foods;
    let searchData = data.filter(item => {
      return item.name.toLowerCase().includes(text.toLowerCase());
    });

    setData(searchData);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <View style={style.header}>
        <View>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: 28, color: COLORS.dark}}>Hello,</Text>
            <Text
              style={{
                fontSize: 28,
                color: COLORS.dark,
                fontWeight: 'bold',
                marginLeft: 10,
              }}>
              Yash
            </Text>
          </View>
          <Text style={{marginTop: 5, fontSize: 22}}>
            What do you want today
          </Text>
        </View>
        <Image
          source={require('../../assets/profile.jpg')}
          style={{height: 50, width: 50, borderRadius: 25}}
        />
      </View>
      <View
        style={{marginTop: 20, flexDirection: 'row', paddingHorizontal: 20}}>
        <View style={style.inputContainer}>
          <Icon name="search" size={28} />
          <TextInput
            style={{flex: 1, fontSize: 18}}
            placeholder="Search for Food"
            onChangeText={text => handleSearchText(text)}
          />
        </View>
        <TouchableOpacity onPress={openSortModal}>
          <View style={style.sortbtn}>
            <Icon name="tune" size={28} color={COLORS.white} />
          </View>
        </TouchableOpacity>
      </View>
      <View>
        <ListCategories />
      </View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        numColumns={2}
        data={data}
        renderItem={({item, index}) => <Card food={item} index={index} />}
      />
      {sortModalVisible ? (
        <Modal
          animationType='slide'
          transparent={true}
          onSelect={handleSort}
          // isVisible={sortModalVisible}
          >
          <View style={style.modalContainer}>
            <View style={style.modalContent}>
              <TouchableOpacity onPress={() => handleSort('nameAscending')}>
                <Text style={style.modalOption}>Sort by Name (A-Z)</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleSort('nameDescending')}>
                <Text style={style.modalOption}>Sort by Name (Z-A)</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleSort('priceLowToHigh')}>
                <Text style={style.modalOption}>
                  Sort by Price (Low to High)
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleSort('priceHighToLow')}>
                <Text style={style.modalOption}>
                  Sort by Price (High to Low)
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleClose}>
                <Text style={style.modalCancel}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      ) : null}
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  header: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  inputContainer: {
    flex: 1,
    height: 50,
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: COLORS.light,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  sortbtn: {
    width: 50,
    height: 50,
    marginLeft: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoriesListContainer: {
    paddingVertical: 30,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  categoryBtn: {
    height: 45,
    width: 120,
    marginRight: 7,
    borderRadius: 30,
    alignItems: 'center',
    paddingHorizontal: 5,
    flexDirection: 'row',
  },
  categoryBtnImgCon: {
    height: 35,
    width: 35,
    backgroundColor: COLORS.white,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    height: 220,
    width: cardWidth,
    marginHorizontal: 10,
    marginBottom: 20,
    marginTop: 50,
    borderRadius: 15,
    elevation: 13,
    backgroundColor: COLORS.white,
  },
  addToCartBtn: {
    height: 30,
    width: 30,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalOption: {
    fontSize: 18,
    paddingVertical: 10,
  },
  modalCancel: {
    fontSize: 18,
    paddingVertical: 10,
    color: COLORS.primary,
    textAlign: 'center',
    marginTop: 10,
  },
});
