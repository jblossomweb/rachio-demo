import { States } from './StatusChip.types';

export const STATES: States = {
  WATERING: ['WATERING', 'grain', 'blue'],
  IDLE: ['IDLE', 'wifi', 'green'],
  STANDBY: ['STANDBY', 'wifi', 'gray'],
  OFFLINE: ['OFFLINE', 'wifi_off', 'red'],
  EXTENDED_OFFLINE: ['OFFLINE', 'wifi_off', 'red'],
  UNKNOWN: ['UNKNOWN', 'help', 'gray'],
};
