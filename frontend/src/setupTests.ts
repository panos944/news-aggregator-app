import '@testing-library/jest-dom'
import { vi, beforeEach } from 'vitest'

// Mock environment variables for testing
Object.defineProperty(globalThis, 'process', {
  value: {
    env: {
      VITE_API_URL: 'http://localhost:8000/api',
    }
  }
})

// Mock fetch for API calls
globalThis.fetch = vi.fn()

// Mock HTMLMediaElement methods that are not implemented in jsdom
Object.defineProperty(HTMLMediaElement.prototype, 'load', {
  writable: true,
  value: vi.fn(),
});

Object.defineProperty(HTMLMediaElement.prototype, 'play', {
  writable: true,
  value: vi.fn(() => Promise.resolve()),
});

Object.defineProperty(HTMLMediaElement.prototype, 'pause', {
  writable: true,
  value: vi.fn(),
});

// Setup function to reset mocks between tests
beforeEach(() => {
  vi.clearAllMocks()
})