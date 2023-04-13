import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
} from "typeorm";
import { Skill } from "../entity/Skill";
import { Grade } from "./Grade";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Wilder {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  city: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field(() => [Skill])
  @ManyToMany(() => Skill, (skill) => skill.wilders, { eager: true })
  @JoinTable()
  skills: Skill[];

  @Field(() => [Grade])
  @OneToMany(() => Grade, (grade) => grade.wilder)
  grade: Grade[];
}
