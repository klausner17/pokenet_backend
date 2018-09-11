import { User } from './User';
import { Pokemon } from './Pokemon';
import {
  Model,
  Table,
  Column,
  HasMany,
  CreatedAt,
  UpdatedAt,
  BelongsTo,
  ForeignKey
} from 'sequelize-typescript';
import { Gym } from './Gym';
import { RaidTrainer } from './RaidTrainer';

@Table
export class ListRaid extends Model<ListRaid> {
  @Column({ allowNull: false })
  public maxTrainners: number;

  @Column({ allowNull: false })
  public timeToClose: Date;

  @Column({ allowNull: false })
  public meetingTime: Date;

  @ForeignKey(() => User)
  @Column({ allowNull: false })
  public userId: number;

  @ForeignKey(() => Pokemon)
  @Column({ allowNull: false })
  public pokemonGymId: number;

  @ForeignKey(() => Gym)
  @Column({ allowNull: false })
  public gymId: number;

  @BelongsTo(() => User)
  public user: User;

  @BelongsTo(() => Pokemon)
  public pokemon: Pokemon;

  @BelongsTo(() => Gym)
  public gym: Gym;

  @HasMany(() => RaidTrainer)
  public raidTrainners: RaidTrainer[];

  @CreatedAt public createdAt: Date;

  @UpdatedAt public updatedAt: Date;
}
