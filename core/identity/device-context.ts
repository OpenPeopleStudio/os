import { DeviceContext } from './identity.types';

export const detectDeviceContext = async (): Promise<DeviceContext> => {
  // Placeholder: will later detect platform + label (Mars/Earth/Sol)
  return {
    deviceId: `device-${Date.now()}`,
    platform: 'web',
    label: 'Sol',
  };
};
