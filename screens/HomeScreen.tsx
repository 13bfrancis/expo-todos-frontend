import {
  Box,
  Button,
  Fab,
  Heading,
  Icon,
  Input,
  Modal,
  Text,
} from "native-base";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { Auth0ContextInterface, Auth0User, useAuth0 } from "react-native-auth0";

interface Auth extends Auth0ContextInterface {
  user: Auth0User<{ custom: string }>;
}

const HomeScreen = ({}: any) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <Box safeArea flex={1}>
      <Modal
        isOpen={modalVisible}
        onClose={setModalVisible}
        size="full"
        padding={"2"}
        animationPreset="slide"
        avoidKeyboard
        safeArea
      >
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Add ToDo Item</Modal.Header>
          <Modal.Body>
            <Input
              variant="underlined"
              placeholder="New Todo"
              fontSize={"lg"}
              borderBottomWidth={"2"}
              colorScheme="blue"
            />
          </Modal.Body>
          <Modal.Footer>
            <Button colorScheme={"blue"} borderRadius={"md"}>
              Add Item
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      <Box px="16">
        <Heading textAlign={"center"}>ToDo Lists</Heading>
        <Box my={5} alignItems={"center"}>
          <Button
            leftIcon={
              <Icon as={Ionicons} name="list" color="white" size={"md"} />
            }
            colorScheme="blue"
            _text={{ fontSize: "md" }}
            size={"sm"}
            variant={"solid"}
            onPress={async () => {
              console.log("hello");
            }}
          >
            Add a List
          </Button>
        </Box>
        <Text fontWeight="light" textAlign={"center"}>
          There are currently no lists...
        </Text>
      </Box>
      <Fab
        onPress={() => {
          setModalVisible(true);
        }}
        colorScheme={"blue"}
        icon={<Ionicons color={"white"} name="add" size={28} />}
        renderInPortal={false}
        shadow="5"
      />
    </Box>
  );
};

export default HomeScreen;
