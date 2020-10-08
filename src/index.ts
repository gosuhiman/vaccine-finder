import { config } from 'dotenv';

config();

import { DrugQueryData } from './api-client';
import { VaccineFinder } from './vaccine-finder';

const DRUGS: { [key: string]: DrugQueryData; } = {
  Vaxigrip: { productId: 95340, pvId: 237434, name: 'Vaxigrip' }, // vaccine
  Influvac: { productId: 95682, pvId: 240164, name: 'Influvac' }, // vaccine
  Coldrex: { productId: 18983, pvId: 11931, name: 'Coldrex' }, // test product which should be always available
};

exports.handler = async () => {
  const vaccineFinder = new VaccineFinder([DRUGS.Vaxigrip, DRUGS.Influvac]);
  await vaccineFinder.run()
  .then(() => {
    console.log('Done');
  })
  .catch((err) => {
    console.error(err);
  });
};
