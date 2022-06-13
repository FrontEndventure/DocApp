import { child, getDatabase, onValue, push, ref, set } from 'firebase/database';
import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { ChatItem, Header, InputChat } from '../../components';
import { Fire } from '../../config/Fire';
import {
  colors,
  fonts,
  getChatTime,
  getData,
  setDateChat,
  showError
} from '../../utils';

const Chatting = ({navigation, route}) => {
  const scrollViewRef = useRef();
  const dataDoctor = route.params;
  // const dataChat = route.params;
  const dbRef = ref(getDatabase(Fire));
  const [chatContent, setChatContent] = useState('');
  const [user, setUser] = useState({});
  const [chatData, setChatData] = useState([]);

  // const parseArray = listObject => {
  //   const data = [];
  //   Object.keys(listObject).map(key => {
  //     data.push({
  //       id: key,
  //       data: listObject[key],
  //     });
  //   });
  //   return data;
  // };

  useEffect(() => {
    getDataUserFromLocal();
    // getDataChatting();

    const db = getDatabase();
    const chatID = `${user.uid}_${dataDoctor.data.uid}`;
    const urlFirebase = `chatting/${chatID}/allChat/`;
    const dataChatKuy = ref(db, urlFirebase);
    onValue(dataChatKuy, snapshot => {
      if (snapshot.val()) {
        const dataSnapshot = snapshot.val();
        const allDataChat = [];
        Object.keys(dataSnapshot).map(key => {
          const dataChat = dataSnapshot[key];
          const newDataChat = [];

          Object.keys(dataChat).map(itemChat => {
            newDataChat.push({
              id: itemChat,
              data: dataChat[itemChat],
            });
          });

          allDataChat.push({
            id: key,
            data: newDataChat,
          });
        });
        setChatData(allDataChat);
        console.log('ini chat: ', allDataChat);
      }

      // const data = parseArray(snapshot.val());
    });
  }, [dataDoctor.data.uid, user.uid]);

  const getDataUserFromLocal = () => {
    getData('user').then(res => {
      setUser(res);
    });
  };

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
    const urlMessageUser = `messages/${user.uid}/${chatID}`;
    const urlMessageDoctor = `messages/${dataDoctor.data.uid}/${chatID}`;

    const dataHistoryChatForUser = {
      lastContentChat: chatContent,
      lastChatDate: today.getTime(),
      uidPartner: dataDoctor.data.uid,
    };

    const dataHistoryChatForDoctor = {
      lastContentChat: chatContent,
      lastChatDate: today.getTime(),
      uidPartner: user.uid,
    };

    push(child(dbRef, urlFirebase), data)
      .then(res => {
        setChatContent('');
        //set history for user
        set(child(dbRef, urlMessageUser), dataHistoryChatForUser);
        //set history for dataDoctor
        set(child(dbRef, urlMessageDoctor), dataHistoryChatForDoctor);
      })
      .catch(err => {
        showError(err.message);
      });

    console.log('data untuk dikirim: ', data);
  };

  const handleKeyPress = ({nativeEvent: {key: keyValue}}) => {
    console.log(keyValue);
    if (keyValue === 'Enter') {
      console.log('enter');
    }
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
        <ScrollView
          showsVerticalScrollIndicator={false}
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef.current.scrollToEnd({animated: true})
          }>
          {chatData.map(chat => {
            console.log('chat date:', `${chat.id.substring(0,4)}-${chat.id.substring(4,5)}-${chat.id.substring(5)}`)
            const tanggal = `${chat.id.substring(0,4)}-${chat.id.substring(4,5)}-${chat.id.substring(5)}`
            return (
              <View key={chat.id}>
                <Text style={styles.chatDate}>{tanggal}</Text>
                {chat.data.map(itemChat => {
                  const isMe = itemChat.data.sendBy === user.uid;
                  return (
                    <ChatItem
                      key={itemChat.id}
                      isMe={isMe}
                      text={itemChat.data.chatContent}
                      date={itemChat.data.chatTime}
                      photo={isMe ? null : {uri: dataDoctor.data.photo}}
                    />
                  );
                })}
              </View>
            );
          })}
        </ScrollView>
      </View>

      <InputChat
        value={chatContent}
        onChangeText={value => setChatContent(value)}
        onButtonPress={chatSend}
        // onKeyPress={handleKeyPress}
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
