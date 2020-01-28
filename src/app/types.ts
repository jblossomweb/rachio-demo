export interface Person {
  id: string,
  createDate: number,
  username: string,
  fullName: string,
  email: string,
  devices: Device[],
  deleted: boolean,
};

export interface Device {
  createDate: number,
  id: string,
  status: 'ONLINE' | string, // TODO: interpret enum
  zones: Zone[],
  timeZone: string,
  latitude: number,
  longitude: number,
  name: string,
  scheduleRules: ScheduleRule[],
  flexScheduleRules: ScheduleRule[],
  serialNumber: string,
  rainDelayExpirationDate: number,
  macAddress: string,
  on: boolean,
  model: 'GENERATION2_8ZONE' | string, // TODO: interpret enum
  scheduleModeType: 'MANUAL' | string, // TODO: interpret enum
  utcOffset: number,
  homeKitCompatible: boolean,
  deleted: boolean,
};

export interface Zone {
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
  lastWateredDuration: number,
  lastWateredDate: number,
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
  startHour: number,
  startMinute: number,
  operator: 'AFTER' | string, // TODO: interpret enum
  summary: string,
  cycleSoak: boolean,
  cycleSoakStatus: 'ON' | 'OFF', // TODO: interpret enum
  startDate: number,
  name: string,
  enabled: boolean,
  startDay: number,
  startMonth: number,
  startYear: number,
  totalDuration: number,
  endDate: number,
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
