import cheerio from 'cheerio';

export interface Pharmacy {
  name: string;
  address: string;
}

export class GdziePoLekHtmlParser {
  parsePharmaciesList(pharmaciesListHtml: string): Pharmacy[] {
    const $ = cheerio.load(pharmaciesListHtml);
    return $('#pharmacies li.offer').map((i, el) => {
      const li = $(el);
      return {
        name: li.find('p.pharmacy').text().trim(),
        address: li.find('span.address').text().trim()
      };
    }).get();
  }
}
