import { AUTH0_AUDIENCE } from "@env";
import { Box, Button, Heading } from "native-base";
import { useAuth0 } from "react-native-auth0";

const SignIn = () => {
  const { authorize } = useAuth0();
  return (
    <Box safeArea alignItems={"center"}>
      <Heading textAlign={"center"} mb={"6"}>
        Create an Account
      </Heading>
      <Button
        onPress={async () => {
          await authorize({ audience: AUTH0_AUDIENCE });
        }}
        colorScheme={"blue"}
      >
        Sign in with Auth0
      </Button>
    </Box>
  );
};

export default SignIn;
