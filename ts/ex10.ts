export {};

type Placa = string;
type Periodo = [entrada: number, saida: number];

type Carro = { readonly placa: Placa; tipo: 'carro'; portas: 2 | 4 };
type Moto = { readonly placa: Placa; tipo: 'moto'; cilindradas: number };
type Caminhao = { readonly placa: Placa; tipo: 'caminhao'; eixos: number };

type Veiculo = Carro | Moto | Caminhao;

enum SituacaoTicket {
  Aberto = 'ABERTO',
  Pago = 'PAGO'
}

type Ticket = {
  veiculo: Veiculo;
  periodo: Periodo;
  selo: boolean;
  situacao: SituacaoTicket;
  valor?: number;
};

function calcularTarifa(v: Veiculo, horas: number): number {
  const hEfetivas = Math.max(1, horas);
  switch (v.tipo) {
    case 'carro':
      return 8.00 + (hEfetivas > 1 ? (hEfetivas - 1) * 5.00 : 0);
    case 'moto':
      return 4.00 + (hEfetivas > 1 ? (hEfetivas - 1) * 2.00 : 0);
    case 'caminhao':
      return 15.00 + (hEfetivas > 1 ? (hEfetivas - 1) * 10.00 : 0);
    default:
      const _naoTratado: never = v;
      return _naoTratado;
  }
}

function fecharTicket(t: Ticket): Ticket {
  const horas = Math.max(1, t.periodo[1] - t.periodo[0]);
  let valorBruto = calcularTarifa(t.veiculo, horas);
  if (t.selo) {
    valorBruto *= 0.5;
  }
  return {
    ...t,
    valor: valorBruto,
    situacao: SituacaoTicket.Pago
  };
}

function registrar(msg: string): void {
  console.log(msg);
}

function lerVeiculo(json: string): Veiculo {
  let bruto: unknown;
  try {
    bruto = JSON.parse(json);
  } catch {
    throw new Error('JSON malformado');
  }

  if (typeof bruto === 'object' && bruto !== null && 'placa' in bruto && 'tipo' in bruto) {
    const v = bruto as { placa: unknown; tipo: unknown; portas?: unknown; cilindradas?: unknown; eixos?: unknown };
    if (typeof v.placa === 'string' && typeof v.tipo === 'string') {
      if (v.tipo === 'carro' && (v.portas === 2 || v.portas === 4)) {
        return { placa: v.placa, tipo: 'carro', portas: v.portas };
      }
      if (v.tipo === 'moto' && typeof v.cilindradas === 'number') {
        return { placa: v.placa, tipo: 'moto', cilindradas: v.cilindradas };
      }
      if (v.tipo === 'caminhao' && typeof v.eixos === 'number') {
        return { placa: v.placa, tipo: 'caminhao', eixos: v.eixos };
      }
      throw new Error(`tipo "${v.tipo}" desconhecido`);
    }
  }
  throw new Error('veículo inválido');
}

const ticketsBrutos: Ticket[] = [
  { veiculo: { placa: 'ABC1D23', tipo: 'carro', portas: 4 }, periodo: [8, 11], selo: false, situacao: SituacaoTicket.Aberto },
  { veiculo: { placa: 'MOT0A12', tipo: 'moto', cilindradas: 160 }, periodo: [9, 10], selo: false, situacao: SituacaoTicket.Aberto },
  { veiculo: { placa: 'CAM9Z99', tipo: 'caminhao', eixos: 3 }, periodo: [7, 12], selo: false, situacao: SituacaoTicket.Aberto },
  { veiculo: { placa: 'XYZ4E56', tipo: 'carro', portas: 2 }, periodo: [14, 16], selo: true, situacao: SituacaoTicket.Aberto }
];

const ticketsFechados = ticketsBrutos.map(fecharTicket);

ticketsFechados.forEach(t => {
  const horas = t.periodo[1] - t.periodo[0];
  const seloTexto = t.selo ? ' (selo -50%)' : '';
  registrar(`[${t.situacao}] ${t.veiculo.placa} (${t.veiculo.tipo}) - ${horas}h - R$ ${(t.valor ?? 0).toFixed(2)}${seloTexto}`);
});

const faturamentoTotal = ticketsFechados.reduce((acc, t) => acc + (t.valor ?? 0), 0);
console.log(`Faturamento: R$ ${faturamentoTotal.toFixed(2)}`);

const contagemEntradas = ticketsFechados.reduce((acc, t) => {
  acc[t.veiculo.tipo] = (acc[t.veiculo.tipo] || 0) + 1;
  return acc;
}, {} as Record<string, number>);

console.log(`Entradas: carro=${contagemEntradas.carro || 0}, moto=${contagemEntradas.moto || 0}, caminhao=${contagemEntradas.caminhao || 0}`);

try {
  lerVeiculo('{"placa":"BIKE123","tipo":"bicicleta"}');
} catch (e: unknown) {
  if (e instanceof Error) {
    console.log(`Erro ao ler veículo: ${e.message}`);
  }
}