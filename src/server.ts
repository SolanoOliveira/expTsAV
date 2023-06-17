import 'reflect-metadata';

import express from 'express';
import router from './router/router';
import { api } from './api-info';
import { migracoes, MigracaoDB } from './db/migracoes';
import connection from './db/config';
import { VersaoDB } from './models/VersaoDB';
import { Funcionarios } from './models/Funcionarios';
import { Departamentos } from './models/Departamentos';
import { Projetos } from './models/Projetos';
import { Dependentes } from './models/Dependentes';
import { error } from 'console';
import { engine } from 'express-handlebars';
import sass from 'node-sass-middleware';
import logger from './middlewares/logger';

const models = [VersaoDB, Funcionarios, Departamentos, Projetos, Dependentes];

export class Api {
  public server: express.Application;
  public publicPath: string;

  constructor() {
    this.server = express();
    this.publicPath = `${process.cwd()}/public`;
  }

  async bootstrap(): Promise<Api> {
    try {
      this.engine();
      await this.middleware();
      await this.router();
      await this.initModels();
      await this.migrations();
    } catch (err) {
      console.error(err);
    }

    return this;
  }

  private engine() {
    this.server.engine(
      'handlebars',
      engine({
        helpers: require(`${__dirname}/views/helpers/helpers.ts`),
      }),
    );
    this.server.set('view engine', 'handlebars');
    this.server.set('views', `${__dirname}/views`);
  }

  private async middleware() {
    this.server.use(express.urlencoded({ extended: false }));
    this.server.use(logger('completo'));

    this.server.use(
      sass({
        src: `${this.publicPath}/scss`,
        dest: `${this.publicPath}/css`,
        outputStyle: 'compressed',
        prefix: '/css',
      }),
    );

    this.server.use('/css', express.static(`${this.publicPath}/css`));

    this.server.use('/js', [
      express.static(`${this.publicPath}/js`),
      express.static(`${__dirname}/../node_modules/bootstrap/dist/js`),
    ]);

    this.server.use(
      '/webfonts',
      express.static(
        `${__dirname}/../node_modules/@fortawesome/fontawesome-free/webfonts`,
      ),
    );
  }

  private async router() {
    this.server.use(router);

    try {
      this.server.listen(api.defaultPort);
    } catch (err) {
      console.error(err);
      throw error;
    }
  }

  private async initModels() {
    await connection
      .authenticate()
      .then(async () => {
        console.info('MySQL DB Conectado!');
        await connection.addModels(models);
        await connection.sync();
      })
      .then(() => {
        console.info('DB sync!');
      })
      .catch((err) => {
        console.error(err);
        throw error;
      });
  }

  private async migrations() {
    const versaoAtualBanco = await VersaoDB.findByPk(api.db.id);

    const numeroVersaoAtualBanco =
      versaoAtualBanco == null ? 0 : versaoAtualBanco.numeroVersao;

    console.info('VERSAO DO BANCO API-EMPRESA: ' + numeroVersaoAtualBanco);
    if (numeroVersaoAtualBanco < api.db.dbVersion) {
      console.info(migracoes);
      const models: string[] = [];

      for (let i = numeroVersaoAtualBanco; i < api.db.dbVersion; i++) {
        const migracao: MigracaoDB | undefined = migracoes.get(i + 1);

        if (migracao && migracao.consultas) {
          if (migracao.consultas !== null) {
            for (const consulta of migracao.consultas) {
              console.info('executando: ' + consulta.query);
              if (models.indexOf(consulta.model) < 0) {
                await connection.query(consulta.query);
                console.info('  executed!');
              } else {
                console.info('  not executed: new model.');
              }
            }
          }
        }
      }

      if (versaoAtualBanco == null) {
        await VersaoDB.create({
          id: api.db.id,
          numeroVersao: api.db.dbVersion,
        });
      } else {
        versaoAtualBanco.numeroVersao = api.db.dbVersion;
        await versaoAtualBanco.save();
      }
    }

    await connection
      .sync()
      .then(() => {
        console.info('Models sync!');
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
