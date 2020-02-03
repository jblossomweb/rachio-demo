import mockDevice from 'app/__mocks__/device.json';
import * as utils from './DeviceCard.utils';

describe('components/molecules/DeviceCard/DeviceCard.utils', () => {
  describe('getStatus', () => {
    it('should return device.state.state if found', () => {
      const device: any = {
        ...mockDevice,
        state: {
          state: 'WATERING',
        }
      };
      const status = utils.getStatus(device);
      expect(status).toEqual(device.state.state);
    });

    it('should return IDLE if ONLINE and on, when device.state is not found', () => {
      const device: any = {
        ...mockDevice,
        state: undefined,
        status: 'ONLINE',
        on: true,
      };
      const status = utils.getStatus(device);
      expect(status).toEqual('IDLE');
    });

    it('should return STANDBY if ONLINE and off, when device.state is not found', () => {
      const device: any = {
        ...mockDevice,
        state: undefined,
        status: 'ONLINE',
        on: false,
      };
      const status = utils.getStatus(device);
      expect(status).toEqual('STANDBY');
    });

    it('should return OFFLINE if OFFLINE, when device.state is not found', () => {
      const device: any = {
        ...mockDevice,
        state: undefined,
        status: 'OFFLINE',
      };
      const status = utils.getStatus(device);
      expect(status).toEqual('OFFLINE');
    });

    it('should return OFFLINE if status is not ONLINE, when device.state is not found', () => {
      const device: any = {
        ...mockDevice,
        state: undefined,
        status: 'invalidfdsfdsf',
        on: false,
      };
      const status = utils.getStatus(device);
      expect(status).toEqual('OFFLINE');
    });
  });
});
