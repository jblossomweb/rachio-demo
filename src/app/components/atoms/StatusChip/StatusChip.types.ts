import { IconProps } from '@material-ui/core';

export type StateString = 'WATERING' | 'IDLE' | 'STANDBY' | 'OFFLINE' | 'EXTENDED_OFFLINE' | 'UNKNOWN';
export type StateColor = 'blue' | 'red' | 'green' | 'gray';
export type State = [
  StateString,
  IconProps['children'],
 StateColor,
];
export interface States {
  [key: string]: State,
};
