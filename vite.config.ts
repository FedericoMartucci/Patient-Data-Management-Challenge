import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: '@components',
        replacement: path.resolve(path.join(__dirname, '/src/components'))
      },
      {
        find: '@utils',
        replacement: path.resolve(path.join(__dirname, '/src/utils'))
      },
      {
        find: '@data-provider',
        replacement: path.resolve(path.join(__dirname, '/src/data-provider'))
      },
    ]
  }
})
