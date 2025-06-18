import {
  Table,
  Model,
  Column,
  DataType,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';
import { User } from '../models/user.model';
import { Club } from './club.model';

export interface IPlayerAttributes {
  id: number;
  name: string;
  cpf: string;
  nickname?: string;
  birthDate: Date;
  nationality: string;
  position: string;
  shirtNumber?: number;
  height?: number;
  weight?: number;
  status: 'Ativo' | 'Lesionado' | 'Suspenso' | 'Aposentado';
  notes?: string;
  clubId: number;
  userId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

@Table({
  modelName: 'player',
  tableName: 'players',
  timestamps: true,
  underscored: true,
})
export class Player extends Model<IPlayerAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @Column({ allowNull: false, type: DataType.STRING })
  declare name: string;

  @Column({ allowNull: false, type: DataType.STRING })
  declare cpf: string;

  @Column({ type: DataType.STRING, allowNull: true })
  declare nickname?: string;

  @Column({ allowNull: false, type: DataType.DATE })
  declare birthDate: Date;

  @Column({ allowNull: false, type: DataType.STRING })
  declare nationality: string;

  @Column({ allowNull: false, type: DataType.STRING })
  declare position: string;

  @Column(DataType.INTEGER)
  declare shirtNumber?: number;

  @Column({ type: DataType.INTEGER, allowNull: true })
  declare height?: number;

  @Column({ type: DataType.INTEGER, allowNull: true })
  declare weight?: number;

  @Column({
    type: DataType.ENUM('Ativo', 'Lesionado', 'Suspenso', 'Aposentado'),
    allowNull: false,
    defaultValue: 'Ativo',
  })
  declare status: 'Ativo' | 'Lesionado' | 'Suspenso' | 'Aposentado';

  @Column({ type: DataType.TEXT, allowNull: true })
  declare notes?: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare userId: number;

  @BelongsTo(() => User)
  declare user: User;

  @ForeignKey(() => Club)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  declare clubId: number;

  @BelongsTo(() => Club)
  declare club: Club;

  @CreatedAt
  @Column({ field: 'created_at' })
  declare createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updated_at' })
  declare updatedAt: Date;
}
