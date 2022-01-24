# ita-vax-analytics

[![analytics](https://github.com/floatingpurr/ita-vax-analytics/actions/workflows/analytics.yml/badge.svg)](https://github.com/floatingpurr/ita-vax-analytics/actions/workflows/analytics.yml)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

Statistiche pre-calcolate e riusabili sui dati della campagna vaccinale anti Covid in Italia.

## Per cosa può essere utile questo repository?

>_TL;DR_: in questo repository, sono disponibili [elaborazioni statistiche pre-calcolate](data/00_ciclo_primario_e_booster) sui dati della campagna vaccinale anti Covid in Italia.

I dati sulla campagna vaccinale sono rilasciati ufficialmente su [questo repository](https://github.com/italia/covid19-opendata-vaccini). Questi dati necessitano di continue rielaborazioni che vengono spesso replicate in maniera equivalente in diversi progetti analitici e non.

Lo scopo di questo progetto è fornire un processamento dati centralizzato e aperto che possa fornire statistiche aggiornate, utili a costruire analisi e dashboard.

## Quali statistiche sono fornite?

Sono disponibili statistiche su due **fatti** principali:

* **cicli vaccinali primari completati**
* **dosi booster**

I dati sono elaborati per diverse combinazioni di **dimensioni** di analisi, che riguardano:

* `data_somministrazione`,
* `area`,
* `fascia_anagrafica`,

rispettivamente calcolate per **serie temporali** di natura differente:

* sommario (aggregazione generale),
* dato giornaliero,
* dato giornaliero cumulativo,
* dato giornaliero cumulativo con distribuzioni temporali.

Ulteriori dettagli sono presenti nei `README` all'intenro delle cartelle dei report.

## Licenza e modalità d’utilizzo

Il codice di questo progetto è rilasciato con licenza [MIT](LICENSE).

I dati originari processati in questo repository sono rilasciati con licenza **CC BY 4.0**. Le elaborazioni derivate in questo progetto sono quindi riusabili, riconoscendo alla fonte originaria il diritto di attribuzione ([qui](https://github.com/italia/covid19-opendata-vaccini/blob/master/LICENSE.md) ulteriori dettagli).

Le elaborazioni di questo repository sono rilasciate in **CC0** (i.e., _pubblico dominio_). E' comunque apprezzato un eventuale riferimento a questo repository.

## Crediti

* Autore: [Andrea Mignone](https://twitter.com/i_m_andrea)

* I dati originari provengono da questa fonte istituzionale (**CC BY 4.0**) : <https://github.com/italia/covid19-opendata-vaccini>

* Un ringraziamento a [Vittorio Nicoletta](https://twitter.com/vi__enne) per il _proofreading_ diffuso di questo progetto

## Esempi di utilizzo

🚧 _work in progress_

* [COVID-19 Vaccination Analytics](https://observablehq.com/@floatingpurr/italian-vaccination-analytics)
