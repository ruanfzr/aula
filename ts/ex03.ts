export {};

const paciente1: {
  readonly cpf: string;
  nome: string;
  idade: number;
  plano: boolean;
  alergias?: string[];
  contatoEmergencia?: { nome: string; telefone: string };
} = {
  cpf: '123.456.789-00',
  nome: 'Ana Souza',
  idade: 34,
  plano: true,
  alergias: ['dipirona', 'lactose'],
  contatoEmergencia: { nome: 'Carlos Souza', telefone: '(69) 98888-1111' }
};

const paciente2: {
  readonly cpf: string;
  nome: string;
  idade: number;
  plano: boolean;
  alergias?: string[];
  contatoEmergencia?: { nome: string; telefone: string };
} = {
  cpf: '987.654.321-99',
  nome: 'Carlos Lima',
  idade: 61,
  plano: false
};

function resumo(p: { nome: string; idade: number; alergias?: string[] }): string {
  const alergiasStr = p.alergias && p.alergias.length > 0 ? p.alergias.join(', ') : 'Sem alergias registradas';
  return `${p.nome}, ${p.idade} anos. Alergias: ${alergiasStr}`;
}

// 4. Erros provocados
// paciente1.cpf = '000.000.000-00'; 
// Cannot assign to 'cpf' because it is a read-only property.

// paciente1.peso = 70; 
// Object literal may only specify known properties, and 'peso' does not exist in type...

// 5. Reflexão:
// let dados: object = paciente1;
// dados.nome; -> DÁ ERRO pois o tipo 'object' genérico em TS não permite acessar propriedades específicas sem assertion.
// let x: {} = 10; -> ACEITO porque o tipo '{}' (object type) aceita qualquer valor que não seja null ou undefined.
// let y: object = 10; -> DÁ ERRO porque o tipo 'object' representa apenas valores não-primitivos (exclui number, string, boolean).

console.log(resumo(paciente1));
console.log(resumo(paciente2));