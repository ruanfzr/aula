export {};

function formatarCodigo(c: number | string): string {
  if (typeof c === 'number') {
    return `CLI-${String(c).padStart(4, '0')}`;
  }
  return c;
}

type TamanhoCamiseta = 'P' | 'M' | 'G' | 'GG';
const minhaCamiseta: TamanhoCamiseta = 'M';
// const errada: TamanhoCamiseta = 'XG'; 
// Type '"XG"' is not assignable to type 'TamanhoCamiseta'.

function calcularFrete(regiao: 'norte' | 'nordeste' | 'centro-oeste' | 'sudeste' | 'sul'): number {
  const fretes = { norte: 25, nordeste: 20, 'centro-oeste': 18, sudeste: 12, sul: 15 };
  return fretes[regiao];
}

const complemento: string | null = null;

function limparTelefone(tel: string | number): string {
  return String(tel).replace(/\D/g, '');
}

// Reflexão: const r = 'sul' infere um tipo literal ('sul'), enquanto let r2 = 'sul' infere o tipo amplo (string), que não satisfaz a união estrita exigida por calcularFrete a menos que seja tipado como const ou com o tipo literal correspondente.

console.log(`Cliente: ${formatarCodigo(42)} | Camiseta: ${minhaCamiseta}`);
console.log(`Entrega: Rua das Flores, 100 - ${complemento ?? '(sem complemento)'}`);
console.log(`Frete para o sul: R$ ${calcularFrete('sul').toFixed(2)}`);
console.log(`Telefone: ${limparTelefone('(69) 99999-0000')}`);