import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'AUTH_TOKEN';

export const saveToken = async (token: string) => {
  return AsyncStorage.setItem(TOKEN_KEY, token);
};

export const getToken = async () => {
  return AsyncStorage.getItem(TOKEN_KEY);
};

export const clearToken = async () => {
  return AsyncStorage.removeItem(TOKEN_KEY);
};
