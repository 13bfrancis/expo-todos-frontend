import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import HomeScreen from "./screens/HomeScreen";
import FavoritesScreen from "./screens/FavoritesScreen";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StatusBar } from "expo-status-bar";
import { useAuth0, Auth0Provider, Auth0User } from "react-native-auth0";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignIn from "./screens/SignIn";
import { API_URL, AUTH0_DOMAIN, AUTH0_CLIENT_ID } from "@env";

type TabNavRoutes = {
  Favorites: undefined;
  Home: undefined;
};

//! TODO: Research react-native-animatable
const Tab = createBottomTabNavigator<TabNavRoutes>();
const Stack = createNativeStackNavigator();

export default function App() {
  console.log(API_URL);
  return (
    <Auth0Provider domain={AUTH0_DOMAIN} clientId={AUTH0_CLIENT_ID}>
      <NativeBaseProvider>
        <StatusBar style={"auto"} />
        <Navigation />
      </NativeBaseProvider>
    </Auth0Provider>
  );
}

const Navigation = () => {
  const { user } = useAuth0();
  const authUser: Auth0User<{}> = user;

  return (
    <NavigationContainer>
      {authUser ? (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ size, color }) => {
              if (route.name === "Favorites") {
                return <Ionicons name="heart" size={size} color={color} />;
              }

              return <Ionicons name="list-outline" size={size} color={color} />;
            },
            headerShown: false,
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Favorites" component={FavoritesScreen} />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="SignIn" component={SignIn} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};
