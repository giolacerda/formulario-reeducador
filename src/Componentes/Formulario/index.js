import React, { useState } from 'react';
import styles from './Formulario.module.css';
import perguntas from '../Perguntas/TodasPerguntas/index.js';
import logo from '../../assets/logo-reeducador.png';
import bg from '../../assets/moca-fita.png';

export default function Formulario() {
 

  const [mostrarCapa, setMostrarCapa] = useState(true);
  const [indiceAtual, setIndiceAtual] = useState(0);
  const [respostas, setRespostas] = useState({});
  const [erro, setErro] = useState(false);
  const [formularioFinalizado, setFormularioFinalizado] = useState(false);

  const perguntaAtual = perguntas[indiceAtual];
  const progresso = ((indiceAtual + 1) / perguntas.length) * 100;

  const handleIniciar = () => {
    setMostrarCapa(false);
  };

  const handleResposta = (valor) => {
    setErro(false);
    setRespostas({ ...respostas, [perguntaAtual.id]: valor });
  };

  const handleInputChange = (e) => {
    setErro(false);
    setRespostas({ ...respostas, [perguntaAtual.id]: e.target.value });
  };

  const handleFileChange = (e) => {
    setErro(false);
    const file = e.target.files[0];
    if (file) {
      setRespostas({ ...respostas, [perguntaAtual.id]: file });
    }
  };


  const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const enviarFormulario = async () => {
  const dados = {};

  for (const [chave, valor] of Object.entries(respostas)) {
    if (valor instanceof File) {
      const base64 = await toBase64(valor);
      dados["arquivoBase64"] = base64;
      dados["arquivoNome"] = valor.name;
    } else {
      dados[chave] = valor;
    }
  }

  try {
    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados),
    });

    if (response.ok) {
      setFormularioFinalizado(true);
    } else {
      console.error("Erro ao enviar formulário.");
    }
  } catch (error) {
    console.error("Erro de conexão:", error);
  }
};


  const handleProxima = async (e) => {
    if (e) e.preventDefault();

    const respostaAtual = respostas[perguntaAtual.id];
    const obrigatoria = perguntaAtual.obrigatorio !== false;

    const invalida =
      respostaAtual === undefined ||
      respostaAtual === '' ||
      (perguntaAtual.tipo === 'termo' && respostaAtual !== true) ||
      (perguntaAtual.tipo === 'arquivo' && !(respostaAtual instanceof File));

    if (obrigatoria && invalida) {
      setErro(true);
      return;
    }

    setErro(false);

    if (indiceAtual === perguntas.length - 1) {
      await enviarFormulario();
    } else {
      setIndiceAtual(indiceAtual + 1);
    }
  };

  // Capa inicial
  if (mostrarCapa) {
    return (
      <div className={styles.capa}>
        <img src={bg} alt="Capa" className={styles.bgImagem} />
        <div className={styles.overlay}></div>
        <div className={styles.capaConteudo}>
          <img src={logo} alt="Logo" className={styles.logo} />
          <button className={styles.botaoCapa} onClick={handleIniciar}>
            Iniciar Avaliação
          </button>
        </div>
      </div>
    );
  }

  // Finalização
  if (formularioFinalizado) {
    return (
      <div className={styles.finalizado}>
        <h2>Formulário enviado com sucesso!</h2>
        <p>Obrigado por participar da nossa avaliação.</p>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.progressoContainer}>
          <div
            className={styles.progressoBarra}
            style={{ width: `${progresso}%` }}
          ></div>
        </div>

        <div className={styles.categoria}>{perguntaAtual.categoria}</div>
        <div className={styles.pergunta}>{perguntaAtual.pergunta}</div>

        {/* Tipos de pergunta */}
        {perguntaAtual.tipo === 'texto' && (
          <>
            <input
              type="text"
              className={styles.input}
              value={respostas[perguntaAtual.id] || ''}
              onChange={handleInputChange}
            />
            {erro && <div className={styles.erro}>Este campo é obrigatório.</div>}
            <button className={styles.button} onClick={handleProxima}>Próxima</button>
          </>
        )}

        {perguntaAtual.tipo === 'numero' && (
          <>
            <input
              type="number"
              className={styles.input}
              value={respostas[perguntaAtual.id] || ''}
              onChange={handleInputChange}
            />
            {erro && <div className={styles.erro}>Por favor, informe um número válido.</div>}
            <button className={styles.button} onClick={handleProxima}>Próxima</button>
          </>
        )}

        {perguntaAtual.tipo === 'escolha' && (
          <div className={styles.opcoes}>
            {perguntaAtual.opcoes.map((opcao, index) => (
              <label key={index} className={styles.opcao}>
                <input
                  type="radio"
                  name={perguntaAtual.id}
                  value={opcao}
                  checked={respostas[perguntaAtual.id] === opcao}
                  onChange={() => handleResposta(opcao)}
                />
                {opcao}
              </label>
            ))}
            {erro && <div className={styles.erro}>Por favor, selecione uma opção.</div>}
            <button className={styles.button} onClick={handleProxima}>Próxima</button>
          </div>
        )}

        {perguntaAtual.tipo === 'arquivo' && (
          <div className={styles.opcoes}>
            <label className={styles.labelUpload}>
              📎 Anexar Arquivo
              <input
                type="file"
                className={styles.inputArquivo}
                onChange={handleFileChange}
              />
            </label>

            {respostas[perguntaAtual.id] && (
              <p className={styles.arquivoAnexado}>
                Arquivo anexado com sucesso: {respostas[perguntaAtual.id].name}
              </p>
            )}
            {erro && <div className={styles.erro}>Por favor, anexe um arquivo.</div>}
            <button className={styles.button} onClick={handleProxima}>Próxima</button>
          </div>
        )}

        {perguntaAtual.tipo === 'termo' && (
  <div className={styles.opcoes}>
    <div className={styles.texto}>
      <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>
        {perguntaAtual.texto}
      </pre>
    </div>

    <label className={styles.checkbox}>
      <input
        type="checkbox"
        checked={respostas[perguntaAtual.id] || false}
        onChange={(e) => handleResposta(e.target.checked)}
      />
      <span>Concordo com os termos acima</span>
    </label>

    {erro && (
      <div className={styles.erro}>
        Você deve aceitar o termo para continuar.
      </div>
    )}

    <button className={styles.button} onClick={handleProxima}>
      {indiceAtual === perguntas.length - 1 ? 'Finalizar' : 'Próxima'}
    </button>
  </div>
)}


        {perguntaAtual.tipo === 'link' && (
          <div className={styles.opcoes}>
            <a
              href={perguntaAtual.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.botaoCapa}
            >
              {perguntaAtual.texto}
            </a>
            <button className={styles.button} onClick={handleProxima}>Próxima</button>
          </div>
        )}
      </div>
    </div>
  );
}






