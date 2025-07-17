import {
    Table,
    Model,
    Column,
    DataType,
    PrimaryKey,
    AutoIncrement,
    CreatedAt,
    UpdatedAt,
  } from 'sequelize-typescript';
  
  export interface ILeagueAttributes {
    id: number;
    name: string;
    teamsCount: number;
    gamesCount: number;
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  @Table({
    modelName: 'league',
    tableName: 'leagues',
    timestamps: true,
    underscored: true,
  })
  export class League extends Model<ILeagueAttributes> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id: number;
  
    @Column({ type: DataType.STRING, allowNull: false })
    declare name: string;
  
    @Column({ type: DataType.INTEGER, allowNull: false })
    declare teamsCount: number;
  
    @Column({ type: DataType.INTEGER, allowNull: false })
    declare gamesCount: number;
  
    @CreatedAt
    @Column({ field: 'created_at' })
    declare createdAt: Date;
  
    @UpdatedAt
    @Column({ field: 'updated_at' })
    declare updatedAt: Date;
  }
  