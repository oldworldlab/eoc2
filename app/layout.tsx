import DarkFantasyLayout from '@/components/DarkFantasyLayout';
import '@/styles/globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <DarkFantasyLayout>
          {children}
        </DarkFantasyLayout>
      </body>
    </html>
  );
}
