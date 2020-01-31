import { List, Record, Map } from 'immutable';
import * as AppTypes from 'app/types';

export type Id = AppTypes.Person['id'] | undefined;
export const defaultId: Id = undefined;

export type Person = Record<Partial<AppTypes.Person>> | undefined;
export const defaultPerson: Person = undefined;

export type Device = Record<AppTypes.Device>;
export type Devices = Map<AppTypes.Device['id'], Device> | undefined;
export const defaultDevices: Devices = undefined;

export type Zone = Record<AppTypes.Zone>;
export type Zones = Map<AppTypes.Zone['id'], Zone> | undefined;
export const defaultZones: Zones = undefined;

export type Thinking = boolean;
export const defaultThinking: Thinking = false;

export type Polling = boolean;
export const defaultPolling: Polling = false;

export type Errors = List<AppTypes.Error> | undefined;
export const defaultErrors: Errors = undefined;
