import axios, { AxiosInstance } from 'axios';
import { GdziePoLekHtmlParser, Pharmacy } from "./gdzie-po-lek-html-parser";

export interface DrugQueryData {
  productId: number;
  pvId: number;
}

export interface DrugResponseData {
  name: string;
  available: boolean;
  url: string;
  pharmacies: Pharmacy[];
}

export interface SearchOfferJsonRequestData {
  productId: number;
  pvId: number;
  Loc: string;
  Lat: number;
  Lng: number;
  Rad: number;
}

export interface SearchOfferJsonResponseData {
  url: string;
  title: string;
  LocationName: string;
  ProductName: string;
  PanelProductInfo: string;
  facilitiesList: string;
  pharmaciesList: string;
  pharmaciesSidebar: string;
  pvId: number;
  searchElsewhere: string;
}

const BASE_URL = 'https://www.gdziepolek.pl';

export class GdziePoLekApiClient {
  private instance: AxiosInstance;
  private htmlParser: GdziePoLekHtmlParser;

  constructor() {
    this.instance = axios.create({
      baseURL: BASE_URL,
      timeout: 5000
    });

    this.htmlParser = new GdziePoLekHtmlParser();
  }

  public async checkOne(drugQueryData: DrugQueryData): Promise<DrugResponseData> {
    const data: SearchOfferJsonRequestData = {
      productId: drugQueryData.productId,
      pvId: drugQueryData.pvId,
      Loc: 'Mazowieckie',
      Lat: 51.88666357770388,
      Lng: 20.85617065429688,
      Rad: 115387
    };

    const response = await this.instance.post<SearchOfferJsonResponseData>('/Search/OffersJson', data);
    const pharmacies = this.htmlParser.parsePharmaciesList(response.data?.pharmaciesList);

    return {
      name: response.data?.ProductName,
      available: !response.data?.searchElsewhere,
      url: `${BASE_URL}${response.data?.url}`,
      pharmacies
    };
  };

  public async checkForDrugs(drugs: DrugQueryData[]): Promise<DrugResponseData[]> {
    return Promise.all(drugs.map(this.checkOne.bind(this)));
  };
}
