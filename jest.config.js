// import { defaults } from 'jest-config'

/** @type {import('jest').Config} */
const config = {
  preset: 'ts-jest',
  // moduleFileExtensions: [...defaults.moduleFileExtensions, 'mts', 'cts'],
  verbose: true,
  // moduleDirectories: ['<rootDir>/packages/'],
  modulePathIgnorePatterns: ['<rootDir>/ignore/'],
}

module.exports = config
