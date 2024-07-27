import { generateRandomString } from '@helpers/helpers';

const randomLogin = generateRandomString(6, 12);



export const registerData = {
    userName: 'John',
    userMail: 'john@john.john',
    userLogin: randomLogin,
    userPassword: 'Test1234!',
    confirmPassword: 'Test1234!'
  };