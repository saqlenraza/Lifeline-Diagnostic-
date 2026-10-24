import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Lifeline Diagnostic | Thoughtful Testing, Clearer Answers',
  description: 'Explore pathology tests and health checkup packages, request home sample collection in Mumbai, and find the information you need before your test.',
  metadataBase: new URL('https://lifelinediagnostic.example'),
  openGraph: {
    title: 'Lifeline Diagnostic',
    description: 'Thoughtful testing. Clearer answers.',
    type: 'website',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
