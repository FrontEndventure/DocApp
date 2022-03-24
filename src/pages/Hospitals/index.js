import {StyleSheet, Text, View, ImageBackground} from 'react-native';
import React from 'react';
import {ILHospital} from '../../assets';
import {colors, fonts} from '../../utils';
import {ListHospitals} from '../../components';

const Hospitals = () => {
  return (
    <View style={styles.page}>
      <ImageBackground source={ILHospital} style={styles.background}>
        <Text style={styles.title}>Nearby Hospitals</Text>
        <Text style={styles.desc}>3 tersedia</Text>
      </ImageBackground>
      <View style={styles.content}>
        <ListHospitals />
        <ListHospitals />
        <ListHospitals />
      </View>
    </View>
  );
};

export default Hospitals;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.secondary,
    flex: 1,
  },
  background: {
    height: 240,
    paddingTop: 30,
  },
  title: {
    fontFamily: fonts.primary[600],
    fontSize: 20,
    textAlign: 'center',
    // marginTop: 30,
    color: colors.white,
  },
  desc: {
    fontFamily: fonts.primary[400],
    fontSize: 14,
    textAlign: 'center',
    color: colors.white,
    marginTop: 6,
  },
  content: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 20,
    marginTop: -30,
    paddingTop: 14,
  },
});
