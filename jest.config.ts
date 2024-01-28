import type { Config } from 'jest'
import nextJest from 'next/jest.js'
import 'resize-observer-polyfill';

const createJestConfig = nextJest({
    // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
    dir: './',
})

// Add any custom config to be passed to Jest
const config: Config = {
    coverageProvider: 'v8',
    testEnvironment: 'jsdom',
    modulePaths: ['<rootDir>/src/'],
    collectCoverage: true,
    collectCoverageFrom: [
        "**/*.{ts,tsx}",
        "!**/*.d.ts",
        "!**/node_modules/**",
        "!**/coverage/**",
        "!**/*.types.ts",
        "!<rootDir>/.next/**",
        "!<rootDir>/*.config.js",
        "!<rootDir>/*.config.ts",
        "!<rootDir>/src/assets/**",
        "!<rootDir>/src/lib/lenis.tsx",
    ],
    // Add more setup options before each test is run
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config)