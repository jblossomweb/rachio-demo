import { IconProps } from '@material-ui/core';
import { Device } from 'app/types';

export const getStatus: (
  device: Device,
) => [
  'WATERING' | 'IDLE' | 'STANDBY' | 'OFFLINE',
  IconProps['children'],
  'blue' | 'red' | 'green' | 'gray',
] = device => {
  if (device.status === 'ONLINE') {
    if (device.on) {
      if (false) {
        // TODO
        return ['WATERING', 'grain', 'blue'];
      }
      return ['IDLE', 'wifi', 'green'];
    }
    return ['STANDBY', 'wifi', 'gray'];
  }
  return ['OFFLINE', 'wifi_off', 'red'];
};
