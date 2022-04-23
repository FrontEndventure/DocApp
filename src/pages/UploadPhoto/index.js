import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React,  { useState } from 'react';
import {Button, Gap, Header, Link} from '../../components';
import {ILNullPhoto} from '../../assets/ilustration';
import {IconAddPhoto, IconRemovePhoto} from '../../assets/icons';
import {colors, fonts} from '../../utils';

const UploadPhoto = ({navigation}) => {
  const [hasPhoto, setHasPhoto] = useState(false);
    return (
    <View style={styles.page}>
      <Header title="Upload Photo" onPress={() => navigation.goBack()} />
      <View style={styles.content}>
        <View style={styles.profile}>
          <TouchableOpacity style={styles.avatarWrapper}>
            <Image source={ILNullPhoto} style={styles.avatar} />
            {/* jika ambil data dari online  */}
            {/* <Image source={{uri:'url disini'}} /> */}
            { hasPhoto && <IconRemovePhoto style={styles.addPhoto} />}
            {!hasPhoto && <IconAddPhoto style={styles.addPhoto} />}            
          </TouchableOpacity>
          <Text style={styles.name}>Shayna Melinda</Text>
          <Text style={styles.profession}>Product Designer</Text>
        </View>
        <View>
          <Button
            disable
            title="Upload and Continue"
            onPress={() => navigation.replace('MainApp')}
          />
          <Gap height={30} />
          <Link
            title="Skip for this"
            align="center"
            onPress={() => navigation.replace('MainApp')}
          />
        </View>
      </View>
    </View>
  );
};

export default UploadPhoto;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    paddingHorizontal: 40,
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 64,
  },
  profile: {
    alignItems: 'center', //center horizontal
    justifyContent: 'center', //center vertical
    flex: 1,
  },
  avatar: {
    height: 110,
    width: 110,
  },
  avatarWrapper: {
    width: 130,
    height: 130,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 130 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addPhoto: {
    position: 'absolute',
    bottom: 8,
    right: 6,
  },
  name: {
    fontSize: 24,
    color: colors.text.primary,
    fontFamily: fonts.primary[600],
    textAlign: 'center',
  },
  profession: {
    fontSize: 18,
    fontFamily: fonts.primary[400],
    textAlign: 'center',
    color: colors.text.secondary,
    marginTop: 4,
  },
});
