import { DrugQueryData, GdziePoLekApiClient } from './clients/gdzie-po-lek/gdzie-po-lek-api-client';
import { WebAPICallResult, WebClient } from '@slack/web-api';
import * as env from 'env-var';

const SLACK_TOKEN = env.get('SLACK_TOKEN').required(true).asString();
const SLACK_CHANNEL = env.get('SLACK_CHANNEL').required(true).asString();

export class VaccineFinder {
  private client: GdziePoLekApiClient;
  private slackWebClient: WebClient;

  constructor(private readonly drugsToFind: DrugQueryData[]) {
    this.client = new GdziePoLekApiClient();
    this.slackWebClient = new WebClient(SLACK_TOKEN);
  }

  public async run(): Promise<void> {
    const drugs = await this.client.checkForDrugs(this.drugsToFind);
    for (const drug of drugs) {
      if (drug.available) {
        const message = `${drug.name} is available in ${drug.pharmacies.length} pharmacies. ${drug.url}`;
        console.log(message);
        await this.notify(message);
      } else {
        console.log(`${drug.name} is unavailable`);
      }
    }
  }

  public async notify(message: string): Promise<void> {
    const result: WebAPICallResult = await this.slackWebClient.chat.postMessage({
      text: message,
      channel: SLACK_CHANNEL,
    });

    if (!result.ok) {
      throw new Error(result.error);
    }
  }
}
