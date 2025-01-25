import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import esbuild from 'rollup-plugin-esbuild';

export default {
  input: './src/index.ts',
  output: {
    dir: 'dist',
    format: 'esm',
    sourcemap: true,
    banner: '#!/usr/bin/env node', // Ensure CLI compatibility
  },
  plugins: [
    resolve(),
    commonjs(),
    esbuild({
      target: 'esnext',     // Set the target to 'esnext'
      sourceMap: true,      // Enable sourcemaps
      minify: true,         // Enable minification --minification increases the build time sometimes

    }),
  ],
};
