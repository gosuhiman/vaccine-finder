import { config } from 'dotenv';

config();

import { VaccineFinder } from './vaccine-finder';
import { VACCINES } from './fixtures/vaccines';

exports.handler = async () => {
  const vaccineFinder = new VaccineFinder([VACCINES.Vaxigrip, VACCINES.Influvac]);
  await vaccineFinder.run()
  .then(() => {
    console.log('Done');
  })
  .catch((err) => {
    console.error(err);
  });
};
