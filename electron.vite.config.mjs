import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { defineConfig, externalizeDepsPlugin } from 'electron-vite';
import react from '@vitejs/plugin-react';
import terser from '@rollup/plugin-terser';
import compression from 'vite-plugin-compression';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
    main: {
        plugins: [externalizeDepsPlugin()]
    },
    preload: {
        plugins: [externalizeDepsPlugin()]
    },
    renderer: {
        dedupe: ['react', 'react-router'],
        resolve: {
            alias: {
                '@renderer': resolve(__dirname, 'src/renderer/src'),
                '@template': resolve(__dirname, 'src/renderer/')
            }
        },
        plugins: [
            react(),
            compression({
                algorithm: 'gzip',
                ext: '.gz'
            })
        ],
        build: {
            rollupOptions: {
                input: resolve(__dirname, 'src/renderer/index.html'),
                plugins: [terser(),react()]
            }
        }
    }
});