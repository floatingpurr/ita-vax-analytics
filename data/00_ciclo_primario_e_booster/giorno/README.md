# Report dato giornaliero

Questa classe di report rappresenta il **dato giornaliero** per ogni data _d_ relativo ai cicli di vaccinazione primaria e dosi booster.

## Fatti

* `vaccinazioni`: cicli vaccinali completati nella data _d_
* `booster`: ddosi di richiamo effettuate nella data _d_

## Dimensioni

* `data_somministrazione` (i.e., data _d_)
* `area`
* `fascia_anagrafica`

### File

* [`time.csv`](time.csv): vaccini e booster nella data _d_
  * dimensioni = [`data_somministrazione`]
* [`age.csv`](age.csv): vaccini e booster per fascia d'età nella data _d_
  * dimensioni = [`data_somministrazione`, `fascia_anagrafica`]
* [`area.csv`](area.csv): vaccini e booster totali per regione, nella data _d_
  * dimensioni = [`data_somministrazione`, `area`]
* [`areaAge.csv`](areaAge.csv): vaccini e booster totali per regione e per fascia d'età, nella data _d_
  * dimensioni = [`data_somministrazione`, `area`, `fascia_anagrafica`]

## Schema delle tabelle

| [ _...dimensione_ ] | vaccinazioni | booster |
|---------------------|--------------|---------|
| string              | number       | number  |

### Esempio

[`areaAge.csv`](areaAge.csv):

|data_somministrazione|area|fascia_anagrafica|vaccinazioni|booster|
|---------------------|----|-----------------|------------|-------|
|2021-04-25           |BAS |05-11            |0           |0      |
|2021-04-25           |BAS |12-19            |0           |0      |
|2021-04-25           |BAS |20-29            |2           |0      |
|2021-04-25           |BAS |30-39            |4           |0      |
|2021-04-25           |BAS |40-49            |8           |0      |
|2021-04-25           |BAS |50-59            |6           |0      |
|2021-04-25           |BAS |60-69            |23          |0      |
|2021-04-25           |BAS |70-79            |11          |0      |
|2021-04-25           |BAS |80-89            |14          |0      |
|2021-04-25           |BAS |90+              |15          |0      |
|2021-04-25           |CAL |05-11            |0           |0      |
|2021-04-25           |CAL |12-19            |5           |0      |
|2021-04-25           |CAL |20-29            |37          |0      |
|2021-04-25           |CAL |30-39            |49          |0      |
|2021-04-25           |CAL |40-49            |58          |0      |
|2021-04-25           |CAL |50-59            |81          |0      |
|2021-04-25           |CAL |60-69            |164         |0      |
|2021-04-25           |CAL |70-79            |162         |0      |
|2021-04-25           |CAL |80-89            |404         |0      |
|2021-04-25           |CAL |90+              |134         |0      |
