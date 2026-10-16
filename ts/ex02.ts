export {};

const nomeDigitado: string = '   maria   da silva  ';

function formatarNome(nome: string): string {
  const excecoes = ['da', 'de', 'do'];
  const palavras = nome.trim().split(/\s+/);
  
  return palavras
    .map((palavra, index) => {
      const pMinuscula = palavra.toLowerCase();
      if (index > 0 && excecoes.includes(pMinuscula)) {
        return pMinuscula;
      }
      return pMinuscula.charAt(0).toUpperCase() + pMinuscula.slice(1);
    })
    .join(' ');
}

const precoLido = Number('12.40');
const quantidadeLida = parseInt('3un');
const clienteFidelidade: boolean = true;

const subtotal = precoLido * quantidadeLida;
const desconto = clienteFidelidade ? subtotal * 0.05 : 0;
const totalFinal = subtotal - desconto;

const numCupom = String(42).padStart(6, '0');
const clienteFormatado = formatarNome(nomeDigitado);

const cupom = `CUPOM Nº ${numCupom}
Cliente: ${clienteFormatado}
Item: ${quantidadeLida} x R$ ${precoLido.toFixed(2)}
Subtotal: R$ ${subtotal.toFixed(2)}
Desconto fidelidade: R$ ${desconto.toFixed(2)}
TOTAL: R$ ${totalFinal.toFixed(2)}`;

console.log(cupom);