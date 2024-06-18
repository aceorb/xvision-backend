import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DeviceStatus } from './enums';

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
}
