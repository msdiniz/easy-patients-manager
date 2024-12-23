export const getBackendPort = (): number => {
  const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
  return isMac ? import.meta.env.VITE_BACKEND_PORT_MAC : import.meta.env.VITE_BACKEND_PORT_WIN || 5000;
};