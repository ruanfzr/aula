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
while (estadoAtual <= StatusPedido.Entregue) {
  console.log(mensagem(estadoAtual));
  estadoAtual = avancar(estadoAtual);
}

// let pagamentoErrado: FormaPagamento = 'PIX'; 
// Type '"PIX"' is not assignable to type 'FormaPagamento'. Precisa ser FormaPagamento.PIX.

const pagamento: FormaPagamento = FormaPagamento.PIX;
console.log(`Pagamento: ${pagamento}`);