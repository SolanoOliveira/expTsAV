import { NextFunction, Request, Response } from 'express';

const index = (req: Request, res: Response) => {
  res.render('main/index');
};

const about = (req: Request, res: Response) => {
  res.render('main/about');
};

const ui = (req: Request, res: Response) => {
  res.render('main/ui');
};

const createCookie = function (req: Request, res: Response) {
  if (!('nomeCookie' in req.cookies)) {
    res.cookie('nomeCookie', 'valorCookie', { maxAge: 360000 });
    res.send('Você NUNCA passou por aqui!');
  } else {
    res.send('Você JÁ passou por aqui');
  }
};

const clearCookie = function (req: Request, res: Response) {
  res.clearCookie('nomeCookie');
  res.send('cookie apagado');
 };

const login = (req: Request, res: Response) => {
  if(req.route.methods.get){
    res.render('main/login',{
      csrf: req.csrfToken(),
    });
  } else {
    const { username, senha} = req.body;
    if(username === 'user' && senha === '12345'){
      res.cookie('logado', true);
      res.redirect('/');
    }else{
      res.render('main/login',{
      username,
      senha,
      senhaIncorreta: true,
      csrf: req.csrfToken(),});
    }
  }
};
const logout = (req: Request, res: Response) => {
  res.clearCookie('logado');
  res.redirect('/');
} ;

export default { index, about, ui, createCookie, clearCookie, login, logout };
