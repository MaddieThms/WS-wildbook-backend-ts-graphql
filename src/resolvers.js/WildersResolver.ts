import { Arg, Mutation, Query } from "type-graphql";
import dataSource from "../utils";
import { Wilder } from "../entity/Wilder";

export class WildersResolver {
  @Query(() => [Wilder])
  async getAllWilders(): Promise<Wilder[]> {
    const wilders = await dataSource.manager.find(Wilder, {
      relations: { skills: true, grade: true },
    });
    return wilders;
  }

  @Query(() => Wilder)
  async getWilderById(
    @Arg("wilderId") wilderId: number
  ): Promise<Wilder | null> {
    const wilder = await dataSource
      .getRepository(Wilder)
      .findOneBy({ id: wilderId });
    return wilder;
  }

  @Mutation(() => Wilder)
  async updateWilder(
    @Arg("wilderId") wilderId: number,
    @Arg("name", { nullable: true }) name: string,
    @Arg("city", { nullable: true }) city: string,
    @Arg("email", { nullable: true }) email: string
  ): Promise<Wilder> {
    const wilderToUpdate = await dataSource
      .getRepository(Wilder)
      .findOneBy({ id: wilderId });
    if (wilderToUpdate == null) {
      throw new Error("this wilder doesn't exist");
    }
    wilderToUpdate.name = name;
    wilderToUpdate.city = city;
    wilderToUpdate.email = email;
    return await dataSource.manager.save(Wilder, wilderToUpdate);
  }

  @Mutation(() => Wilder)
  async addWilder(
    @Arg("name") name: string,
    @Arg("city") city: string,
    @Arg("email") email: string
  ): Promise<Wilder> {
    const wilderToCreate = new Wilder();
    wilderToCreate.name = name;
    wilderToCreate.city = city;
    wilderToCreate.email = email;
    return await dataSource.manager.save(Wilder, wilderToCreate);
  }
}
