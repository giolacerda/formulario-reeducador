import { Resend } from 'resend';
import 'dotenv/config';


const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  console.log('🔧 Método:', req.method);
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  const { arquivoBase64, arquivoNome, ...dados } = req.body;
  console.log('📨 Dados recebidos:', dados);

  try {
    const htmlContent = Object.entries(dados)
      .map(([chave, valor]) => `<p><strong>${chave}:</strong> ${valor}</p>`)
      .join('');

    const attachments = arquivoBase64
      ? [{
          content: arquivoBase64.split(',')[1],
          filename: arquivoNome,
          type: 'application/octet-stream',
          disposition: 'attachment',
        }]
      : [];

    const data = await resend.emails.send({
      from: 'Reeducador Alimentar <contato@reeducadoralimentarmanaus.com>',
      to: ['reeducadoralimentarmanaus@gmail.com'],
      subject: 'Nova resposta do formulário',
      html: htmlContent,
      attachments,
    });

    console.log('✅ Email enviado com sucesso', data);
    return res.status(200).json({ message: 'Email enviado com sucesso' });
  } catch (error) {
    console.error('❌ Erro ao enviar o email:', error);
    return res.status(500).json({ message: 'Erro ao enviar email', error: error.message });
  }
}

