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
  BelongsTo,
} from 'sequelize-typescript';
import { Departamentos } from './Departamentos';

@Table({
  timestamps: true,
})
export class Projetos extends Model {
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
  nome!: string;

  @AllowNull(false)
  @Column({
    type: DataType.DATEONLY,
  })
  dataFinalizacao!: Date;

  @ForeignKey(() => Departamentos)
  @AllowNull(false)
  @Column({
    type: DataType.UUID,
  })
  departamentoId!: string;

  @BelongsTo(() => Departamentos)
  departamento!: Departamentos;
}
