import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Mezcal Runner',
  description: 'A little running adventure with Mezcal.',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return <html lang="en"><body>{children}</body></html>;
}
