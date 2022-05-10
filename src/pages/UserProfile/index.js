import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ILNullPhoto} from '../../assets';
import {Gap, Header, List, Profile} from '../../components';
import {colors, fonts, getData} from '../../utils';

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
