const { Resend } = require('resend');

const resend = new Resend('re_XR1nCyen_9FQomFNPX5m7gRpuuU6XaHEv');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Método não permitido' }),
    };
  }

  try {
    const dados = JSON.parse(event.body);

    const { arquivoBase64, arquivoNome, ...outrosDados } = dados;

    // Monta o corpo do e-mail com os campos do formulário
    let corpoTexto = '📥 Nova resposta do formulário:\n\n';
    for (const chave in outrosDados) {
      corpoTexto += `${chave}: ${outrosDados[chave]}\n`;
    }

    // Envia o e-mail via Resend
    const response = await resend.emails.send({
      from: 'Formulário <onboarding@resend.dev>',
      to: 'reeducadoralimentarmanaus@gmail.com',
      subject: 'Nova resposta do formulário',
      text: corpoTexto,
      attachments: arquivoBase64
        ? [
            {
              filename: arquivoNome,
              content: arquivoBase64.split(',')[1],
              type: arquivoBase64.match(/data:(.*);base64/)[1] || 'application/octet-stream',
            },
          ]
        : [],
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: 'Enviado com sucesso' }),
    };
  } catch (erro) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: erro.message }),
    };
  }
};


