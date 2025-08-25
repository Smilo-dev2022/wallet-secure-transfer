import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Button, Text, TextInput, View } from 'react-native';
import supabase from '../lib/supabase';
import signupStyles from '../styles/signupStyles';

export default function Signup() {
	const router = useRouter();
	const [phone, setPhone] = useState('');
	const [name, setName] = useState('');
	const [loading, setLoading] = useState(false);

	// Format phone number to enforce +27 format
	const formatPhoneNumber = (text: string) => {
		// Remove all non-digit characters except +
		let cleaned = text.replace(/[^\d+]/g, '');
		
		// If it doesn't start with +, add it
		if (!cleaned.startsWith('+')) {
			cleaned = '+' + cleaned;
		}
		
		// If it starts with + but not +27, enforce +27
		if (cleaned.startsWith('+') && !cleaned.startsWith('+27')) {
			// If user enters just +, add 27
			if (cleaned === '+') {
				cleaned = '+27';
			} else if (cleaned.startsWith('+0')) {
				// If user enters +0, replace with +27
				cleaned = '+27' + cleaned.substring(2);
			} else if (cleaned.startsWith('+')) {
				// If user enters + followed by other numbers, enforce +27
				cleaned = '+27' + cleaned.substring(1);
			}
		}
		
		// Limit to reasonable length (country code + 9 digits)
		if (cleaned.length > 12) {
			cleaned = cleaned.substring(0, 12);
		}
		
		return cleaned;
	};

	const handlePhoneChange = (text: string) => {
		const formatted = formatPhoneNumber(text);
		setPhone(formatted);
	};

	async function signUpWithPhone() {
		setLoading(true);

		// Validate phone number format
		if (!phone.startsWith('+27') || phone.length < 12) {
			Alert.alert('Invalid Phone Number', 'Please enter a valid South African phone number starting with +27');
			setLoading(false);
			return;
		}

		try {
			// First, send OTP for verification
			const { error: otpError } = await supabase.auth.signInWithOtp({
				phone: phone,
				options: {
					data: {
						full_name: name,
					},
				},
			});

			if (otpError) {
				Alert.alert('Error', otpError.message);
				setLoading(false);
				return;
			}

			// OTP sent successfully, redirect to verification
			Alert.alert(
				'Success',
				'Verification code sent! Please check your phone and enter the code.',
			);
			router.replace(
				`/auth/Verify?mode=signup&phoneNumber=${encodeURIComponent(phone)}`,
			);
		} catch (error: any) {
			Alert.alert('Error', error.message || 'An unexpected error occurred');
		} finally {
			setLoading(false);
		}
	}

	return (
		<View style={signupStyles.container}>
			<View style={signupStyles.form}>
				<Text style={signupStyles.label}>Full Name</Text>
				<TextInput
					placeholder='Enter your full name'
					placeholderTextColor='#999'
					style={signupStyles.input}
					value={name}
					onChangeText={(text) => setName(text)}
				/>

				<Text style={signupStyles.label}>Phone Number</Text>
				<TextInput
					placeholder='+27 123 456 789'
					placeholderTextColor='#999'
					style={signupStyles.input}
					value={phone}
					onChangeText={handlePhoneChange}
					keyboardType='phone-pad'
					autoCapitalize='none'
				/>
				<Text style={signupStyles.helperText}>
					Enter your South African phone number
				</Text>

				<View style={signupStyles.buttonContainer}>
					<Button
						title='Sign Up'
						color='#F97316'
						onPress={() => signUpWithPhone()}
						disabled={loading}
					/>
				</View>
				<View style={signupStyles.centeredContainer}>
					<Link href='/auth/Login' style={signupStyles.loginLink}>
						<Text style={signupStyles.loginLinkText}>
							Already have an account?{' '}
							<Text style={signupStyles.loginBold}>Login</Text>
						</Text>
					</Link>
				</View>
			</View>
		</View>
	);
}
