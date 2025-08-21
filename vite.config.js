import { defineConfig } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import legacy from '@vitejs/plugin-legacy';

export default defineConfig({
  plugins: [
    createHtmlPlugin({
      minify: true,
      inject: {
        data: {
          title: 'El Profesor G – Tu tesis, nuestra misión académica',
          description:
            'Servicios de asesoría de tesis y trabajos académicos en Perú. El Profesor G brinda asesorías personalizadas, redacción de tesis, informes académicos, corrección de estilo, preparación para sustentaciones y más.',
        },
      },
    }),
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
  ],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['lucide'],
        },
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  css: {
    postcss: './postcss.config.js',
  },
});
