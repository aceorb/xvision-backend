import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Device } from '../devices/device.entity';
import { GroupDto } from './dtos/group.dto';
import { User } from '../users/user.entity';

@Entity('groups')
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  note: string;

  @OneToMany(() => Device, device => device.group)
  devices: Device[];

  @ManyToOne(() => User, user => user.groups)
  user: User;

  toDto(): GroupDto {
    return {
      id: this.id,
      name: this.name,
      note: this.note,
      devices: this.devices.map(device => device.toDto())
    };
  }
}
