import {getDatabase, ref, update} from 'firebase/database';
import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {launchImageLibrary} from 'react-native-image-picker';
import {IconAddPhoto, IconRemovePhoto} from '../../assets/icons';
import {ILNullPhoto} from '../../assets/ilustration';
import {Button, Gap, Header, Link} from '../../components';
import {Fire} from '../../config/Fire';
import {colors, fonts, storeData} from '../../utils';

const UploadPhoto = ({navigation, route}) => {
  const {fullName, profession, uid} = route.params;
  const [hasPhoto, setHasPhoto] = useState(false);
  const [photo, setPhoto] = useState(ILNullPhoto);
  const [photoForDB, setPhotoForDB] = useState('');

  // const getImage = () => {
  async function getImage() {
    const result = await launchImageLibrary({
      quality: 0.5,
      includeBase64: true,
      maxWidth: 200,
      maxHeight: 200,
    });
    // console.log('data image: ', result);

    if (result.didCancel) {
      showMessage({
        message: 'foto belum diupload',
        type: 'danger',
      });
      setPhoto(ILNullPhoto);
      setHasPhoto(false);
    } else {
      // console.log('response getImage: ', result);
      setPhotoForDB(
        `data:${result.assets[0].type};base64, ${result.assets[0].base64}`,
      );

      const source = {uri: result.assets[0].uri};
      setPhoto(source);
      setHasPhoto(true);
    }
    // launchImageLibrary({}, response => {
    //   console.log('response: ', response);
    //   if (response.didCancel) {
    //     showMessage({
    //       message: 'foto belum diupload',
    //       type: 'danger',
    //     });
    //     setPhoto(ILNullPhoto);
    //     setHasPhoto(false);
    //   } else {
    //     console.log('response getImage: ', response);
    //     const source = {uri: response.assets[0].uri};
    //     setPhoto(source);
    //     setHasPhoto(true);
    //   }
    // });
  }

  const uploadAndContinue = () => {
    const db = getDatabase(Fire);
    update(ref(db, 'users/' + uid + '/'), {photo: photoForDB});
    const data = route.params;
    data.photo = photoForDB;
    // input data ke localstorage
    storeData('user', data);

    navigation.replace('MainApp');

    // input data ke localstorage
    // storeData('user', setPhotoForDB);
  };
  return (
    <View style={styles.page}>
      <Header title="Upload Photo" onPress={() => navigation.goBack()} />
      <View style={styles.content}>
        <View style={styles.profile}>
          <TouchableOpacity style={styles.avatarWrapper} onPress={getImage}>
            <Image source={photo} style={styles.avatar} />
            {/* jika ambil data dari online  */}
            {/* <Image source={{uri:'url disini'}} /> */}
            {hasPhoto && <IconRemovePhoto style={styles.addPhoto} />}
            {!hasPhoto && <IconAddPhoto style={styles.addPhoto} />}
          </TouchableOpacity>
          <Text style={styles.name}>{fullName}</Text>
          <Text style={styles.profession}>{profession}</Text>
        </View>
        <View>
          <Button
            disable={!hasPhoto}
            title="Upload and Continue"
            onPress={uploadAndContinue}
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
    borderRadius: 110 / 2,
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
