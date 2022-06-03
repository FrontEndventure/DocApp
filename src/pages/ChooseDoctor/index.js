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
  }, [itemCategory.category]);


  const callDoctorByCategory = category => {
    const db = getDatabase();
    //craate variable first
    const lisCategoryDoctor = query(ref(db, 'doctors/'));
    //get data
    get(lisCategoryDoctor, orderByChild('category'), equalTo(category))
      .then(res => {
        if (res.exists()) {
          if (res.val()) {
            const data = parseArray(res.val());

            setListDoctor(data);
            // console.log('data hasil parse: ', data);
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
            onPress={() => navigation.navigate('Chatting')}
          />
        );
      })}
      {/* <List
        type="next"
        profile={DummyDoctor1}
        name="Alexander Grahambel"
        desc="Wanita"
      />
      <List
        type="next"
        profile={DummyDoctor1}
        name="Alexander Grahambel"
        desc="Wanita"
      />
      <List
        type="next"
        profile={DummyDoctor1}
        name="Alexander Grahambel"
        desc="Wanita"
      /> */}
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
