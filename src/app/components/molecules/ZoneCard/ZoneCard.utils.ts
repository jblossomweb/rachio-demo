import moment from 'moment';
import * as AppTypes from 'app/types';
import { StateString } from 'app/components/atoms/StatusChip';

export const defaultZoneRuns = {
  lastRun: undefined,
  nextRun: undefined,
};

export const getZoneRuns = (
  zoneState: AppTypes.ZoneState,
) => ({
  lastRun: (
    zoneState.lastRun ?
    moment(zoneState.lastRun).fromNow() :
    undefined
  ),
  nextRun: (
    zoneState.nextRun ?
    moment(zoneState.nextRun).fromNow() :
    undefined
  ),
});

export const getStatus: (
  zone: AppTypes.Zone,
  deviceOn: AppTypes.Device['on'],
  deviceStatus: AppTypes.Device['status'],
) => StateString = ({ running }, deviceOn, deviceStatus) => {
  if (running) {
    return 'WATERING';
  }
  if (deviceStatus === 'ONLINE') {
    if (deviceOn) {
      return 'IDLE';
    }
    return 'STANDBY';
  }
  return 'OFFLINE';
};
