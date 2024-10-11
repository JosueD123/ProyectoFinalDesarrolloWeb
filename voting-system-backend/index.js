const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

// Conectar a MongoDB
mongoose.connect('mongodb+srv://adminjosuelopez:joshdiaz123456@cluster0.u22gj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('MongoDB connection error:', error));

// Modelo de usuario
const UserSchema = new mongoose.Schema({
  collegiateNumber: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  dpi: { type: String, required: true, unique: true },
  birthDate: { type: Date, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', UserSchema);

// Rutas de registro y login
app.post('/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 8);
    const user = new User({
      collegiateNumber: req.body.collegiateNumber,
      name: req.body.name,
      email: req.body.email,
      dpi: req.body.dpi,
      birthDate: req.body.birthDate,
      password: hashedPassword,
    });
    await user.save();
    res.send('User registered successfully');
  } catch (error) {
    res.status(500).send('Error registering user: ' + error.message);
  }
});

app.post('/login', async (req, res) => {
  const user = await User.findOne({ collegiateNumber: req.body.collegiateNumber });
  if (!user) return res.status(404).send('User not found');

  const isValidPassword = await bcrypt.compare(req.body.password, user.password);
  if (!isValidPassword) return res.status(401).send('Invalid credentials');

  const token = jwt.sign({ id: user._id }, 'secret', { expiresIn: '1h' });
  res.json({ token });
});

// Iniciar el servidor
app.listen(3001, () => {
  console.log('Server running on port 3001');
});
