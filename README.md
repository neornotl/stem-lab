# CLB STEM-AI-ROBOTIC

Website giới thiệu câu lạc bộ STEM-AI-ROBOTIC, hoạt động, dự án, thành viên và quy trình đăng ký. Giao diện hỗ trợ tiếng Việt/tiếng Anh, responsive và accessibility cơ bản.

## Xem trực tiếp

- [website-aic6.vercel.app](https://website-aic6.vercel.app/)
- Các trang chính: `/`, `/lab`, `/members`

## Công nghệ

- Next.js 16, React 19 và TypeScript
- Tailwind CSS 4
- Framer Motion và Lucide React

## Chạy local

Yêu cầu Node.js 20 trở lên.

```bash
npm ci
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000).

## Kiểm tra trước khi gửi thay đổi

```bash
npm run lint
npm run build
```

## Cấu trúc

| Đường dẫn | Nội dung |
| --- | --- |
| `src/app/` | Route, layout, metadata và style toàn cục |
| `src/components/sections/` | Các phần nội dung của landing page |
| `src/components/layout/` | Navbar, footer và section wrapper |
| `src/components/shared/` | Thành phần dùng chung |
| `src/components/decorative/` | Hiệu ứng và trang trí giao diện |
| `src/context/` | Trạng thái ngôn ngữ, thiết bị và theme |
| `public/` | Ảnh và tài nguyên tĩnh |

Không commit secret hoặc dữ liệu đăng ký của thành viên vào repo.
