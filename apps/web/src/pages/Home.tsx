/**
 * Home Page - Ultra-Modern Welcome Experience
 * Public landing page with premium design
 */

const HomePage = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Hero Section - Ultra Modern with Gradient Background */}
      <section className="relative min-h-screen flex items-center">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-wani-50 via-white to-wani-100"></div>

        {/* Decorative Gradient Orbs */}
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-wani-400/30 to-coral/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-coral/20 to-sunset/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>

        <div className="container-wani relative z-10 min-h-screen md:min-h-0">
          <div className="max-w-5xl mx-auto min-h-screen md:min-h-0 flex flex-col justify-between md:justify-center py-8 md:py-0">
            {/* Logo Wani - Top */}
            <div className="animate-fade-in pt-4" style={{ marginBottom: '10px' }}>
              <img
                src="/logo-horizontal-naranja.png"
                alt="Wani"
                className="h-20 md:h-16 lg:h-20 w-auto md:mb-6"
              />
            </div>

            {/* Middle Content - Badge + Title + Subtitle */}
            <div className="flex-shrink-0">
              {/* Animated Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full glass border border-wani-200/40 mb-4 md:mb-6 animate-slide-up">
                <span className="w-2 h-2 bg-gradient-wani rounded-full animate-pulse"></span>
                <span className="text-xs md:text-sm font-semibold text-wani-600">
                  Your money. Your rules. Your speed.
                </span>
              </div>

              {/* Hero Title with Gradient Text */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-3 md:mb-6 animate-slide-up leading-tight" style={{ animationDelay: '100ms' }}>
                <span className="block text-dark">Money that moves</span>
                <span className="block bg-gradient-wani bg-clip-text text-transparent">
                  as fast as you do
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-base md:text-xl lg:text-2xl text-dark/70 mb-0 md:mb-10 max-w-3xl animate-slide-up" style={{ animationDelay: '200ms' }}>
                Send money globally in seconds.{' '}
                <span className="font-semibold text-wani-600">Zero hidden fees. Total control.</span>
              </p>
            </div>

            {/* Bottom Content - Buttons + Stats */}
            <div className="pb-16 md:pb-8">
              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-3 md:gap-4 mb-6 md:mb-12 animate-slide-up" style={{ animationDelay: '300ms' }}>
                <a
                  href="/auth/register"
                  className="btn-primary text-sm md:text-lg px-6 py-3 md:px-8 md:py-4 shadow-glow hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  Get Started
                  <svg className="w-4 h-4 md:w-5 md:h-5 ml-2 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
                <a
                  href="#how-it-works"
                  className="btn-outline text-sm md:text-lg px-6 py-3 md:px-8 md:py-4 hover:scale-105 transition-all duration-300"
                >
                  See How It Works
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-3xl animate-fade-in" style={{ animationDelay: '400ms' }}>
                <div className="text-center">
                  <p className="text-2xl md:text-3xl lg:text-4xl font-black bg-gradient-wani bg-clip-text text-transparent mb-1 md:mb-2">
                    $2.5M+
                  </p>
                  <p className="text-xs md:text-sm text-dark/60 font-semibold">Transferred Monthly</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl md:text-3xl lg:text-4xl font-black bg-gradient-wani bg-clip-text text-transparent mb-1 md:mb-2">
                    150+
                  </p>
                  <p className="text-xs md:text-sm text-dark/60 font-semibold">Countries Supported</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl md:text-3xl lg:text-4xl font-black bg-gradient-wani bg-clip-text text-transparent mb-1 md:mb-2">
                    &lt;30s
                  </p>
                  <p className="text-xs md:text-sm text-dark/60 font-semibold">Average Transfer Time</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-wani-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Features Section - Glassmorphic Cards */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-wani-50/30"></div>

        <div className="container-wani relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black text-dark mb-4">
              Why Choose <span className="bg-gradient-wani bg-clip-text text-transparent">Wani</span>?
            </h2>
            <p className="text-xl text-dark/70 max-w-2xl mx-auto">
              Experience the future of cross-border payments with cutting-edge blockchain technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Feature 1 - Lightning Fast */}
            <div className="card group hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-wani-400 to-coral flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-dark mb-3">Lightning Fast</h3>
              <p className="text-dark/70 leading-relaxed">
                Transfers complete in under 30 seconds. No more waiting days for your money to arrive.
              </p>
            </div>

            {/* Feature 2 - Secure */}
            <div className="card group hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-success to-success/80 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-dark mb-3">Bank-Level Security</h3>
              <p className="text-dark/70 leading-relaxed">
                Protected by blockchain encryption and multi-layer security protocols. Your money is always safe.
              </p>
            </div>

            {/* Feature 3 - Low Fees */}
            <div className="card group hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-sunset to-sunset/80 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-dark mb-3">Ultra-Low Fees</h3>
              <p className="text-dark/70 leading-relaxed">
                Pay only 0.5% per transaction. No hidden fees, no surprises. What you see is what you pay.
              </p>
            </div>

            {/* Feature 4 - Global Reach */}
            <div className="card group hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-dark mb-3">Global Reach</h3>
              <p className="text-dark/70 leading-relaxed">
                Send money to over 150 countries instantly. Support for 40+ currencies and counting.
              </p>
            </div>

            {/* Feature 5 - 24/7 Support */}
            <div className="card group hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-info to-info/80 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-dark mb-3">24/7 Support</h3>
              <p className="text-dark/70 leading-relaxed">
                Our dedicated team is always here to help. Get instant support whenever you need it.
              </p>
            </div>

            {/* Feature 6 - No Hidden Fees */}
            <div className="card group hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-warning to-warning/80 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-dark mb-3">Transparent Pricing</h3>
              <p className="text-dark/70 leading-relaxed">
                No hidden fees, no exchange rate markups. See exactly what you'll pay before you send.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-wani-100 via-wani-50 to-white"></div>

        <div className="container-wani relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black text-dark mb-4">
              Send Money in <span className="bg-gradient-wani bg-clip-text text-transparent">3 Simple Steps</span>
            </h2>
            <p className="text-xl text-dark/70 max-w-2xl mx-auto">
              It's easier than you think. Start sending money globally in minutes.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="relative">
                <div className="card-dark text-center group hover:scale-105 transition-all duration-300">
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-2xl bg-gradient-wani flex items-center justify-center text-white font-black text-xl shadow-glow">
                    1
                  </div>
                  <div className="pt-8">
                    <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-wani-400/20 to-coral/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                      <svg className="w-10 h-10 text-wani-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">Create Account</h3>
                    <p className="text-white/80 leading-relaxed">
                      Sign up for free in under 2 minutes. No credit card required.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative md:mt-12">
                <div className="card-dark text-center group hover:scale-105 transition-all duration-300">
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-2xl bg-gradient-wani flex items-center justify-center text-white font-black text-xl shadow-glow">
                    2
                  </div>
                  <div className="pt-8">
                    <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-wani-400/20 to-coral/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                      <svg className="w-10 h-10 text-wani-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">Add Funds</h3>
                    <p className="text-white/80 leading-relaxed">
                      Load your Wani wallet using your preferred payment method.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative md:mt-24">
                <div className="card-dark text-center group hover:scale-105 transition-all duration-300">
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-2xl bg-gradient-wani flex items-center justify-center text-white font-black text-xl shadow-glow">
                    3
                  </div>
                  <div className="pt-8">
                    <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-wani-400/20 to-coral/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                      <svg className="w-10 h-10 text-wani-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">Send Money</h3>
                    <p className="text-white/80 leading-relaxed">
                      Enter recipient details and send. Money arrives in seconds!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-wani-400 via-coral to-sunset"></div>

        {/* Decorative Elements */}
        <div className="absolute top-10 right-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>

        <div className="container-wani relative z-10 text-center">
          <h2 className="text-4xl lg:text-6xl font-black text-white mb-6">
            Ready to Send Money<br />the Modern Way?
          </h2>
          <p className="text-xl lg:text-2xl text-white/90 mb-12 max-w-3xl mx-auto">
            Join thousands of users who are already saving money and time with Wani
          </p>
          <a
            href="/auth/register"
            className="inline-flex items-center gap-3 px-10 py-5 bg-white text-wani-600 rounded-3xl font-bold text-xl shadow-2xl hover:scale-105 hover:shadow-glow-white transition-all duration-300"
          >
            Create Free Account
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
          <p className="text-white/80 mt-6">
            No credit card required • Free forever
          </p>
        </div>
      </section>
    </div>
  )
}

export default HomePage
