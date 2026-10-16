const respostaOk = '{"cidade":"Porto Velho","temperatura":34,"umidade":0.62}';
const respostaQuebrada = '{"cidade":"Porto Velho","temperatura":"quente"}';
const respostaInvalida = '{ cidade: Porto Velho ';

function falhar(mensagem: string): never {
  throw new Error(mensagem);
}

function lerComAny(json: string) {
  const dados: any = JSON.parse(json);
  console.log(dados.temperatura.toFixed(1));
}

function lerClima(json: string): { cidade: string; temperatura: number } {
  let bruto: unknown;
  try {
    bruto = JSON.parse(json);
  } catch (e) {
    falhar('JSON malformado');
  }

  if (typeof bruto === 'object' && bruto !== null && 'cidade' in bruto && 'temperatura' in bruto) {
    const obj = bruto as { cidade: unknown; temperatura: unknown };
    if (typeof obj.cidade === 'string' && typeof obj.temperatura === 'number') {
      return { cidade: obj.cidade, temperatura: obj.temperatura };
    }
    falhar('campo "temperatura" inválido');
  }
  falhar('dados inválidos');
}

function processar(json: string) {
  try {
    const clima = lerClima(json);
    console.log(`${clima.cidade}: ${clima.temperatura.toFixed(1)}°C`);
  } catch (erro: unknown) {
    if (erro instanceof Error) {
      console.log(`Erro: ${erro.message}`);
    }
  }
}



processar(respostaOk);
processar(respostaQuebrada);
processar(respostaInvalida); 