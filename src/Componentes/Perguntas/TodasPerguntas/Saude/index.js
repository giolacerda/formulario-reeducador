const saude = [
  {
    id: 'dificuldadeEmagrecer',
    tipo: 'texto',
    pergunta: 'Você tem dificuldade para emagrecer?',
    categoria: 'Saúde',
  },
  {
    id: 'metabolismo',
    tipo: 'escolha',
    pergunta: 'Como você considera seu metabolismo?',
    categoria: 'Saúde',
    opcoes: ['Lento', 'Normal', 'Rápido'],
  },
  {
    id: 'usoAnterior',
    tipo: 'texto',
    pergunta: 'Já utilizou reeducadores ou remédios para emagrecimento?',
    categoria: 'Saúde',
  },
  {
    id: 'restricoesMedicas',
    tipo: 'texto',
    pergunta: 'Possui alguma restrição médica?',
    categoria: 'Saúde',
  },
  {
    id: 'gravidezLactacao',
    tipo: 'texto',
    pergunta: 'Está grávida ou em fase de amamentação? Detalhes.',
    categoria: 'Saúde',
  },
  {
    id: 'problemasCardiacos',
    tipo: 'texto',
    pergunta: 'Possui problemas cardíacos e/ou pressão arterial?',
    categoria: 'Saúde',
  },
  {
    id: 'historicoDoencas',
    tipo: 'texto',
    pergunta: 'Tem histórico de câncer ou outras doenças?',
    categoria: 'Saúde',
  },
  {
    id: 'imunidade',
    tipo: 'texto',
    pergunta: 'Como está sua imunidade atualmente?',
    categoria: 'Saúde',
  },
];

export default saude;

