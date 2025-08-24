import { KeyboardTypeOptions, Text, TextInput, View } from 'react-native';

type InputTypes = {
	styleView: object;
	textStyle: object;
	inputStyle: object;
	value: string;
	label: string;
	stateToPass: (text: string) => void;
	placeholder: string;
	keyboardType?: KeyboardTypeOptions;
	secureTextEntry?: boolean;
};

const InputField = ({
	styleView,
	value,
	label,
	textStyle,
	inputStyle,
	stateToPass,
	placeholder,
	keyboardType = 'default',
	secureTextEntry = false,
}: InputTypes) => {
	return (
		<View style={styleView}>
			<Text style={textStyle}>{label}</Text>
			<TextInput
				value={value}
				style={inputStyle}
				onChangeText={stateToPass}
				placeholder={placeholder}
				autoCapitalize='none'
				placeholderTextColor='#9CA3AF'
				keyboardType={keyboardType}
				secureTextEntry={secureTextEntry}
			/>
		</View>
	);
};

export default InputField;
