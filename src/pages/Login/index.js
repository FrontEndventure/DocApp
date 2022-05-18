import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import {child, get, getDatabase, ref} from 'firebase/database';
import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {ILLogo} from '../../assets';
import {Button, Gap, Input, Link} from '../../components';
import {Fire} from '../../config/Fire';
import {colors, fonts, storeData, useForm} from '../../utils';
import {showError} from '../../utils/showMessage';

const Login = ({navigation}) => {
  const [form, setForm] = useForm({
    email: '',
    password: '',
  });

  //untuk merubah reducer pake dispatch
  const dispatch = useDispatch();

  const login = () => {
    dispatch({
      type: 'SET_LOADING',
      value: true,
    });
    const auth = getAuth(Fire);
    const dbRef = ref(getDatabase(Fire));
    signInWithEmailAndPassword(auth, form.email, form.password)
      .then(res => {
        dispatch({
          type: 'SET_LOADING',
          value: false,
        });
        setForm('reset');
        // console.log('form: ', res);
        get(child(dbRef, `users/${res.user.uid}`)).then(resDB => {
          if (resDB.exists()) {
            // console.log('data user: ', resDB.val());
            storeData('user', resDB.val());
            navigation.replace('MainApp');
          } else {
            console.log('No data available');
          }
        });
      })

      .catch(error => {
        dispatch({
          type: 'SET_LOADING',
          value: false,
        });

        const errorMessage = error.message;
        showError(errorMessage);
        // ..
      });
  };

  const showLoadingTemp = () => {
    dispatch({
      type: 'SET_LOADING',
      value: true,
    });
  };

  return (
    <View style={styles.page}>
      <ScrollView showsHorizontalScrollIndicator={false}>
        <Gap height={40} />

        <ILLogo />
        <Text style={styles.title}>Masuk dan mulai berkonsultasi</Text>
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
        <Gap height={10} />
        <Link title="Forgot My Password" size={12} />
        <Gap height={40} />
        <Button title="Sign In" onPress={login} />
        <Gap height={30} />

        <Link
          title="Crate New Account"
          size={16}
          align="center"
          // onPress={() => navigation.replace('Register')}
          onPress={showLoadingTemp}
        />
      </ScrollView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  page: {
    padding: 40,
    flex: 1,
    backgroundColor: colors.white,
  },
  title: {
    color: colors.text.primary,
    fontFamily: fonts.primary[600],
    fontSize: 20,
    marginVertical: 40,
    maxWidth: 253,
  },
});
