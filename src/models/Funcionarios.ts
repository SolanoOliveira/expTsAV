import {
  Table,
  Model,
  Column,
  DataType,
  IsUUID,
  PrimaryKey,
  AllowNull,
  IsEmail,
  Unique,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { Departamentos } from './Departamentos';
import { Dependentes } from './Dependentes';

@Table({
  timestamps: true,
})
export class Funcionarios extends Model {
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
    type: DataType.STRING,
  })
  senha!: string;

  @AllowNull(false)
  @Unique
  @IsEmail
  @Column({
    type: DataType.STRING,
  })
  email!: string;

  @ForeignKey(() => Departamentos)
  @AllowNull(false)
  @Column({
    type: DataType.UUID,
  })
  departamentoId!: string;

  @BelongsTo(() => Departamentos)
  departamento!: Departamentos;

  @HasMany(() => Dependentes)
  dependentes!: Dependentes[];
}
