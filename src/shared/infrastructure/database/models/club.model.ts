import {
  Table,
  Model,
  Column,
  DataType,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
  HasMany,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';
import { User } from './user.model';
import { Player } from './player.model';

export interface IClubAttributes {
  id: number;
  name: string;
  founded?: number;
  country: string;
  location: string;
  league: string;
  stadium?: string;
  president?: string;
  primaryColor?: string;
  secondaryColor?: string;
  description?: string;
  logo?: string;
  userId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

@Table({
  modelName: 'club',
  tableName: 'clubs',
  timestamps: true,
  underscored: true,
})
export class Club extends Model<IClubAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string;

  @Column({ type: DataType.INTEGER, allowNull: true })
  declare founded?: number;

  @Column({ type: DataType.STRING, allowNull: false })
  declare country: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare location: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare league: string;

  @Column({ type: DataType.STRING, allowNull: true })
  declare stadium?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  declare president?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  declare primaryColor?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  declare secondaryColor?: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  declare description?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  declare logo?: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare userId: number;

  @BelongsTo(() => User)
  declare user: User;

  @HasMany(() => Player)
  declare players: Player[];

  @CreatedAt
  @Column({ field: 'created_at' })
  declare createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updated_at' })
  declare updatedAt: Date;
}
