import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Button, ChatItem, Header, Input, InputChat} from '../../components';
import {colors, fonts} from '../../utils';

const Chatting = ({navigation}) => {
  return (
    <View style={styles.page}>
      <Header title="Nairobi Putri Hayza" type="dark-profile" />
      <View style={styles.content}>
        <Text style={styles.chatDate}>Senin, 15 April, 2022</Text>
        <ChatItem />
        <ChatItem />
        <ChatItem />
      </View>

      <InputChat />
    </View>
  );
};

export default Chatting;

const styles = StyleSheet.create({
  page: {backgroundColor: colors.white, flex: 1},
  content: {
    flex: 1,
    backgroundColor: 'yellow',
  },
  chatDate: {
    fontSize: 11,
    fontFamily: fonts.primary.normal,
    color: colors.text.secondary,
    marginVertical: 20,
    textAlign: 'center',
  },
});
