# Report generali di sommario

Questa classe di report rappresenta i **dati aggregati al giorno corrente**. Difatti, l'asse temporale viene condensato in un'unica riga riassuntiva per ogni combinazione di dimensione di analisi.

## Fatti

* `cum_vaccinazioni`: dato cumulativo dei cicli vaccinali completati
* `cum_booster`: dato cumulativo delle dosi di richiamo

## Dimensioni

* `area`,
* `fascia_anagrafica`,

### File

* [`time.csv`](time.csv): vaccini e booster totali
  * dimensioni = [∅]
* [`age.csv`](age.csv): vaccini e booster totali per fascia d'età
  * dimensioni = [`fascia_anagrafica`]
* [`area.csv`](area.csv): vaccini e booster totali per regione
  * dimensioni = [`area`]
* [`areaAge.csv`](areaAge.csv): vaccini e booster totali per regione e per fascia d'età
  * dimensioni = [`area`, `fascia_anagrafica`]

## Schema delle tabelle

| [ _...dimensione_ ] | cum_vaccinazioni | cum_booster |
|---------------------|------------------|-------------|
| string              | number           | number      |

### Esempio

[`areaAge.csv`](areaAge.csv):

| area | fascia_anagrafica | cum_vaccinazioni | cum_booster |
|------|-------------------|------------------|-------------|
| ABR  | 05-11             | 3619             | 0           |
| ABR  | 12-19             | 73953            | 14724       |
| ABR  | 20-29             | 112135           | 49686       |
| ABR  | 30-39             | 121306           | 56159       |
| ABR  | 40-49             | 155151           | 88313       |
| ABR  | 50-59             | 179858           | 121182      |
| ABR  | 60-69             | 154717           | 117482      |
| ABR  | 70-79             | 124914           | 100773      |
| ABR  | 80-89             | 79067            | 67632       |
| ABR  | 90+               | 19295            | 14558       |
