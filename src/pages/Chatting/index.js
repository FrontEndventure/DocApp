import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Button, ChatItem, Header, Input, InputChat} from '../../components';
import {colors, fonts, getData, showError} from '../../utils';
import {Fire} from '../../config/Fire';
import {child, get, getDatabase, push, ref} from 'firebase/database';

const Chatting = ({navigation, route}) => {
  const dataDoctor = route.params;
  const [chatContent, setChatContent] = useState('');
  const [user, setUser] = useState({});
  const dbRef = ref(getDatabase(Fire));

  useEffect(() => {
    getData('user').then(res => {
      // console.log('data user login: ', res);
      setUser(res);
    });
  }, []);

  const chatSend = () => {
    console.log('data dikirim : ', chatContent);
    const today = new Date();
    const hour = today.getHours();
    const minute = today.getMinutes();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const date = today.getDate();
    //kirim ke firebase
    // console.log('url ke firebase: ', `chatting/${user.uid}_${dataDoctor.data.uid}/allChat/${year}-${month}-${date}`);
    const data = {
      sendBy: user.uid,
      chatDate: new Date().getTime(),
      chatTime: `${hour}:${minute} ${hour > 12 ? 'PM' : 'AM'}`,
      chatContent: chatContent,
    };
    // dbRef(
    //   `chatting/${user.uid}_${dataDoctor.data.uid}/allChat/${year}-${month}-${date}`,
    //   push(data),
    // );
    push(
      child(
        dbRef,
        `chatting/${user.uid}_${dataDoctor.data.uid}/allChat/${year}-${month}-${date}`,
      ),
      data,
    )
      .then(res => {
        setChatContent('');
      })
      .catch(err => {
        showError(err.message);
      });

    console.log('data untuk dikirim: ', data);
  };

  return (
    <View style={styles.page}>
      <Header
        title={dataDoctor.data.fullName}
        type="dark-profile"
        photo={{uri: dataDoctor.data.photo}}
        category={dataDoctor.data.category}
        onPress={() => navigation.goBack()}
      />
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.chatDate}>Senin, 15 April, 2022</Text>
          <ChatItem isMe />
          <ChatItem />
          <ChatItem isMe />
        </ScrollView>
      </View>

      <InputChat
        value={chatContent}
        onChangeText={value => setChatContent(value)}
        onButtonPress={chatSend}
      />
    </View>
  );
};

export default Chatting;

const styles = StyleSheet.create({
  page: {backgroundColor: colors.white, flex: 1},
  content: {
    flex: 1,
    // backgroundColor: 'yellow',
  },
  chatDate: {
    fontSize: 11,
    fontFamily: fonts.primary.normal,
    color: colors.text.secondary,
    marginVertical: 20,
    textAlign: 'center',
  },
});
