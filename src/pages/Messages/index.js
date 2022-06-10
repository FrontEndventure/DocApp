import {
  child, get, getDatabase, onValue, ref
} from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { DummyDoctor4, DummyDoctor5, DummyDoctor6 } from '../../assets';
import { List } from '../../components';
import { colors, fonts, getData } from '../../utils';

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
    const dbRef = ref(getDatabase());
    const urlHistory = `messages/${user.uid}/`;
    // const urlMessageDoctor = `messages/${dataDoctor.data.uid}/${chatID}`;

    const dataHistoryChat = ref(db, urlHistory);
    onValue(dataHistoryChat, async snapshot => {
      if (snapshot.val()) {
        const oldData = snapshot.val();
        const newData = [];
        const promises = await Object.keys(oldData).map(async key => {
          const urlUidDoctor = `doctors/${oldData[key].uidPartner}`;
          const detailDoctor = get(child(dbRef, urlUidDoctor));

          console.log('detail data doctor: ', (await detailDoctor).val());

          newData.push({
            id: key,
            detailDoctor: (await detailDoctor).val(),
            // data: oldData[key],
            ...oldData[key],
          });
        });
        await Promise.all(promises);
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
          const dataDoctor = {
            id: chat.detailDoctor.uid,
            data: chat.detailDoctor,
          };
          return (
            <List
              key={chat.id}
              profile={{uri: chat.detailDoctor.photo}}
              name={chat.detailDoctor.fullName}
              desc={chat.lastContentChat}
              onPress={() => navigation.navigate('Chatting', dataDoctor)}
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
