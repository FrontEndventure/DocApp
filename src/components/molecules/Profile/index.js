import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {DummyUser, IconRemovePhoto} from '../../../assets';
import {colors, fonts} from '../../../utils';

const Profile = ({name, desc, isRemove, onPress}) => {
  return (
    <View style={styles.container}>
      {!isRemove && (
        <View style={styles.borderProfile}>
          <Image style={styles.avatar} source={DummyUser} />
        </View>
      )}
      {isRemove && (
        <TouchableOpacity style={styles.borderProfile} onPress={onPress}>
          <Image style={styles.avatar} source={DummyUser} />
          {isRemove && <IconRemovePhoto style={styles.removePhoto} />}
        </TouchableOpacity>
      )}

      {name && (
        <View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.profesion}>{desc}</Text>
        </View>
      )}
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 110 / 2,
  },
  borderProfile: {
    width: 130,
    height: 130,
    borderRadius: 130 / 2,
    borderWidth: 1,
    // backgroundColor: 'red',
    borderColor: colors.border,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 16,
    textAlign: 'center',
  },
  profesion: {
    fontSize: 16,
    fontFamily: fonts.primary[600],
    color: colors.text.secondary,
    marginTop: 2,
    textAlign: 'center',
  },
  removePhoto: {
    position: 'absolute',
    bottom: 8,
    right: 8,
  },
});
