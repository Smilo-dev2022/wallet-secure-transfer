import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
	Alert,
	KeyboardAvoidingView,
	Platform,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import supabase from '../lib/supabase';
import verifyPageStyles from '../styles/verifyPageStyles';

export default function Verify() {
	const [otp, setOtp] = useState(['', '', '', '', '', '']);
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const [phone, setPhone] = useState('');
	const router = useRouter();

	// Get params to determine if this is signup verification or OTP login
	const { mode, phoneNumber } = useLocalSearchParams();
	const isSignupVerification = mode === 'signup';
	const isLoginVerification = mode === 'login';

	// If this is signup or login verification, use the phone number from params
	React.useEffect(() => {
		if ((isSignupVerification || isLoginVerification) && phoneNumber) {
			setPhone(phoneNumber as string);
		}
	}, [isSignupVerification, isLoginVerification, phoneNumber]);

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

	const handleOtpChange = (value: string, index: number) => {
		const newOtp = [...otp];
		newOtp[index] = value;
		setOtp(newOtp);

		// Auto-focus next input if current input has a value
		if (value && index < 5) {
			// Focus next input
			const nextInput = document.querySelector(
				`input[data-index="${index + 1}"]`,
			) as HTMLInputElement;
			if (nextInput) {
				nextInput.focus();
			}
		}
	};

	const handleOtpKeyPress = (e: any, index: number) => {
		// Handle backspace to go to previous input
		if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
			const prevInput = document.querySelector(
				`input[data-index="${index - 1}"]`,
			) as HTMLInputElement;
			if (prevInput) {
				prevInput.focus();
			}
		}
	};

	const getOtpString = () => {
		return otp.join('');
	};

	const resendOTP = async () => {
		try {
			setLoading(true);
			setError('');

			// Validate phone number format
			if (!phone.startsWith('+27') || phone.length < 12) {
				setError(
					'Please enter a valid South African phone number starting with +27',
				);
				return;
			}

			const { data, error } = await supabase.auth.signInWithOtp({
				phone: phone,
			});

			if (error) {
				console.error('Error sending OTP', error.message);
				setError(`Failed to send OTP: ${error.message}`);
				return false;
			}

			console.log('OTP resent successfully');
			Alert.alert('OTP resent to your phone');

			// Clear the OTP input for new code
			setOtp(['', '', '', '', '', '']);
		} catch (err: any) {
			setError(err.message || 'An error occurred');
		} finally {
			setLoading(false);
		}
	};

	const handleBack = () => {
		if (isSignupVerification) {
			router.replace('/auth/Signup');
		} else if (isLoginVerification) {
			router.replace('/auth/Login');
		}
	};

	const verifyOTP = async () => {
		try {
			setLoading(true);
			setError('');

			const otpString = getOtpString();
			if (otpString.length !== 6) {
				throw new Error('Please enter the complete 6-digit OTP');
			}

			if (isSignupVerification) {
				// For signup verification, we need to create the user account
				// First verify the OTP
				const { data: verifyData, error: verifyError } =
					await supabase.auth.verifyOtp({
						phone: phone,
						token: otpString,
						type: 'sms',
					});

				if (verifyError) {
					console.error('Error verifying OTP:', verifyError.message);
					setError(`Failed to verify OTP: ${verifyError.message}`);
					return false;
				}

				// If verification successful, create the user profile
				if (verifyData.user) {
					try {
						// Create profile record
						const { error: profileError } = await supabase
							.from('kw_profile')
							.insert([
								{
									id: verifyData.user.id,
									full_name: verifyData.user.user_metadata?.full_name || 'User',
									phone: phone,
									wallet_balance: 0,
									two_fa_enabled: true,
									created_at: new Date().toISOString(),
								},
							]);

						if (profileError) {
							console.error('Error creating profile:', profileError);
							// Profile creation failed, but user is verified
							Alert.alert(
								'Account Verified!',
								'Your account has been verified successfully.',
							);
						} else {
							Alert.alert(
								'Account Created!',
								'Your account has been created and verified successfully.',
							);
						}

						router.replace('/pages/Wallet');
						return true;
					} catch (profileErr: any) {
						console.error('Profile creation error:', profileErr);
						Alert.alert(
							'Account Verified!',
							'Your account has been verified successfully.',
						);
						router.replace('/pages/Wallet');
						return true;
					}
				}
			} else {
				// For OTP login, just verify the OTP
				const { data, error } = await supabase.auth.verifyOtp({
					phone: phone,
					token: otpString,
					type: 'sms',
				});

				if (error) {
					console.error('Error verifying OTP:', error.message);
					setError(`Failed to verify OTP: ${error.message}`);
					return false;
				}

				Alert.alert(
					'Login Successful!',
					'You have been logged in successfully.',
				);
				router.replace('/pages/Wallet');
				return true;
			}
		} catch (err: any) {
			setError(err.message || 'An unexpected error occurred');
		} finally {
			setLoading(false);
		}
	};

	return (
		<KeyboardAvoidingView
			style={verifyPageStyles.container}
			behavior={Platform.OS === 'ios' ? 'padding' : undefined}
		>
			{/* Back button for both signup and login verification */}
			{(isSignupVerification || isLoginVerification) && (
				<TouchableOpacity
					style={verifyPageStyles.backButton}
					onPress={handleBack}
				>
					<Ionicons name='arrow-back' size={24} color='white' />
				</TouchableOpacity>
			)}

			<Text style={verifyPageStyles.header}>
				{isSignupVerification ? 'Verify Your Account' : 'Verify Your Login'}
			</Text>

			{(isSignupVerification || isLoginVerification) && (
				<Text style={verifyPageStyles.subtext}>
					We&apos;ve sent a verification code to {phone}
				</Text>
			)}

			{/* Only show phone input for standalone OTP verification (not used in current flow) */}
			{!isSignupVerification && !isLoginVerification && (
				<>
					<TextInput
						style={verifyPageStyles.input}
						placeholder='Enter phone number (+27 123 456 789)'
						value={phone}
						onChangeText={handlePhoneChange}
						keyboardType='phone-pad'
						autoCapitalize='none'
					/>

					<TouchableOpacity
						style={verifyPageStyles.verifyButton}
						onPress={resendOTP}
						disabled={loading}
					>
						<Text style={verifyPageStyles.verifyText} disabled={loading}>
							{loading ? 'Sending...' : 'Send OTP'}
						</Text>
					</TouchableOpacity>
				</>
			)}

			{/* Show OTP input for all verification scenarios */}
			<View style={verifyPageStyles.otpContainer}>
				{otp.map((digit, index) => (
					<TextInput
						key={index}
						style={verifyPageStyles.otpInput}
						value={digit}
						onChangeText={(value) => handleOtpChange(value, index)}
						onKeyPress={(e) => handleOtpKeyPress(e, index)}
						keyboardType='number-pad'
						maxLength={1}
						data-index={index}
						placeholder=''
						placeholderTextColor='#9CA3AF'
					/>
				))}
			</View>

			<TouchableOpacity
				style={verifyPageStyles.verifyButton}
				onPress={verifyOTP}
				disabled={loading}
			>
				<Text style={verifyPageStyles.verifyText} disabled={loading}>
					{loading
						? 'Verifying...'
						: isSignupVerification
						? 'Verify Account'
						: 'Verify Login'}
				</Text>
			</TouchableOpacity>

			{/* Resend OTP option */}
			<View style={verifyPageStyles.resendRow}>
				<Text style={verifyPageStyles.resendText}>
					Didn&apos;t receive the code?{' '}
				</Text>
				<TouchableOpacity onPress={resendOTP} disabled={loading}>
					<Text style={verifyPageStyles.resendLink}>Resend</Text>
				</TouchableOpacity>
			</View>

			{error ? <Text style={verifyPageStyles.errorText}>{error}</Text> : null}
		</KeyboardAvoidingView>
	);
}
