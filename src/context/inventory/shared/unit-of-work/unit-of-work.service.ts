import { Injectable, Scope } from '@nestjs/common';
import {
  DataSource,
  EntityManager,
  EntitySchema,
  ObjectType,
  QueryRunner,
  Repository,
} from 'typeorm';

@Injectable({ scope: Scope.REQUEST })
export class UnitOfWorkService {
  private queryRunner: QueryRunner;
  private entityManager: EntityManager;
  private transactionStarted = false;
  private transactionCommitted = false;

  constructor(private dataSource: DataSource) {}

  getRepository<Entity>(
    target: ObjectType<Entity> | EntitySchema<Entity> | string,
  ): Repository<Entity> {
    if (!this.entityManager) {
      return this.dataSource.getRepository(target);
    }

    return this.entityManager.getRepository(target);
  }

  async startTransaction(): Promise<any> {
    this.queryRunner = this.dataSource.createQueryRunner();
    this.entityManager = this.queryRunner.manager;
    await this.queryRunner.startTransaction();
    this.transactionStarted = true;
  }

  async commitTransaction(): Promise<any> {
    await this.queryRunner.commitTransaction();
    this.transactionCommitted = true;
  }

  async rollbackTransaction(): Promise<any> {
    if (this.transactionStarted && !this.transactionCommitted) {
      await this.queryRunner.rollbackTransaction();
    }
  }

  async release(): Promise<any> {
    await this.queryRunner.release();
    this.entityManager = null;
    this.transactionStarted = false;
    this.transactionCommitted = false;
  }
}
