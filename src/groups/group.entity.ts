import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Device } from '../devices/device.entity';

@Entity('groups')
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  note: string;

  @ManyToMany(() => Device)
  @JoinTable({
    name: 'map_device_group',
    joinColumns: [
      { name: 'group_id', referencedColumnName: 'id' },
    ],
    inverseJoinColumns: [
      { name: 'device_id', referencedColumnName: 'id' },
    ],
  })
  devices: Device[];
}
