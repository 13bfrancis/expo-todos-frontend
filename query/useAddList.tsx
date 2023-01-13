import { API_URL } from "@env";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { useAuth0 } from "react-native-auth0";
import { List } from "../models/list";

export const useAddList = () => {
  const queryClient = useQueryClient();

  const { getCredentials } = useAuth0();
  return useMutation({
    mutationFn: async (listName: string) => {
      const creds = await getCredentials();

      await axios.post<List, AxiosResponse<List>, Partial<List>>(
        `${API_URL}/list`,
        {
          name: listName,
        },
        {
          headers: {
            Authorization: `Bearer ${creds.accessToken}`,
          },
        }
      );
    },
    onSuccess: () => {
      console.log("testing 123");
      queryClient.invalidateQueries();
    },
  });
};
