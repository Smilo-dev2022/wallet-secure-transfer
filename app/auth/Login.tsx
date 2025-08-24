import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Button, Text, TextInput, View } from 'react-native';
import supabase from '../lib/supabase';
import loginStyles from '../styles/loginStyles';

export default function Login() {
	const router = useRouter();
	const [phone, setPhone] = useState('');
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

	async function signInWithPhone() {
		setLoading(true);

		// Validate phone number format
		if (!phone.startsWith('+27') || phone.length < 12) {
			Alert.alert('Invalid Phone Number', 'Please enter a valid South African phone number starting with +27');
			setLoading(false);
			return;
		}

		try {
			const { error } = await supabase.auth.signInWithOtp({
				phone: phone,
			});

			if (error) {
				Alert.alert('Error', error.message);
			} else {
				Alert.alert(
					'Success',
					'OTP sent to your phone number. Please check and enter the code.',
				);
				router.replace(
					`/auth/Verify?mode=login&phoneNumber=${encodeURIComponent(phone)}`,
				);
			}
		} catch (error: any) {
			Alert.alert('Error', error.message || 'An unexpected error occurred');
		} finally {
			setLoading(false);
		}
	}

	return (
		<View style={loginStyles.container}>
			<View style={loginStyles.form}>
				<Text style={loginStyles.label}>Phone Number</Text>
				<TextInput
					placeholder='+27 123 456 789'
					placeholderTextColor='#999'
					style={loginStyles.input}
					value={phone}
					onChangeText={handlePhoneChange}
					keyboardType='phone-pad'
					autoCapitalize='none'
				/>
				<Text style={loginStyles.helperText}>
					Enter your South African phone number
				</Text>

				<View style={loginStyles.buttonContainer}>
					<Button
						title='Send OTP'
						color='#F97316'
						disabled={loading}
						onPress={() => signInWithPhone()}
					/>
				</View>

				<View style={loginStyles.centeredContainer}>
					<Link href='/auth/Signup' style={loginStyles.loginLink}>
						<Text style={loginStyles.loginLinkText}>
							Don&apos;t have an account?{' '}
							<Text style={[loginStyles.loginBold, { color: '#0082ff' }]}>
								Sign Up
							</Text>
						</Text>
					</Link>
				</View>
			</View>
		</View>
	);
}
