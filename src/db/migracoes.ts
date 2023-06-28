export interface MigracaoDB {
  consultas?: Array<{ model: string; query: string }>;
}

const migracoes: Map<number, MigracaoDB> = new Map<number, MigracaoDB>();

migracoes.set(1, {
  consultas: [
    {
      model: 'Funcionarios',
      query: `ALTER TABLE Funcionarios DROP idade;`,
    },
    {
      model: 'Funcionarios',
      query: `ALTER TABLE Funcionarios DROP fone;`,
    },
  ],
});

migracoes.set(2, {
  consultas: [
    {
      model: 'Funcionarios',
      query: `ALTER TABLE Funcionarios DROP endereco;`,
    },
  ],
});

migracoes.set(3, {
  consultas: [
    {
      model: 'Funcionarios',
      query: `ALTER TABLE Funcionarios ADD senha CHAR(100) AFTER name;`,
    },
  ],
});

export { migracoes };
