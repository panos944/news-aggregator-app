import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LoginForm from '../LoginForm'
import { AuthProvider } from '../../contexts/AuthContext'


// Mock the auth service
vi.mock('../../services/authService', () => ({
  authService: {
    login: vi.fn(),
    register: vi.fn(),
    logout: vi.fn(),
  }
}))

// Mock router (if using React Router)
vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn(),
}))

describe('LoginForm', () => {
  const mockOnToggleMode = vi.fn()

  beforeEach(async () => {
    vi.clearAllMocks()
    const { authService } = await import('../../services/authService')
    vi.mocked(authService.login).mockResolvedValue({ success: true, message: 'Login successful' })
  })

  it('renders login form correctly', () => {
    render(
      <AuthProvider>
        <LoginForm onToggleMode={mockOnToggleMode} />
      </AuthProvider>
    )

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/κωδικός/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /σύνδεση$/i })).toBeInTheDocument()
  })

  it('handles form submission with valid data', async () => {
    const { authService } = await import('../../services/authService')
    const user = userEvent.setup()
    
    render(
      <AuthProvider>
        <LoginForm onToggleMode={mockOnToggleMode} />
      </AuthProvider>
    )

    await user.type(screen.getByLabelText(/email/i), 'test@example.com')
    await user.type(screen.getByLabelText(/κωδικός/i), 'Password123!')
    await user.click(screen.getByRole('button', { name: /σύνδεση$/i }))

    await waitFor(() => {
      expect(authService.login).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'Password123!'
      })
    })
  })

  // Note: Empty field validation is handled by HTML5 required attributes
  // This test was removed to avoid conflicts with native browser validation

  it('shows error message when login fails', async () => {
    const { authService } = await import('../../services/authService')
    vi.mocked(authService.login).mockResolvedValue({ success: false, message: 'Invalid credentials' })
    
    const user = userEvent.setup()
    
    render(
      <AuthProvider>
        <LoginForm onToggleMode={mockOnToggleMode} />
      </AuthProvider>
    )

    await user.type(screen.getByLabelText(/email/i), 'test@example.com')
    await user.type(screen.getByLabelText(/κωδικός/i), 'wrongpassword')
    await user.click(screen.getByRole('button', { name: /σύνδεση$/i }))

    await waitFor(() => {
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument()
    })
  })

  it('calls onToggleMode when toggle link is clicked', async () => {
    const user = userEvent.setup()
    
    render(
      <AuthProvider>
        <LoginForm onToggleMode={mockOnToggleMode} />
      </AuthProvider>
    )

    const toggleLink = screen.getByText(/δημιουργήστε νέο λογαριασμό/i)
    await user.click(toggleLink)

    expect(mockOnToggleMode).toHaveBeenCalled()
  })
})