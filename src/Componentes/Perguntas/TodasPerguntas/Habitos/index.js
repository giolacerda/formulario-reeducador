const habitos = [
  {
    id: 'habito1',
    tipo: 'texto',
    pergunta: 'Você possui algum vício? Quais?',
    categoria: 'Hábitos',
    obrigatorio: true,
  },
  {
    id: 'habito2',
    tipo: 'escolha',
    pergunta: 'Como é sua alimentação?',
    categoria: 'Hábitos',
    opcoes: ['Saudável', 'Muitos lanches', 'Mista'],
    obrigatorio: true,
  },
  {
    id: 'habito3',
    tipo: 'texto',
    pergunta: 'Como está sua qualidade de sono?',
    categoria: 'Hábitos',
    
    obrigatorio: true,
  },
  {
    id: 'habito4',
    tipo: 'texto',
    pergunta: 'Quais são seus horários de sono?',
    categoria: 'Hábitos',
    obrigatorio: true,
  },
  {
    id: 'habito5',
    tipo: 'escolha',
    pergunta: 'Você pratica atividade física?',
    categoria: 'Hábitos',
    opcoes: ['Sim', 'Não'],
    obrigatorio: true,
  },
];

export default habitos;







