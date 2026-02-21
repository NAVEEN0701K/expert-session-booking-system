let mockUsers = [];

class UserModel {
  static async findOne(query) {
    if (query.email) {
      return mockUsers.find(user => user.email === query.email);
    }
    return null;
  }
  
  static async create(userData) {
    const user = {
      _id: Date.now().toString(),
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    mockUsers.push(user);
    return user;
  }
  
  static async findById(id) {
    return mockUsers.find(user => user._id === id);
  }
}

module.exports = UserModel;
