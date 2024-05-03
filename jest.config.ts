import type { Config } from 'jest';

export default <Config>{
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
};
