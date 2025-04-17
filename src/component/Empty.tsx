import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React from 'react';

const Empty = () => {
  return (
    <View style={styles.activityIndicatorContainer}>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default Empty;

const styles = StyleSheet.create({
  activityIndicatorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
