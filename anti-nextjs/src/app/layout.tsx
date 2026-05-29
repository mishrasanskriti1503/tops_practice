import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Aether GraphQL Board | Cosmic Productivity',
  description: 'A high-fidelity project planner and task management interface powered by a real-time GraphQL API backend.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
