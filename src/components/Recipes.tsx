import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import MasonryList from '@react-native-seoul/masonry-list';
import Loading from './Loading';
import RecipeCard from './RecipeCard';
import {useNavigation} from '@react-navigation/native';

const Recipes = ({meals, categories}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recipes</Text>
      <View style={styles.listContainer}>
        {categories.length == 0 || meals.length == 0 ? (
          <Loading size="large" style={styles.loading} />
        ) : (
          <MasonryList
            data={meals}
            keyExtractor={item => item.idMeal}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({item, i}) => (
              <RecipeCard item={item} index={i} navigation={navigation} />
            )}
            onEndReachedThreshold={0.1}
            contentContainerStyle={styles.masonryListContent}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: wp(4),
    marginTop: hp(2),
  },
  title: {
    fontSize: hp(4),
    fontWeight: 'bold',
    color: '#333',
    paddingVertical: hp(2),
    paddingHorizontal: wp(4),
    backgroundColor: '#f8f8f8',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  listContainer: {
    marginTop: hp(1),
  },
  masonryListContent: {
    paddingBottom: hp(10), 
  },
  loading: {
    marginTop: hp(20),
  },
});

export default Recipes;