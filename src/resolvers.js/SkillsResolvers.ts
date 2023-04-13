import { Arg, Mutation, Query } from "type-graphql";
import dataSource from "../utils";
import { Skill } from "../entity/Skill";

export class SkillsResolver {
  @Query(() => [Skill])
  async getAllSkills(): Promise<Skill[]> {
    const skills = await dataSource.manager.find(Skill, {
      relations: { wilders: true, grade: true },
    });
    return skills;
  }

  @Mutation(() => Skill)
  async addSkill(@Arg("name") name: string): Promise<Skill> {
    const skillToCreate = new Skill();
    skillToCreate.name = name;
    return await dataSource.manager.save(Skill, skillToCreate);
  }
}
