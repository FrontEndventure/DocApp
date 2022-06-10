import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {List} from '../../components';
import {colors, fonts, getData} from '../../utils';
import {DummyDoctor4, DummyDoctor5, DummyDoctor6} from '../../assets';
import {child, getDatabase, push, ref, onValue, set} from 'firebase/database';
import {Fire} from '../../config/Fire';

const Messages = ({navigation}) => {
  const [doctors, setDoctors] = useState([
    {
      id: 1,
      name: 'Alexander Jennie',
      desc: 'kumaha dok, jadinya bagaimana...',
      profile: DummyDoctor4,
    },
    {
      id: 2,
      name: 'Nairobi Putri Hayza',
      desc: 'Oh tentu saja tidak karena jeruk it...',
      profile: DummyDoctor5,
    },
    {
      id: 3,
      name: 'John McParker Steve',
      desc: 'Oke menurut pak dokter bagaimana unt...',
      profile: DummyDoctor6,
    },
  ]);
  const [user, setUser] = useState({});

  const [historyChat, setHistoryChat] = useState([]);

  useEffect(() => {
    getDataUserFromLocal();
    const db = getDatabase();

    const urlHistory = `messages/${user.uid}/`;
    // const urlMessageDoctor = `messages/${dataDoctor.data.uid}/${chatID}`;

    const dataHistoryChat = ref(db, urlHistory);
    onValue(dataHistoryChat, snapshot => {
      if (snapshot.val()) {
        const oldData = snapshot.val();
        const newData = [];
        Object.keys(oldData).map(key => {
          newData.push({
            id: key,
            // data: oldData[key],
            ...oldData[key],
          });
        });
        console.log('new data history: ', newData);
        setHistoryChat(newData);
      }

      // const data = parseArray(snapshot.val());
    });
  }, [user.uid]);

  const getDataUserFromLocal = () => {
    getData('user').then(res => {
      setUser(res);
    });
  };

  return (
    <View style={styles.page}>
      <View style={styles.content}>
        <Text style={styles.title}>Messages</Text>
        {historyChat.map(chat => {
          return (
            <List
              key={chat.id}
              profile={chat.uidPartner}
              name={chat.uidPartner}
              desc={chat.lastContentChat}
              onPress={() => navigation.navigate('Chatting', chat)}
            />
          );
        })}
      </View>
    </View>
  );
};

export default Messages;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.secondary,
    flex: 1,
  },
  content: {
    backgroundColor: colors.white,
    flex: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 30,
    marginLeft: 16,
  },
});
