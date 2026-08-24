import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://thinkprotec.com.br'),
  title: 'ThinkProtec | Segurança Eletrônica no Rio de Janeiro',
  description:
    'CFTV, controle de acesso, alarmes, cerca elétrica e redes com atendimento direto do técnico responsável no Rio de Janeiro.',
  openGraph: {
    title: 'ThinkProtec | Segurança Eletrônica no Rio de Janeiro',
    description:
      'Projetos de segurança eletrônica com atendimento direto do técnico responsável.',
    type: 'website',
    locale: 'pt_BR',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'ThinkProtec — Segurança eletrônica no Rio de Janeiro' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ThinkProtec | Segurança Eletrônica no Rio de Janeiro',
    description: 'Projetos de segurança eletrônica com atendimento direto do técnico responsável.',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
