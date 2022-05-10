import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Button, Gap, Header, Input, Profile} from '../../components';
import {colors, getData, storeData} from '../../utils';
import {ILNullPhoto} from '../../assets';
import {getDatabase, ref, child, get, update} from 'firebase/database';
import {Fire} from '../../config/Fire';

const UpdateProfile = ({navigation}) => {
  const [profile, setProfile] = useState({
    photo: ILNullPhoto,
    fullName: '',
    profession: '',
    email: '',
  });

  const [password, setPassword] = useState('');
  useEffect(() => {
    getData('user').then(res => {
      const data = res;
      data.photo = {uri: res.photo};
      // console.log('new profile: ', data);
      setProfile(data);
    });
  }, []);

  const updateData = () => {
    const updates = {};
    // updates['users/' + profile.uid + '/'] = profile;
    const db = getDatabase(Fire);
    const data = profile;
    data.photo = profile.photo.uri;
    update(ref(db, 'users/' + profile.uid + '/'), profile)
      // .then(() => {
      //   console.log('success: ');
      // })
      // .catch(err => {
      //   console.log('error: ', err);
      // });

    console.log('new user: ', profile);

    // storeData('user', profile);
  };

  const changeText = (key, value) => {
    setProfile({
      ...profile,
      [key]: value,
    });
  };
  return (
    <View style={styles.page}>
      <Header title="Edit Profile" onPress={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Profile
            isRemove
            photo={profile.photo}
            onPress={() => alert('Ganti Poto')}
          />
          <Gap height={26} />
          <Input
            label={'Full Name'}
            value={profile.fullName}
            onChangeText={value => changeText('fullName', value)}
          />
          <Gap height={24} />
          <Input
            label={'Pekerjaan'}
            value={profile.profession}
            onChangeText={value => changeText('profession', value)}
          />
          <Gap height={24} />
          <Input label={'Email Address'} value={profile.email} disable />
          <Gap height={24} />
          <Input label={'Password'} value={profile.password} secureTextEntry />
          <Gap height={40} />
          <Button title="Save Profile" onPress={updateData} />
        </View>
      </ScrollView>
    </View>
  );
};

export default UpdateProfile;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
  container: {
    padding: 40,
  },
});
