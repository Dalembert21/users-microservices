import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('user_read_model')
export class UserReadEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  email: string;

  @Column()
  fullName: string;

  @Column({ type: 'timestamp' })
  createdAt: Date;

  @Column({ default: 0 })
  postsCount: number;

  @Column({ type: 'timestamp', nullable: true })
  lastLogin: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
