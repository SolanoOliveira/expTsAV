import { Request, Response } from 'express';

const index = (req: Request, res: Response) => {
  res.end('Welcome to Web academy!');
};

const bemvindo = (req: Request, res: Response) => {
  res.send(req.params.nome);
};

const page = (req: Request, res: Response) => {
  const publicPath = `${process.cwd()}/public`;
  res.sendFile(`${publicPath}/html/index.html`);
};

const hb1 = (req: Request, res: Response) => {
  res.render('main/hb1', {
    uf: 'Universidade Federal do Amazonas',
  });
};

const hb2 = (req: Request, res: Response) => {
  const profs = [
    { nome: 'Tayana Conte', sala: 1234 },
    { nome: 'Horácio Fernandes', sala: 1235 },
    { nome: 'Edleno Moura', sala: 1238 },
    { nome: 'Elaine harada', sala: 1212 },
  ];
  res.render('main/hb2', {
    profs,
  });
};

const hb3 = (req: Request, res: Response) => {
  res.render('main/hb3', {
    nome: 'Express',
    tipo: 'Framework',
    poweredByNode: true,
  });
};

const hb4 = (req: Request, res: Response) => {
  const profs = [
    { nome: 'Tayana Conte', sala: 1234 },
    { nome: 'Horácio Fernandes', sala: 1235 },
    { nome: 'Edleno Moura', sala: 1238 },
    { nome: 'Elaine harada', sala: 1212 },
  ];
  res.render('main/hb4', {
    profs,
  });
};

export default { index, bemvindo, page, hb1, hb2, hb3, hb4 };
