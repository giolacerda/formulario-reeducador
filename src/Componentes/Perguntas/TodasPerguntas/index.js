import dadosPessoais from "./DadosPessoais";
import avaliacaoFisica from "./AvaliacoesFisica";
import habitos from "./Habitos";
import saude from "./Saude";
import indicacao from "./Indicacao";
import termos from "./Termos";



const todasPerguntas = [
  ...dadosPessoais,
  ...saude,
  ...habitos,
  ...avaliacaoFisica,
  ...indicacao,
  ...termos

];

export default todasPerguntas;