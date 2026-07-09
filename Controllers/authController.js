const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const users = require('../data/users'); // Import the users array

//register user
const registerUser = async (req, res) => {
  const { username, password } = req.body;  

    // Check if the username already exists
    if(!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
    }
   
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { username, password: hashedPassword };

    users.push(newUser);
    res.status(201).json({ message: 'User registered successfully' });
};

module.exports = { registerUser }
