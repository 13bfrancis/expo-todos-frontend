import {
  Box,
  Button,
  Fab,
  FlatList,
  Heading,
  HStack,
  Icon,
  IconButton,
  Input,
  Modal,
  Pressable,
  Spinner,
  Text,
  VStack,
} from "native-base";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { useGetLists } from "../query/useGetLists";
import { useAddList } from "../query/useAddList";

export const Home = ({}: any) => {
  const { data, status } = useGetLists();

  const mutation = useAddList();

  const [listName, setListName] = useState("");

  const [modalVisible, setModalVisible] = useState(false);

  console.log("mutation", mutation.status);
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
          <Modal.Header>Add List</Modal.Header>
          <Modal.Body>
            <Input
              variant="underlined"
              placeholder="New List"
              fontSize={"lg"}
              borderBottomWidth={"2"}
              colorScheme="blue"
              value={listName}
              isRequired
              onChangeText={(text) => setListName(text)}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button
              colorScheme={"blue"}
              borderRadius={"md"}
              onPress={() => {
                mutation.mutate(listName);
                setModalVisible(false);
                setListName("");
              }}
            >
              Add List
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      <VStack px="8" flex={1}>
        <Heading textAlign={"center"}>ToDo Lists</Heading>
        {data?.data && !mutation.isLoading ? (
          <FlatList
            mt="4"
            mb="4"
            renderItem={({ item }) => (
              <Pressable onPress={() => console.log("pressed")}>
                <HStack
                  alignItems={"center"}
                  background={"warmGray.100"}
                  py="2"
                  borderRadius={"sm"}
                  mb="2"
                  shadow={"1"}
                >
                  <IconButton
                    alignItems={"center"}
                    icon={
                      <Icon
                        as={Ionicons}
                        name="trash-bin-outline"
                        color="red.500"
                      />
                    }
                  />
                  <Text flex={1} fontSize={"lg"}>
                    {item.name}
                  </Text>
                </HStack>
              </Pressable>
            )}
            data={data.data}
            keyExtractor={(item) => item.id}
          />
        ) : (
          <VStack alignItems={"center"} justifyContent="center" flex={1}>
            <HStack space={2}>
              <Spinner colorScheme={"blue"} />
              <Heading color={"primary.500"}>Loading</Heading>
            </HStack>
          </VStack>
        )}
      </VStack>
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
