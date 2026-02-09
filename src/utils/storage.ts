import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'AUTH_TOKEN';
const USER_ID = 'USER_ID';

export const saveToken = async (token: string) => {
  return AsyncStorage.setItem(TOKEN_KEY, token);
};

export const getToken = async () => {
  return AsyncStorage.getItem(TOKEN_KEY);
};

export const clearToken = async () => {
  return AsyncStorage.removeItem(TOKEN_KEY);
};

export const saveUserId = async (userId: string) => {
  return AsyncStorage.setItem(USER_ID, userId);
};

export const getUserId = async () => {
  return AsyncStorage.getItem(USER_ID);
};
