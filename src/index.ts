import { config } from 'dotenv';

config();

import { DrugQueryData } from './clients/gdzie-po-lek/gdzie-po-lek-api-client';
import { VaccineFinder } from './vaccine-finder';

const DRUGS: { [key: string]: DrugQueryData; } = {
  Vaxigrip: { productId: 95340, pvId: 237434 },
  Influvac: { productId: 95682, pvId: 240164 }
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
