# Report cicli primari e booster

I report sono suddivisi in **cartelle** contenenti **serie temporali** di natura differente:

* [`sommario`](sommario):
  * sommario (aggregazione generale),
* [`giorno`](giorno):
  * dato giornaliero,
* [`giorno_cumulativo`](giorno_cumulativo):
  * dato giornaliero cumulativo,
* [`giorno_cumulativo_delta_T`](giorno_cumulativo_delta_T):
  * dato giornaliero cumulativo con distribuzioni temporali.

Ognuno di questi report contiene statistiche su due **fatti** principali:

* cicli vaccinali primari completati
* dosi booster

I dati sono elaborati per diverse combinazioni di **dimensioni** di analisi:

* `data_somministrazione`,
* `area`,
* `fascia_anagrafica`,

Ogni combinazione è contenuta nel rispettivo file.
