import { IconProps } from '@material-ui/core';
import { Device } from 'app/types';

export type DeviceStateString = 'WATERING' | 'IDLE' | 'STANDBY' | 'OFFLINE';
export type DeviceStateColor = 'blue' | 'red' | 'green' | 'gray';
export type DeviceState = [
  DeviceStateString,
  IconProps['children'],
  DeviceStateColor,
];
export interface DeviceStates {
  [key: string]: DeviceState,
};

export const deviceStatus: DeviceStates = {
  WATERING: ['WATERING', 'grain', 'blue'],
  IDLE: ['IDLE', 'wifi', 'green'],
  STANDBY: ['STANDBY', 'wifi', 'gray'],
  OFFLINE: ['OFFLINE', 'wifi_off', 'red'],
};

export const getStatus: (
  device: Device,
) => [
  DeviceStateString,
  IconProps['children'],
  DeviceStateColor,
] = device => {
  // use explicit state if available
  if (device?.state?.state) {
    return deviceStatus[device.state.state];
  }
  // fallback to interpreting status and on/off
  if (device?.status === 'ONLINE') {
    if (device.on) {
      return deviceStatus.IDLE;
    }
    return deviceStatus.STANDBY;
  }
  return deviceStatus.OFFLINE;
};
