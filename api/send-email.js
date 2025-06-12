// api/send-email.js

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { nome, email, respostas, arquivoBase64, arquivoNome } = req.body;

  const htmlRespostas = Object.entries(respostas || {}).map(
    ([chave, valor]) => `<p><strong>${chave}:</strong> ${valor}</p>`
  ).join('');

  const attachments = arquivoBase64 && arquivoNome ? [
    {
      filename: arquivoNome,
      content: arquivoBase64,
    }
  ] : [];

  try {
    const data = await resend.emails.send({
      from: 'Formulário Reeducador <nao-responda@reeducadoralimentarmanaus.com>',
      to: ['reeducadoralimentarmanaus@gmail.com'],
      subject: `Nova avaliação - ${nome || 'Anônimo'}`,
      html: `
        <h2>Nova avaliação recebida</h2>
        <p><strong>Nome:</strong> ${nome}</p>
        <p><strong>Email:</strong> ${email}</p>
        <hr />
        ${htmlRespostas}
      `,
      attachments,
    });

    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message || 'Erro ao enviar email' });
  }
};


