import { from, loadCSV } from 'arquero';

// data in the new format
const new_raw = await loadCSV(
  'https://raw.githubusercontent.com/italia/covid19-opendata-vaccini/master/dati/somministrazioni-vaccini-latest.csv'
);

// get the format map
const rawMap = await loadCSV(
  'https://gist.githubusercontent.com/aborruso/bc09bdba5a7e0413bc87c3d3d8978ee2/raw/374d4df5e53a9b4cc57a1ddcb7c9675fe85a2589/opendata-vaccini_changelog_2020-05-20.csv'
);
// set the map in map (pun intended)
const map = new Map(
  rawMap.objects().map((d) => {
    return [d.new_name, d.old_name];
  })
);

export const raw = from(
  new_raw.objects().map((d) => {
    const keys = Object.keys(d);
    const dd = {};
    keys.forEach((k) => {
      const old_key = map.get(k) ? map.get(k) : k;
      dd[old_key] = d[k];
    });
    return dd;
  })
);
