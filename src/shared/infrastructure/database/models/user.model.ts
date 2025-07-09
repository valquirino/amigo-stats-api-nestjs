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

export interface IUserAttributes {
  id: number;
  name: string;
  password: string;
  email: string;
  createdAt?: Date;
  deletedAt?: Date | null;
  role: 'user' | 'admin';
  isChecked: boolean;
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
export class User extends Model<IUserAttributes> {
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
  declare name: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  declare email: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  declare password: string;

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

  @Column({
    allowNull: false,
    type: DataType.ENUM('user', 'admin'),
  })
  declare role: 'user' | 'admin';

  @Column({
    allowNull: false,
    type: DataType.BOOLEAN,
    field: 'is_checked',
    defaultValue: true,
  })
  declare isChecked: boolean;
}
