const defaultPack = { homepage: '', version: '0.0.0' };

import _pack from './package.json';

const pack = { ...defaultPack, ..._pack };

// eslint-disable-next-line no-restricted-exports
export default pack;
