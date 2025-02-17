import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// // Hapus cache saat development
// if (import.meta.env.DEV) {
//   window.location.reload();
// }

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Update CSP untuk mengizinkan konten yang diperlukan
if (typeof window !== 'undefined') {
  const meta = document.createElement('meta');
  meta.httpEquiv = 'Content-Security-Policy';
  meta.content = `
    default-src 'self' https: data:;
    script-src 'self' 'unsafe-inline' 'unsafe-eval';
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    img-src 'self' data: https: blob:;
    font-src 'self' https://fonts.gstatic.com;
    connect-src 'self' ${import.meta.env.VITE_SUPABASE_URL} https:;
    frame-src 'self' https:;
  `;
  document.head.appendChild(meta);
}
