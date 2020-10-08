import axios, { AxiosInstance } from 'axios';

export interface DrugQueryData {
  productId: number;
  pvId: number;
  name: string;
}

export interface DrugResponseData {
  name: string;
  available: boolean;
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

export class GdziePoLekApiClient {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: 'https://www.gdziepolek.pl',
      timeout: 5000
    });
  }

  public async checkOne(drugQueryData: DrugQueryData): Promise<DrugResponseData> {
    const data: SearchOfferJsonRequestData = {
      productId: drugQueryData.productId,
      pvId: drugQueryData.pvId,
      Loc: 'Mazowieckie',
      Lat: 51.88666357770388,
      Lng: 20.85617065429688,
      Rad: 115387,
    };

    const response = await this.instance.post<SearchOfferJsonResponseData>('/Search/OffersJson', data);

    return {
      name: drugQueryData.name,
      available: !response.data?.searchElsewhere
    };
  };

  public async checkForDrugs(drugs: DrugQueryData[]): Promise<DrugResponseData[]> {
    return Promise.all(drugs.map(this.checkOne.bind(this)));
  };
}
