import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('UserRoles')
export class UserRoles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  roleId: number;

  @Column({ nullable: false })
  userId: number;

  @Column()
  description: string;
}
