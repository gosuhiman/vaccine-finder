import { DrugQueryData } from "../clients/gdzie-po-lek/gdzie-po-lek-api-client";

export const VACCINES: { [key: string]: DrugQueryData; } = {
  Vaxigrip: { productId: 95340, pvId: 237434 },
  Influvac: { productId: 95682, pvId: 240164 },
  Coldrex: { productId: 18983, pvId: 11931 } // used sometimes for testing purposes
};
