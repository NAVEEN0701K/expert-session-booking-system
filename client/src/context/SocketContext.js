import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext();

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [online, setOnline] = useState(false);

  useEffect(() => {
    const newSocket = io(process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000');
    
    newSocket.on('connect', () => {
      console.log('Connected to server');
      setOnline(true);
    });
    
    newSocket.on('disconnect', () => {
      console.log('Disconnected from server');
      setOnline(false);
    });
    
    setSocket(newSocket);
    
    return () => newSocket.close();
  }, []);

  const joinExpertRoom = (expertId) => {
    if (socket) {
      socket.emit('joinExpertRoom', expertId);
    }
  };

  const leaveExpertRoom = (expertId) => {
    if (socket) {
      socket.emit('leaveExpertRoom', expertId);
    }
  };

  const value = {
    socket,
    online,
    joinExpertRoom,
    leaveExpertRoom,
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};
