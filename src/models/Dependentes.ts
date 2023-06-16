import {
  Table,
  Model,
  Column,
  DataType,
  IsUUID,
  PrimaryKey,
  AllowNull,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Funcionarios } from './Funcionarios';

@Table({
  timestamps: true,
})
export class Dependentes extends Model {
  @IsUUID('all')
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV1,
  })
  id!: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  name!: string;

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
  idade!: number;

  @ForeignKey(() => Funcionarios)
  @AllowNull(false)
  @Column({
    type: DataType.UUID,
  })
  funcionarioId!: string;

  @BelongsTo(() => Funcionarios)
  Funcionario!: Funcionarios;
}
