import { TouchableOpacity, Text, GestureResponderEvent } from "react-native";

type ButtonType = {
  btnTitle: string;
  btnStyles: object;
  functionToPass: (event: GestureResponderEvent) => void;
  textStyles: object;
}

export default function ButtonC({ btnTitle, btnStyles, functionToPass, textStyles }: ButtonType) {
  return (
    <TouchableOpacity 
      style={btnStyles}
      onPress={functionToPass}
    >
      <Text style={textStyles}>
        {btnTitle}
      </Text>
    </TouchableOpacity>
  )
}