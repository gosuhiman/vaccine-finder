import { GdziePoLekApiClient } from '../api-client';

describe('GdziePoLekApiClient', () => {
  test('Coldrex should be available', async () => {
    const client = new GdziePoLekApiClient();
    const result = await client.checkOne({
      productId: 18983,
      pvId: 11931,
      name: 'Coldrex'
    });

    expect(result).toStrictEqual({
      name: 'Coldrex',
      available: true
    });
  });
});
