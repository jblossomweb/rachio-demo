import { Device } from 'app/types';
import { StateString } from 'app/components/atoms/StatusChip';

export const getStatus: (
  device: Device,
) => StateString = ({
  state,
  status,
  on,
}) => {
  // use explicit state if available
  if (state?.state) {
    return state.state;
  }
  // fallback to interpreting status and on/off
  if (status === 'ONLINE') {
    if (on) {
      return 'IDLE';
    }
    return 'STANDBY';
  }
  return 'OFFLINE';
};
