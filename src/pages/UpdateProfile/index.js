import {getAuth, onAuthStateChanged, updatePassword} from 'firebase/auth';
import {getDatabase, ref, update} from 'firebase/database';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {ILNullPhoto} from '../../assets';
import {Button, Gap, Header, Input, Profile} from '../../components';
import {Fire} from '../../config/Fire';
import {colors, getData, showError, showSuccess, storeData} from '../../utils';

const UpdateProfile = ({navigation}) => {
  const [profile, setProfile] = useState({
    // photo: ILNullPhoto,
    fullName: '',
    profession: '',
    email: '',
    photoForDB: '',
  });
  const [photoForDB, setPhotoForDB] = useState('');
  const [photo, setPhoto] = useState(ILNullPhoto);
  // const [hasPhoto, setHasPhoto] = useState(false);

  const [password, setPassword] = useState('');
  useEffect(() => {
    getData('user').then(res => {
      const data = res;
      data.photoForDB = res?.photo?.length > 1 ? res.photo : ILNullPhoto;
      const tempPhoto = res?.photo?.length > 1 ? {uri: res.photo} : ILNullPhoto;
      setPhoto(tempPhoto);
      setProfile(data);
    });
  }, []);

  const getImage = () => {
    launchImageLibrary(
      {
        quality: 0.5,
        includeBase64: true,
        maxWidth: 200,
        maxHeight: 200,
      },
      response => {
        if (response.didCancel || response.error) {
          showError(response.error);
          // setPhoto(ILNullPhoto);
        } else {
          const source = photo ? {uri: response.assets[0].uri} : ILNullPhoto;
          setPhotoForDB(
            `data:${response.assets[0].type};base64, ${response.assets[0].base64}`,
          );

          setPhoto(source);
        }
      },
    );
  };

  const updatePasswordData = () => {
    // console.log('ini password: ', password);
    const auth = getAuth(Fire);
    onAuthStateChanged(auth, user => {
      if (user) {
        updatePassword(user, password)
          .then(() => {
            console.log('update password berhasil');
          })
          .catch(err => {
            console.log('error: ', err);
          });
      } else {
        // User is signed out
        // ...
      }
    });
  };

  const updateProfileData = () => {
    const db = getDatabase(Fire);
    const data = profile;
    data.photo = photoForDB;
    update(ref(db, `users/${profile.uid}/`), data).then(() => {
      storeData('user', data);
      // console.log('ini data local storage: ', data);
    });
  };

  const updateData = () => {
    if (password.length > 0) {
      if (password.length < 6) {
        showError('Password kurang dari 6');
      } else {
        updatePasswordData();
        updateProfileData();
        showSuccess('data dan password berhasil diperbaharui');
        navigation.replace('MainApp');
      }
    } else {
      updateProfileData();
      showSuccess('data berhasil diperbaharui');
      navigation.replace('MainApp');
    }
    // const db = getDatabase(Fire);
    // const data = profile;
    // data.photo = photoForDB;
    // update(ref(db, 'users/' + profile.uid + '/'), data).then(() => {
    //   console.log('success: ', data);
    //   storeData('user', data);
    // });
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
          <Input
            label={'Password'}
            value={password}
            onChangeText={value => setPassword(value)}
            secureTextEntry
          />
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
