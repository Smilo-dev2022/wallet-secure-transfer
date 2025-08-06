import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get('window');
const CIRCLE_SIZE = width * 0.7;

const splashStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0082ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: '#FFD400',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
  },
  title: {
    color: '#000',
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
    textAlign: 'center',
  },
});

export default splashStyles