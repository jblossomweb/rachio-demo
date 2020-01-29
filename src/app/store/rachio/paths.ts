import * as AppTypes from 'app/types';
const rootPath = 'rachio';

const paths = {
  id: () => [rootPath, 'person', 'id'],
  person: () => [rootPath, 'person'],
  devices: () => [rootPath, 'devices'],
  device: (id: AppTypes.Device['id']) => [rootPath, 'devices', id],
  deviceOn: (id: AppTypes.Device['id']) => [rootPath, 'devices', id, 'on'],
  zones: () => [rootPath, 'zones'],
  zone: (id: AppTypes.Zone['id']) => [rootPath, 'zones', id],
  thinking: () => [rootPath, 'thinking'],
  errors: () => [rootPath, 'errors'],
};

export default paths;
