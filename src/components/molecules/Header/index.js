import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {IconBackDark} from '../../../assets';
import {Gap} from '../../atoms';
import {colors} from '../../../utils';

const Header = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <IconBackDark />
      </TouchableOpacity>
      <Text style={styles.text}>Header</Text>
      <Gap width={24} />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 30,
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    flex: 1,
    fontSize: 20,
    color: colors.text.primary,
    fontFamily: 'Nunito-SemiBold',
  },
});
