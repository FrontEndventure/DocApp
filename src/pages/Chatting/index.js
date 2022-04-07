import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Button, ChatItem, Header, Input, InputChat} from '../../components';

const Chatting = ({navigation}) => {
  return (
    <View>
      <Header
        title="Nairobi Putri Hayza"
        type="dark"
        onPress={() => navigation.goBack()}
      />
      <Text>date time</Text>
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <InputChat />
    </View>
  );
};

export default Chatting;

const styles = StyleSheet.create({});
