import DarkFantasyLayout from '@/components/DarkFantasyLayout';
import ErrorBoundary from '@/components/ErrorBoundary';
import '@/styles/globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ErrorBoundary>
          <DarkFantasyLayout>
            {children}
          </DarkFantasyLayout>
        </ErrorBoundary>
      </body>
    </html>
  );
}
