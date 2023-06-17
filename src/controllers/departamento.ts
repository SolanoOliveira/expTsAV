import { Request, Response } from 'express';
import { Departamentos } from '../models/Departamentos';

const index =  async (req: Request, res: Response) => {
    const departamentos = await Departamentos.findAll();
    res.render('departamento/index', {
        departamentos,
    });
};
const create =  async (req: Request, res: Response) => {};
const read = async (req: Request, res: Response) => {};
const update =  async (req: Request, res: Response) => {};
const del =  async (req: Request, res: Response) => {};

export default {index, create, read, update, del}