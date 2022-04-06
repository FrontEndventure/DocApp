import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Header, ListDoctor} from '../../components';
import {DummyDoctor1} from '../../assets';
import {colors} from '../../utils';

const ChooseDoctor = () => {
  return (
    <View style={styles.page}>
      <Header type="dark" title="Pilih Dokter" />
      <ListDoctor
        type="next"
        profile={DummyDoctor1}
        name="Alexander Grahambel"
        desc="Wanita"
      />
      <ListDoctor
        type="next"
        profile={DummyDoctor1}
        name="Alexander Grahambel"
        desc="Wanita"
      />
      <ListDoctor
        type="next"
        profile={DummyDoctor1}
        name="Alexander Grahambel"
        desc="Wanita"
      />
      <ListDoctor
        type="next"
        profile={DummyDoctor1}
        name="Alexander Grahambel"
        desc="Wanita"
      />
    </View>
  );
};

export default ChooseDoctor;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
});
