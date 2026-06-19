import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig(({ mode }) => {
  if (mode === 'lib') {
    return {
      plugins: [react()],
      build: {
        lib: {
          entry: resolve(__dirname, 'src/index.js'),
          name: 'SilverCreekDS',
          fileName: (format) => `index.${format}.js`,
          formats: ['es', 'umd'],
        },
        rollupOptions: {
          external: ['react', 'react-dom', 'react-router-dom'],
          output: {
            globals: {
              react: 'React',
              'react-dom': 'ReactDOM',
              'react-router-dom': 'ReactRouterDOM',
            },
          },
        },
        outDir: 'dist',
        emptyOutDir: true,
      },
    }
  }

  return {
    plugins: [react()],
    publicDir: 'public',
  }
})
