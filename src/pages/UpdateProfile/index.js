import React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {IconRemovePhoto} from '../../assets';
import {Button, Gap, Header, Input, Profile} from '../../components';
import {colors} from '../../utils';

const UpdateProfile = () => {
  return (
    <View style={styles.page}>
      <Header title="Edit Profile" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Profile isRemove onPress={() => alert('Ganti Poto')} />
          <Gap height={26} />
          <Input label={'Full Name'} />
          <Gap height={24} />
          <Input label={'Pekerjaan'} />
          <Gap height={24} />
          <Input label={'Email Address'} />
          <Gap height={24} />
          <Input label={'Password'} />
          <Gap height={40} />
          <Button title="Save Profile" />
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
