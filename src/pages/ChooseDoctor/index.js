import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Header, List} from '../../components';
import {DummyDoctor1} from '../../assets';
import {colors} from '../../utils';
import {
  child,
  get,
  getDatabase,
  ref,
  orderByChild,
  query,
  limitToLast,
  once,
  equalTo,
} from 'firebase/database';

const ChooseDoctor = ({navigation, route}) => {
  const itemCategory = route.params;

  const [listDoctor, setListDoctor] = useState([]);

  const parseArray = listObject => {
    const data = [];
    Object.keys(listObject).map(key => {
      data.push({
        id: key,
        data: listObject[key],
      });
    });
    return data;
  };
  useEffect(() => {
    callDoctorByCategory(itemCategory.category);
    // return () => {};
  }, []);

  const callDoctorByCategory = category => {
    const db = getDatabase();
    // variable listCategoryDoctor
    const listCategoryDoctor = query(
      ref(db, 'doctors/'),
      orderByChild('category'),
      equalTo(category),
    );
    //get data
    get(listCategoryDoctor)
      .then(res => {
        if (res.exists()) {
          if (res.val()) {
            const data = parseArray(res.val());
            setListDoctor(data);
            // data.map(item => {
            //   console.log('ini data klik: ', item.data.category);
            // });
          }
        } else {
          console.log('No data available');
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <View style={styles.page}>
      <Header
        type="dark"
        title={`Pilih ${itemCategory.category}`}
        onPress={() => navigation.goBack()}
      />
      {listDoctor.map(doctor => {
        return (
          <List
            key={doctor.id}
            type="next"
            profile={{uri: doctor.data.photo}}
            name={doctor.data.fullName}
            desc={doctor.data.gender}
            onPress={() => navigation.navigate('DoctorProfile', doctor)}
          />
        );
      })}
     
    </View>
  );
};

export default ChooseDoctor;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
});
