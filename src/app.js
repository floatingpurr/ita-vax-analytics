import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';

import { raw } from './data.js';
import {
  dump2file,
  getCum,
  getCumT,
  getDaily,
  getSnapshot
} from './helpers.js';
import { preprocess } from './prep/preprocess.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataFolder = join(
  resolve(__dirname, '..'),
  'data',
  '00_ciclo_primario_e_booster'
);

/*
 * Reporting dimensions
 */
const timeSeries = {
  time: ['data_somministrazione'],
  area: ['data_somministrazione', 'area'],
  age: ['data_somministrazione', 'fascia_anagrafica'],
  areaAge: ['data_somministrazione', 'area', 'fascia_anagrafica']
};

/*
 * Reporting time distributions
 */
const deltas = [1, 3, 4, 6, 9].map((d) => d * 30);

/*
 * Data preprocessing:
 * - add actual vaxxed
 * - add missing rows
 */
const data = preprocess(raw);

// Compute reports
for (const [key, value] of Object.entries(timeSeries)) {
  console.log(`${key}: ${value}`);
  // current snapshots
  const snapshot = getSnapshot(
    data,
    value.filter((d) => d !== 'data_somministrazione')
  );
  // daily data
  const daily = getDaily(data, value);
  // daily sums
  const cum = getCum(daily, value);
  // daily sums + time distributions
  const cumT = getCumT(cum, value, deltas);
  // dump to files
  dump2file(snapshot, join(dataFolder, 'sommario', `${key}.csv`));
  dump2file(daily, join(dataFolder, 'giorno', `${key}.csv`));
  dump2file(cum, join(dataFolder, 'giorno_cumulativo', `${key}.csv`));
  dump2file(cumT, join(dataFolder, 'giorno_cumulativo_delta_T', `${key}.csv`), {
    columns: cumT
      .columnNames()
      .filter((d) => d !== 'vaccinazioni' && d !== 'booster')
  });
}

console.log('🎉 Reporting completed.');
