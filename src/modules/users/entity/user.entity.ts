import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { UserRole } from '../../roles/entity/user_roles.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../roles/entity/roles.entity';
@Entity('Users')
export class User {
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'nvidnov', description: 'Логин Пользователя' })
  @Column({ unique: true, nullable: false })
  login: string;

  @ApiProperty({ example: '1234567890', description: 'Пароль Пользователя' })
  @Column({ nullable: false })
  password: string;

  @ApiProperty({ example: 'nikitavidnov@yandex.ru', description: 'Почтовый Адрес' })
  @Column({ unique: true, nullable: false })
  email: string;

  @ApiProperty({ example: [Role], description: 'Роли Пользователя' })
  @OneToMany(() => UserRole, (userRole) => userRole.user)
  userRoles: UserRole[];

  @ApiProperty({ example: 'true', description: 'Заблокирован Аккаунт или нет' })
  @Column({ default: false })
  accountBlocked: boolean;
}
