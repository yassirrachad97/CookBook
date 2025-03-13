import React from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';
import {heightPercentageToDP as hp , widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Animated, {FadeInDown} from 'react-native-reanimated';
import CashedImage from '../helpers/Image';

const RecipeCard = ({item, index, navigation}) => {
  const isEven = index % 2 === 0;
  const useSmallHeight = index % 3 === 0;

  return (
    <Animated.View
      entering={FadeInDown.delay(index * 100)
        .duration(600)
        .springify()
        .damping(12)}
      style={styles.container}
    >
      <Pressable
        style={[
          styles.card,
          {
            paddingLeft: isEven ? 0 : wp(2),
            paddingRight: isEven ? wp(2) : 0,
          },
        ]}
        onPress={() => navigation.navigate('RecipeDetails', {...item})}
      >
        <CashedImage
          uri={item.strMealThumb}
          style={[
            styles.image,
            {
              height: useSmallHeight ? hp(25) : hp(35),
            },
          ]}
        />
        <Text style={styles.title}>
          {item.strMeal.length > 20
            ? item.strMeal.slice(0, 20) + '...'
            : item.strMeal}
        </Text>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: hp(2),
  },
  card: {
    width: '100%',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    borderRadius: 35,
    backgroundColor: '#00000020', // Semi-transparent black background
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  title: {
    fontSize: hp(1.8),
    fontWeight: '600',
    color: '#333',
    marginTop: hp(1),
    marginLeft: wp(2),
    textAlign: 'left',
    width: '100%',
  },
});

export default RecipeCard;