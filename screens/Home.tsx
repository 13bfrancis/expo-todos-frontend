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
import { useAuth0 } from "react-native-auth0";
import { API_URL } from "@env";
import { useGetLists } from "../query/useGetLists";

export const Home = ({}: any) => {
  const { getCredentials } = useAuth0();
  const { isLoading, isError, data } = useGetLists();
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
              const creds = await getCredentials();
              const response = await fetch(`${API_URL}/list`, {
                method: "POST",
                body: JSON.stringify({
                  name: "testing",
                }),
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${creds.accessToken}`,
                },
              });

              const json = await response.json();

              console.log(json);
            }}
          >
            Add a List
          </Button>
        </Box>
        {data?.data ? (
          <>
            {data.data.map((list: any) => (
              <Text key={list.id}>{list.name}</Text>
            ))}
          </>
        ) : (
          <Text fontWeight="light" textAlign={"center"}>
            There are currently no lists...
          </Text>
        )}
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
