import { Role } from 'src/modules/roles/entity/roles.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';

@Entity('Users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  login: string;

  @Column({ nullable: false })
  password: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @ManyToMany(() => Role, (role) => role.users)
  roles: Role[];

  @Column({ default: false })
  accountBlocked: boolean;
}
