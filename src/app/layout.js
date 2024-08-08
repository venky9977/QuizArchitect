// app/layout.js
'use client';

import { ContextProvider } from './ContextApi';
import './globals.css'
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ContextProvider>
          {children}
        </ContextProvider>
      </body>
    </html>
  );
}
