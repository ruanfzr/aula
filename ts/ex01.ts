export {};

// 1. Declaração com anotação explícita
const nomeProduto1: string = 'Pão francês';
const precoUnitario1: number = 0.75;
const quantidade1: number = 12;

const nomeProduto2 = 'Bolo de cenoura';
const precoUnitario2 = 18.5;
const quantidade2 = 2;

// 2. Declaração sem anotação
const aberta = true; // Tipo inferido pelo VS Code: boolean

// 3. Cálculos
const subtotal1 = quantidade1 * precoUnitario1;
const subtotal2 = quantidade2 * precoUnitario2;
const total = subtotal1 + subtotal2;

// 4. Separadores numéricos
const paesAno = 1_250_000;

// 5. Hexadecimal para decimal
const categoriaHex = 0x1A;

// 6. Erro provocado
// quantidade1 = 'doze'; 
// Type 'string' is not assignable to type 'number'.

// Saídas
console.log(`${nomeProduto1}: ${quantidade1} x R$ ${precoUnitario1.toFixed(2)} = R$ ${subtotal1.toFixed(2)}`);
console.log(`${nomeProduto2}: ${quantidade2} x R$ ${precoUnitario2.toFixed(2)} = R$ ${subtotal2.toFixed(2)}`);
console.log(`Total: R$ ${total.toFixed(2)}`);
console.log(`Padaria aberta? ${aberta}`);
console.log(`Pães vendidos no ano: ${paesAno}`);
console.log(`Categoria: ${categoriaHex}`);