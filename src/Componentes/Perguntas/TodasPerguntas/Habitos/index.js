const habitos = [
  {
    id: 'possui_vicio',
    tipo: 'texto',
    pergunta: 'Você possui algum vício? Quais?',
    categoria: 'Hábitos',
  },
  {
    id: 'alimentacao',
    tipo: 'escolha',
    pergunta: 'Como é sua alimentação?',
    categoria: 'Hábitos',
    opcoes: ['Saudável', 'Muitos lanches', 'Mista'],
     obrigatorio: true,
  },
  {
    id: 'qualidade_sono',
    tipo: 'escolha',
    pergunta: 'Como está sua qualidade de sono?',
    categoria: 'Hábitos',
    opcoes: [
      'Excelente – durmo bem todas as noites',
      'Boa – geralmente durmo bem, com poucas interrupções',
      'Ruim – durmo pouco ou com muitas interrupções',
      'Muito ruim – tenho insônia ou quase não durmo'
    ],
     obrigatorio: true,
  },
  {
    id: 'horarios_sono',
    tipo: 'escolha',
    pergunta: 'Quais são seus horários de sono?',
    categoria: 'Hábitos',
    opcoes: ['Antes das 22h', 'Entre 22h e 00h', 'Depois de 00h'],
     obrigatorio: true,
  },
  {
    id: 'atividade_fisica',
    tipo: 'escolha',
    pergunta: 'Você pratica atividade física?',
    categoria: 'Hábitos',
    opcoes: ['Sim', 'Não'],
     obrigatorio: true,
  },
];

export default habitos;

