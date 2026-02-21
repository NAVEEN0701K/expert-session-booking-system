import { useEffect } from 'react';
import { useSocket } from '../context/SocketContext';

export const useSocketEvents = (eventHandlers = {}) => {
  const { socket } = useSocket();

  useEffect(() => {
    if (!socket) return;

    Object.entries(eventHandlers).forEach(([event, handler]) => {
      socket.on(event, handler);
    });

    return () => {
      Object.keys(eventHandlers).forEach((event) => {
        socket.off(event);
      });
    };
  }, [socket, eventHandlers]);
};
