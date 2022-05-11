import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Button, Gap, Header, Input, Profile} from '../../components';
import {colors, getData, storeData} from '../../utils';
import {ILNullPhoto} from '../../assets';
import {getDatabase, ref, child, get, update} from 'firebase/database';
import {Fire} from '../../config/Fire';
import {launchImageLibrary} from 'react-native-image-picker';
import {showMessage} from 'react-native-flash-message';

const UpdateProfile = ({navigation}) => {
  const [profile, setProfile] = useState({
    photo: ILNullPhoto,
    fullName: '',
    profession: '',
    email: '',
  });
  const [photoForDB, setPhotoForDB] = useState('');
  const [photo, setPhoto] = useState(ILNullPhoto);
  // const [hasPhoto, setHasPhoto] = useState(false);

  const [password, setPassword] = useState('');
  useEffect(() => {
    getData('user').then(res => {
      const data = res;
      setPhoto({uri: res.photo});
      setProfile(data);
    });
  }, []);

  async function getImage() {
    const result = await launchImageLibrary({
      quality: 0.5,
      includeBase64: true,
      maxWidth: 200,
      maxHeight: 200,
    });

    if (result.didCancel) {
      showMessage({
        message: 'foto belum diupload',
        type: 'danger',
      });
      setPhoto(ILNullPhoto);
    } else {
      setPhotoForDB(
        `data:${result.assets[0].type};base64, ${result.assets[0].base64}`,
      );

      const source = {uri: result.assets[0].uri};
      setPhoto(source);
    }
  }

  const updateData = () => {
    const db = getDatabase(Fire);
    const data = profile;
    data.photo = photoForDB;
    update(ref(db, 'users/' + profile.uid + '/'), data).then(() => {
      console.log('success: ', data);
      storeData('user', data);
    });
    // console.log('data baru: ', data);
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
          <Profile isRemove photo={photo} onPress={getImage} />
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
