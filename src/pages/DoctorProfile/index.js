import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Button, Gap, Header, Profile} from '../../components';
import ProfileItem from '../../components/molecules/ProfileItem';
import {colors} from '../../utils';

const DoctorProfile = () => {
  return (
    <View style={styles.page}>
      <Header title={'Doctor Profile'} />
      <Profile name={'Alexa Rachel '} desc={'Dokter Anak'} />
      <Gap height={10} />

      <ProfileItem label={'Alumnus'} value={'Universitas Indonesia 2022'} />
      <ProfileItem label={'Tempat Praktik'} value={'Rumah Sakit Umum Bogor'} />
      <ProfileItem label={'No. STR'} value={'000134564798789'} />
      <View style={styles.action}>
        <Button title={'Start Consultation'} />
      </View>
    </View>
  );
};

export default DoctorProfile;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
  action: {
    paddingHorizontal: 40,
    paddingTop: 23,
  },
});
