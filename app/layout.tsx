import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "강승혜 | 게임 운영직무 포트폴리오",
  description: "게임 경험과 운영 관점, 프로젝트 및 AI 활용 사례를 담은 신입 게임 운영 지원자 강승혜의 포트폴리오입니다.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">{children}</body>
    </html>
  );
}
