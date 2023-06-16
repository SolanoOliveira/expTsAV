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
  HasMany,
} from 'sequelize-typescript';
import { Funcionarios } from './Funcionarios';
import { Projetos } from './Projetos';

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

  @AllowNull(false)
  @Unique
  @Column({
    type: DataType.STRING,
  })
  name!: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  sigla!: string;

  @ForeignKey(() => Funcionarios)
  @AllowNull(true)
  @Column({
    type: DataType.UUID,
  })
  gestorId!: string;

  @HasOne(() => Funcionarios, 'gestorId')
  gestor!: Funcionarios;

  @HasMany(() => Projetos)
  projetos!: Projetos[];
}
