import { escape, from, op, rolling, table } from 'arquero';
import { writeFile } from 'fs';

// dump a table to a file passing options
export const dump2file = (aqTable, filename, options = {}) => {
  writeFile(filename, aqTable.toCSV(options), (err) => {
    if (err) {
      console.error(err);
      return;
    }
    //file written successfully
  });
};

// get the overall snapshot given a table and a set of dimensions
export const getSnapshot = (aqTable, dimensions) =>
  aqTable
    .groupby(dimensions)
    .rollup({
      cum_vaccinazioni: (d) => op.sum(d.vaccinazioni),
      cum_booster: (d) => op.sum(d.dose_addizionale_booster)
    })
    .orderby(dimensions)
    // Order table rows based on a set of column values. Subsequent operations sensitive to ordering
    //(such as window functions) will operate over sorted values. The resulting table provides an view
    // over the original data, without any copying. To create a table with sorted data copied to new data strucures,
    //call reify on the result of this method
    .reify();

// get a daily report given a table and a set of dimensions
export const getDaily = (aqTable, dimensions) =>
  aqTable
    .groupby(dimensions)
    .rollup({
      vaccinazioni: rolling((d) => op.sum(d.vaccinazioni)),
      booster: rolling((d) => op.sum(d.dose_addizionale_booster))
    })
    .orderby(dimensions)
    // Order table rows based on a set of column values. Subsequent operations sensitive to ordering
    //(such as window functions) will operate over sorted values. The resulting table provides an view
    // over the original data, without any copying. To create a table with sorted data copied to new data strucures,
    //call reify on the result of this method
    .reify();

// return the cumulative sum of a table
export const getCum = (aqTable, dimensions) => {
  // running totals (ie. intermediate values)
  const rt = new Map();
  return table(aqTable).derive(cumDeriver(dimensions, rt));
};

// // compute the time distribution of a cumulative sum table
// export const getCumT = (aqTable, dimensions) => {
//   // running totals (ie. intermediate values)
//   const rt = new Map(
//     aqTable
//       .objects()
//       .map((d) => [
//         d.data_somministrazione.toISOString() + getKey('', d, dimensions),
//         d
//       ])
//   );
//   return 1; //table(aqTable).derive(cumDeriver(dimensions, rt));
// };

// Get a key of a data point `d` for indentifying the record given a set of `dimensions`
export const getKey = (prefix, d, dimensions) => {
  let key = prefix;
  dimensions = dimensions.filter((d) => d !== 'data_somministrazione');
  dimensions.forEach((v) => {
    key += d[v];
  });
  return key;
};

const cumValue = (fact, d, map, key) => {
  const intermediateValue = map.get(key);
  const sum =
    intermediateValue === undefined ? d[fact] : intermediateValue + d[fact];
  map.set(key, sum);
  return sum;
};

const cumDeriver = (dimensions, map) => ({
  cum_vaccinazioni: escape((d) => {
    const fact = 'vaccinazioni';
    const dim = getKey(fact, d, dimensions);
    return cumValue(fact, d, map, dim);
  }),
  cum_booster: escape((d) => {
    const fact = 'booster';
    const dim = getKey(fact, d, dimensions);
    return cumValue(fact, d, map, dim);
  })
});

// get data point in the past (if any)
const getDataPoint = (map, dimensions, currentDataPoint, delta) => {
  const pastDay = new Date(currentDataPoint.data_somministrazione);
  pastDay.setUTCDate(pastDay.getUTCDate() - delta);
  return map.get(getKey(pastDay.toUTCString(), currentDataPoint, dimensions));
};

// return cumulative data with time distributions
export const getCumT = (aqTable, dimensions, deltas) => {
  // running totals (ie. intermediate values)
  const rt = new Map(
    aqTable
      .objects()
      .map((d) => [
        getKey(d.data_somministrazione.toUTCString(), d, dimensions),
        d
      ])
  );

  // add the delta column
  aqTable = aqTable.derive({ delta_T: () => -1 });

  // scan aqTable and get time distributions (rows)
  const rows = [];
  for (const row of aqTable) {
    deltas.forEach((d) => {
      const pastDataPoint = getDataPoint(rt, dimensions, row, d);
      const newRow = Object.assign({}, row);

      newRow.delta_T = d;
      if (pastDataPoint !== undefined) {
        newRow.cum_vaccinazioni -= pastDataPoint.cum_vaccinazioni;
        newRow.cum_booster -= pastDataPoint.cum_booster;
      }
      rows.push(newRow);
    });
  }
  // merge time distributions
  return aqTable
    .concat(from(rows))
    .relocate(['delta_T'], { before: 'vaccinazioni' })
    .orderby([...dimensions, 'delta_T'])
    .reify();
};
