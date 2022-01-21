import { escape, op, table } from 'arquero';

// compute `table` metadata (ie. distinct values)
export const meta = (aqTable) => ({
  areas: aqTable
    .rollup({ values: op.array_agg_distinct('area') })
    .get('values', 0),
  days: dates(aqTable, 'data_somministrazione'),
  ageGroups: aqTable
    .rollup({ values: op.array_agg_distinct('fascia_anagrafica') })
    .get('values', 0)
});

// return min and max date from a table column
const dates = (aqTable, column) => {
  const minmax = aqTable.rollup({
    min: op.min(column),
    max: op.max(column)
  });
  const dates = getDatesBetweenDates(
    minmax.get('min', 0),
    minmax.get('max', 0)
  );
  return dates;
};

// return an array of dates between `startDate` and `endDate` (included)
const getDatesBetweenDates = (startDate, endDate) => {
  let dates = [];
  //to avoid modifying the original date
  const theDate = new Date(startDate);
  while (theDate <= endDate) {
    dates.push(new Date(theDate));
    theDate.setUTCDate(theDate.getUTCDate() + 1);
  }
  return dates;
};

// returns the number of vaxxed people given a data point `d`
export const vaxxed = (d) => {
  const shots = d.fornitore === 'Janssen' ? d.prima_dose : d.seconda_dose;
  return shots + d.pregressa_infezione;
};

// return an arquero table with a base pattern of the expected values in raw data
export const filler = (metadata) =>
  table({ data_somministrazione: metadata.days })
    .cross(table({ area: metadata.areas }))
    .cross(table({ fascia_anagrafica: metadata.ageGroups }))
    .cross(table({ vaccinazioni: [0] }))
    .cross(table({ dose_addizionale_booster: [0] }))
    .derive({
      id: escape(
        (d) =>
          d.data_somministrazione.toGMTString() + d.area + d.fascia_anagrafica
      )
    });

// generate a join value specification that performs updates
// if a column is not defined in other, simply return the primary value
// if the secondary value is defined, return it
export const update = (aqTable, other) => {
  return aqTable.columnNames().reduce((values, name) => {
    const f = `[${JSON.stringify(name)}]`;
    values[name] =
      other.columnIndex(name) >= 0
        ? `(a, b) => b${f} === undefined ? a${f} : b${f}`
        : `a => a${f}`;
    return values;
  }, {});
};
