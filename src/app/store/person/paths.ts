const rootPath = 'person';

const paths = {
  id: () => [rootPath, 'person', 'id'],
  person: () => [rootPath, 'person'],
  devices: () => [rootPath, 'devices'],
  thinking: () => [rootPath, 'thinking'],
  errors: () => [rootPath, 'errors'],
};

export default paths;
