import {
  Table,
  Model,
  Column,
  DataType,
  IsUUID,
  PrimaryKey,
  AllowNull,
  Unique,
  ForeignKey,
  HasOne,
  Length,
  HasMany,
} from 'sequelize-typescript';
import { Projetos } from './Projetos';
import { Funcionarios } from './Funcionarios';

@Table({
  timestamps: true,
})
export class Departamentos extends Model {
  @IsUUID('all')
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV1,
  })
  id!: string;

  @Length({
    min: 3,
    max: 50,
    msg: 'O nome precisa conter entre 3 e 50 caracteres',
  })
  @AllowNull(false)
  @Unique
  @Column({
    type: DataType.STRING,
  })
  name!: string;

  @Length({ min: 2, max: 2, msg: 'A sigla precisa conter 2 caracteres' })
  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  sigla!: string;

  @HasMany(() => Funcionarios)
  departamentos!: Funcionarios[];

  @HasMany(() => Projetos)
  projetos!: Projetos[];
}
