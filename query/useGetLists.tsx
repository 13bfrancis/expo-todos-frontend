import { API_URL } from "@env";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAuth0 } from "react-native-auth0";
import { List } from "../models/list";

export const useGetLists = () => {
  const { getCredentials } = useAuth0();

  return useQuery({
    queryKey: ["lists"],
    queryFn: async () => {
      const creds = await getCredentials();

      return await axios.get<List[]>(`${API_URL}/list`, {
        headers: {
          Authorization: `Bearer ${creds.accessToken}`,
        },
      });
    },
  });
};
