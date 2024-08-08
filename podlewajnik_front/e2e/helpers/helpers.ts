import { Page, test as baseTest } from '@playwright/test';
import { loginData } from '@test_data/login.data';

const userLogin = loginData.userLogin;
const userPassword = loginData.userPassword;

export function generateRandomString(minLength: number, maxLength: number) {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const length =
    Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
