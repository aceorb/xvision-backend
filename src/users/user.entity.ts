import { BeforeInsert, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { hash } from 'bcrypt';
import { Device } from '../devices/device.entity';
import { Group } from '../groups/group.entity';

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

  @Column()
  active: number;

  @Column()
  address: string;

  @Column()
  api_key: string;

  @ManyToMany(() => Device)
  @JoinTable({
    name: 'map_device_user',
    joinColumns: [
      { name: 'user_id', referencedColumnName: 'id' },
    ],
    inverseJoinColumns: [
      { name: 'device_id', referencedColumnName: 'id' },
    ],
  })
  devices: Device[];

  @ManyToMany(() => Group)
  @JoinTable({
    name: 'map_group_user',
    joinColumns: [
      { name: 'user_id', referencedColumnName: 'id' },
    ],
    inverseJoinColumns: [
      { name: 'group_id', referencedColumnName: 'id' },
    ],
  })
  groups: Group[];

  @BeforeInsert()
  preProcess() {
    return hash(this.password, 10).then(encrypted => this.password = encrypted);
  }
}
