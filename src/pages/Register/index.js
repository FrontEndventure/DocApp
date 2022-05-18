import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Gap, Header, Input, Loading } from '../../components';
import { Fire } from '../../config/Fire';
import {
  colors,
  fonts, showError,
  storeData,
  useForm
} from '../../utils';

const Register = ({navigation}) => {
  const [form, setForm] = useForm({
    fullName: '',
    profession: '',
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);

  const onContinue = () => {
    console.log(form);
    // const data = {
    //   fullName: form.fullName,
    //   profession: form.profession,
    //   email: form.email,
    // };
    // navigation.navigate('UploadPhoto', data);

    setLoading(true);
    const auth = getAuth(Fire);
    const db = getDatabase(Fire);
    createUserWithEmailAndPassword(auth, form.email, form.password)
      .then(success => {
        // Signed in
        // var user = userCredential.user;
        setLoading(false);
        setForm('reset');
        const data = {
          fullName: form.fullName,
          profession: form.profession,
          email: form.email,
          uid: success.user.uid,
        };

        set(ref(db, 'users/' + success.user.uid + '/'), data);

        // input data ke localstorage
        storeData('user', data);

        //pindah halaman ke page UploadPhoto bawa parameter data
        navigation.navigate('UploadPhoto', data);
        console.log('data sukses register', success);
        // ambil data dari localstorage
        // getData('user').then(res => {
        //   console.log('data: ', res);
        // });
      })
      .catch(error => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        setLoading(false);
        console.log('error register: ', errorMessage);
        showError(errorMessage);
        // ..
      });
  };
  return (
    <>
      <View style={styles.page}>
        {/* <ILLogo /> */}
        <Header onPress={() => navigation.goBack()} title="Daftar Akun" />
        <View style={styles.content}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Input
              label="Full Name"
              value={form.fullName}
              onChangeText={value => setForm('fullName', value)}
            />
            <Gap height={24} />
            <Input
              label="Pekerjaan"
              value={form.profession}
              onChangeText={value => setForm('profession', value)}
            />
            <Gap height={24} />
            <Input
              label="Email Address"
              value={form.email}
              onChangeText={value => setForm('email', value)}
            />
            <Gap height={24} />
            <Input
              label="Password"
              value={form.password}
              onChangeText={value => setForm('password', value)}
              secureTextEntry
            />
            <Gap height={40} />
            <Button title="Continue" onPress={onContinue} />
          </ScrollView>
        </View>
        {loading && <Loading />}
      </View>
    </>
  );
};

export default Register;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
  content: {
    padding: 40,
    paddingTop: 0,
  },
  title: {
    color: colors.text.primary,
    fontFamily: fonts.primary[600],
    fontSize: 20,
    marginTop: 30,
    marginBottom: 40,
    textAlign: 'center',
  },
});
