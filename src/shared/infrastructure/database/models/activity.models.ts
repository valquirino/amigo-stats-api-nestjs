import {
  Table,
  Model,
  Column,
  DataType,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';

export interface IActivityAttributes {
  id: number;
  user: string;
  actionType: 'create' | 'edit' | 'delete';
  entity: string;
  description: string;
  date: Date;
}

@Table({
  modelName: 'activity',
  tableName: 'activities',
  timestamps: false,
  underscored: true,
})
export class Activity extends Model<IActivityAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  declare user: string;

  @Column({
    type: DataType.ENUM('create', 'edit', 'delete'),
    allowNull: false,
    field: 'action_type',
  })
  declare actionType: 'create' | 'edit' | 'delete';

  @Column({ type: DataType.STRING, allowNull: false })
  declare entity: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  declare description: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  declare date: Date;
}
