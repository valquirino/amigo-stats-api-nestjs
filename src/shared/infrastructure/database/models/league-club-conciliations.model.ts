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
  import { Club } from './club.model';
  import { League } from './league.model';
  
  export interface ILeagueClubConciliationAttributes {
    id: number;
    leagueId: number;
    clubId: number;
    year: number;
    createdAt?: Date;
    updatedAt?: Date;
  }

  
  @Table({
    modelName: 'league_club_conciliation',
    tableName: 'league_club_conciliations',
    timestamps: true,
    underscored: true,
  })
  export class LeagueClubConciliation extends Model<ILeagueClubConciliationAttributes> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id: number;
  
    @ForeignKey(() => League)
    @Column({ type: DataType.INTEGER, allowNull: false, field: 'league_id' })
    declare leagueId: number;
  
    @BelongsTo(() => League)
    declare league: League;
  
    @ForeignKey(() => Club)
    @Column({ type: DataType.INTEGER, allowNull: false, field: 'club_id' })
    declare clubId: number;
  
    @BelongsTo(() => Club)
    declare club: Club;
  
    @Column({ type: DataType.INTEGER, allowNull: false })
    declare year: number;
  
    @CreatedAt
    @Column({ field: 'created_at' })
    declare createdAt: Date;
  
    @UpdatedAt
    @Column({ field: 'updated_at' })
    declare updatedAt: Date;
  }
  