import express, { Request, Response } from 'express';
import axios from 'axios';

const app = express();
const port = 3000;

app.get('/generate-qr', async (req: Request, res: Response) => {
  const data = (req.query.data as string) || 'Example';
  const size = (req.query.size as string) || '150x150';
  const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}&data=${data}`;

  try {
    const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
    res.setHeader('Content-Type', 'image/png');
    res.send(response.data);
  } catch (error) {
    console.error('QRコードの生成中にエラーが発生しました:', error);
    res.status(500).send('QRコードの生成に失敗しました');
  }
});

app.listen(port, () => {
  console.log(`サーバーがポート${port}で起動しました`);
});
