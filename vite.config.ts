import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import eslintPlugin from "vite-plugin-eslint";
// import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react({
            babel: {
                plugins: ['@emotion/babel-plugin'],
            }
        }),
        eslintPlugin({cache: false, fix: true})
    ],
    // resolve: {
    //   alias: {
    //     '@': '/src'
    //   },
    // },
    server: {
        open: true,
        port: 3000,
        watch: {
            usePolling: true,
        }
    },
    // build: {
    //   outDir: 'dist',
    // },
    define: {
        'process.env': process.env,
    },
});