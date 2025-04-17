import {Alert, Image, StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import Padder from '../../component/Padder';
import Button from '../../component/Button';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../store/store';
import {removeFavorite} from '../../store/favoriteReducer';

interface IProductCardProps {
  item: {
    id: number;
    thumbnail: string;
    title: string;
    price: number;
    warrantyInformation: string;
    description: string;
  };
  isFavorite?: boolean;
  onPress: () => void;
}

const ProductCard: FC<IProductCardProps> = props => {
  const {item, onPress, isFavorite} = props;
  const dispatch = useDispatch<AppDispatch>();

  return (
    <Padder style={styles.mb24}>
      {isFavorite && (
        <Button
          style={styles.removeFavContainer}
          onPress={() => {
            Alert.alert(
              'Remove Favorite',
              `Are you sure you want to remove "${item.title}" from favorites?`,
              [
                {
                  text: 'Cancel',
                  style: 'cancel',
                },
                {
                  text: 'Yes',
                  onPress: () => {
                    dispatch(removeFavorite({id: item.id}));
                  },
                },
              ],
              {cancelable: true},
            );
          }}>
          Remove Fav
        </Button>
      )}
      <Button style={styles.virButtonContainer} onPress={onPress}>
        <View style={styles.fdr}>
          <View>
            <Image
              source={{uri: item.thumbnail}}
              resizeMode="cover"
              width={100}
              height={100}
            />
          </View>
          <View style={styles.f1}>
            <Text>{item.title}</Text>
            <Text>${item.price}</Text>
            <Text>Warranty : {item.warrantyInformation}</Text>
            <Text numberOfLines={2}>{item.description}</Text>
          </View>
        </View>
      </Button>
    </Padder>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  virButtonContainer: {borderWidth: 1, borderRadius: 8, padding: 8},
  mb24: {marginBottom: 24},
  fdr: {flexDirection: 'row'},
  f1: {flex: 1},
  removeFavContainer: {
    zIndex: 1,
    position: 'absolute',
    top: '5%',
    left: '8%',
    backgroundColor: 'pink',
    opacity: 0.5,
    padding: 4,
    borderRadius: 8,
  },
});
