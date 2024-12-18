import { Injectable, Scope } from '@nestjs/common';
import {
  DataSource,
  EntityManager,
  EntitySchema,
  ObjectType,
  Repository,
} from 'typeorm';

@Injectable({ scope: Scope.REQUEST })
export class UnitOfWorkService {
  private entityManager: EntityManager;

  constructor(private dataSource: DataSource) {}

  getRepository<Entity>(
    target: ObjectType<Entity> | EntitySchema<Entity> | string,
  ): Repository<Entity> {
    if (!this.entityManager) {
      return this.dataSource.getRepository(target);
    }

    return this.entityManager.getRepository(target);
  }

  async transaction<T>(work: () => T): Promise<T> {
    const queryRunner = this.dataSource.createQueryRunner();
    this.entityManager = queryRunner.manager;

    await queryRunner.startTransaction();

    try {
      const result = await work();
      await queryRunner.commitTransaction();
      return result;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
      this.entityManager = null;
    }
  }
}
