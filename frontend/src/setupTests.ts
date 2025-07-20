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

// Setup function to reset mocks between tests
beforeEach(() => {
  vi.clearAllMocks()
})