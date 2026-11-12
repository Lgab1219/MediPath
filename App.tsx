import { createStaticNavigation, type StaticParamList } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/components/Home';
import Login from './src/components/Login';
import Register from './src/components/Register';

function App() {
  return (
    <Navigation />
  );
}

const RootStack = createNativeStackNavigator({
  initialRouteName: 'Home',
  screens: {
    Home: Home,
    Register: Register,
    Login: Login,
  },
  screenOptions: {
    headerShown: false,
  },
});

// Initialize a type for the navigation stack, to know which screens are available in the navigation and what parameters they accept.
type RootStackParamList = StaticParamList<typeof RootStack>;

// Declare the navigation stack type globally, so that it can be used in any component without having to import it.
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

const Navigation = createStaticNavigation(RootStack);


export default App;
