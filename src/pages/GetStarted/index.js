/* eslint-disable prettier/prettier */
import React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { ILGetStarted, ILLogo } from '../../assets';
import { Button, Gap } from '../../components';

const GetStarted = () => {
  return (
    <ImageBackground source={ILGetStarted} style={styles.page}>
      <View>
        <ILLogo />
        <Text style={styles.title}>
          Konsultasi dengan dokter jadi lebih mudah & fleksibel
        </Text>
      </View>

      <View>
        <Button title="Get Started" />
        <Gap height={16} />
        <Button title="Sign in" type="secondary" />
      </View>
    </ImageBackground>
  );
};

export default GetStarted;

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: 'blue',
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    marginTop: 91,
    fontFamily: 'Nunito-SemiBold',
    fontSize: 28,
    color: '#FFFFFF',
  },
});
