'use client';

import React from "react";
import { motion } from "framer-motion";
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

const SubSenseHero = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Light background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-10 opacity-40">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200/30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-purple-200/30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-200/30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-4000"></div>
        </div>
        
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgb(59 130 246) 0.5px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 py-6 px-6 lg:px-12 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-900">SubSense</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200 hover:underline underline-offset-4">
              Features
            </a>
            <a href="#pricing" className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200 hover:underline underline-offset-4">
              Pricing
            </a>
            <a href="#about" className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200 hover:underline underline-offset-4">
              About
            </a>
          </div>

          <div className="flex items-center gap-4">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200">
                  Sign In
                </button>
              </SignInButton>
              <SignInButton mode="modal">
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-6 py-2.5 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  Get Started Free
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <a href="/dashboard" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-6 py-2.5 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                Go to Dashboard
              </a>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Content */}
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-medium mb-8 border border-blue-200"
              >
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                AI-Powered Subscription Management
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-gray-900"
              >
                <span className="block">Take control of</span>
                <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  your subscriptions
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl text-gray-600 mb-8 leading-relaxed"
              >
                See all your bills and subscriptions in one app. Cancel unwanted services, 
                get price-hike alerts, and avoid unnecessary expenses to stay in control of your money.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 mb-10"
              >
                <SignedOut>
                  <SignInButton mode="modal">
                    <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                      Get started
                    </button>
                  </SignInButton>
                </SignedOut>
                <SignedIn>
                  <a href="/dashboard" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-center">
                    Go to Dashboard
                  </a>
                </SignedIn>
                
                <button className="bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-300 px-8 py-4 text-gray-700 font-medium rounded-xl transition-all duration-300 flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"/>
                  </svg>
                  Watch demo
                </button>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-wrap items-center gap-6 text-gray-500"
              >
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
                  </svg>
                  <span>GDPR compliant</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-purple-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zm3 14a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"/>
                  </svg>
                  <span>Works on all devices</span>
                </div>
              </motion.div>
            </div>

            {/* Right Column - Floating Interface Elements */}
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                {/* Main dashboard card */}
                <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden max-w-md mx-auto">
                  {/* Header */}
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-lg">My Subscriptions</h3>
                      <div className="bg-white/20 rounded-full px-3 py-1">
                        <span className="text-sm font-semibold">£324.73/mo</span>
                      </div>
                    </div>
                    <p className="text-blue-100 text-sm">4 active subscriptions</p>
                  </div>

                  {/* Subscription list */}
                  <div className="p-6 space-y-4">
                    {/* Netflix */}
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center mr-3">
                          <span className="text-white font-bold text-sm">N</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Netflix</h4>
                          <p className="text-sm text-gray-500">Monthly • Next: 15 Nov</p>
                        </div>
                      </div>
                      <span className="font-semibold text-gray-900">£10.99</span>
                    </div>

                    {/* Spotify */}
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center mr-3">
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/>
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Spotify</h4>
                          <p className="text-sm text-gray-500">Monthly • Next: 29 Nov</p>
                        </div>
                      </div>
                      <span className="font-semibold text-gray-900">£11.99</span>
                    </div>

                    {/* PureGym */}
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center mr-3">
                          <span className="text-white font-bold text-sm">P</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">PureGym</h4>
                          <p className="text-sm text-gray-500">Monthly • Next: 4 Dec</p>
                        </div>
                      </div>
                      <span className="font-semibold text-gray-900">£26.99</span>
                    </div>
                  </div>
                </div>

                {/* Floating notification card */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 max-w-xs"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900">Price Alert</p>
                      <p className="text-xs text-gray-600">Netflix increased to £15.99</p>
                    </div>
                  </div>
                </motion.div>

                {/* Floating savings card */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                  className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 max-w-xs"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900">Potential Savings</p>
                      <p className="text-xs text-gray-600">£12.99/month available</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Subtle glow effect */}
              <div className="absolute -inset-8 bg-gradient-to-r from-blue-200/20 to-purple-200/20 rounded-full blur-3xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-gray-50 hover:bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-all duration-500 hover:-translate-y-2">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Smart Analytics</h3>
              <p className="text-gray-600 leading-relaxed">Get insights into your spending patterns with AI-powered analytics and personalized recommendations.</p>
            </div>

            <div className="group bg-gray-50 hover:bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-all duration-500 hover:-translate-y-2">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM12.071 8.929l-7.071 7.071v2h2l7.071-7.071m-2.121-2.121l2.828-2.829a1.414 1.414 0 112 2l-2.829 2.829m-2.121-2.121l2.121 2.121" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Auto Detection</h3>
              <p className="text-gray-600 leading-relaxed">Automatically detect subscriptions from your bank statements and email receipts with AI technology.</p>
            </div>

            <div className="group bg-gray-50 hover:bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-all duration-500 hover:-translate-y-2">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-pink-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Save Money</h3>
              <p className="text-gray-600 leading-relaxed">Cancel unused subscriptions, find better deals, and optimize your spending with intelligent suggestions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-gray-900">SubSense</span>
            </div>
            <p className="text-gray-600 mb-6">AI-powered subscription management for the modern world</p>
            <div className="text-gray-500 text-sm">
              © 2025 SubSense. Built for the UK market.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SubSenseHero;