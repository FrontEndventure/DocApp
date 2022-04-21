import {StyleSheet, Text, View, TextInput} from 'react-native';
import React, {useState} from 'react';
import {colors, fonts} from '../../../utils';

const Input = ({label, value, onChangeText, secureTextEntry}) => {
  const [border, setBorder] = useState(colors.border);

  const onFocusForm = () => {
    setBorder(colors.tertiary);
  };
  const onBlurForm = () => {
    setBorder(colors.border);
  };

  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        onFocus={onFocusForm}
        onBlur={onBlurForm}
        style={styles.input(border)}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  input: border => ({
    borderWidth: 1,
    borderColor: border,
    borderRadius: 10,
    height: 45,
    padding: 12,
  }),
  label: {
    fontSize: 16,
    color: colors.text.secondary,
    marginBottom: 6,
    fontFamily: fonts.primary[400],
  },
});
