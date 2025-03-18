// metodo per calcolare la potenza termica che accetta l'array delle risposte del building evaluation come parametro
export const powerCalculation = (arrAnswers) => {
  // la potenza viene inizialmente settata a 30 W/m3
  const power = 30; // [W/m3]

  // salviamo tutti i parametri inseriti in building evaluation con il destructuring
  const [a1, a2, a3, a4, a5, a6] = arrAnswers; // a1 :superficie [m2], a2: regione di provenienza, a3, tipo di appartamento, a4: orientamento, a5: muratura, a6: isolamento

  // [W/m3] * [m2] -> [W/m]
  power * parseInt(a1);

  // fattore di correzione in base alla zona climatica
  const f1 = climateZone(a2);

  return power;
};

// metodo che gestisce il calcolo del fattore di correzione in base alla zona climatica
const climateZone = (region) => {
  let f1;

  // Assegniamo i fattori di correzione in base alla zona climatica
  switch (region.toLowerCase()) {
    case "sicilia":
    case "sardegna":
      f1 = 0.9; // Zona A
      break;
    case "campania":
    case "puglia":
    case "calabria":
      f1 = 1; // Zona B
      break;
    case "lazio":
    case "liguria":
    case "toscana":
    case "emilia-romagna":
    case "abruzzo":
    case "molise":
    case "marche":
      f1 = 1.1; // Zona C
      break;
    case "piemonte":
    case "valle d'aosta":
    case "lombardia":
    case "trentino-alto adige":
    case "veneto":
    case "friuli venezia giulia":
    case "umbria":
    case "basilicata":
      f1 = 1.2; // Zona D
      break;
    default:
      f1 = 1;
      break;
  }

  return f1;
};
