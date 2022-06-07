import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import {Button, ChatItem, Header, Input, InputChat} from '../../components';
import {colors, fonts} from '../../utils';

const Chatting = ({navigation, route}) => {
  const dataDoctor = route.params;

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
        value=""
        onChangeText={() => alert('input text')}
        onButtonPress={() => alert('button press')}
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
