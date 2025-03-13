import {Image, StatusBar, Text, TextInput, View, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {BellIcon, MagnifyingGlassIcon} from 'react-native-heroicons/outline';
import {useEffect, useState} from 'react';
import axios from 'axios';
import Categories from '../components/Categories';
import Recipes from '../components/Recipes';

const HomeScreen = () => {
  const [activeCategory, setActiveCategory] = useState('Beef');
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    getCategories();
    getMeals();
  }, []);

  const getCategories = async () => {
    try {
      const res = await axios.get(
        'https://themealdb.com/api/json/v1/1/categories.php',
      );
      if (res && res.data) {
        setCategories(res.data.categories);
      }
    } catch (error) {
      console.log('error: ', error.message);
    }
  };

  const getMeals = async (category = 'Beef') => {
    try {
      const res = await axios.get(
        `https://themealdb.com/api/json/v1/1/filter.php?c=${category}`,
      );
      if (res && res.data) {
        setMeals(res.data.meals);
      }
    } catch (error) {
      console.log('error: ', error.message);
    }
  };

  const handleCategoryChange = (category: string) => {
    getMeals(category);
    setActiveCategory(category);
    setMeals([]);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        <View style={styles.header}>
          <Image
            source={require('../assets/images/avatar.png')}
            style={styles.avatar}
          />
          <BellIcon size={hp(4)} color="#333" />
        </View>

        <View style={styles.greetingContainer}>
          <Text style={styles.greetingText}>Hello User!</Text>
          <Text style={styles.mainHeading}>Make your own food</Text>
          <Text style={styles.subHeading}>
            Stay at <Text style={styles.highlightText}>Home</Text>
          </Text>
        </View>

        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Search for a dish"
            style={styles.searchInput}
            placeholderTextColor="#666"
          />
          <View style={styles.searchIconContainer}>
            <MagnifyingGlassIcon
              size={hp(2.5)}
              strokeWidth={3}
              color="#666"
            />
          </View>
        </View>

        {/* categories */}
        <View style={styles.categoriesContainer}>
          {categories.length > 0 && (
            <Categories
              categories={categories}
              activeCategory={activeCategory}
              handleCategoryChange={handleCategoryChange}
            />
          )}
        </View>

        {/* recipes */}
        <View style={styles.recipesContainer}>
          <Recipes meals={meals} categories={categories} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  scrollViewContent: {
    paddingBottom: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: wp(4),
    marginTop: hp(4),
    marginBottom: hp(2),
  },
  avatar: {
    height: hp(5),
    width: hp(5.5),
    borderRadius: hp(2.75),
  },
  greetingContainer: {
    marginHorizontal: wp(4),
    marginBottom: hp(2),
  },
  greetingText: {
    fontSize: hp(1.7),
    color: '#555',
  },
  mainHeading: {
    fontSize: hp(3.8),
    fontWeight: '600',
    color: '#333',
    marginTop: hp(0.5),
  },
  subHeading: {
    fontSize: hp(3.8),
    fontWeight: '600',
    color: '#333',
  },
  highlightText: {
    color: '#FFA500',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: hp(2),
    marginHorizontal: wp(4),
    padding: hp(0.6),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    fontSize: hp(1.7),
    color: '#333',
    paddingLeft: wp(3),
  },
  searchIconContainer: {
    backgroundColor: '#fff',
    borderRadius: hp(1.25),
    padding: hp(1),
  },
  categoriesContainer: {
    marginTop: hp(2),
  },
  recipesContainer: {
    marginTop: hp(2),
  },
});

export default HomeScreen;