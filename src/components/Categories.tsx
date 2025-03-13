import {Image, ScrollView, Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Animated, {FadeInDown} from 'react-native-reanimated';
import CashedImage from '../helpers/Image';

const Categories = ({activeCategory, handleCategoryChange, categories}) => {
  return (
    <Animated.View
      entering={FadeInDown.duration(500).springify()}
      style={styles.container}
    >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        {categories.map((category, index) => {
          let isActive = category.strCategory === activeCategory;
          let activeButtonClass = isActive ? styles.activeButton : styles.inactiveButton;
          return (
            <TouchableOpacity
              key={index}
              onPress={() => handleCategoryChange(category.strCategory)}
              style={styles.categoryItem}
            >
              <View style={[styles.categoryImageContainer, activeButtonClass]}>
                <CashedImage
                  uri={category.strCategoryThumb}
                  style={styles.categoryImage}
                />
              </View>
              <Text style={styles.categoryText}>
                {category.strCategory}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: hp(3),
  },
  scrollViewContent: {
    paddingHorizontal: wp(4),
  },
  categoryItem: {
    alignItems: 'center',
    marginHorizontal: wp(2),
  },
  categoryImageContainer: {
    borderRadius: hp(3),
    padding: hp(1),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  activeButton: {
    backgroundColor: '#FFA500', // Amber color for active category
  },
  inactiveButton: {
    backgroundColor: '#f0f0f0', // Light gray for inactive categories
  },
  categoryImage: {
    width: hp(6),
    height: hp(6),
    borderRadius: hp(3),
  },
  categoryText: {
    fontSize: hp(1.6),
    color: '#333',
    marginTop: hp(0.5),
    textAlign: 'center',
  },
});

export default Categories;