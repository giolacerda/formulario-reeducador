import dadosPessoais from "./DadosPessoais/index.js";
import avaliacaoFisica from "./AvaliacoesFisica/index.js";
import habitos from "./Habitos/index.js";
import saude from "./Saude/index.js";
import indicacao from "./Indicacao/index.js";
import termos from "./Termos/index.js";



const todasPerguntas = [
  ...dadosPessoais,
  ...saude,
  ...habitos,
  ...avaliacaoFisica,
  ...indicacao,
  ...termos

];

export default todasPerguntas;