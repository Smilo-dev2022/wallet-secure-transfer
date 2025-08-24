import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider, useAuth } from './auth/AuthProvider';
import screens from './data/screens';

function LayoutContent() {
	const [showSplash, setShowSplash] = useState(true);
	const { initialized, user } = useAuth();

	useEffect(() => {
		const splashTimer = setTimeout(() => {
			setShowSplash(false);
		}, 5000);

		return () => clearTimeout(splashTimer);
	}, []);

	if (showSplash) {
		return (
			<SafeAreaProvider>
				<Stack screenOptions={{ headerShown: false }}>
					<Stack.Screen name='pages/SplashPage' />
				</Stack>
			</SafeAreaProvider>
		);
	}

	if (!initialized) {
		return null;
	}

	if (!user) {
		return (
			<SafeAreaProvider>
				<Stack screenOptions={{ headerShown: false }}>
					<Stack.Screen name='pages/Landing' />
					<Stack.Screen name='auth/Login' />
					<Stack.Screen name='auth/Signup' />
					<Stack.Screen name='auth/Verify' />
				</Stack>
			</SafeAreaProvider>
		);
	}

	return (
		<SafeAreaProvider>
			<Stack>
				{screens.map((screen) => (
					<Stack.Screen
						key={screen.name}
						name={screen.name}
						options={screen.options}
					/>
				))}
			</Stack>
		</SafeAreaProvider>
	);
}

export default function RootLayout() {
	return (
		<AuthProvider>
			<LayoutContent />
		</AuthProvider>
	);
}
