import mockDevice from 'app/__mocks__/device.json';
import mockZone from 'app/__mocks__/zone.json';
import * as utils from './ZoneCard.utils';

describe('components/molecules/ZoneCard/ZoneCard.utils', () => {
  describe('getStatus', () => {
    it('should return WATERING if zone.running', () => {
      const zone: any = {
        ...mockZone,
        running: true,
      };
      const device: any = {
        ...mockDevice,
      };
      const status = utils.getStatus(zone, device.on, device.status);
      expect(status).toEqual('WATERING');
    });

    it('should return IDLE if zone.running is not true, deviceStatus is ONLINE, and device is on', () => {
      const zone: any = {
        ...mockZone,
        running: false,
      };
      const device: any = {
        ...mockDevice,
        on: true,
        status: 'ONLINE',
      };
      const status = utils.getStatus(zone, device.on, device.status);
      expect(status).toEqual('IDLE');
    });

    it('should return STANDBY if zone.running is not true, deviceStatus is ONLINE, and device is off', () => {
      const zone: any = {
        ...mockZone,
        running: false,
      };
      const device: any = {
        ...mockDevice,
        on: false,
        status: 'ONLINE',
      };
      const status = utils.getStatus(zone, device.on, device.status);
      expect(status).toEqual('STANDBY');
    });

    it('should return OFFLINE if zone.running is not true, and deviceStatus is OFFLINE', () => {
      const zone: any = {
        ...mockZone,
        running: false,
      };
      const device: any = {
        status: 'OFFLINE',
      };
      const status = utils.getStatus(zone, device.on, device.status);
      expect(status).toEqual('OFFLINE');
    });

    it('should return OFFLINE if zone.running is not true, and deviceStatus is not ONLINE', () => {
      const zone: any = {
        ...mockZone,
        running: false,
      };
      const device: any = {
        status: 'invalidasdf',
      };
      const status = utils.getStatus(zone, device.on, device.status);
      expect(status).toEqual('OFFLINE');
    });
  });
});
