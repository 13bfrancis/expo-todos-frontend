import { Box, Button, Heading, Text } from "native-base";
import { Auth0ContextInterface, Auth0User, useAuth0 } from "react-native-auth0";

interface Auth extends Auth0ContextInterface {
  user: Auth0User<{}>;
}

export const Profile = () => {
  const { user, clearSession }: Auth = useAuth0();

  return (
    <Box safeArea alignItems={"center"} justifyContent="center">
      <Heading>Hello,</Heading>
      <Text>{user.name}</Text>
      <Button colorScheme={"blue"} onPress={async () => await clearSession()}>
        Sign Out
      </Button>
    </Box>
  );
};
