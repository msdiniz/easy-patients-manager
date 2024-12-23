export const getBackendPort = (): number => {
  const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
  return isMac ? import.meta.env.VITE_BACKEND_PORT_MAC : import.meta.env.VITE_BACKEND_PORT_WIN || 5000;
};

export const getFileServerPort = (): number => {
  const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
  return isMac ? import.meta.env.FILE_SERVER_PORT_MAC : import.meta.env.FILE_SERVER_PORT_WIN || 5005;
};