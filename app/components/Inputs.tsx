import { View, Text, TextInput } from "react-native";

type InputTypes = {
  styleView: object;
  textStyle: object;
  inputStyle: object;
  value: string;
  label: string;
  stateToPass: (text: string) => void
  placeholder: string;
}

 const InputField = ({ styleView, value, label, textStyle, inputStyle, stateToPass, placeholder }: InputTypes) => {
  return (
    <View style={styleView}>
      <Text style={textStyle}>{label}</Text>
      <TextInput
        value={value}
        style={inputStyle}
        onChangeText={stateToPass}
        placeholder={placeholder}
        autoCapitalize="none"
        placeholderTextColor="#9CA3AF"
      />
    </View>
  );
};

export default InputField