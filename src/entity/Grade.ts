import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Skill } from "../entity/Skill";
import { Wilder } from "../entity/Wilder";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Grade {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  grade: number;

  @Field(() => [Wilder])
  @ManyToOne(() => Wilder, (wilder) => wilder.grade, { onDelete: "CASCADE" })
  wilder: Wilder;

  @Field(() => [Skill])
  @ManyToOne(() => Skill, (skill) => skill.grade, { onDelete: "CASCADE" })
  skill: Skill;
}
