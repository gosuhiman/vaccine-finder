import { config } from 'dotenv';

config();

import { VaccineFinder } from '../vaccine-finder';
import { VACCINES } from '../fixtures/vaccines';

const vaccineFinder = new VaccineFinder([VACCINES.Vaxigrip, VACCINES.Influvac]);
vaccineFinder.run()
.then(() => {
  console.log('Done');
})
.catch((err: any) => {
  console.error(err);
});
