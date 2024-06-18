import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DeviceStatus } from './enums';
import { DeviceDto } from './dtos/device.dto';
import { User } from '../users/user.entity';
import { Group } from '../groups/group.entity';

@Entity('devices')
export class Device {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  serial: string;

  @Column({ type: 'enum', enum: DeviceStatus })
  status: DeviceStatus;

  @Column()
  event: string;

  @Column()
  last_connected: Date;

  @Column('decimal', { precision: 20, scale: 15 })
  latitude: number;

  @Column('decimal', { precision: 20, scale: 15 })
  longitude: number;

  @Column()
  gps_fix: number;

  @Column('decimal', { precision: 4, scale: 2 })
  temperature: number;

  @Column('decimal', { precision: 4, scale: 2 })
  humidity: number;

  @Column('decimal', { precision: 3, scale: 0 })
  battery: Date;

  @Column()
  name: string;

  @Column()
  settings: string;

  @ManyToOne(() => User, user => user.devices)
  user: User;

  @ManyToOne(() => Group, group => group.devices)
  group: Group;


  toDto(): DeviceDto {
    return {
      id: this.id,
      type: this.type,
      serial: this.serial,
      status: this.status,
      event: this.event,
      'last_connected': this.last_connected,
      latitude: this.latitude,
      longitude: this.longitude,
      'gps_fix': this.gps_fix,
      temperature: this.temperature,
      humidity: this.humidity,
      battery: this.battery,
      name: this.name,
      settings: this.settings,
      group: this.group,
    };
  }
}
