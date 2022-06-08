import {child, getDatabase, push, ref} from 'firebase/database';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {ChatItem, Header, InputChat} from '../../components';
import {Fire} from '../../config/Fire';
import {
  colors,
  fonts,
  getChatTime,
  getData,
  setDateChat,
  showError,
} from '../../utils';

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

    //kirim ke firebase
    const data = {
      sendBy: user.uid,
      chatDate: today.getTime(),
      chatTime: getChatTime(today),
      chatContent: chatContent,
    };

    const chatID = `${user.uid}_${dataDoctor.data.uid}`;

    
    const urlFirebase = `chatting/${chatID}/allChat/${setDateChat(today)}`;

    push(child(dbRef, urlFirebase), data)
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
