import { GdziePoLekApiClient } from '../clients/gdzie-po-lek/gdzie-po-lek-api-client';

describe('GdziePoLekApiClient', () => {
  test('Coldrex should be available', async () => {
    const client = new GdziePoLekApiClient();
    const result = await client.checkOne({
      productId: 18983,
      pvId: 11931
    });

    result.pharmacies = [];

    expect(result).toStrictEqual({
      name: 'Coldrex Maxgrip C',
      available: true,
      pharmacies: [],
      url: 'https://www.gdziepolek.pl/produkty/18983/coldrex-maxgrip-c-tabletki/apteki/w-warszawie?pvId=11931'
    });
  });
});
