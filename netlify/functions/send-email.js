const { Resend } = require('resend');

const resend = new Resend(process.env.re_XR1nCyen_9FQomFNPX5m7gRpuuU6XaHEv);

exports.handler = async (event, context) => {
  try {
    const body = JSON.parse(event.body);

    // Monta o conteúdo do e-mail com os dados recebidos
    let html = `<h2>Nova resposta do formulário</h2><ul>`;
    for (const [chave, valor] of Object.entries(body)) {
      if (chave !== 'arquivoBase64' && chave !== 'arquivoNome') {
        html += `<li><strong>${chave}:</strong> ${valor}</li>`;
      }
    }
    html += `</ul>`;

    const emailData = {
      from: 'Formulário Interativo <Formulário <no-reply@formulario.com>',
      to: 'reeducadoralimentarmanaus@gmail.com',
      subject: 'Nova resposta do formulário',
      html,
    };

    // Se tiver anexo, adiciona no e-mail
    if (body.arquivoBase64 && body.arquivoNome) {
      emailData.attachments = [
        {
          filename: body.arquivoNome,
          content: body.arquivoBase64.split(';base64,').pop(), // Remove prefixo data:...
          encoding: 'base64',
        },
      ];
    }

    const data = await resend.emails.send(emailData);

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, data }),
    };
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Erro ao enviar e-mail.' }),
    };
  }
};


