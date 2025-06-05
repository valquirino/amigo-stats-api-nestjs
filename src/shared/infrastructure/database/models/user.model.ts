import {
  AutoIncrement,
  Column,
  CreatedAt,
  DataType,
  DeletedAt,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

export interface UserAttributes {
  id: number;
  name: string;
  password: string;
  email: string;
  createdAt?: Date;
  deletedAt?: Date | null;
}

@Table({
  modelName: 'user',
  tableName: 'users',
  timestamps: true,
  paranoid: true,
  underscored: true,
  createdAt: 'created_at',
  deletedAt: 'deleted_at',
})
export class User extends Model<UserAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  declare id: number;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  name: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  email: string;

  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  password: number;

  @CreatedAt
  @Column({ field: 'created_at' })
  declare createdAt: Date;

  @DeletedAt
  @Column({
    field: 'deleted_at',
    allowNull: true,
    type: DataType.DATE,
  })
  declare deletedAt: Date | null;
}
