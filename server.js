const express = require('express');
const app = express();
const connectDB = require('./config/db');

connectDB();
// app.get('/')
app.use(express.json({ extended: false}));
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/licenses', require('./routes/licenses'));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));