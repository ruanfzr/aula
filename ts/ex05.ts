export {};

type LeituraClima = [cidade: string, temperatura: number];

const leituras: LeituraClima[] = [
  ['Porto Velho', 34],
  ['Curitiba', 12],
  ['Manaus', 31],
  ['Porto Alegre', 9],
  ['Natal', 29]
];

function extremos(temps: number[]): [number, number] {
  const minima = Math.min(...temps);
  const maxima = Math.max(...temps);
  return [minima, maxima];
}

for (const [cidade, temp] of leituras) {
  console.log(`${cidade}: ${temp}°C`);
}

const tempsArray = leituras.map(l => l[1]);
const [min, max] = extremos(tempsArray);
const media = tempsArray.reduce((a, b) => a + b, 0) / tempsArray.length;

const contato1: [string, string, string?] = ['Maria Imprensa', '(69) 91111-2222', 'maria@imprensa.com'];
const contato2: [string, string, string?] = ['João Rádio', '(69) 93333-4444'];

const historicoSemanal: [string, ...number[]] = ['Porto Velho', 32, 33, 34, 35, 31, 30, 32];

// Forçando o tipo para garantir que o TypeScript entenda que o slice retorna apenas números
const valoresSemanal = historicoSemanal.slice(1) as number[];
const mediaSemanal = valoresSemanal.reduce((a, b) => a + b, 0) / valoresSemanal.length;

const capitalOficial: readonly [string, string] = ['RO', 'Porto Velho'];
// capitalOficial[0] = 'AC'; // Erro correto: propriedade somente leitura

console.log(`Mínima: ${min}°C | Máxima: ${max}°C | Média: ${media.toFixed(1)}°C`);
console.log(`Média Semanal (Porto Velho): ${mediaSemanal.toFixed(1)}°C`);