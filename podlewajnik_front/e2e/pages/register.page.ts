import { Page } from '@playwright/test';


export const selectors = {
    name: 'Name:',
    email: 'Email:',
    login: 'Login:',
    password: 'Password:',
    confirmPassword: 'Confirm Password:',
    confirmButton: 'Confirm',
  };
  

  export const errorSelectors = {
    name: '.form-group:nth-child(1) .error',
    email: '.form-group:nth-child(2) .error',
    login: '.form-group:nth-child(3) .error',
    password: '.form-group:nth-child(4) .error',
    confirmPassword: '.form-group:nth-child(5) .error',
    passwordErrorAdjacent: '#registerPassword + .error',
  };
  

  export const errorMessages = {
    passwordMismatch: 'Passwords do not match.',
    passwordLength: 'Password must be between 6 and 20 characters.',
    invalidEmail: 'Invalid email address.',
  };