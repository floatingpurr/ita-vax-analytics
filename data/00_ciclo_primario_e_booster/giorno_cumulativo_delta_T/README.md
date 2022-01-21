# Report dato giornaliero cumulativo con distribuzioni temporali

Questa classe di report rappresenta il **dato giornaliero cumulativo** per ogni data _d_ relativo ai cicli di vaccinazione primaria e dosi booster. Inoltre, per ogni riga viene calcolata la distribuzione temporale `delta_T` di vaccinazioni e booster effettuate degli ultimi _T_ giorni. Questo dato serve per stimare l'invecchiamento della copertura vaccinale nel tempo.

## Fatti

* `cum_vaccinazioni`: cicli vaccinali completati totali **alla** data _d_
* `cum_booster`: dosi di richiamo effettuate totali **alla** data _d_

## Dimensioni

* `data_somministrazione` (i.e., data _d_)
* `area`
* `fascia_anagrafica`
* `delta_T` (_giorni_): è un descrittore che, unitamente a `cum_vaccinazioni` e `cum_vaccinazioni`, permette di quantificare le vaccinazioni o i booster cumulativi effettuati entro gli ultimi _T_ giorni. Il valore `-1` indica il dato cumulativo totale da inizio campagna.

### File

* [`time.csv`](time.csv): vaccini e booster totali alla data _d_
  * dimensioni = [`data_somministrazione`]
* [`age.csv`](age.csv): vaccini e booster per fascia d'età totali alla data _d_
  * dimensioni = [`data_somministrazione`, `fascia_anagrafica`]
* [`area.csv`](area.csv): vaccini e booster totali per regione, totali alla data _d_
  * dimensioni = [`data_somministrazione`, `area`]
* [`areaAge.csv`](areaAge.csv): vaccini e booster totali per regione e per fascia d'età, totali alla data _d_
  * dimensioni = [`data_somministrazione`, `area`, `fascia_anagrafica`]

## Schema delle tabelle

| [ _...dimensione_ ] | vaccinazioni | booster |cum_vaccinazioni | cum_booster |
|---------------------|--------------|---------|-----------------|-------------|
| string              | number       | number  |number           | number      |

### Esempio

[`areaAge.csv`](areaAge.csv):

|data_somministrazione|area|fascia_anagrafica|delta_T|cum_vaccinazioni|cum_booster|
|---------------------|----|-----------------|-------|----------------|-----------|
|2021-04-25           |BAS |12-19            |-1     |35              |0          |
|2021-04-25           |BAS |12-19            |30     |27              |0          |
|2021-04-25           |BAS |12-19            |90     |35              |0          |
|2021-04-25           |BAS |12-19            |120    |35              |0          |
|2021-04-25           |BAS |12-19            |180    |35              |0          |
|2021-04-25           |BAS |12-19            |270    |35              |0          |
|2021-04-25           |BAS |20-29            |-1     |1322            |0          |
|2021-04-25           |BAS |20-29            |30     |199             |0          |
|2021-04-25           |BAS |20-29            |90     |1189            |0          |
|2021-04-25           |BAS |20-29            |120    |1322            |0          |
|2021-04-25           |BAS |20-29            |180    |1322            |0          |
|2021-04-25           |BAS |20-29            |270    |1322            |0          |
