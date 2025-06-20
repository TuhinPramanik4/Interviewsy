const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const ttsRoute = require('./routes/tts');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose
  .connect(process.env.MONGO_URIii)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// Routes
const uploadRoute = require('./routes/upload');
const aiRoute = require('./routes/ai');

app.use('/upload', uploadRoute);
app.use('/ai', aiRoute);
app.use('/tts', ttsRoute);

app.get('/', (req, res) => res.send('AI Interview Platform API Running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
