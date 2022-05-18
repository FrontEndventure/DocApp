import { getAuth, signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ILNullPhoto } from '../../assets';
import { Gap, Header, List, Profile } from '../../components';
import { getData, showError } from '../../utils';

const UserProfile = ({navigation}) => {
  const [profile, setProfile] = useState({
    photo: ILNullPhoto,
    fullName: '',
    profession: '',
  });

  useEffect(() => {
    getData('user').then(res => {
      const data = res;
      data.photo = {uri: res.photo};
      // console.log('new profile: ', data);
      setProfile(data);
    });
  }, []);

  const logOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        showError('logout berhasil');
      })
      .catch(error => {
        // An error happened.
        showError(error);
      });
  };

  return (
    <View style={styles.page}>
      <Header title="Profile" onPress={() => navigation.goBack()} />
      <Gap height={10} />

      {profile.fullName.length > 0 && (
        <Profile
          name={profile.fullName}
          desc={profile.profession}
          photo={profile.photo}
        />
      )}
      <Gap height={14} />

      <List
        name="Edit Profile"
        desc="Last Update Yesterday"
        type="next"
        icon="edit-profile"
        onPress={() => navigation.navigate('UpdateProfile')}
      />
      <List
        name="Language"
        desc="Last Update Yesterday"
        type="next"
        icon="language"
      />
      <List
        name="Rate us"
        desc="Last Update Yesterday"
        type="next"
        icon="rate"
      />
      <List
        name="Sign out"
        desc="Last Update Yesterday"
        type="next"
        icon="help"
        onPress={logOut}
      />
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'white',
  },
});
