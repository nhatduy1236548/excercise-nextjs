// pages/api/some-api.js
import corsMiddleware from '../../cors'; // Thay đường dẫn tới tệp cors.js theo vị trí của bạn

const handler = (req, res) => {
  // Áp dụng corsMiddleware vào yêu cầu và phản hồi
  corsMiddleware(req, res, () => {
    // Xử lý logic API của bạn ở đây
    // ...

    // Ví dụ: Trả về một phản hồi JSON
    res.json({ message: 'Hello from API with CORS' });
  });
};

export default handler;
