import axios from 'axios';

export interface DrugQueryData {
  productId: number;
  pvId: number;
  name: string;
}

export const DRUGS = {
  Vaxigrip: { productId: 95340, pvId: 237434, name: 'Vaxigrip' }, // vaccine
  Influvac: { productId: 95682, pvId: 240164, name: 'Influvac' }, // vaccine
  Coldrex: { productId: 18983, pvId: 11931, name: 'Coldrex' }, // test product which should be always available
};

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

const instance = axios.create({
  baseURL: 'https://www.gdziepolek.pl',
  timeout: 1000
});

const check = async (drugQueryData: DrugQueryData): Promise<boolean> => {
  const data: SearchOfferJsonRequestData = {
    productId: drugQueryData.productId,
    pvId: drugQueryData.pvId,
    Loc: 'Mazowieckie',
    Lat: 51.88666357770388,
    Lng: 20.85617065429688,
    Rad: 115387,
  };

  const response = await instance.post<SearchOfferJsonResponseData>('/Search/OffersJson', data);
  return !response.data?.searchElsewhere;
};

check(DRUGS.Coldrex)
.then((data) => {
  console.log(data);
})
.catch((err) => {
  console.error(err);
});
