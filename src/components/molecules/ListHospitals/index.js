import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {DummyHospital1} from '../../../assets';
import {colors, fonts} from '../../../utils';

const ListHospitals = () => {
  return (
    <View style={styles.container}>
      <Image source={DummyHospital1} style={styles.picture} />
      <View>
        <Text style={styles.title}>Rumah Sakit </Text>
        <Text style={styles.title}>Citra Bunga Merdeka</Text>
        <Text style={styles.addres}>Jln. Surya Sejahtera 20</Text>
      </View>
    </View>
  );
};

export default ListHospitals;

const styles = StyleSheet.create({
  picture: {
    width: 80,
    height: 60,
    borderRadius: 11,
    marginRight: 16,
  },
  container: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontSize: 16,
    fontFamily: fonts.primary[400],
    color: colors.text.primary,
  },
  addres: {
    fontSize: 12,
    fontFamily: fonts.primary[300],
    color: colors.text.secondary,
    marginTop: 6,
  },
});
