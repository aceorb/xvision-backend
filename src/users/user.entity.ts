import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { hash } from 'bcrypt';
import { Device } from '../devices/device.entity';
import { Group } from '../groups/group.entity';
import { UserDto } from './user.dto';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  active: number;

  @Column({ nullable: true, default: undefined })
  address: string;

  @Column({ nullable: true, default: undefined })
  api_key: string;

  @OneToMany(() => Device, device => device.user)
  devices: Device[];

  @OneToMany(() => Group, group => group.user)
  groups: Group[];

  @BeforeInsert()
  preProcess() {
    return hash(this.password, 10).then(encrypted => this.password = encrypted);
  }

  toDto(): UserDto {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      active: this.active,
      address: this.address,
      api_key: this.api_key
    };
  }
}
