import { fromJS } from 'immutable';
import clone from 'lodash/cloneDeep';
import omit from 'lodash/omit';
import { AppReducer, getInitialState } from 'core/store';

import mockPerson from 'app/__mocks__/person.json';
import mockDevice from 'app/__mocks__/device.json';
import mockDeviceState from 'app/__mocks__/deviceState.json';
import mockCurrentRunningZone from 'app/__mocks__/curentRunningZone.json';
import mockZoneSummary from 'app/__mocks__/zoneSummary.json';
import mockZone from 'app/__mocks__/zone.json';
import mockErrors from 'app/__mocks__/errors.json';

import * as AppTypes from 'app/types';
import { Types as Legacy } from 'app/services/legacy';
import * as actionTypes from './types';
import actionReducers from './reducers';
import paths from '../paths';

describe('store/rachio/action/reducers', () => {

  describe('RACHIO_GET_SELF_ID', () => {
    const action: actionTypes.Interface['RACHIO_GET_SELF_ID'] = {
      type: 'RACHIO_GET_SELF_ID',
    };
    const reducer = actionReducers[action.type] as AppReducer;

    it('should set thinking to true', () => {
      const path = paths.thinking();
      const state = getInitialState().setIn(path, undefined);
      expect(state.getIn(path)).toEqual(undefined);
      const newState = reducer(state, action);
      expect(newState.getIn(path)).toEqual(true);
    });
  });

  describe('RACHIO_GET_SELF_ID_SUCCESS', () => {
    const response = { id: mockPerson.id };
    const action: actionTypes.Interface['RACHIO_GET_SELF_ID_SUCCESS'] = {
      type: 'RACHIO_GET_SELF_ID_SUCCESS',
      payload: {
        response,
      },
    };
    const reducer = actionReducers[action.type] as AppReducer;

    it('should set thinking to false', () => {
      const path = paths.thinking();
      const state = getInitialState().setIn(path, true);
      expect(state.getIn(path)).toEqual(true);
      const newState = reducer(state, action);
      expect(newState.getIn(path)).toEqual(false);
    });

    it('should set errors to null', () => {
      const path = paths.errors();
      const state = getInitialState().setIn(path, mockErrors);
      expect(state.getIn(path)).toEqual(mockErrors);
      const newState = reducer(state, action);
      expect(newState.getIn(path)).not.toEqual(mockErrors);
      expect(newState.getIn(path)).toEqual(null);
    });

    it('should set id to payload.response.id', () => {
      const path = paths.id();
      const state = getInitialState().setIn(path, undefined);
      expect(state.getIn(path)).toEqual(undefined);
      const newState = reducer(state, action);
      expect(newState.getIn(path)).toEqual(response.id);
    });
  });

  describe('RACHIO_GET_PERSON', () => {
    const action: actionTypes.Interface['RACHIO_GET_PERSON'] = {
      type: 'RACHIO_GET_PERSON',
    };
    const reducer = actionReducers[action.type] as AppReducer;

    it('should set thinking to true', () => {
      const path = paths.thinking();
      const state = getInitialState().setIn(path, undefined);
      expect(state.getIn(path)).toEqual(undefined);
      const newState = reducer(state, action);
      expect(newState.getIn(path)).toEqual(true);
    });
  });

  describe('RACHIO_GET_PERSON_SUCCESS', () => {
    const response = mockPerson as AppTypes.RawPerson;
    const action: actionTypes.Interface['RACHIO_GET_PERSON_SUCCESS'] = {
      type: 'RACHIO_GET_PERSON_SUCCESS',
      payload: {
        response,
      },
    };
    const reducer = actionReducers[action.type] as AppReducer;

    it('should set thinking to false', () => {
      const path = paths.thinking();
      const state = getInitialState().setIn(path, true);
      expect(state.getIn(path)).toEqual(true);
      const newState = reducer(state, action);
      expect(newState.getIn(path)).toEqual(false);
    });

    it('should set errors to null', () => {
      const path = paths.errors();
      const state = getInitialState().setIn(path, mockErrors);
      expect(state.getIn(path)).toEqual(mockErrors);
      const newState = reducer(state, action);
      expect(newState.getIn(path)).not.toEqual(mockErrors);
      expect(newState.getIn(path)).toEqual(null);
    });

    it('should set person to payload.response, omitting devices', () => {
      const path = paths.person();
      const state = getInitialState().setIn(path, undefined);
      expect(state.getIn(path)).toEqual(undefined);
      const newState = reducer(state, action);
      expect(newState.getIn(path)).toEqual(fromJS(omit(response, ['devices'])));
    });

    it('should set devices, tagged with personId, omitting zones', () => {
      const path = paths.devices();
      const state = getInitialState().setIn(path, undefined);
      expect(state.getIn(path)).toEqual(undefined);
      const newState = reducer(state, action);
      expect(newState.getIn(path)).toEqual(fromJS(response.devices.reduce(
        (devices, device) => ({
          ...devices,
          [device.id]: {
            ...omit(device, ['zones']),
            personId: response.id,
          },
        }),
        {},
      )));
    });

    it('should set zones, tagged with deviceId', () => {
      const path = paths.zones();
      const state = getInitialState().setIn(path, undefined);
      expect(state.getIn(path)).toEqual(undefined);
      const newState = reducer(state, action);
      expect(newState.getIn(path)).toEqual(fromJS(response.devices.reduce(
        (zones, device) => ({
          ...zones,
          ...device.zones.reduce(
            (deviceZones, zone) => ({
              ...deviceZones,
              [zone.id]: {
                ...zone,
                deviceId: device.id,
              },
            }),
            {},
          ),
        }),
        {},
      )));
    });
  });

  describe('RACHIO_API_ERROR', () => {
    const response = mockErrors;
    const action: actionTypes.Interface['RACHIO_API_ERROR'] = {
      type: 'RACHIO_API_ERROR',
      payload: {
        response,
      },
    };
    const reducer = actionReducers[action.type] as AppReducer;

    it('should set thinking to false', () => {
      const path = paths.thinking();
      const state = getInitialState().setIn(path, true);
      expect(state.getIn(path)).toEqual(true);
      const newState = reducer(state, action);
      expect(newState.getIn(path)).toEqual(false);
    });

    it('should set errors to payload', () => {
      const path = paths.errors();
      const state = getInitialState().setIn(path, undefined);
      expect(state.getIn(path)).toEqual(undefined);
      const newState = reducer(state, action);
      expect(newState.getIn(path)).not.toEqual(undefined);
      expect(newState.getIn(path)).not.toEqual(null);
      expect(newState.getIn(path)).toEqual(fromJS(action.payload.response.errors));
    });
  });

  describe('RACHIO_PUT_DEVICE_ON', () => {
    const { id } = mockDevice;
    const action: actionTypes.Interface['RACHIO_PUT_DEVICE_ON'] = {
      type: 'RACHIO_PUT_DEVICE_ON',
      payload: {
        id,
      }

    };
    const reducer = actionReducers[action.type] as AppReducer;

    it('should set thinking to true', () => {
      const path = paths.thinking();
      const state = getInitialState().setIn(path, undefined);
      expect(state.getIn(path)).toEqual(undefined);
      const newState = reducer(state, action);
      expect(newState.getIn(path)).toEqual(true);
    });
  });

  describe('RACHIO_PUT_DEVICE_ON_SUCCESS', () => {
    const { id } = mockDevice;
    const action: actionTypes.Interface['RACHIO_PUT_DEVICE_ON_SUCCESS'] = {
      type: 'RACHIO_PUT_DEVICE_ON_SUCCESS',
      payload: {
        id,
      },
    };
    const reducer = actionReducers[action.type] as AppReducer;

    it('should set thinking to false', () => {
      const path = paths.thinking();
      const state = getInitialState().setIn(path, true);
      expect(state.getIn(path)).toEqual(true);
      const newState = reducer(state, action);
      expect(newState.getIn(path)).toEqual(false);
    });

    it('should set errors to null', () => {
      const path = paths.errors();
      const state = getInitialState().setIn(path, mockErrors);
      expect(state.getIn(path)).toEqual(mockErrors);
      const newState = reducer(state, action);
      expect(newState.getIn(path)).not.toEqual(mockErrors);
      expect(newState.getIn(path)).toEqual(null);
    });

    it('should set device on to true for payload.id', () => {
      const path = paths.deviceOn(action.payload.id);
      const state = getInitialState().setIn(path, false);
      expect(state.getIn(path)).toEqual(false);
      const newState = reducer(state, action);
      expect(newState.getIn(path)).toEqual(true);
    });
  });

  describe('RACHIO_PUT_DEVICE_OFF', () => {
    const { id } = mockDevice;
    const action: actionTypes.Interface['RACHIO_PUT_DEVICE_OFF'] = {
      type: 'RACHIO_PUT_DEVICE_OFF',
      payload: {
        id,
      }

    };
    const reducer = actionReducers[action.type] as AppReducer;

    it('should set thinking to true', () => {
      const path = paths.thinking();
      const state = getInitialState().setIn(path, undefined);
      expect(state.getIn(path)).toEqual(undefined);
      const newState = reducer(state, action);
      expect(newState.getIn(path)).toEqual(true);
    });
  });

  describe('RACHIO_PUT_DEVICE_OFF_SUCCESS', () => {
    const { id } = mockDevice;
    const action: actionTypes.Interface['RACHIO_PUT_DEVICE_OFF_SUCCESS'] = {
      type: 'RACHIO_PUT_DEVICE_OFF_SUCCESS',
      payload: {
        id,
      },
    };
    const reducer = actionReducers[action.type] as AppReducer;

    it('should set thinking to false', () => {
      const path = paths.thinking();
      const state = getInitialState().setIn(path, true);
      expect(state.getIn(path)).toEqual(true);
      const newState = reducer(state, action);
      expect(newState.getIn(path)).toEqual(false);
    });

    it('should set errors to null', () => {
      const path = paths.errors();
      const state = getInitialState().setIn(path, mockErrors);
      expect(state.getIn(path)).toEqual(mockErrors);
      const newState = reducer(state, action);
      expect(newState.getIn(path)).not.toEqual(mockErrors);
      expect(newState.getIn(path)).toEqual(null);
    });

    it('should set device on to false for payload.id', () => {
      const path = paths.deviceOn(action.payload.id);
      const state = getInitialState().setIn(path, true);
      expect(state.getIn(path)).toEqual(true);
      const newState = reducer(state, action);
      expect(newState.getIn(path)).toEqual(false);
    });
  });

  describe('RACHIO_GET_DEVICE_STATE', () => {
    const { id } = mockDevice;
    const action: actionTypes.Interface['RACHIO_GET_DEVICE_STATE'] = {
      type: 'RACHIO_GET_DEVICE_STATE',
      payload: {
        id,
      }
    };
    const reducer = actionReducers[action.type] as AppReducer;

    it('should set polling to true', () => {
      const path = paths.polling();
      const state = getInitialState().setIn(path, undefined);
      expect(state.getIn(path)).toEqual(undefined);
      const newState = reducer(state, action);
      expect(newState.getIn(path)).toEqual(true);
    });
  });

  describe('RACHIO_GET_DEVICE_STATE_SUCCESS', () => {
    
    const reducer = actionReducers.RACHIO_GET_DEVICE_STATE_SUCCESS as AppReducer;

    describe('received invalid response.state', () => {
      const response = clone(mockDeviceState) as Legacy.ResponseInterface['getDeviceStateSuccess'];
      const invalidResponse: any = {
        ...response,
        state: undefined,
      };
      const action: actionTypes.Interface['RACHIO_GET_DEVICE_STATE_SUCCESS'] = {
        type: 'RACHIO_GET_DEVICE_STATE_SUCCESS',
        payload: {
          response: invalidResponse,
        },
      };
      it('should set polling to false', () => {
        const path = paths.polling();
        const state = getInitialState().setIn(path, true);
        expect(state.getIn(path)).toEqual(true);
        const newState = reducer(state, action);
        expect(newState.getIn(path)).toEqual(false);
      });
  
      it('should set invalid response error if no errors', () => {
        const path = paths.errors();
        const state = getInitialState().setIn(path, undefined);
        expect(state.getIn(path)).toEqual(undefined);
        const newState = reducer(state, action);
        expect(newState.getIn(path)).not.toEqual(undefined);
        expect(newState.getIn(path)).toEqual(fromJS([
          { message: `Invalid Response from getDeviceState` }
        ]));
      });

      it('should append invalid response error if errors exist', () => {
        const existingErrors = fromJS(mockErrors.errors);
        const path = paths.errors();
        const state = getInitialState().setIn(path, existingErrors);
        expect(state.getIn(path)).not.toEqual(undefined);
        expect(state.getIn(path)).toEqual(existingErrors);
        const newState = reducer(state, action);
        expect(newState.getIn(path)).not.toEqual(existingErrors);
        expect(newState.getIn(path)).toEqual(fromJS([
          ...mockErrors.errors,
          { message: `Invalid Response from getDeviceState` }
        ]));
      });
    });
    
    describe('received currentRunningZone', () => {
      const response = clone(mockDeviceState) as Legacy.ResponseInterface['getDeviceStateSuccess'];
      response.state.currentRunningZone = mockCurrentRunningZone;
      const action: actionTypes.Interface['RACHIO_GET_DEVICE_STATE_SUCCESS'] = {
        type: 'RACHIO_GET_DEVICE_STATE_SUCCESS',
        payload: {
          response,
        },
      };
      it('should set polling to false', () => {
        const path = paths.polling();
        const state = getInitialState().setIn(path, true);
        expect(state.getIn(path)).toEqual(true);
        const newState = reducer(state, action);
        expect(newState.getIn(path)).toEqual(false);
      });
  
      it('should set errors to null', () => {
        const path = paths.errors();
        const state = getInitialState().setIn(path, mockErrors);
        expect(state.getIn(path)).toEqual(mockErrors);
        const newState = reducer(state, action);
        expect(newState.getIn(path)).not.toEqual(mockErrors);
        expect(newState.getIn(path)).toEqual(null);
      });

      it('should set deviceState to response.state for correct device', () => {
        const { deviceId } = response.state;
        const devicesPath = paths.devices();
        const deviceStatePath = paths.deviceState(deviceId);
        const state = getInitialState()
          .setIn(devicesPath, fromJS({
            foo: mockDevice,
            bar: mockDevice,
            [deviceId]: {
              ...mockDevice,
              id: deviceId,
            }
          }))
        ;
        expect(state.getIn(deviceStatePath)).toEqual(undefined);
        expect(state.getIn(paths.deviceState('foo'))).toEqual(undefined);
        expect(state.getIn(paths.deviceState('bar'))).toEqual(undefined);
        const newState = reducer(state, action);
        expect(newState.getIn(deviceStatePath)).not.toEqual(undefined);
        expect(newState.getIn(deviceStatePath)).toEqual(fromJS(response.state));
        expect(newState.getIn(paths.deviceState('foo'))).toEqual(undefined);
        expect(newState.getIn(paths.deviceState('bar'))).toEqual(undefined);
      });

      it('should set zoneRunning to true for zone with matching device id and zone number in payload', () => {
        const { deviceId } = response.state;
        const zonesPath = paths.zones();
        const zoneRunningPath = paths.zoneRunning(mockZone.id);
        const state = getInitialState()
          .setIn(zonesPath, fromJS({
            foo: mockZone,
            bar: mockZone,
            [mockZone.id]: {
              ...mockZone,
              zoneNumber: mockCurrentRunningZone.zoneNumber,
              deviceId,
            },
          }))
          .setIn(zoneRunningPath, false)
        ;
        expect(state.getIn(zoneRunningPath)).not.toEqual(true);
        expect(state.getIn(paths.zoneRunning('foo'))).not.toEqual(true);
        expect(state.getIn(paths.zoneRunning('bar'))).not.toEqual(true);
        const newState = reducer(state, action);
        expect(newState.getIn(zoneRunningPath)).toEqual(true);
        expect(newState.getIn(paths.zoneRunning('foo'))).not.toEqual(true);
        expect(newState.getIn(paths.zoneRunning('bar'))).not.toEqual(true);
      });

      it('should not set zoneRunning to true for zone that does not match device id', () => {
        const zonesPath = paths.zones();
        const zoneRunningPath = paths.zoneRunning(mockZone.id);
        const state = getInitialState()
          .setIn(zonesPath, fromJS({
            [mockZone.id]: {
              ...mockZone,
              zoneNumber: mockCurrentRunningZone.zoneNumber,
              deviceId: 'foo',
            },
          }))
        ;
        expect(state.getIn(zoneRunningPath)).not.toEqual(true);
        const newState = reducer(state, action);
        expect(newState.getIn(zoneRunningPath)).not.toEqual(true);
      });

      it('should not set zoneRunning to true for zone that does not match zone number', () => {
        const { deviceId } = response.state;
        const zonesPath = paths.zones();
        const zoneRunningPath = paths.zoneRunning(mockZone.id);
        const state = getInitialState()
          .setIn(zonesPath, fromJS({
            [mockZone.id]: {
              ...mockZone,
              zoneNumber: mockCurrentRunningZone.zoneNumber + 1,
              deviceId,
            },
          }))
        ;
        expect(state.getIn(zoneRunningPath)).not.toEqual(true);
        const newState = reducer(state, action);
        expect(newState.getIn(zoneRunningPath)).not.toEqual(true);
      });
    });

    describe('did not receive currentRunningZone, received device status WATERING', () => {
      const response = clone(mockDeviceState) as Legacy.ResponseInterface['getDeviceStateSuccess'];
      response.state.currentRunningZone = undefined;
      response.state.state = 'WATERING';
      const action: actionTypes.Interface['RACHIO_GET_DEVICE_STATE_SUCCESS'] = {
        type: 'RACHIO_GET_DEVICE_STATE_SUCCESS',
        payload: {
          response,
        },
      };
      it('should set polling to false', () => {
        const path = paths.polling();
        const state = getInitialState().setIn(path, true);
        expect(state.getIn(path)).toEqual(true);
        const newState = reducer(state, action);
        expect(newState.getIn(path)).toEqual(false);
      });
  
      it('should set errors to null', () => {
        const path = paths.errors();
        const state = getInitialState().setIn(path, mockErrors);
        expect(state.getIn(path)).toEqual(mockErrors);
        const newState = reducer(state, action);
        expect(newState.getIn(path)).not.toEqual(mockErrors);
        expect(newState.getIn(path)).toEqual(null);
      });

      it('should not set running to false for any zones of device', () => {
        const { deviceId } = response.state;
        const zonesPath = paths.zones();
        const zoneRunningPath = paths.zoneRunning(mockZone.id);
        const state = getInitialState()
          .setIn(zonesPath, fromJS({
            [mockZone.id]: {
              ...mockZone,
              zoneNumber: mockCurrentRunningZone.zoneNumber,
              deviceId,
            },
            foo: {
              ...mockZone,
              zoneNumber: mockCurrentRunningZone.zoneNumber + 1,
              deviceId,
            },
            bar: {
              ...mockZone,
              zoneNumber: mockCurrentRunningZone.zoneNumber + 2,
              deviceId,
            },
          }))
          .setIn(zoneRunningPath, true)
          .setIn(paths.zoneRunning('foo'), true)
          .setIn(paths.zoneRunning('bar'), true)
        ;
        expect(state.getIn(zoneRunningPath)).toEqual(true);
        expect(state.getIn(paths.zoneRunning('foo'))).toEqual(true);
        expect(state.getIn(paths.zoneRunning('bar'))).toEqual(true);
        const newState = reducer(state, action);
        expect(newState.getIn(zoneRunningPath)).toEqual(true);
        expect(newState.getIn(paths.zoneRunning('foo'))).toEqual(true);
        expect(newState.getIn(paths.zoneRunning('bar'))).toEqual(true);
      });

      it('should not set running to true for any zones of device', () => {
        const { deviceId } = response.state;
        const zonesPath = paths.zones();
        const zoneRunningPath = paths.zoneRunning(mockZone.id);
        const state = getInitialState()
          .setIn(zonesPath, fromJS({
            [mockZone.id]: {
              ...mockZone,
              zoneNumber: mockCurrentRunningZone.zoneNumber,
              deviceId,
            },
            foo: {
              ...mockZone,
              zoneNumber: mockCurrentRunningZone.zoneNumber + 1,
              deviceId,
            },
            bar: {
              ...mockZone,
              zoneNumber: mockCurrentRunningZone.zoneNumber + 2,
              deviceId,
            },
          }))
          .setIn(zoneRunningPath, false)
          .setIn(paths.zoneRunning('foo'), false)
          .setIn(paths.zoneRunning('bar'), false)
        ;
        expect(state.getIn(zoneRunningPath)).toEqual(false);
        expect(state.getIn(paths.zoneRunning('foo'))).toEqual(false);
        expect(state.getIn(paths.zoneRunning('bar'))).toEqual(false);
        const newState = reducer(state, action);
        expect(newState.getIn(zoneRunningPath)).toEqual(false);
        expect(newState.getIn(paths.zoneRunning('foo'))).toEqual(false);
        expect(newState.getIn(paths.zoneRunning('bar'))).toEqual(false);
      });
    });

    describe('did not receive currentRunningZone, did not receive device status WATERING', () => {
      const response = clone(mockDeviceState) as Legacy.ResponseInterface['getDeviceStateSuccess'];
      response.state.currentRunningZone = undefined;
      response.state.state = 'IDLE';
      const action: actionTypes.Interface['RACHIO_GET_DEVICE_STATE_SUCCESS'] = {
        type: 'RACHIO_GET_DEVICE_STATE_SUCCESS',
        payload: {
          response,
        },
      };
      it('should set polling to false', () => {
        const path = paths.polling();
        const state = getInitialState().setIn(path, true);
        expect(state.getIn(path)).toEqual(true);
        const newState = reducer(state, action);
        expect(newState.getIn(path)).toEqual(false);
      });
  
      it('should set errors to null', () => {
        const path = paths.errors();
        const state = getInitialState().setIn(path, mockErrors);
        expect(state.getIn(path)).toEqual(mockErrors);
        const newState = reducer(state, action);
        expect(newState.getIn(path)).not.toEqual(mockErrors);
        expect(newState.getIn(path)).toEqual(null);
      });

      it('should set running to false for all zones of device', () => {
        const { deviceId } = response.state;
        const zonesPath = paths.zones();
        const zoneRunningPath = paths.zoneRunning(mockZone.id);
        const state = getInitialState()
          .setIn(zonesPath, fromJS({
            [mockZone.id]: {
              ...mockZone,
              zoneNumber: mockCurrentRunningZone.zoneNumber,
              deviceId,
            },
            foo: {
              ...mockZone,
              zoneNumber: mockCurrentRunningZone.zoneNumber + 1,
              deviceId,
            },
            bar: {
              ...mockZone,
              zoneNumber: mockCurrentRunningZone.zoneNumber + 2,
              deviceId,
            },
            buzz: {
              ...mockZone,
              zoneNumber: 1,
              deviceId: 'buzz-device',
            },
          }))
          .setIn(zoneRunningPath, true)
          .setIn(paths.zoneRunning('foo'), true)
          .setIn(paths.zoneRunning('bar'), true)
          .setIn(paths.zoneRunning('buzz'), true)
        ;
        expect(state.getIn(zoneRunningPath)).toEqual(true);
        expect(state.getIn(paths.zoneRunning('foo'))).toEqual(true);
        expect(state.getIn(paths.zoneRunning('bar'))).toEqual(true);
        expect(state.getIn(paths.zoneRunning('buzz'))).toEqual(true);
        const newState = reducer(state, action);
        expect(newState.getIn(zoneRunningPath)).toEqual(false);
        expect(newState.getIn(paths.zoneRunning('foo'))).toEqual(false);
        expect(newState.getIn(paths.zoneRunning('bar'))).toEqual(false);
        expect(newState.getIn(paths.zoneRunning('buzz'))).toEqual(true);
      });
    });
  });

  describe('RACHIO_GET_DEVICE_ZONE_SUMMARY', () => {
    const { id } = mockDevice;
    const action: actionTypes.Interface['RACHIO_GET_DEVICE_ZONE_SUMMARY'] = {
      type: 'RACHIO_GET_DEVICE_ZONE_SUMMARY',
      payload: {
        id,
      }
    };
    const reducer = actionReducers[action.type] as AppReducer;

    it('should set polling to true', () => {
      const path = paths.polling();
      const state = getInitialState().setIn(path, undefined);
      expect(state.getIn(path)).toEqual(undefined);
      const newState = reducer(state, action);
      expect(newState.getIn(path)).toEqual(true);
    });
  });

  describe('RACHIO_GET_DEVICE_ZONE_SUMMARY_SUCCESS', () => {
    
    const reducer = actionReducers.RACHIO_GET_DEVICE_ZONE_SUMMARY_SUCCESS as AppReducer;

    describe('received invalid response.zoneSummary', () => {
      const response = clone(mockZoneSummary) as Legacy.ResponseInterface['getDeviceZoneSummarySuccess'];
      const invalidResponse: any = {
        ...response,
        zoneSummary: undefined,
      };
      const action: actionTypes.Interface['RACHIO_GET_DEVICE_ZONE_SUMMARY_SUCCESS'] = {
        type: 'RACHIO_GET_DEVICE_ZONE_SUMMARY_SUCCESS',
        payload: {
          response: invalidResponse,
        },
      };
      it('should set polling to false', () => {
        const path = paths.polling();
        const state = getInitialState().setIn(path, true);
        expect(state.getIn(path)).toEqual(true);
        const newState = reducer(state, action);
        expect(newState.getIn(path)).toEqual(false);
      });

      it('should set invalid response error if no errors', () => {
        const path = paths.errors();
        const state = getInitialState().setIn(path, undefined);
        expect(state.getIn(path)).toEqual(undefined);
        const newState = reducer(state, action);
        expect(newState.getIn(path)).not.toEqual(undefined);
        expect(newState.getIn(path)).toEqual(fromJS([
          { message: `Invalid Response from getDeviceZoneSummary` }
        ]));
      });

      it('should append invalid response error if errors exist', () => {
        const existingErrors = fromJS(mockErrors.errors);
        const path = paths.errors();
        const state = getInitialState().setIn(path, existingErrors);
        expect(state.getIn(path)).toEqual(existingErrors);
        const newState = reducer(state, action);
        expect(newState.getIn(path)).not.toEqual(existingErrors);
        expect(newState.getIn(path)).toEqual(fromJS([
          ...mockErrors.errors,
          { message: `Invalid Response from getDeviceZoneSummary` }
        ]));
      });
    });

    describe('received valid response.zoneSummary', () => {
      const response = clone(mockZoneSummary) as Legacy.ResponseInterface['getDeviceZoneSummarySuccess'];
      const action: actionTypes.Interface['RACHIO_GET_DEVICE_ZONE_SUMMARY_SUCCESS'] = {
        type: 'RACHIO_GET_DEVICE_ZONE_SUMMARY_SUCCESS',
        payload: {
          response,
        },
      };
      it('should set polling to false', () => {
        const path = paths.polling();
        const state = getInitialState().setIn(path, true);
        expect(state.getIn(path)).toEqual(true);
        const newState = reducer(state, action);
        expect(newState.getIn(path)).toEqual(false);
      });
  
      it('should set errors to null', () => {
        const path = paths.errors();
        const state = getInitialState().setIn(path, mockErrors);
        expect(state.getIn(path)).toEqual(mockErrors);
        const newState = reducer(state, action);
        expect(newState.getIn(path)).not.toEqual(mockErrors);
        expect(newState.getIn(path)).toEqual(null);
      });

      it('should set last run and end run for each matching zone in response', () => {
        let state = getInitialState();
        response.zoneSummary.forEach((summary: any) => {
          const { id } = summary.zoneDetail;
          state = state
            .setIn(paths.zone(id), fromJS({
              ...mockZone,
              id,
            }))
            .setIn(paths.zoneState(id), undefined)
          ;
          expect(
            state.getIn(paths.zoneState(id))
          )
          .toEqual(undefined)
        });
        const newState = reducer(state, action);
        response.zoneSummary.forEach((summary: any) => {
          const { id } = summary.zoneDetail;
          expect(
            newState.getIn(paths.zoneState(id)).get('lastRun')
          )
          .toEqual(summary.zoneState.lastRun)
          expect(
            newState.getIn(paths.zoneState(id)).get('endRun')
          )
          .toEqual(summary.zoneState.endRun)
          expect(
            newState.getIn(paths.zoneState(id))
          )
          .toEqual(fromJS(summary.zoneState))
        });
      });
    });
  });

  describe('RACHIO_PUT_ZONE_START', () => {
    const { id } = mockZone;
    const seconds: number = 60;
    const action: actionTypes.Interface['RACHIO_PUT_ZONE_START'] = {
      type: 'RACHIO_PUT_ZONE_START',
      payload: {
        id,
        seconds,
      }

    };
    const reducer = actionReducers[action.type] as AppReducer;

    it('should set thinking to true', () => {
      const path = paths.thinking();
      const state = getInitialState().setIn(path, undefined);
      expect(state.getIn(path)).toEqual(undefined);
      const newState = reducer(state, action);
      expect(newState.getIn(path)).toEqual(true);
    });
  });

  describe('RACHIO_PUT_ZONE_START_SUCCESS', () => {
    const { id } = mockZone;
    const seconds: number = 60;
    const action: actionTypes.Interface['RACHIO_PUT_ZONE_START_SUCCESS'] = {
      type: 'RACHIO_PUT_ZONE_START_SUCCESS',
      payload: {
        id,
        seconds,
      },
    };
    const reducer = actionReducers[action.type] as AppReducer;

    it('should set thinking to false', () => {
      const path = paths.thinking();
      const state = getInitialState().setIn(path, true);
      expect(state.getIn(path)).toEqual(true);
      const newState = reducer(state, action);
      expect(newState.getIn(path)).toEqual(false);
    });

    it('should set errors to null', () => {
      const path = paths.errors();
      const state = getInitialState().setIn(path, mockErrors);
      expect(state.getIn(path)).toEqual(mockErrors);
      const newState = reducer(state, action);
      expect(newState.getIn(path)).not.toEqual(mockErrors);
      expect(newState.getIn(path)).toEqual(null);
    });

    it('should set running to true for zone with payload.id', () => {
      const path = paths.zoneRunning(action.payload.id);
      const state = getInitialState().setIn(path, false);
      expect(state.getIn(path)).toEqual(false);
      const newState = reducer(state, action);
      expect(newState.getIn(path)).toEqual(true);
    });
  });

  describe('RACHIO_PUT_ZONE_START_MULTIPLE', () => {
    const seconds: number = 60;
    const zones = mockPerson.devices[0].zones.map((zone, i) => ({
      id: zone.id,
      duration: seconds,
      sortOrder: i + 1,
    }));
    const action: actionTypes.Interface['RACHIO_PUT_ZONE_START_MULTIPLE'] = {
      type: 'RACHIO_PUT_ZONE_START_MULTIPLE',
      payload: {
        zones,
      }

    };
    const reducer = actionReducers[action.type] as AppReducer;

    it('should set thinking to true', () => {
      const path = paths.thinking();
      const state = getInitialState().setIn(path, undefined);
      expect(state.getIn(path)).toEqual(undefined);
      const newState = reducer(state, action);
      expect(newState.getIn(path)).toEqual(true);
    });
  });

  describe('RACHIO_PUT_ZONE_START_MULTIPLE_SUCCESS', () => {
    const seconds: number = 60;
    const zones = mockPerson.devices[0].zones.map((zone, i) => ({
      id: zone.id,
      duration: seconds,
      sortOrder: i + 1,
    }));
    const action: actionTypes.Interface['RACHIO_PUT_ZONE_START_MULTIPLE_SUCCESS'] = {
      type: 'RACHIO_PUT_ZONE_START_MULTIPLE_SUCCESS',
      payload: {
        zones,
      }
    };
    const reducer = actionReducers[action.type] as AppReducer;

    it('should set thinking to false', () => {
      const path = paths.thinking();
      const state = getInitialState().setIn(path, true);
      expect(state.getIn(path)).toEqual(true);
      const newState = reducer(state, action);
      expect(newState.getIn(path)).toEqual(false);
    });

    it('should set errors to null', () => {
      const path = paths.errors();
      const state = getInitialState().setIn(path, mockErrors);
      expect(state.getIn(path)).toEqual(mockErrors);
      const newState = reducer(state, action);
      expect(newState.getIn(path)).not.toEqual(mockErrors);
      expect(newState.getIn(path)).toEqual(null);
    });

    it('should set running to true for each zone in payload', () => {
      action.payload.zones.forEach(({ id }) => {
        const path = paths.zoneRunning(id);
        const state = getInitialState().setIn(path, false);
        expect(state.getIn(path)).toEqual(false);
        const newState = reducer(state, action);
        expect(newState.getIn(path)).toEqual(true);
      })
    });
  });

  describe('RACHIO_API_ERROR', () => {
    
    const reducer = actionReducers.RACHIO_API_ERROR as AppReducer;

    describe('multiple errors', () => {
      const response = mockErrors;
      const action: actionTypes.Interface['RACHIO_API_ERROR'] = {
        type: 'RACHIO_API_ERROR',
        payload: {
          response,
        },
      };
      it('should set thinking to false', () => {
        const path = paths.thinking();
        const state = getInitialState().setIn(path, true);
        expect(state.getIn(path)).toEqual(true);
        const newState = reducer(state, action);
        expect(newState.getIn(path)).toEqual(false);
      });
  
      it('should append errors found in response to errors', () => {
        const existingErrors = fromJS(mockErrors.errors);
        const { errors } = action.payload.response;
        const expectedErrors = existingErrors.concat(fromJS(errors));
        const path = paths.errors();
        const state = getInitialState().setIn(path, existingErrors);
        expect(state.getIn(path)).toEqual(existingErrors);
        const newState = reducer(state, action);
        expect(newState.getIn(path)).not.toEqual(existingErrors);
        expect(newState.getIn(path)).toEqual(expectedErrors);
      });
    });

    describe('single error', () => {
      const response: any = mockErrors.errors[0];
      const action: actionTypes.Interface['RACHIO_API_ERROR'] = {
        type: 'RACHIO_API_ERROR',
        payload: {
          response,
        },
      };
      it('should set thinking to false', () => {
        const path = paths.thinking();
        const state = getInitialState().setIn(path, true);
        expect(state.getIn(path)).toEqual(true);
        const newState = reducer(state, action);
        expect(newState.getIn(path)).toEqual(false);
      });
  
      it('should append error found in response to errors', () => {
        const existingErrors = fromJS(mockErrors.errors);
        const error = action.payload.response;
        const expectedErrors = existingErrors.push(fromJS(error));
        const path = paths.errors();
        const state = getInitialState().setIn(path, existingErrors);
        expect(state.getIn(path)).toEqual(existingErrors);
        const newState = reducer(state, action);
        expect(newState.getIn(path)).not.toEqual(existingErrors);
        expect(newState.getIn(path)).toEqual(expectedErrors);
      });
    });
  });

  describe('RACHIO_LEGACY_API_ERROR', () => {
    
    const reducer = actionReducers.RACHIO_LEGACY_API_ERROR as AppReducer;

    describe('single error', () => {
      const response: any = mockErrors.errors[0];
      const action: actionTypes.Interface['RACHIO_LEGACY_API_ERROR'] = {
        type: 'RACHIO_LEGACY_API_ERROR',
        payload: {
          response,
        },
      };
      it('should set polling to false', () => {
        const path = paths.polling();
        const state = getInitialState().setIn(path, true);
        expect(state.getIn(path)).toEqual(true);
        const newState = reducer(state, action);
        expect(newState.getIn(path)).toEqual(false);
      });
  
      it('should append error found in response to errors', () => {
        const existingErrors = fromJS(mockErrors.errors);
        const error = action.payload.response;
        const expectedErrors = existingErrors.push(fromJS(error));
        const path = paths.errors();
        const state = getInitialState().setIn(path, existingErrors);
        expect(state.getIn(path)).toEqual(existingErrors);
        const newState = reducer(state, action);
        expect(newState.getIn(path)).not.toEqual(existingErrors);
        expect(newState.getIn(path)).toEqual(expectedErrors);
      });
    });
  });

  describe('RACHIO_DISMISS_ERROR', () => {
    const action: actionTypes.Interface['RACHIO_DISMISS_ERROR'] = {
      type: 'RACHIO_DISMISS_ERROR',
      payload: {
        key: 0,
      },
    };
    const reducer = actionReducers[action.type] as AppReducer;

    it('should delete the error with the specified key', () => {
      const { key } = action.payload;
      const existingErrors = fromJS(mockErrors.errors);
      const expectedErrors = existingErrors.delete(key);
      const path = paths.errors();
      const state = getInitialState().setIn(path, existingErrors);
      expect(state.getIn(path)).toEqual(existingErrors);
      const newState = reducer(state, action);
      expect(newState.getIn(path)).toEqual(expectedErrors);
    });
  });

  describe('RACHIO_CLEAR_DATA', () => {
    const action: actionTypes.Interface['RACHIO_CLEAR_DATA'] = {
      type: 'RACHIO_CLEAR_DATA',
    };
    const reducer = actionReducers[action.type] as AppReducer;

    it('should clear devices from the store', () => {
      const path = paths.devices();
      const initialDevices = fromJS({
        foo: mockDevice,
        bar: mockDevice,
      });
      const state = getInitialState().setIn(path, initialDevices);
      expect(state.getIn(path)).toEqual(initialDevices);
      const newState = reducer(state, action);
      expect(newState.getIn(path)).toEqual(undefined);
    });

    it('should clear zones from the store', () => {
      const path = paths.zones();
      const initialZones = fromJS({
        foo: mockZone,
        bar: mockZone,
      });
      const state = getInitialState().setIn(path, initialZones);
      expect(state.getIn(path)).toEqual(initialZones);
      const newState = reducer(state, action);
      expect(newState.getIn(path)).toEqual(undefined);
    });

    it('should clear errors from the store', () => {
      const path = paths.errors();
      const initialErrors = fromJS([
        mockErrors.errors[0],
        mockErrors.errors[1],
      ]);
      const state = getInitialState().setIn(path, initialErrors);
      expect(state.getIn(path)).toEqual(initialErrors);
      const newState = reducer(state, action);
      expect(newState.getIn(path)).toEqual(undefined);
    });

    it('should set thinking to false', () => {
      const path = paths.thinking();
      const state = getInitialState().setIn(path, true);
      expect(state.getIn(path)).toEqual(true);
      const newState = reducer(state, action);
      expect(newState.getIn(path)).toEqual(false);
    });

    it('should set polling to false', () => {
      const path = paths.polling();
      const state = getInitialState().setIn(path, true);
      expect(state.getIn(path)).toEqual(true);
      const newState = reducer(state, action);
      expect(newState.getIn(path)).toEqual(false);
    });
  });

});
