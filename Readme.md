# [Hashnode article]([https://dev.to/pratham15541/a-complete-nodejs-typescript-setup-with-rollup-jest-and-nodemon-2i2m](https://pratham15541.hashnode.dev/a-complete-nodejs-typescript-setup-with-rollup-jest-and-nodemon))
# A Complete Node.js + TypeScript Setup with Rollup, Jest, and Nodemon
Building a Node.js application with TypeScript can be an excellent choice for modern JavaScript development. It offers type safety, better tooling, and is great for scaling. But the real power comes when you combine TypeScript with a solid bundler, testing framework, and automatic reloading.

In this article, we will walk through setting up a **Node.js TypeScript project** with **Rollup**, **Jest** for testing, and **Nodemon** for automatic application reloading.

### The Problem: A Hectic Setup

Setting up a Node.js project with TypeScript can often feel like a complex, tedious task. You have to configure multiple tools like TypeScript, bundlers (like Rollup or Webpack), testing libraries, and nodemon for live reloading. This process often involves configuring file extensions (like `.js`), managing different environments, and handling various configurations, leading to a somewhat chaotic development experience.

In this article, I will show you how to set up a **Node.js + TypeScript** project with the **latest tools**, which solves these issues and makes the setup smooth and maintainable. This setup includes:

* **TypeScript** for type safety.
    
* **Rollup** as the bundler, powered by **esbuild** for fast and efficient builds.
    
* **Jest** for testing your application.
    
* **Nodemon** for automatic reloading during development.
    
* A clean solution for importing modules without the need to specify the `.js` extension in imports.
    

This configuration avoids the usual "hectic" nature of setting up these tools and provides a more streamlined experience.

### Prerequisites:

* Node.js installed on your system.
    
* A basic understanding of TypeScript and Node.js.
    

## Complete github code

[Setup code!](https://github.com/pratham15541/node-typescript-jest-rollup-setup)

### 1\. **Setting Up the Project**

Let's begin by setting up a simple Node.js project with TypeScript.

1. **Create a new directory for your project**:
    
    ```bash
    mkdir app
    cd app
    ```
    
2. **Initialize a new** `package.json`:
    
    ```bash
    npm init -y
    ```
    
3. **Install necessary dependencies**:
    
    ```bash
    npm install --save-dev typescript ts-node @types/node tslib ts-jest rollup rollup-lugin-esbuild
    nodemon jest @types/jest @rollup/plugin-node-resolve @rollup/plugin-commonjs
    ```
    
4. **Create a** `tsconfig.json` file: This will configure TypeScript for our Node.js environment.
    
    ```json
    {
      "ts-node": {
        "esm": true //if ts-node is used globally
      },
        "compilerOptions": {
          "target": "ESNext",
          "module": "ESNext",
          "outDir": "./dist",
          "strict": true,
          "esModuleInterop": true,
          "moduleResolution": "node",
          "skipLibCheck": true,
          "resolveJsonModule": true,
          "declaration": true,
          "sourceMap": true,
          
        },
        "include": ["src/**/*"],
        "exclude": ["node_modules", "dist", "tests"]
      }
     
    ```
    
5. **Create a** `rollup.config.js` file: This configuration will bundle your application for production.
    
    ```javascript
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
    ```
    
6. **Configure Jest with** `jest.config.js`:
    
    ```javascript
    /** @type {import('ts-jest').JestConfigWithTsJest} **/
    export default {
      testEnvironment: "node",
      transform: {
        "^.+.tsx?$": ["ts-jest",{}],
      },
    };
    ```
    
7. **Configure Nodemon with** `nodemon.json`:
    
    ```json
    {
        "watch": ["src"],
        "ext": "ts,json",
        "ignore": ["src/**/*.spec.ts"],
        "exec": "npm start"      
      }
    ```
    
8. **Create a file**: Create a simple `src/index.ts` file:
    
    ```typescript
    import { addition } from "./functions/addition";
    const output: number = addition(0); // 6]
    console.log(output);
    ```
    
9. **Create a file**: Create a simple `src/function/addition.ts` file:
    
    ```typescript
    export function addition(...args: number[]) {
        return args.reduce((acc, val) => acc + val, 0);
      }
    ```
    
10. **Create a sample test**: Create a simple `tests/function/addition.ts` file:
    
    ```typescript
    import { addition } from '../../src/functions/addition';
    
    describe('addition function', () => {
    
      it('should correctly sum two positive numbers', () => {
        const sum = addition(1, 2);
        expect(sum).toBe(3);
      });
    
      it('should correctly sum larger positive numbers', () => {
        const sum = addition(5, 10);
        expect(sum).toBe(15);
      });
    
      it('should return 0 when no arguments are passed', () => {
        expect(addition()).toBe(0);
      });
    
      it('should correctly sum two negative numbers', () => {
        const sum = addition(-5, -10);
        expect(sum).toBe(-15);
      });
    
      it('should correctly sum one negative and one positive number', () => {
        const sum = addition(-5, 10);
        expect(sum).toBe(5);
      });
    
      it('should handle large numbers correctly', () => {
        const sum = addition(1e6, 1e6);
        expect(sum).toBe(2e6);  // 2 million
      });
    
      it('should handle floating point numbers correctly', () => {
        const sum = addition(0.1, 0.2);
        expect(sum).toBeCloseTo(0.3, 5);  // 0.1 + 0.2 should be close to 0.3
      });
    });
    ```
    
11. ### . **Project Structure**
    

Here’s what your directory structure should look like:

```plaintext
app/
├── dist/
├── node_modules/
├── src/
│   ├── functions/
│       ├──addition.ts
│   ├── index.ts
├── tests/
│    ├── addition.test.ts
├── package.json
├── rollup.config.js
├── tsconfig.json
└── jest.config.js
```

### **Running the Application**

To build and run the app:

1. **To build the app**:
    
    ```bash
    npm run build
    ```
    
2. **To run the app**:
    
    ```bash
    npm start
    ```
    
3. **To develop with auto-reload**:
    
    ```bash
    npm run dev
    ```
    
4. **To run tests**:
    
    ```bash
    npm test
    ```
    

### Conclusion

With this setup, you've created a simple yet powerful Node.js application using TypeScript, Rollup for bundling, Jest for testing, and Nodemon for automatic reloading during development. This environment ensures that your application is well-structured, easy to test, and optimized for production.

Feel free to experiment with different configurations and adjust the setup to your needs. This is just the starting point for building scalable and maintainable Node.js applications with TypeScript!
