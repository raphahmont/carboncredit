// app/layout.js

import './globals.css'; // Inclua CSS global aqui
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Carbon Credit Platform',
  description: 'Uma plataforma para investir em projetos sustentáveis e obter créditos de carbono',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header>
          <nav>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/invest">Projetos Sustentáveis</a></li>
            </ul>
          </nav>
        </header>
        <main>
          {children}
        </main>
        <footer>
          <p>© 2024 Carbon Credit Platform. Todos os direitos reservados.</p>
        </footer>
      </body>
    </html>
  );
}
