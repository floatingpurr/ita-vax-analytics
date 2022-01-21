import { escape } from 'arquero';

import { filler, meta, update, vaxxed } from './helpers.js';

export const preprocess = (rawData) => {
  // Add the actual vaxxed column
  const data = rawData.derive({
    vaccinazioni: vaxxed,
    id: escape(
      (d) =>
        d.data_somministrazione.toDateString() + d.area + d.fascia_anagrafica
    )
  });

  // Compute table metadata
  const metadata = meta(data);

  const dataPattern = filler(metadata);

  return dataPattern.join_full(data, 'id', update(dataPattern, data));
};
