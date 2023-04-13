import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToMany,
} from "typeorm";
import { Wilder } from "../entity/Wilder";
import { Grade } from "./Grade";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Skill {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  name: string;

  @Field(() => [Wilder])
  @ManyToMany(() => Wilder, (wilder) => wilder.skills)
  wilders: Wilder[];

  @Field(() => [Grade])
  @OneToMany(() => Grade, (grade) => grade.skill, { eager: true })
  grade: Grade[];
}
