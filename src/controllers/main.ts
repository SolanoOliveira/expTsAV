import { Departamentos } from '../models/Departamentos';
import departamento from './departamento';
import { NextFunction, Request, Response } from 'express';
import { Funcionarios } from '../models/Funcionarios';
import bcrypt from 'bcryptjs';

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

const signup = async (req: Request, res: Response) => {
  const departamentos = await Departamentos.findAll();
  console.log('11111');
  if (req.route.methods.get) {
    res.render('main/signup', {
      csrf: req.csrfToken(),
      departamentos: departamentos.map((d) => d.toJSON()),
    });
  } else {
    const funcionario = req.body;
    const rounds = parseInt(process.env.BCRYPT_ROUNDS!, 10);
    bcrypt.genSalt(rounds, (err, salt) => {
      bcrypt.hash(funcionario.senha, salt, async (err, hash) => {
        if (!err) {
          await Funcionarios.create({
            ...funcionario,
            senha: hash,
          });
          res.redirect('/');
        }
      });
    });
    try {
      await Funcionarios.create(funcionario);
      res.redirect('/');
    } catch (e: any) {
      console.log(e);
      res.render('main/signup', {
        csrf: req.csrfToken(),
        errors: e.errors,
        funcionario,
        departamentos: departamentos.map((d) => d.toJSON()),
      });
    }
  }
};

const login = (req: Request, res: Response) => {
  if (req.route.methods.get) {
    res.render('main/login', {
      csrf: req.csrfToken(),
    });
  } else {
    const { username, senha } = req.body;
    if (username === 'user' && senha === '12345') {
      res.cookie('logado', true);
      res.redirect('/');
    } else {
      res.render('main/login', {
        username,
        senha,
        senhaIncorreta: true,
        csrf: req.csrfToken(),
      });
    }
  }
};

const logout = (req: Request, res: Response) => {
  res.clearCookie('logado');
  res.redirect('/');
};

export default {
  index,
  about,
  ui,
  createCookie,
  clearCookie,
  login,
  logout,
  signup,
};
