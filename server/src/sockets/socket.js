const socketHandler = (io) => {
  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);
    
    socket.on('joinExpertRoom', (expertId) => {
      socket.join(`expert_${expertId}`);
      console.log(`Socket ${socket.id} joined expert room: ${expertId}`);
    });
    
    socket.on('leaveExpertRoom', (expertId) => {
      socket.leave(`expert_${expertId}`);
      console.log(`Socket ${socket.id} left expert room: ${expertId}`);
    });
    
    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });
};

module.exports = socketHandler;
