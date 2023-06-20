import { Request, Response } from 'express';
import { Departamentos } from '../models/Departamentos';
import { where } from 'sequelize';

const index =  async (req: Request, res: Response) => {
    const departamentos = await Departamentos.findAll();
    res.render('departamento/index', {
        departamentos: departamentos.map(d => d.toJSON()),
    });
};

const create =  async (req: Request, res: Response) => {
    if (req.route.methods.get) {
        res.render('departamento/create');
    }else{
        const departamento = req.body;
        try {
            await Departamentos.create(departamento);
            res.redirect('/departamento');
        } catch (err: any){
            console.log(err);
            res.render('departamento/create',{
                departamento,
                erros: err.errors,
            });
        }
    }
};
const read = async (req: Request, res: Response) => {};

const update =  async (req: Request, res: Response) => {
    if (req.route.methods.get) {
        const departamento = await Departamentos.findByPk(req.params.id);
        if(departamento){
            res.render('departamento/update',{
                departamento: departamento.toJSON()
            });
        }else{
            res.redirect('/departamento');
        }
    }else{
        const departamento = req.body;
        try {
            await Departamentos.update(departamento, {where: {id: req.params.id}});
            res.redirect('/departamento');
        } catch (err: any){
            console.log(err);
            res.render('departamento/update',{
                departamento,
                erros: err.errors,
            });
        }
    }
};
const del =  async (req: Request, res: Response) => {};

export default {index, create, read, update, del}