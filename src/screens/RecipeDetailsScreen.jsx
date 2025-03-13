import React, {useEffect, useState} from 'react';
import {ScrollView, StatusBar, Text, TouchableOpacity, View} from 'react-native';
import CashedImage from '../helpers/Image';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ChevronLeftIcon} from 'react-native-heroicons/outline';
import {HeartIcon} from 'react-native-heroicons/solid';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import Loading from '../components/Loading';

const RecipeDetailsScreen = props => {
  let item = props.route.params;
  const [isFavorite, setIsFavorite] = useState(false);
  const navigation = useNavigation();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMealData(item.idMeal);
  }, []);

  const getMealData = async id => {
    try {
      const res = await axios.get(
        `https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
      );
      // console.log('res: ', res.data);
      if (res && res.data) {
        setMeal(res.data.meals[0]);
        setLoading(false);
      }
    } catch (error) {
      console.log('error: ', error.message);
    }
  };

  const getIngredients = () => {
    if (!meal) return [];
    
    let ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      
      if (ingredient && ingredient.trim() !== '') {
        ingredients.push({
          ingredient: ingredient,
          measure: measure || ''
        });
      }
    }
    return ingredients;
  };
  
  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="light-content" />

      {/* Image Container */}
      <View className="relative">
        <CashedImage
          uri={item.strMealThumb}
          style={{
            width: wp(100),
            height: hp(50),
            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 40,
          }}
        />

        <View className="absolute top-14 left-0 right-0 flex-row justify-between px-5">
          <TouchableOpacity
            onPress={() => props.navigation.goBack()}
            className="p-2 rounded-full bg-white">
            <ChevronLeftIcon
              onPress={() => navigation.goBack()}
              size={hp(3.5)}
              strokeWidth={4.5}
              color="#fbbf24"
            />
          </TouchableOpacity>

          <TouchableOpacity className="p-2 rounded-full bg-white">
            <HeartIcon
              onPress={() => setIsFavorite(!isFavorite)}
              size={hp(3.5)}
              strokeWidth={4.5}
              color={isFavorite ? `red` : `gray`}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Meal desc */}
      {loading ? (
        <Loading size="large" className="mt-16" />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: hp(10)}}>
          
          <View className="px-4 py-6">
            <Text className="text-3xl font-bold text-neutral-800">
              {meal?.strMeal}
            </Text>
            <Text className="text-lg font-medium text-neutral-500 mt-1">
              {meal?.strArea} • {meal?.strCategory}
            </Text>
          </View>

          {/* Ingredients */}
          <View className="px-4">
            <Text className="text-2xl font-bold text-neutral-800 mb-3">
              Ingredients
            </Text>
            
            {getIngredients().map((item, index) => (
              <View key={index} className="flex-row items-center mb-2">
                <View className="h-2 w-2 bg-amber-500 rounded-full mr-2" />
                <Text className="text-neutral-700 font-medium">
                  {item.measure} {item.ingredient}
                </Text>
              </View>
            ))}
          </View>

          {/* Instructions */}
          <View className="px-4 mt-6">
            <Text className="text-2xl font-bold text-neutral-800 mb-3">
              Instructions
            </Text>
            
            <Text className="text-neutral-700 leading-6">
              {meal?.strInstructions}
            </Text>
          </View>

          {/* YouTube Video */}
          {meal?.strYoutube && (
            <View className="px-4 mt-6">
              <Text className="text-2xl font-bold text-neutral-800 mb-3">
                Video Guide
              </Text>
              <TouchableOpacity 
                className="bg-amber-500 py-3 px-4 rounded-lg flex-row justify-center items-center"
                onPress={() => {
                  // Handle opening YouTube video
                  // You might want to use Linking.openURL or a WebView component
                }}>
                <Text className="text-white font-bold text-lg">
                  Watch on YouTube
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default RecipeDetailsScreen;