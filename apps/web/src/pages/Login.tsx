/**
 * Login Page
 * User authentication page with LoginForm component
 */

import { LoginForm } from '@/app/features/auth/components'

const LoginPage = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-wani-50 via-white to-wani-100"></div>

      {/* Decorative Gradient Orbs */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-wani-400/30 to-coral/20 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-coral/20 to-sunset/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8 animate-fade-in">
          <img
            src="/logo-naranja.png"
            alt="Wani"
            className="h-24 w-24 mx-auto mb-6"
          />
          <h1 className="text-3xl font-black text-dark mb-2">
            Welcome Back
          </h1>
          <p className="text-sm text-dark/60">
            Sign in to your account
          </p>
        </div>

        {/* Login Form Component */}
        <LoginForm
          onSuccess={() => {
            console.log('Login successful!')
          }}
          redirectTo="/dashboard"
        />
      </div>
    </div>
  )
}

export default LoginPage
