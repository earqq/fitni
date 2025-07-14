// index.js
import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/registrar-comida', async (req, res) => {
  try {
    const response = await axios.post(
      'https://script.google.com/macros/s/AKfycbzDgB5j4-l1AERAcAiwwEXBxHd0W4suNt5h51Y8gqwzzPEKIbS3Aq9A2t3EumxLrxUb/exec',
      req.body,
      {
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'ChatGPT-Proxy',
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      error: true,
      message: error.response?.data || error.message,
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});