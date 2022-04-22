import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Button, Gap, Header, Input} from '../../components';
import {Fire} from '../../config/Fire';
import {colors, fonts, useForm} from '../../utils';
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';

const Register = ({navigation}) => {
  const [form, setForm] = useForm({
    fullName: '',
    profession: '',
    email: '',
    password: '',
  });
  const onContinue = () => {
    const auth = getAuth(Fire);
    createUserWithEmailAndPassword(auth, form.email, form.password)
      .then(success => {
        // Signed in
        // var user = userCredential.user;
        console.log('data sukses register', success);
        // ...
      })
      .catch(error => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        console.log('error register: ', errorMessage);
        // ..
      });
    console.log(form);
    setForm('reset');
    // console.log(fullName, profession, email, password);
  };
  return (
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
    </View>
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
