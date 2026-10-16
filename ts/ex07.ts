export {};

type Notificador = (destinatario: string, mensagem: string) => void;

const porEmail: Notificador = (destinatario, mensagem) => {
  console.log(`[E-MAIL] para ${destinatario}: ${mensagem}`);
};

const porSms: Notificador = (destinatario, mensagem) => {
  if (mensagem.length > 160) {
    console.log("SMS ignorado: mensagem longa");
    return;
  }
  console.log(`[SMS] para ${destinatario}: ${mensagem}`);
};

const porApp: Notificador = (destinatario, mensagem) => {
  console.log(`[APP] para ${destinatario}: ${mensagem}`);
};

function notificarTodos(destinatarios: string[], mensagem: string, enviar: Notificador): void {
  destinatarios.forEach(dest => enviar(dest, mensagem));
}

// function teste(): void { return 10; }
// Type 'number' is not assignable to type 'void'.

// Reflexão: O retorno é ignorado porque a assinatura 'void' indica para o TypeScript que o chamador não vai utilizar o valor de retorno da função, logo qualquer valor retornado por funções compatíveis é simplesmente descartado de forma segura.

notificarTodos(['ana@escola.com'], 'Reunião de pais sexta às 19h', porEmail);
notificarTodos(['joao.resp'], 'Reunião de pais sexta às 19h', porApp);
notificarTodos(['(69) 99999-0000'], 'Mensagem muito longa... '.repeat(10), porSms);