export {};

enum StatusPedido {
  Recebido = 1,
  EmPreparo,
  SaiuParaEntrega,
  Entregue,
  Cancelado
}

enum FormaPagamento {
  PIX = 'PIX',
  CARTAO = 'CARTAO',
  DINHEIRO = 'DINHEIRO'
}

function mensagem(status: StatusPedido): string {
  switch (status) {
    case StatusPedido.Recebido: return '[1 - Recebido] Recebemos seu pedido!';
    case StatusPedido.EmPreparo: return '[2 - EmPreparo] Seu pedido está sendo preparado 🍳';
    case StatusPedido.SaiuParaEntrega: return '[3 - SaiuParaEntrega] O entregador está a caminho 🛵';
    case StatusPedido.Entregue: return '[4 - Entregue] Pedido entregue. Bom apetite!';
    case StatusPedido.Cancelado: return 'Pedido cancelado.';
    default: return 'Status desconhecido.';
  }
}

function avancar(status: StatusPedido): StatusPedido {
  if (status === StatusPedido.Entregue || status === StatusPedido.Cancelado) {
    return status;
  }
  return status + 1;
}

console.log(StatusPedido[2]); // EmPreparo

let estadoAtual = StatusPedido.Recebido;

// Se quiser simular o tempo real de entrega (ex: a cada 1 segundo), use setInterval:
const intervalo = setInterval(() => {
  console.log(mensagem(estadoAtual));

  if (estadoAtual >= StatusPedido.Entregue) {
    clearInterval(intervalo); // Para o loop quando chegar ao fim
    
    const pagamento: FormaPagamento = FormaPagamento.PIX;
    console.log(`\nPagamento: ${pagamento}`);
  } else {
    estadoAtual = avancar(estadoAtual);
  }
}, 1000); 