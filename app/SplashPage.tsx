import React from 'react';
import { View, Text } from 'react-native';
import splashStyles from './styles/splashStyles';

export default function SplashPage() {
  return (
    <View style={splashStyles.container}>
      <View style={splashStyles.circle}>
        <Text style={splashStyles.title}>Kasi Wallet</Text>
      </View>
    </View>
  );
}
