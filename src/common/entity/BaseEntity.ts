import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { tags } from 'typia';

@Entity()
export class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created!: Date;

  @UpdateDateColumn()
  updated!: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}

export type IBaseEntity = {
  id: number & tags.Type<'int32'>;
  created: Date & tags.Format<'date-time'>;
  updated: Date & tags.Format<'date-time'>;
  deletedAt?: undefined | null | (Date & tags.Format<'date-time'>);
};
