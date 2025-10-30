/**
 * Register Page
 * User registration page with RegisterForm component
 */

import { RegisterForm } from '@/app/features/auth/components/RegisterForm'

const RegisterPage = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-wani-50 via-white to-wani-100"></div>

      {/* Decorative Gradient Orbs */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-wani-400/30 to-coral/20 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-coral/20 to-sunset/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8 animate-fade-in">
          <img
            src="/logo-horizontal-naranja.png"
            alt="Wani"
            className="h-16 w-auto mx-auto mb-4"
          />
          <h1 className="text-3xl font-black text-dark">
            Create your <span className="bg-gradient-wani bg-clip-text text-transparent">Wani</span> account
          </h1>
          <p className="mt-2 text-sm text-dark/60">
            Start sending money globally in seconds
          </p>
        </div>

        <RegisterForm
          onSuccess={() => {
            console.log('Registration successful!')
            // User will be automatically redirected to /dashboard by useRegister hook
          }}
          onError={(error) => {
            console.error('Registration failed:', error)
            // Error is already displayed in the form
          }}
          // Optional: Custom redirect path
          // redirectTo="/onboarding"
        />
      </div>
    </div>
  )
}

export default RegisterPage
