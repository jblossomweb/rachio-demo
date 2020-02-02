export interface Person {
  id: string,
  createDate: number,
  username: string,
  fullName: string,
  email: string,
  deleted: boolean,
};

export interface RawPerson extends Person {
  devices: RawDevice[],
};

export interface DeviceCurrentRunningZone {
  index: number,
  zoneNumber: number,
  paused: boolean,
  start: string, // ISO date
  end: string, // ISO date
  type: 'IRRIGATE' | string, // TODO
}

export interface DeviceState {
  deviceId: Device['id'],
  health: 'GOOD' | string, // TODO
  state: 'IDLE' | 'WATERING' | 'OFFLINE' | 'STANDBY'
  correctFirmware: boolean,
  correctRainDelay: boolean,
  correctSchedule: boolean,
  lastRun: string, // ISO date
  nextRun: string, // ISO date
  firmwareVersion: string,
  rainSensorTripped: boolean,
  rssi: number,
  desiredState: 'DESIRED_ACTIVE' | string, // TODO
  desiredRainDelayExpiration: string, // ISO date
  flexNodes: any[], // TODO
  desiredSettleTime: number,
  flowFirmwareVersion: string,
  desiredIdleLeakDetection: boolean,
  desiredIdleLeakTime: number,
  desiredLightBarSetting: 'ONE_HUNDRED_PERCENT' | string, // TODO
  currentRunningZone?: DeviceCurrentRunningZone,
};

export interface Device {
  createDate: number,
  id: string,
  status: 'ONLINE' | string, // TODO: interpret enum
  timeZone: string,
  latitude: number,
  longitude: number,
  name: string,
  serialNumber: string,
  rainDelayExpirationDate?: number,
  macAddress: string,
  on: boolean,
  model: 'GENERATION2_8ZONE' | string, // TODO: interpret enum
  scheduleModeType: 'MANUAL' | string, // TODO: interpret enum
  utcOffset: number,
  homeKitCompatible: boolean,
  deleted: boolean,
  state?: DeviceState,
};

export interface RawDevice extends Device {
  zones: RawZone[],
  scheduleRules: ScheduleRule[],
  flexScheduleRules: ScheduleRule[],
}

export interface RawZone {
  id: string,
  zoneNumber: number,
  name: string,
  enabled: boolean,
  customNozzle: {
    name: string,
    inchesPerHour: number,
  },
  customSoil: {
    name: string,
  },
  customSlope: {
    name: string,
    sortOrder: number,
  },
  customCrop: {
    name: string,
    coefficient: number,
  },
  customShade: {
    name: string,
  },
  availableWater: number,
  rootZoneDepth: number,
  managementAllowedDepletion: number,
  efficiency: number,
  yardAreaSquareFeet: number,
  imageUrl: string,
  lastWateredDuration?: number,
  lastWateredDate?: number,
  scheduleDataModified: boolean,
  fixedRuntime: number,
  wateringAdjustmentRuntimes: {
    [key: number]: number,
  },
  saturatedDepthOfWater: number,
  depthOfWater: number,
  maxRuntime: number,
  runtimeNoMultiplier: number,
  runtime: number,
};

export interface ZoneState {
  lastRun: string, // date ISO string
  nextRun: string, // date ISO string
  health: 'GOOD' | string, // TODO
  lastRunStartCurrent: number,
  lastRunEndCurrent: number,
  lastRunEndTime: string, // date ISO string
};

export interface Zone extends RawZone {
  deviceId: Device['id'],
  deviceStatus?: Device['status'],
  deviceOn?: Device['on'],
  state?: ZoneState,
  running?: boolean,
};

export type ZoneStartMultiple = Array<{
  id: Zone['id'],
  duration: number,
  sortOrder: number,
}>;

export interface ScheduleRule {
  id: string,
  zones: Array<{
    zoneId: Zone['id'],
    duration: number,
    sortOrder: number,
  }>,
  scheduleJobTypes: Array<
    'ANY' |
    'DAY_OF_WEEK_4' |
    string // TODO: interpret enum
  >,
  startHour?: number,
  startMinute?: number,
  startDay?: number,
  startMonth?: number,
  startYear?: number,
  startDate?: number,
  endDate?: number,
  operator: 'AFTER' | string, // TODO: interpret enum
  summary: string,
  cycleSoak: boolean,
  cycleSoakStatus: "ON" | "OFF",
  name: string,
  enabled: boolean,
  totalDuration: number,
  etSkip: boolean,
  externalName: string,
};

export type Units = 'US' | 'METRIC';

export interface Forecast {
  localizedTimeStamp: number,
  precipIntensity: number,
  precipProbability: number,
  windSpeed: number,
  humidity: number,
  cloudCover: number,
  dewPoint: number,
  weatherType: string,
  currentTemperature: number,
  weatherSummary: string,
  weatherStationId: string,
  icons: any, // TODO: interpret type
  calculatedPrecip: number,
  prettyTime: string,
  time: number,
};

export interface Error {
  message: string,
};
