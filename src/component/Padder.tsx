import {StyleSheet, View} from 'react-native';
import React, {FC, ReactNode} from 'react';

interface IPadderProps {
  children: ReactNode;
  style?: Object;
}

const Padder: FC<IPadderProps> = props => {
  const {children, style} = props;
  return <View style={[styles.padderContainer, style]}>{children}</View>;
};

export default Padder;

const styles = StyleSheet.create({
  padderContainer: {paddingHorizontal: 16},
});
