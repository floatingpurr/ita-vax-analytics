import { loadCSV } from 'arquero';

export const raw = await loadCSV(
  'https://raw.githubusercontent.com/italia/covid19-opendata-vaccini/master/dati/somministrazioni-vaccini-latest.csv'
);
