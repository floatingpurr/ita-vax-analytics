# Report dato giornaliero cumulativo

Questa classe di report rappresenta:

* il **dato giornaliero** per ogni data _d_,
* il **dato giornaliero cumulativo** per ogni data _d_,

relativi ai cicli di vaccinazione primaria e dosi booster.

## Fatti

* `vaccinazioni`: cicli vaccinali completati **nella** data _d_
* `booster`: dosi di richiamo effettuate **nella** data _d_
* `cum_vaccinazioni`: cicli vaccinali completati totali **alla** data _d_
* `cum_booster`: dosi di richiamo effettuate totali **alla** data _d_

## Dimensioni

* `data_somministrazione` (i.e., data _d_)
* `area`
* `fascia_anagrafica`

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

|data_somministrazione|area|fascia_anagrafica|vaccinazioni|booster|cum_vaccinazioni|cum_booster|
|---------------------|----|-----------------|------------|-------|----------------|-----------|
|2021-04-25           |BAS |05-11            |0           |0      |0               |0          |
|2021-04-25           |BAS |12-19            |0           |0      |35              |0          |
|2021-04-25           |BAS |20-29            |2           |0      |1322            |0          |
|2021-04-25           |BAS |30-39            |4           |0      |3022            |0          |
|2021-04-25           |BAS |40-49            |8           |0      |4219            |0          |
|2021-04-25           |BAS |50-59            |6           |0      |5213            |0          |
|2021-04-25           |BAS |60-69            |23          |0      |4178            |0          |
|2021-04-25           |BAS |70-79            |11          |0      |1247            |0          |
|2021-04-25           |BAS |80-89            |14          |0      |28866           |0          |
|2021-04-25           |BAS |90+              |15          |0      |6785            |0          |
|2021-04-25           |CAL |05-11            |0           |0      |0               |0          |
|2021-04-25           |CAL |12-19            |5           |0      |270             |0          |
|2021-04-25           |CAL |20-29            |37          |0      |6124            |0          |
|2021-04-25           |CAL |30-39            |49          |0      |11861           |0          |
|2021-04-25           |CAL |40-49            |58          |0      |14685           |0          |
|2021-04-25           |CAL |50-59            |81          |0      |20401           |0          |
|2021-04-25           |CAL |60-69            |164         |0      |23082           |0          |
|2021-04-25           |CAL |70-79            |162         |0      |14526           |0          |
|2021-04-25           |CAL |80-89            |404         |0      |56571           |0          |
|2021-04-25           |CAL |90+              |134         |0      |11259           |0          |
