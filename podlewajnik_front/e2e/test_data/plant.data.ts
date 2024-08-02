import { generateRandomString } from '@helpers/helpers';

const plantName = generateRandomString(6, 12);

export const plantData = {
    plantName: plantName,
    plantLocation: 'Living Room',
    plantDescription:'A lush green plant',
    plantWatering:'Mondays and Thursdays'
  };