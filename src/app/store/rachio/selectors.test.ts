import { fromJS } from 'immutable';
import concat from 'lodash/concat';
import { getInitialState } from 'core/store';

import * as AppTypes from 'app/types';
import mockPerson from 'app/__mocks__/person.json';
import mockErrors from 'app/__mocks__/errors.json';

import paths from './paths';
import * as DataTypes from './dataTypes';
import * as selectors from './selectors';

const mockDevices = mockPerson.devices;
const mockZones = mockDevices.reduce((
  zones: AppTypes.Zone[],
  device,
) => concat(
  zones,
  (device.zones || []).map(zone => ({
    ...zone,
    deviceId: device.id,
  })),
), []);

describe('store/person/selectors', () => {

  describe('getPerson', () => {
    const path = concat(['app'], paths.person());
    const value = fromJS(mockPerson);
    const state = getInitialState().setIn(path, value);
    it('should select value from person', () => {
      const selected = selectors.getPerson(state);
      expect(selected).toEqual(value);
    });
  });

  describe('getPersonId', () => {
    const path = concat(['app'], paths.person());
    it('should select value from id', () => {
      const person = fromJS(mockPerson);
      const state = getInitialState().setIn(path, person);
      const selected = selectors.getPersonId(state);
      expect(selected).toEqual(mockPerson.id);
    });
    it('should select undefined if person is undefined', () => {
      const state = getInitialState().setIn(path, undefined);
      const selected = selectors.getPersonId(state);
      expect(selected).toEqual(undefined);
    });
  });

  describe('getThinking', () => {
    const path = concat(['app'], paths.thinking());
    const state = getInitialState().setIn(path, true);
    it('should select value from thinking', () => {
      const selected = selectors.getThinking(state);
      expect(selected).toEqual(true);
    });
  });

  describe('getPolling', () => {
    const path = concat(['app'], paths.polling());
    const state = getInitialState().setIn(path, true);
    it('should select value from polling', () => {
      const selected = selectors.getPolling(state);
      expect(selected).toEqual(true);
    });
  });

  describe('getErrors', () => {
    const path = concat(['app'], paths.errors());
    const { errors } = mockErrors;
    const state = getInitialState().setIn(path, fromJS(errors));
    it('should select value from errors', () => {
      const selected = selectors.getErrors(state);
      expect(selected).toEqual(fromJS(errors));
    });
  });

  describe('getDevices', () => {
    const path = concat(['app'], paths.devices());
    const state = getInitialState().setIn(path, fromJS(mockDevices));
    it('should select value sequence from devices, ordered by createDate', () => {
      const selected = selectors.getDevices(state);
      const expected = fromJS(mockDevices).valueSeq().sortBy(
        (device: DataTypes.Device) => device.get('createDate')
      );
      expect(selected).toEqual(expected);
    });
  });

  describe('getDeviceIds', () => {
    const path = concat(['app'], paths.devices());
    const state = getInitialState().setIn(path, fromJS(mockDevices));
    it('should select sequence of device ids from devices', () => {
      const selected = selectors.getDeviceIds(state);
      const expected = fromJS(mockDevices).valueSeq().map(
        (device: DataTypes.Device) => device.get('id')
      );
      expect(selected).toEqual(expected);
    });
  });

  describe('getNumDevices', () => {
    const path = concat(['app'], paths.devices());
    const state = getInitialState().setIn(path, fromJS(mockDevices));
    it('should select accurate count of devices', () => {
      const selected = selectors.getNumDevices(state);
      const expected = mockDevices.length;
      expect(selected).toEqual(expected);
    });
  });

  describe('getDevicesLoaded', () => {
    const path = concat(['app'], paths.devices());
    it('should select true if devices have been loaded', () => {
      const state = getInitialState().setIn(path, fromJS(mockDevices));
      const selected = selectors.getDevicesLoaded(state);
      expect(selected).toBe(true);
    });
    it('should select true if devices have been loaded, and none were found', () => {
      const state = getInitialState().setIn(path, fromJS([]));
      const selected = selectors.getDevicesLoaded(state);
      expect(selected).toBe(true);
    });
    it('should select false if devices have not been loaded', () => {
      const state = getInitialState().setIn(path, undefined);
      const selected = selectors.getDevicesLoaded(state);
      expect(selected).toBe(false);
    });
  });

  describe('getDevice', () => {
    const path = concat(['app'], paths.devices());
    const state = getInitialState().setIn(path, fromJS(mockDevices));
    const getDevice = selectors.getDevice(state);
    it('should select a function', () => {
      expect(getDevice).toBeInstanceOf(Function);
    });
    it('function selects device by id', () => {
      const device = mockDevices[0];
      const selected = getDevice(device.id);
      expect(selected).toEqual(fromJS(device));
    });
  });

  describe('getDeviceOn', () => {
    const path = concat(['app'], paths.devices());
    const state = getInitialState().setIn(path, fromJS(mockDevices));
    const getDeviceOn = selectors.getDeviceOn(state);
    it('should select a function', () => {
      expect(getDeviceOn).toBeInstanceOf(Function);
    });
    it('function selects device on by id', () => {
      const device = mockDevices[0];
      const selected = getDeviceOn(device.id);
      expect(selected).toEqual(device.on);
    });
  });

  describe('getDeviceStatus', () => {
    const path = concat(['app'], paths.devices());
    const state = getInitialState().setIn(path, fromJS(mockDevices));
    const getDeviceStatus = selectors.getDeviceStatus(state);
    it('should select a function', () => {
      expect(getDeviceStatus).toBeInstanceOf(Function);
    });
    it('function selects device status by id', () => {
      const device = mockDevices[0];
      const selected = getDeviceStatus(device.id);
      expect(selected).toEqual(device.status);
    });
  });

  describe('getDeviceName', () => {
    const path = concat(['app'], paths.devices());
    const state = getInitialState().setIn(path, fromJS(mockDevices));
    const getDeviceName = selectors.getDeviceName(state);
    it('should select a function', () => {
      expect(getDeviceName).toBeInstanceOf(Function);
    });
    it('function selects device name by id', () => {
      const device = mockDevices[0];
      const selected = getDeviceName(device.id);
      expect(selected).toEqual(device.name);
    });
  });

  describe('getZones', () => {
    const path = concat(['app'], paths.zones());
    const state = getInitialState().setIn(path, fromJS(mockZones));
    it('should select value sequence from zones', () => {
      const selected = selectors.getZones(state);
      const expected = fromJS(mockZones).valueSeq();
      expect(selected).toEqual(expected);
    });
  });

  describe('getDeviceZones', () => {
    const path = concat(['app'], paths.zones());
    const state = getInitialState().setIn(path, fromJS(mockZones));
    const getDeviceZones = selectors.getDeviceZones(state);
    it('should select a function', () => {
      expect(getDeviceZones).toBeInstanceOf(Function);
    });
    it('function selects sequence of zones by device id, sorted by zoneNumber', () => {
      const { deviceId } = mockZones[0];
      const expected = fromJS(mockZones).filter(
        (zone: DataTypes.Zone) => zone.get('deviceId') === deviceId,
      )
      .toSeq()
      .sortBy((zone: DataTypes.Zone) => zone.get('zoneNumber'))
      const selected = getDeviceZones(deviceId);
      expect(selected).toEqual(expected);
    });
  });

  describe('getDeviceNumZones', () => {
    const path = concat(['app'], paths.zones());
    const state = getInitialState().setIn(path, fromJS(mockZones));
    const getDeviceNumZones = selectors.getDeviceNumZones(state);
    it('should select a function', () => {
      expect(getDeviceNumZones).toBeInstanceOf(Function);
    });
    it('function selects accurate count of zones by device id', () => {
      const { deviceId } = mockZones[0];
      const expected = fromJS(mockZones).filter(
        (zone: DataTypes.Zone) => zone.get('deviceId') === deviceId,
      ).size;
      const selected = getDeviceNumZones(deviceId);
      expect(selected).toEqual(expected);
    });
    it('function selects 0 when zones is empty', () => {
      const zeroState = getInitialState().setIn(path, fromJS([]));
      const selectedFunction = selectors.getDeviceNumZones(zeroState);
      const { deviceId } = mockZones[0];
      const selected = selectedFunction(deviceId);
      expect(selected).toEqual(0);
    });
    it('function selects 0 when zones is undefined', () => {
      const zeroState = getInitialState().setIn(path, undefined);
      const selectedFunction = selectors.getDeviceNumZones(zeroState);
      const { deviceId } = mockZones[0];
      const selected = selectedFunction(deviceId);
      expect(selected).toEqual(0);
    });
  });

  describe('getDeviceZoneIds', () => {
    const path = concat(['app'], paths.zones());
    const state = getInitialState().setIn(path, fromJS(mockZones));
    const getDeviceZoneIds = selectors.getDeviceZoneIds(state);
    it('should select a function', () => {
      expect(getDeviceZoneIds).toBeInstanceOf(Function);
    });
    it('function selects sequence of zone ids by device id, ordered by zone number', () => {
      const { deviceId } = mockZones[0];
      const expected = fromJS(mockZones).filter(
        (zone: DataTypes.Zone) => zone.get('deviceId') === deviceId,
      )
      .toSeq()
      .sortBy((zone: DataTypes.Zone) => zone.get('zoneNumber'))
      .map(
        (zone: DataTypes.Zone) => zone.get('id')
      )
      ;
      const selected = getDeviceZoneIds(deviceId);
      expect(selected).toEqual(expected);
    });
  });

  describe('getDeviceZoneIdsArray', () => {
    const path = concat(['app'], paths.zones());
    const state = getInitialState().setIn(path, fromJS(mockZones));
    const getDeviceZoneIdsArray = selectors.getDeviceZoneIdsArray(state);
    it('should select a function', () => {
      expect(getDeviceZoneIdsArray).toBeInstanceOf(Function);
    });
    it('function selects array of zone ids by device id, ordered by zone number', () => {
      const { deviceId } = mockZones[0];
      const expected = fromJS(mockZones).filter(
        (zone: DataTypes.Zone) => zone.get('deviceId') === deviceId,
      )
      .toSeq()
      .sortBy((zone: DataTypes.Zone) => zone.get('zoneNumber'))
      .map(
        (zone: DataTypes.Zone) => zone.get('id')
      )
      .toArray()
      ;
      const selected = getDeviceZoneIdsArray(deviceId);
      expect(selected).toEqual(expected);
    });
  });

});
