import * as AppTypes from 'app/types';
const rootPath = 'rachio';

const paths = {
  id: () => [rootPath, 'person', 'id'],
  person: () => [rootPath, 'person'],
  devices: () => [rootPath, 'devices'],
  device: (id: AppTypes.Device['id']) => [rootPath, 'devices', id],
  deviceOn: (id: AppTypes.Device['id']) => [rootPath, 'devices', id, 'on'],
  deviceState: (id: AppTypes.Device['id']) => [rootPath, 'devices', id, 'state'],
  zones: () => [rootPath, 'zones'],
  zone: (id: AppTypes.Zone['id']) => [rootPath, 'zones', id],
  thinking: () => [rootPath, 'thinking'],
  polling: () => [rootPath, 'polling'],
  errors: () => [rootPath, 'errors'],
};

export default paths;
