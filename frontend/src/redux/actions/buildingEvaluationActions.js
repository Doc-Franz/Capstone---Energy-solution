// metodo per calcolare la potenza termica che accetta l'array delle risposte del building evaluation come parametro
export const powerCalculation = (arrAnswers) => {
  // la potenza viene inizialmente settata a 30 W/m3
  let power = 30; // [W/m3]

  // salviamo tutti i parametri inseriti in building evaluation con il destructuring
  const [a1, a2, a3, a4, a5, a6] = arrAnswers; // a1 :superficie [m2], a2: regione di provenienza, a3, tipo di appartamento, a4: orientamento, a5: muratura, a6: isolamento

  // [W/m3] * [m2] -> [W/m]
  power *= parseInt(a1);

  // fattore di correzione in base alla zona climatica
  const [f2, deltaTemperature] = climateZone(a2);
  // fattore di correzione in base alla zona climatica -> [W/m] * [m] = [W]
  const [f3, height] = buildingType(a3);
  // fattore di correzione in base all'esposizione
  const f4 = exposition(a4);
  // fattore di correzione in base al tipo di muratura
  const f5 = wallingType(a5);
  // calcolo la potenza dispersa attraverso l'isolante in base allo spessore dell'isolamento
  const powerByInsulation = widthInsultation(a6, a1, height, deltaTemperature);

  power *= f2 * f3 * f4 * f5;
  power += powerByInsulation; // aggiungo la potenza dispersa dall'isolante

  return parseInt(power / 1000);
};

// metodo che gestisce il calcolo del fattore di correzione in base alla zona climatica
const climateZone = (region) => {
  let f2;
  let deltaTemperature; // si ipotizza un salto medio termico di temperatura tra interno ed esterno

  // Assegniamo i fattori di correzione in base alla zona climatica
  switch (region.toLowerCase()) {
    case "sicilia":
    case "sardegna":
      f2 = 0.9; // Zona A
      deltaTemperature = 10;
      break;
    case "campania":
    case "puglia":
    case "calabria":
      f2 = 1; // Zona B
      deltaTemperature = 12;
      break;
    case "lazio":
    case "liguria":
    case "toscana":
    case "emilia-romagna":
    case "abruzzo":
    case "molise":
    case "marche":
      f2 = 1.1; // Zona C
      deltaTemperature = 14;
      break;
    case "piemonte":
    case "valle d'aosta":
    case "lombardia":
    case "trentino-alto adige":
    case "veneto":
    case "friuli venezia giulia":
    case "umbria":
    case "basilicata":
      f2 = 1.2; // Zona D
      deltaTemperature = 16;
      break;
    default:
      f2 = 1;
      deltaTemperature = 14;
      break;
  }

  return [f2, deltaTemperature];
};

// fattore di correzione in base al tipo di edificio
const buildingType = (building) => {
  let f3;
  let height;

  switch (building) {
    case "1":
      height = 3;
      f3 = height * 1.2; // altezza edificio  3m
      break;
    case "2":
      height = 3;
      f3 = height * 1.1; // altezza edificio 3m
      break;
    case "3":
      height = 3;
      f3 = height * 1; // altezza edificio 3m
      break;
    case "4":
      height = 5;
      f3 = height * 1.3; // altezza edificio 5m
      break;
    default:
      height = 3;
      f3 = 1;
      break;
  }

  return [f3, height];
};

// fattore di correzione in base all'esposizione
const exposition = (coordinates) => {
  let f4;

  switch (coordinates) {
    case "1":
      f4 = 1; // NORD
      break;
    case "2":
      f4 = 0.7; // SUD
      break;
    case "3":
      f4 = 0.8; // OVEST
      break;
    case "4":
      f4 = 0.9; // EST
      break;

    default:
      f4 = 1;
      break;
  }

  return f4;
};

// fattore di correzione in base al tipo di muratura
const wallingType = (wall) => {
  let f5;

  switch (wall) {
    case "1":
      f5 = 1; // Mattoni pieni
      break;
    case "2":
      f5 = 0.9; // Mattoni forati
      break;
    case "3":
      f5 = 1.2; // Calcestruzzo
      break;
    case "4":
      f5 = 1.1; // Prefabbricato
      break;
    default:
      f5 = 1;
      break;
  }

  return f5;
};

// fattore di correzione in base allo spessore dell'isolamento -> potenza dispersa attraverso le pareti
const widthInsultation = (insulation, area, height, deltaTemperature) => {
  let powerByInsulation;
  let wallArea = Math.sqrt(area) * 4 * height; // calcolo l'area delle pareti assumendo che il locale sia quadrato
  const insulatingTransmittance = 0.04; // si assume una conducibilità termica media dell'isolante di 0,04 W/mK

  if (parseInt(insulation) != 0) {
    powerByInsulation = (insulatingTransmittance / (parseInt(insulation) / 100)) * wallArea * deltaTemperature; // [W/mK] / [m] -> [W/m2K] * [m2] -> [W/K] * [K] -> [W]
  } else {
    // ❗❗❗ nel caso in cui non avessi isolamento faccio il calcolo della potenza dispersa come se l'isolamento fosse di 1 cm
    powerByInsulation = (insulatingTransmittance / 0.01) * wallArea * deltaTemperature;
  }

  return powerByInsulation;
};
