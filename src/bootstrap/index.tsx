import {StyleSheet, View} from 'react-native';
import React, {FC, ReactNode, useLayoutEffect} from 'react';
import {getProductCategoryList} from '../store/productAction';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../store/store';

interface BootstrapProps {
  children: ReactNode;
}

const Bootstrap: FC<BootstrapProps> = props => {
  const {children} = props;
  const dispatch: AppDispatch = useDispatch();
  const {productCategoryList} = useSelector(
    (state: RootState) => state.product,
  );

  useLayoutEffect(() => {
    if (productCategoryList?.length === 0) {
      dispatch(getProductCategoryList());
    }
  }, [dispatch, productCategoryList]);

  return <View style={styles.bootstrapContainer}>{children}</View>;
};

export default Bootstrap;

const styles = StyleSheet.create({
  bootstrapContainer: {flex: 1},
});
