import React, {useEffect, useState} from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import {
  DummyHospital1,
  DummyHospital2,
  DummyHospital3,
  ILHospital,
} from '../../assets';
import {ListHospitals} from '../../components';
import {colors, fonts} from '../../utils';
import {child, get, getDatabase, ref} from 'firebase/database';

const Hospitals = () => {
  const [hospitals, setHospitals] = useState([]);
  const dbRef = ref(getDatabase());

  useEffect(() => {
    get(child(dbRef, `hospitals/`))
      .then(res => {
        if (res.exists()) {
          // console.log('ini data: ', res.val());
          if (res.val()) {
            setHospitals(res.val());
          }
        } else {
          console.log('No data available');
        }
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <View style={styles.page}>
      <ImageBackground source={ILHospital} style={styles.background}>
        <Text style={styles.title}>Nearby Hospitals</Text>
        <Text style={styles.desc}>3 tersedia</Text>
      </ImageBackground>
      <View style={styles.content}>
        {hospitals.map(item => {
          return (
            <ListHospitals
              key={item.id}
              type={item.type}
              name={item.name}
              address={item.address}
              image={item.image}
            />
          );
        })}      
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
