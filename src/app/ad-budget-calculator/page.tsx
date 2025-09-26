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
  Layers,
  Percent
} from 'lucide-react'

export default function AdBudgetCalculator() {
  const [formData, setFormData] = useState({
    totalRevenue: '',
    marketingBudgetPercent: '',
    targetROAS: '',
    averageOrderValue: '',
    conversionRate: '',
    campaignDuration: '30',
    industry: '',
    businessGoal: ''
  })

  const [results, setResults] = useState<any>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const industries = [
    'E-commerce', 'SaaS', 'Local Business', 'Healthcare', 'Education', 
    'Real Estate', 'Finance', 'Travel & Tourism', 'Food & Beverage', 'Other'
  ]

  const businessGoals = [
    'Brand Awareness', 'Lead Generation', 'Sales', 'Customer Retention', 'Market Expansion', 'Other'
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const calculateAdBudget = () => {
    const totalRevenue = parseFloat(formData.totalRevenue) || 0
    const marketingBudgetPercent = parseFloat(formData.marketingBudgetPercent) || 0
    const targetROAS = parseFloat(formData.targetROAS) || 0
    const averageOrderValue = parseFloat(formData.averageOrderValue) || 0
    const conversionRate = parseFloat(formData.conversionRate) || 0
    const campaignDuration = parseInt(formData.campaignDuration) || 30

    // Calculate budget allocations
    const totalMarketingBudget = totalRevenue * (marketingBudgetPercent / 100)
    const adBudget = totalMarketingBudget * 0.7 // 70% of marketing budget for ads
    const monthlyAdBudget = adBudget / 12
    const dailyAdBudget = monthlyAdBudget / 30

    // Calculate campaign-specific metrics
    const campaignAdBudget = (adBudget / 365) * campaignDuration
    const targetRevenue = campaignAdBudget * targetROAS
    const targetOrders = targetRevenue / averageOrderValue
    const targetVisitors = targetOrders / (conversionRate / 100)
    const costPerVisitor = campaignAdBudget / targetVisitors
    const costPerOrder = campaignAdBudget / targetOrders

    // Calculate channel allocation (suggested)
    const channelAllocation = {
      facebook: adBudget * 0.35,
      google: adBudget * 0.30,
      instagram: adBudget * 0.20,
      linkedin: adBudget * 0.10,
      other: adBudget * 0.05
    }

    // Calculate efficiency scores
    const budgetScore = marketingBudgetPercent >= 10 && marketingBudgetPercent <= 20 ? 100 : 
                       marketingBudgetPercent >= 5 && marketingBudgetPercent <= 25 ? 80 : 
                       marketingBudgetPercent >= 3 && marketingBudgetPercent <= 30 ? 60 : 40
    const roasScore = targetROAS >= 4 ? 100 : targetROAS >= 3 ? 80 : targetROAS >= 2 ? 60 : targetROAS >= 1 ? 40 : 20
    const conversionScore = conversionRate >= 3 ? 100 : conversionRate >= 2 ? 80 : conversionRate >= 1 ? 60 : conversionRate >= 0.5 ? 40 : 20
    const overallScore = (budgetScore + roasScore + conversionScore) / 3

    // Generate recommendations
    const recommendations = []
    const strengths = []

    if (marketingBudgetPercent >= 10 && marketingBudgetPercent <= 20) {
      strengths.push('Optimal marketing budget allocation')
    } else if (marketingBudgetPercent < 5) {
      recommendations.push('Consider increasing marketing budget for better results')
    } else if (marketingBudgetPercent > 25) {
      recommendations.push('Marketing budget may be too high - optimize spending')
    }

    if (targetROAS >= 3) {
      strengths.push('Realistic ROAS target')
    } else if (targetROAS < 2) {
      recommendations.push('ROAS target may be too low - aim for higher returns')
    }

    if (conversionRate >= 2) {
      strengths.push('Good conversion rate expectations')
    } else if (conversionRate < 1) {
      recommendations.push('Conversion rate target is low - optimize landing pages')
    }

    if (averageOrderValue >= 100) {
      strengths.push('Healthy average order value')
    } else if (averageOrderValue < 50) {
      recommendations.push('Consider increasing average order value')
    }

    return {
      totalMarketingBudget: totalMarketingBudget.toFixed(2),
      adBudget: adBudget.toFixed(2),
      monthlyAdBudget: monthlyAdBudget.toFixed(2),
      dailyAdBudget: dailyAdBudget.toFixed(2),
      campaignAdBudget: campaignAdBudget.toFixed(2),
      targetRevenue: targetRevenue.toFixed(2),
      targetOrders: targetOrders.toFixed(0),
      targetVisitors: targetVisitors.toFixed(0),
      costPerVisitor: costPerVisitor.toFixed(2),
      costPerOrder: costPerOrder.toFixed(2),
      channelAllocation: {
        facebook: channelAllocation.facebook.toFixed(2),
        google: channelAllocation.google.toFixed(2),
        instagram: channelAllocation.instagram.toFixed(2),
        linkedin: channelAllocation.linkedin.toFixed(2),
        other: channelAllocation.other.toFixed(2)
      },
      overallScore: overallScore.toFixed(0),
      recommendations,
      strengths,
      metrics: {
        budgetScore,
        roasScore,
        conversionScore
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsCalculating(true)

    // Simulate calculation
    setTimeout(() => {
      const calculatedResults = calculateAdBudget()
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
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-900/20 via-transparent to-transparent"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <Navigation currentPath="/ad-budget-calculator" />

      <div className="relative z-40 container mx-auto px-6 pt-24 pb-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500/20 to-amber-500/20 text-orange-300 px-6 py-3 rounded-full mb-6 backdrop-blur-sm border border-orange-500/30">
            <Calculator className="w-5 h-5" />
            <span className="text-sm font-medium">Ad Budget Calculator</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent">
            Ad Budget Calculator
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Calculate optimal advertising budgets, allocate spending across channels, and maximize your marketing ROI with data-driven budget planning.
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
                <h2 className="text-2xl font-bold text-white mb-2">Budget Planning Data</h2>
                <p className="text-gray-300">Enter your business metrics to calculate optimal ad budget</p>
              </div>

              {!results ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Business Metrics */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-orange-400" />
                        Total Annual Revenue *
                      </label>
                      <input
                        type="number"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 text-white placeholder-gray-400"
                        value={formData.totalRevenue}
                        onChange={(e) => handleInputChange('totalRevenue', e.target.value)}
                        placeholder="1000000"
                        min="0"
                        step="10000"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                        <Percent className="w-4 h-4 text-orange-400" />
                        Marketing Budget (%) *
                      </label>
                      <input
                        type="number"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 text-white placeholder-gray-400"
                        value={formData.marketingBudgetPercent}
                        onChange={(e) => handleInputChange('marketingBudgetPercent', e.target.value)}
                        placeholder="15"
                        min="0"
                        max="100"
                        step="1"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                        <Target className="w-4 h-4 text-orange-400" />
                        Target ROAS *
                      </label>
                      <input
                        type="number"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 text-white placeholder-gray-400"
                        value={formData.targetROAS}
                        onChange={(e) => handleInputChange('targetROAS', e.target.value)}
                        placeholder="3"
                        min="0"
                        step="0.1"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                        <BarChart3 className="w-4 h-4 text-orange-400" />
                        Average Order Value *
                      </label>
                      <input
                        type="number"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 text-white placeholder-gray-400"
                        value={formData.averageOrderValue}
                        onChange={(e) => handleInputChange('averageOrderValue', e.target.value)}
                        placeholder="150"
                        min="0"
                        step="10"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-orange-400" />
                        Conversion Rate (%) *
                      </label>
                      <input
                        type="number"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 text-white placeholder-gray-400"
                        value={formData.conversionRate}
                        onChange={(e) => handleInputChange('conversionRate', e.target.value)}
                        placeholder="2.5"
                        min="0"
                        max="100"
                        step="0.1"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                        <Clock className="w-4 h-4 text-orange-400" />
                        Campaign Duration (days)
                      </label>
                      <select
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 text-white appearance-none cursor-pointer"
                        value={formData.campaignDuration}
                        onChange={(e) => handleInputChange('campaignDuration', e.target.value)}
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23fb923c' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                          backgroundPosition: `right 0.5rem center`,
                          backgroundRepeat: `no-repeat`,
                          backgroundSize: `1.5em 1.5em`,
                          paddingRight: `2.5rem`
                        }}
                      >
                        <option value="7" className="bg-gray-900 text-white">7 days</option>
                        <option value="14" className="bg-gray-900 text-white">14 days</option>
                        <option value="30" className="bg-gray-900 text-white">30 days</option>
                        <option value="60" className="bg-gray-900 text-white">60 days</option>
                        <option value="90" className="bg-gray-900 text-white">90 days</option>
                      </select>
                    </div>
                  </div>

                  {/* Context Information */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                        <Activity className="w-4 h-4 text-orange-400" />
                        Industry
                      </label>
                      <select
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 text-white appearance-none cursor-pointer"
                        value={formData.industry}
                        onChange={(e) => handleInputChange('industry', e.target.value)}
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23fb923c' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
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
                        <Zap className="w-4 h-4 text-orange-400" />
                        Business Goal
                      </label>
                      <select
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 text-white appearance-none cursor-pointer"
                        value={formData.businessGoal}
                        onChange={(e) => handleInputChange('businessGoal', e.target.value)}
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23fb923c' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                          backgroundPosition: `right 0.5rem center`,
                          backgroundRepeat: `no-repeat`,
                          backgroundSize: `1.5em 1.5em`,
                          paddingRight: `2.5rem`
                        }}
                      >
                        <option value="" className="bg-gray-900 text-white">Select goal</option>
                        {businessGoals.map(goal => (
                          <option key={goal} value={goal} className="bg-gray-900 text-white">{goal}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isCalculating}
                    className="w-full px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isCalculating ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Calculating...
                      </>
                    ) : (
                      <>
                        <Calculator className="w-5 h-5" />
                        Calculate Budget
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
                      <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Award className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">Budget Analysis Complete</h3>
                      <p className="text-gray-300">Your optimal ad budget breakdown</p>
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
                    <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 p-4 rounded-xl border border-orange-500/30">
                      <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="w-4 h-4 text-orange-400" />
                        <span className="text-sm text-orange-300">Ad Budget</span>
                      </div>
                      <div className="text-2xl font-bold text-white">{formatCurrency(results.adBudget)}</div>
                      <div className="text-xs text-gray-400">Annual Budget</div>
                    </div>

                    <div className="bg-gradient-to-br from-amber-500/20 to-amber-600/20 p-4 rounded-xl border border-amber-500/30">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-4 h-4 text-amber-400" />
                        <span className="text-sm text-amber-300">Monthly Budget</span>
                      </div>
                      <div className="text-2xl font-bold text-white">{formatCurrency(results.monthlyAdBudget)}</div>
                      <div className="text-xs text-gray-400">Per Month</div>
                    </div>

                    <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 p-4 rounded-xl border border-yellow-500/30">
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm text-yellow-300">Campaign Budget</span>
                      </div>
                      <div className="text-2xl font-bold text-white">{formatCurrency(results.campaignAdBudget)}</div>
                      <div className="text-xs text-gray-400">For {formData.campaignDuration} days</div>
                    </div>

                    <div className="bg-gradient-to-br from-red-500/20 to-red-600/20 p-4 rounded-xl border border-red-500/30">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-4 h-4 text-red-400" />
                        <span className="text-sm text-red-300">Target Revenue</span>
                      </div>
                      <div className="text-2xl font-bold text-white">{formatCurrency(results.targetRevenue)}</div>
                      <div className="text-xs text-gray-400">Expected Revenue</div>
                    </div>
                  </div>

                  {/* Channel Allocation */}
                  <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <h4 className="text-lg font-semibold text-white mb-4">Channel Budget Allocation</h4>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-400 mb-1">{formatCurrency(results.channelAllocation.facebook)}</div>
                        <div className="text-sm text-gray-400">Facebook</div>
                        <div className="w-full bg-white/10 rounded-full h-2 mt-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: '35%' }}></div>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-400 mb-1">{formatCurrency(results.channelAllocation.google)}</div>
                        <div className="text-sm text-gray-400">Google</div>
                        <div className="w-full bg-white/10 rounded-full h-2 mt-2">
                          <div className="bg-red-500 h-2 rounded-full" style={{ width: '30%' }}></div>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-400 mb-1">{formatCurrency(results.channelAllocation.instagram)}</div>
                        <div className="text-sm text-gray-400">Instagram</div>
                        <div className="w-full bg-white/10 rounded-full h-2 mt-2">
                          <div className="bg-purple-500 h-2 rounded-full" style={{ width: '20%' }}></div>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-cyan-400 mb-1">{formatCurrency(results.channelAllocation.linkedin)}</div>
                        <div className="text-sm text-gray-400">LinkedIn</div>
                        <div className="w-full bg-white/10 rounded-full h-2 mt-2">
                          <div className="bg-cyan-500 h-2 rounded-full" style={{ width: '10%' }}></div>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-400 mb-1">{formatCurrency(results.channelAllocation.other)}</div>
                        <div className="text-sm text-gray-400">Other</div>
                        <div className="w-full bg-white/10 rounded-full h-2 mt-2">
                          <div className="bg-gray-500 h-2 rounded-full" style={{ width: '5%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Performance Metrics */}
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <div className="text-sm text-gray-400 mb-1">Target Orders</div>
                      <div className="text-xl font-bold text-white">{results.targetOrders}</div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <div className="text-sm text-gray-400 mb-1">Target Visitors</div>
                      <div className="text-xl font-bold text-white">{results.targetVisitors}</div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <div className="text-sm text-gray-400 mb-1">Cost Per Order</div>
                      <div className="text-xl font-bold text-white">{formatCurrency(results.costPerOrder)}</div>
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
                          totalRevenue: '',
                          marketingBudgetPercent: '',
                          targetROAS: '',
                          averageOrderValue: '',
                          conversionRate: '',
                          campaignDuration: '30',
                          industry: '',
                          businessGoal: ''
                        })
                      }}
                      className="px-6 py-3 border border-white/20 text-white rounded-lg hover:bg-white/10 transition-all duration-300"
                    >
                      New Calculation
                    </button>
                    <button 
                      onClick={() => {
                        // Generate and download ad budget report
                        const reportData = {
                          type: 'Ad Budget Analysis',
                          date: new Date().toLocaleDateString(),
                          results: results
                        }
                        const dataStr = JSON.stringify(reportData, null, 2)
                        const dataBlob = new Blob([dataStr], {type: 'application/json'})
                        const url = URL.createObjectURL(dataBlob)
                        const link = document.createElement('a')
                        link.href = url
                        link.download = 'ad-budget-analysis-report.json'
                        link.click()
                        URL.revokeObjectURL(url)
                      }}
                      className="px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300 flex items-center gap-2"
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
            <div className="bg-gradient-to-br from-orange-500/20 to-amber-500/20 p-6 rounded-3xl border border-orange-500/30 backdrop-blur-md">
              <h3 className="text-xl font-bold text-white mb-4">Budget Planning</h3>
              <div className="space-y-4">
                <div className="p-3 bg-white/5 rounded-lg">
                  <h4 className="font-semibold text-orange-300 mb-1">Optimal Budget Range</h4>
                  <p className="text-xs text-gray-300">Most businesses allocate 10-20% of revenue to marketing, with 60-80% of that going to paid advertising.</p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <h4 className="font-semibold text-amber-300 mb-1">Channel Allocation</h4>
                  <p className="text-xs text-gray-300">Distribute budget across channels based on performance, audience, and business goals.</p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <h4 className="font-semibold text-yellow-300 mb-1">Budget Optimization</h4>
                  <p className="text-xs text-gray-300">Regular review and adjustment of budget allocation ensures maximum ROI and efficiency.</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 p-6 rounded-3xl border border-green-500/30 backdrop-blur-md">
              <h3 className="text-xl font-bold text-white mb-4">Industry Standards</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">E-commerce</span>
                  <span className="text-sm font-semibold text-green-400">15-25%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">SaaS</span>
                  <span className="text-sm font-semibold text-green-400">20-35%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">B2B Services</span>
                  <span className="text-sm font-semibold text-green-400">10-20%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">Local Business</span>
                  <span className="text-sm font-semibold text-green-400">5-15%</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-6 rounded-3xl border border-purple-500/30 backdrop-blur-md">
              <h3 className="text-xl font-bold text-white mb-4">Best Practices</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2 text-purple-300">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Start with conservative budgets</span>
                </li>
                <li className="flex items-start gap-2 text-purple-300">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Scale based on performance data</span>
                </li>
                <li className="flex items-start gap-2 text-purple-300">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Diversify across multiple channels</span>
                </li>
                <li className="flex items-start gap-2 text-purple-300">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Monitor and adjust weekly</span>
                </li>
                <li className="flex items-start gap-2 text-purple-300">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Focus on high-ROAS channels</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}