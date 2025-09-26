'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import { 
  Calculator, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Target, 
  BarChart3, 
  Download,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  PieChart,
  Activity,
  Zap,
  Award,
  Clock,
  Repeat,
  Star
} from 'lucide-react'

export default function LTVCalculator() {
  const [formData, setFormData] = useState({
    averageOrderValue: '',
    purchaseFrequency: '',
    customerLifespan: '',
    retentionRate: '',
    profitMargin: '',
    discountRate: '',
    industry: '',
    businessModel: ''
  })

  const [results, setResults] = useState<any>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const industries = [
    'E-commerce', 'SaaS', 'Local Business', 'Healthcare', 'Education', 
    'Real Estate', 'Finance', 'Travel & Tourism', 'Food & Beverage', 'Other'
  ]

  const businessModels = [
    'Subscription', 'Transaction-based', 'Hybrid', 'Freemium', 'Marketplace', 'Other'
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const calculateLTV = () => {
    const averageOrderValue = parseFloat(formData.averageOrderValue) || 0
    const purchaseFrequency = parseFloat(formData.purchaseFrequency) || 0
    const customerLifespan = parseFloat(formData.customerLifespan) || 0
    const retentionRate = parseFloat(formData.retentionRate) || 0
    const profitMargin = parseFloat(formData.profitMargin) || 0
    const discountRate = parseFloat(formData.discountRate) || 10

    // Calculate LTV using different methods
    const simpleLTV = averageOrderValue * purchaseFrequency * customerLifespan
    const profitLTV = simpleLTV * (profitMargin / 100)
    
    // Calculate retention-based LTV
    const monthlyRevenue = averageOrderValue * purchaseFrequency
    const monthlyRetentionRate = retentionRate / 100
    const churnRate = 1 - monthlyRetentionRate
    const retentionLTV = monthlyRetentionRate > 0 && churnRate > 0 ? 
      (monthlyRevenue * monthlyRetentionRate) / churnRate : simpleLTV

    // Calculate discounted LTV
    const monthlyDiscountRate = discountRate / 100 / 12
    const discountedLTV = monthlyDiscountRate > 0 && monthlyRetentionRate > monthlyDiscountRate ?
      (monthlyRevenue * monthlyRetentionRate) / (monthlyDiscountRate - (monthlyRetentionRate - 1)) : simpleLTV

    // Calculate customer equity metrics
    const clvRatio = profitLTV > 0 ? profitLTV / (averageOrderValue * 0.3) : 0 // Assuming CAC is 30% of AOV
    const paybackPeriod = averageOrderValue > 0 && monthlyRevenue > 0 ? 
      (averageOrderValue * 0.3) / monthlyRevenue : 0 // Assuming CAC is 30% of AOV

    // Calculate scores
    const ltvScore = simpleLTV >= 10000 ? 100 : simpleLTV >= 5000 ? 80 : simpleLTV >= 2000 ? 60 : simpleLTV >= 1000 ? 40 : 20
    const retentionScore = retentionRate >= 80 ? 100 : retentionRate >= 60 ? 80 : retentionRate >= 40 ? 60 : retentionRate >= 20 ? 40 : 20
    const profitScore = profitMargin >= 50 ? 100 : profitMargin >= 30 ? 80 : profitMargin >= 15 ? 60 : profitMargin >= 5 ? 40 : 20
    const overallScore = (ltvScore + retentionScore + profitScore) / 3

    // Generate recommendations
    const recommendations = []
    const strengths = []

    if (simpleLTV >= 10000) {
      strengths.push('Excellent customer lifetime value')
    } else if (simpleLTV >= 5000) {
      strengths.push('Good customer lifetime value')
    } else if (simpleLTV >= 2000) {
      recommendations.push('LTV is acceptable but could be improved')
    } else {
      recommendations.push('LTV is below average - focus on customer retention')
    }

    if (retentionRate >= 80) {
      strengths.push('Exceptional customer retention rate')
    } else if (retentionRate >= 60) {
      strengths.push('Good customer retention rate')
    } else if (retentionRate < 40) {
      recommendations.push('Low retention rate - implement retention strategies')
    }

    if (clvRatio >= 5) {
      strengths.push('Excellent customer value ratio')
    } else if (clvRatio >= 3) {
      strengths.push('Good customer value ratio')
    } else if (clvRatio < 2) {
      recommendations.push('Customer value ratio is low - improve monetization')
    }

    if (paybackPeriod <= 3) {
      strengths.push('Fast customer payback period')
    } else if (paybackPeriod > 6) {
      recommendations.push('Long payback period - optimize acquisition costs')
    }

    return {
      simpleLTV: simpleLTV.toFixed(2),
      profitLTV: profitLTV.toFixed(2),
      retentionLTV: retentionLTV.toFixed(2),
      discountedLTV: discountedLTV.toFixed(2),
      clvRatio: clvRatio.toFixed(2),
      paybackPeriod: paybackPeriod.toFixed(1),
      monthlyRevenue: monthlyRevenue.toFixed(2),
      overallScore: overallScore.toFixed(0),
      recommendations,
      strengths,
      metrics: {
        ltvScore,
        retentionScore,
        profitScore
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsCalculating(true)

    // Simulate calculation
    setTimeout(() => {
      const calculatedResults = calculateLTV()
      setResults(calculatedResults)
      setIsCalculating(false)
    }, 1500)
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400'
    if (score >= 60) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent'
    if (score >= 60) return 'Good'
    if (score >= 40) return 'Fair'
    return 'Poor'
  }

  const formatCurrency = (value: string) => {
    const num = parseFloat(value)
    return new Intl.NumberFormat('en-EG', {
      style: 'currency',
      currency: 'EGP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(num)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <Navigation currentPath="/ltv-calculator" />

      <div className="relative z-40 container mx-auto px-6 pt-24 pb-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 px-6 py-3 rounded-full mb-6 backdrop-blur-sm border border-purple-500/30">
            <Calculator className="w-5 h-5" />
            <span className="text-sm font-medium">LTV Calculator Tool</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
            Lifetime Value Calculator
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Calculate customer lifetime value, analyze retention patterns, and optimize your business for long-term profitability and growth.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Calculator Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 shadow-2xl">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">Customer Value Data</h2>
                <p className="text-gray-300">Enter your customer metrics to calculate lifetime value</p>
              </div>

              {!results ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Core LTV Metrics */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-purple-400" />
                        Average Order Value *
                      </label>
                      <input
                        type="number"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 text-white placeholder-gray-400"
                        value={formData.averageOrderValue}
                        onChange={(e) => handleInputChange('averageOrderValue', e.target.value)}
                        placeholder="250"
                        min="0"
                        step="10"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                        <Repeat className="w-4 h-4 text-purple-400" />
                        Purchase Frequency (per year) *
                      </label>
                      <input
                        type="number"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 text-white placeholder-gray-400"
                        value={formData.purchaseFrequency}
                        onChange={(e) => handleInputChange('purchaseFrequency', e.target.value)}
                        placeholder="4"
                        min="0"
                        step="0.1"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                        <Clock className="w-4 h-4 text-purple-400" />
                        Customer Lifespan (years) *
                      </label>
                      <input
                        type="number"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 text-white placeholder-gray-400"
                        value={formData.customerLifespan}
                        onChange={(e) => handleInputChange('customerLifespan', e.target.value)}
                        placeholder="3"
                        min="0"
                        step="0.5"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                        <Star className="w-4 h-4 text-purple-400" />
                        Retention Rate (%) *
                      </label>
                      <input
                        type="number"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 text-white placeholder-gray-400"
                        value={formData.retentionRate}
                        onChange={(e) => handleInputChange('retentionRate', e.target.value)}
                        placeholder="70"
                        min="0"
                        max="100"
                        step="1"
                        required
                      />
                    </div>
                  </div>

                  {/* Financial Metrics */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                        <PieChart className="w-4 h-4 text-purple-400" />
                        Profit Margin (%)
                      </label>
                      <input
                        type="number"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 text-white placeholder-gray-400"
                        value={formData.profitMargin}
                        onChange={(e) => handleInputChange('profitMargin', e.target.value)}
                        placeholder="30"
                        min="0"
                        max="100"
                        step="1"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                        <Target className="w-4 h-4 text-purple-400" />
                        Discount Rate (%)
                      </label>
                      <input
                        type="number"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 text-white placeholder-gray-400"
                        value={formData.discountRate}
                        onChange={(e) => handleInputChange('discountRate', e.target.value)}
                        placeholder="10"
                        min="0"
                        max="50"
                        step="1"
                      />
                    </div>
                  </div>

                  {/* Context Information */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                        <Activity className="w-4 h-4 text-purple-400" />
                        Industry
                      </label>
                      <select
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 text-white appearance-none cursor-pointer"
                        value={formData.industry}
                        onChange={(e) => handleInputChange('industry', e.target.value)}
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23a78bfa' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                          backgroundPosition: `right 0.5rem center`,
                          backgroundRepeat: `no-repeat`,
                          backgroundSize: `1.5em 1.5em`,
                          paddingRight: `2.5rem`
                        }}
                      >
                        <option value="" className="bg-gray-900 text-white">Select industry</option>
                        {industries.map(industry => (
                          <option key={industry} value={industry} className="bg-gray-900 text-white">{industry}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                        <Zap className="w-4 h-4 text-purple-400" />
                        Business Model
                      </label>
                      <select
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 text-white appearance-none cursor-pointer"
                        value={formData.businessModel}
                        onChange={(e) => handleInputChange('businessModel', e.target.value)}
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23a78bfa' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                          backgroundPosition: `right 0.5rem center`,
                          backgroundRepeat: `no-repeat`,
                          backgroundSize: `1.5em 1.5em`,
                          paddingRight: `2.5rem`
                        }}
                      >
                        <option value="" className="bg-gray-900 text-white">Select model</option>
                        {businessModels.map(model => (
                          <option key={model} value={model} className="bg-gray-900 text-white">{model}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isCalculating}
                    className="w-full px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isCalculating ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Calculating...
                      </>
                    ) : (
                      <>
                        <Calculator className="w-5 h-5" />
                        Calculate LTV
                      </>
                    )}
                  </button>
                </form>
              ) : (
                /* Results Section */
                <div className="space-y-8">
                  {/* Overall Score */}
                  <div className="text-center">
                    <div className="mb-6">
                      <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Award className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">LTV Analysis Complete</h3>
                      <p className="text-gray-300">Your customer lifetime value breakdown</p>
                    </div>

                    <div className="mb-6">
                      <div className="text-6xl font-bold mb-2">
                        <span className={getScoreColor(parseFloat(results.overallScore))}>{results.overallScore}</span>
                        <span className="text-gray-400 text-3xl">/100</span>
                      </div>
                      <div className={`text-xl font-semibold mb-4 ${getScoreColor(parseFloat(results.overallScore))}`}>
                        {getScoreLabel(parseFloat(results.overallScore))} Performance
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full transition-all duration-1000 ${
                            parseFloat(results.overallScore) >= 80 ? 'bg-green-500' :
                            parseFloat(results.overallScore) >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${results.overallScore}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Key Metrics */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 p-4 rounded-xl border border-purple-500/30">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-4 h-4 text-purple-400" />
                        <span className="text-sm text-purple-300">Simple LTV</span>
                      </div>
                      <div className="text-2xl font-bold text-white">{formatCurrency(results.simpleLTV)}</div>
                      <div className="text-xs text-gray-400">Basic Lifetime Value</div>
                    </div>

                    <div className="bg-gradient-to-br from-pink-500/20 to-pink-600/20 p-4 rounded-xl border border-pink-500/30">
                      <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="w-4 h-4 text-pink-400" />
                        <span className="text-sm text-pink-300">Profit LTV</span>
                      </div>
                      <div className="text-2xl font-bold text-white">{formatCurrency(results.profitLTV)}</div>
                      <div className="text-xs text-gray-400">Profit-Based Value</div>
                    </div>

                    <div className="bg-gradient-to-br from-indigo-500/20 to-indigo-600/20 p-4 rounded-xl border border-indigo-500/30">
                      <div className="flex items-center gap-2 mb-2">
                        <Star className="w-4 h-4 text-indigo-400" />
                        <span className="text-sm text-indigo-300">Retention LTV</span>
                      </div>
                      <div className="text-2xl font-bold text-white">{formatCurrency(results.retentionLTV)}</div>
                      <div className="text-xs text-gray-400">Retention-Based</div>
                    </div>

                    <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 p-4 rounded-xl border border-blue-500/30">
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="w-4 h-4 text-blue-400" />
                        <span className="text-sm text-blue-300">CLV Ratio</span>
                      </div>
                      <div className="text-2xl font-bold text-white">{results.clvRatio}x</div>
                      <div className="text-xs text-gray-400">Value Ratio</div>
                    </div>
                  </div>

                  {/* Additional Metrics */}
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <div className="text-sm text-gray-400 mb-1">Discounted LTV</div>
                      <div className="text-xl font-bold text-white">{formatCurrency(results.discountedLTV)}</div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <div className="text-sm text-gray-400 mb-1">Monthly Revenue</div>
                      <div className="text-xl font-bold text-white">{formatCurrency(results.monthlyRevenue)}</div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <div className="text-sm text-gray-400 mb-1">Payback Period</div>
                      <div className="text-xl font-bold text-white">{results.paybackPeriod} months</div>
                    </div>
                  </div>

                  {/* LTV Comparison */}
                  <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <h4 className="text-lg font-semibold text-white mb-4">LTV Calculation Methods</h4>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-300">Simple LTV</span>
                        <span className="text-lg font-semibold text-purple-400">{formatCurrency(results.simpleLTV)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-300">Profit-Adjusted LTV</span>
                        <span className="text-lg font-semibold text-pink-400">{formatCurrency(results.profitLTV)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-300">Retention-Based LTV</span>
                        <span className="text-lg font-semibold text-indigo-400">{formatCurrency(results.retentionLTV)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-300">Discounted LTV</span>
                        <span className="text-lg font-semibold text-blue-400">{formatCurrency(results.discountedLTV)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Strengths and Recommendations */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6">
                      <h4 className="text-lg font-semibold text-green-400 mb-4 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5" />
                        Strengths
                      </h4>
                      <ul className="space-y-2">
                        {results.strengths.map((strength: string, index: number) => (
                          <li key={index} className="flex items-start gap-2 text-green-300">
                            <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{strength}</span>
                          </li>
                        ))}
                        {results.strengths.length === 0 && (
                          <li className="text-gray-400 text-sm">No significant strengths identified</li>
                        )}
                      </ul>
                    </div>

                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
                      <h4 className="text-lg font-semibold text-blue-400 mb-4 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5" />
                        Recommendations
                      </h4>
                      <ul className="space-y-2">
                        {results.recommendations.map((rec: string, index: number) => (
                          <li key={index} className="flex items-start gap-2 text-blue-300">
                            <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex gap-4 justify-center">
                    <button
                      onClick={() => {
                        setResults(null)
                        setFormData({
                          averageOrderValue: '',
                          purchaseFrequency: '',
                          customerLifespan: '',
                          retentionRate: '',
                          profitMargin: '',
                          discountRate: '',
                          industry: '',
                          businessModel: ''
                        })
                      }}
                      className="px-6 py-3 border border-white/20 text-white rounded-lg hover:bg-white/10 transition-all duration-300"
                    >
                      New Calculation
                    </button>
                    <button 
                      onClick={() => {
                        // Generate and download LTV report
                        const reportData = {
                          type: 'LTV Analysis',
                          date: new Date().toLocaleDateString(),
                          results: results
                        }
                        const dataStr = JSON.stringify(reportData, null, 2)
                        const dataBlob = new Blob([dataStr], {type: 'application/json'})
                        const url = URL.createObjectURL(dataBlob)
                        const link = document.createElement('a')
                        link.href = url
                        link.download = 'ltv-analysis-report.json'
                        link.click()
                        URL.revokeObjectURL(url)
                      }}
                      className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Download Report
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Sidebar Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-6 rounded-3xl border border-purple-500/30 backdrop-blur-md">
              <h3 className="text-xl font-bold text-white mb-4">LTV Explained</h3>
              <div className="space-y-4">
                <div className="p-3 bg-white/5 rounded-lg">
                  <h4 className="font-semibold text-purple-300 mb-1">What is LTV?</h4>
                  <p className="text-xs text-gray-300">Lifetime Value is the total revenue a business can expect from a single customer account throughout the business relationship.</p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <h4 className="font-semibold text-pink-300 mb-1">Why it matters</h4>
                  <p className="text-xs text-gray-300">LTV helps you understand customer value, set acquisition budgets, and make strategic business decisions.</p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <h4 className="font-semibold text-indigo-300 mb-1">LTV:CAC Ratio</h4>
                  <p className="text-xs text-gray-300">A healthy LTV:CAC ratio is 3:1 or higher, indicating efficient customer acquisition and strong profitability.</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 p-6 rounded-3xl border border-green-500/30 backdrop-blur-md">
              <h3 className="text-xl font-bold text-white mb-4">Industry Benchmarks</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">SaaS</span>
                  <span className="text-sm font-semibold text-green-400">$5k-25k</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">E-commerce</span>
                  <span className="text-sm font-semibold text-green-400">$1k-5k</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">Subscription</span>
                  <span className="text-sm font-semibold text-green-400">$3k-15k</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">B2B Services</span>
                  <span className="text-sm font-semibold text-green-400">$10k-50k</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 p-6 rounded-3xl border border-blue-500/30 backdrop-blur-md">
              <h3 className="text-xl font-bold text-white mb-4">Optimization Tips</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2 text-blue-300">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Improve customer retention rates</span>
                </li>
                <li className="flex items-start gap-2 text-blue-300">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Increase average order value</span>
                </li>
                <li className="flex items-start gap-2 text-blue-300">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Boost purchase frequency</span>
                </li>
                <li className="flex items-start gap-2 text-blue-300">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Extend customer lifespan</span>
                </li>
                <li className="flex items-start gap-2 text-blue-300">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Implement loyalty programs</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}