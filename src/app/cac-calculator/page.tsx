'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import { 
  Calculator, 
  Users, 
  DollarSign, 
  TrendingUp, 
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
  ShoppingCart
} from 'lucide-react'

export default function CACCalculator() {
  const [formData, setFormData] = useState({
    totalAdSpend: '',
    totalSalesTeamCost: '',
    totalMarketingCost: '',
    otherAcquisitionCosts: '',
    newCustomers: '',
    timePeriod: '30',
    industry: '',
    customerSegment: ''
  })

  const [results, setResults] = useState<any>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const industries = [
    'E-commerce', 'SaaS', 'Local Business', 'Healthcare', 'Education', 
    'Real Estate', 'Finance', 'Travel & Tourism', 'Food & Beverage', 'Other'
  ]

  const customerSegments = [
    'B2B', 'B2C', 'Enterprise', 'SMB', 'Startup', 'Individual', 'Other'
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const calculateCAC = () => {
    const totalAdSpend = parseFloat(formData.totalAdSpend) || 0
    const totalSalesTeamCost = parseFloat(formData.totalSalesTeamCost) || 0
    const totalMarketingCost = parseFloat(formData.totalMarketingCost) || 0
    const otherAcquisitionCosts = parseFloat(formData.otherAcquisitionCosts) || 0
    const newCustomers = parseFloat(formData.newCustomers) || 0
    const timePeriod = parseInt(formData.timePeriod) || 30

    // Calculate CAC
    const totalAcquisitionCost = totalAdSpend + totalSalesTeamCost + totalMarketingCost + otherAcquisitionCosts
    const cac = newCustomers > 0 ? totalAcquisitionCost / newCustomers : 0
    const monthlyCAC = cac * (30 / timePeriod)

    // Calculate efficiency metrics
    const costBreakdown = {
      adSpend: totalAdSpend / totalAcquisitionCost * 100,
      salesTeam: totalSalesTeamCost / totalAcquisitionCost * 100,
      marketing: totalMarketingCost / totalAcquisitionCost * 100,
      other: otherAcquisitionCosts / totalAcquisitionCost * 100
    }

    // Calculate scores
    const cacScore = cac <= 100 ? 100 : cac <= 250 ? 80 : cac <= 500 ? 60 : cac <= 1000 ? 40 : 20
    const efficiencyScore = Object.values(costBreakdown).some(cost => cost > 70) ? 60 : 80
    const overallScore = (cacScore + efficiencyScore) / 2

    // Generate recommendations
    const recommendations = []
    const strengths = []

    if (cac <= 100) {
      strengths.push('Excellent customer acquisition cost')
    } else if (cac <= 250) {
      strengths.push('Good customer acquisition cost')
    } else if (cac <= 500) {
      recommendations.push('CAC is above average - consider optimization')
    } else {
      recommendations.push('CAC is too high - immediate optimization needed')
    }

    if (costBreakdown.adSpend > 60) {
      recommendations.push('Ad spend is too high - diversify acquisition channels')
    } else if (costBreakdown.adSpend <= 40) {
      strengths.push('Well-balanced ad spend allocation')
    }

    if (costBreakdown.salesTeam > 50) {
      recommendations.push('Sales team costs are high - consider automation')
    }

    if (newCustomers >= 50) {
      strengths.push('Good customer acquisition volume')
    } else if (newCustomers < 10) {
      recommendations.push('Low customer volume - scale acquisition efforts')
    }

    return {
      cac: cac.toFixed(2),
      monthlyCAC: monthlyCAC.toFixed(2),
      totalAcquisitionCost: totalAcquisitionCost.toFixed(2),
      costBreakdown: {
        adSpend: costBreakdown.adSpend.toFixed(1),
        salesTeam: costBreakdown.salesTeam.toFixed(1),
        marketing: costBreakdown.marketing.toFixed(1),
        other: costBreakdown.other.toFixed(1)
      },
      overallScore: overallScore.toFixed(0),
      recommendations,
      strengths,
      metrics: {
        cacScore,
        efficiencyScore
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsCalculating(true)

    // Simulate calculation
    setTimeout(() => {
      const calculatedResults = calculateCAC()
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
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-900/20 via-transparent to-transparent"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <Navigation currentPath="/cac-calculator" />

      <div className="relative z-40 container mx-auto px-6 pt-24 pb-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 px-6 py-3 rounded-full mb-6 backdrop-blur-sm border border-green-500/30">
            <Calculator className="w-5 h-5" />
            <span className="text-sm font-medium">CAC Calculator Tool</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
            Customer Acquisition Cost Calculator
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Calculate your customer acquisition cost, analyze cost efficiency, and optimize your marketing and sales spend for maximum ROI.
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
                <h2 className="text-2xl font-bold text-white mb-2">Acquisition Cost Data</h2>
                <p className="text-gray-300">Enter your costs and customer data to calculate CAC</p>
              </div>

              {!results ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Cost Inputs */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-green-400" />
                        Total Ad Spend *
                      </label>
                      <input
                        type="number"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 text-white placeholder-gray-400"
                        value={formData.totalAdSpend}
                        onChange={(e) => handleInputChange('totalAdSpend', e.target.value)}
                        placeholder="10000"
                        min="0"
                        step="100"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                        <Users className="w-4 h-4 text-green-400" />
                        Sales Team Cost *
                      </label>
                      <input
                        type="number"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 text-white placeholder-gray-400"
                        value={formData.totalSalesTeamCost}
                        onChange={(e) => handleInputChange('totalSalesTeamCost', e.target.value)}
                        placeholder="5000"
                        min="0"
                        step="100"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                        <BarChart3 className="w-4 h-4 text-green-400" />
                        Marketing Cost *
                      </label>
                      <input
                        type="number"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 text-white placeholder-gray-400"
                        value={formData.totalMarketingCost}
                        onChange={(e) => handleInputChange('totalMarketingCost', e.target.value)}
                        placeholder="3000"
                        min="0"
                        step="100"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                        <Activity className="w-4 h-4 text-green-400" />
                        Other Acquisition Costs
                      </label>
                      <input
                        type="number"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 text-white placeholder-gray-400"
                        value={formData.otherAcquisitionCosts}
                        onChange={(e) => handleInputChange('otherAcquisitionCosts', e.target.value)}
                        placeholder="2000"
                        min="0"
                        step="100"
                      />
                    </div>
                  </div>

                  {/* Customer Data */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                        <ShoppingCart className="w-4 h-4 text-green-400" />
                        New Customers Acquired *
                      </label>
                      <input
                        type="number"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 text-white placeholder-gray-400"
                        value={formData.newCustomers}
                        onChange={(e) => handleInputChange('newCustomers', e.target.value)}
                        placeholder="50"
                        min="0"
                        step="1"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                        <Clock className="w-4 h-4 text-green-400" />
                        Time Period (days)
                      </label>
                      <select
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 text-white appearance-none cursor-pointer"
                        value={formData.timePeriod}
                        onChange={(e) => handleInputChange('timePeriod', e.target.value)}
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%2334d399' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
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
                        <Target className="w-4 h-4 text-green-400" />
                        Industry
                      </label>
                      <select
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 text-white appearance-none cursor-pointer"
                        value={formData.industry}
                        onChange={(e) => handleInputChange('industry', e.target.value)}
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%2334d399' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
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
                        <Zap className="w-4 h-4 text-green-400" />
                        Customer Segment
                      </label>
                      <select
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 text-white appearance-none cursor-pointer"
                        value={formData.customerSegment}
                        onChange={(e) => handleInputChange('customerSegment', e.target.value)}
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%2334d399' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                          backgroundPosition: `right 0.5rem center`,
                          backgroundRepeat: `no-repeat`,
                          backgroundSize: `1.5em 1.5em`,
                          paddingRight: `2.5rem`
                        }}
                      >
                        <option value="" className="bg-gray-900 text-white">Select segment</option>
                        {customerSegments.map(segment => (
                          <option key={segment} value={segment} className="bg-gray-900 text-white">{segment}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isCalculating}
                    className="w-full px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isCalculating ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Calculating...
                      </>
                    ) : (
                      <>
                        <Calculator className="w-5 h-5" />
                        Calculate CAC
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
                      <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Award className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">CAC Analysis Complete</h3>
                      <p className="text-gray-300">Your customer acquisition cost breakdown</p>
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
                    <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 p-4 rounded-xl border border-green-500/30">
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="w-4 h-4 text-green-400" />
                        <span className="text-sm text-green-300">CAC</span>
                      </div>
                      <div className="text-2xl font-bold text-white">{formatCurrency(results.cac)}</div>
                      <div className="text-xs text-gray-400">Per Customer</div>
                    </div>

                    <div className="bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 p-4 rounded-xl border border-emerald-500/30">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-4 h-4 text-emerald-400" />
                        <span className="text-sm text-emerald-300">Monthly CAC</span>
                      </div>
                      <div className="text-2xl font-bold text-white">{formatCurrency(results.monthlyCAC)}</div>
                      <div className="text-xs text-gray-400">Monthly Average</div>
                    </div>

                    <div className="bg-gradient-to-br from-teal-500/20 to-teal-600/20 p-4 rounded-xl border border-teal-500/30">
                      <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="w-4 h-4 text-teal-400" />
                        <span className="text-sm text-teal-300">Total Cost</span>
                      </div>
                      <div className="text-2xl font-bold text-white">{formatCurrency(results.totalAcquisitionCost)}</div>
                      <div className="text-xs text-gray-400">Acquisition Cost</div>
                    </div>

                    <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 p-4 rounded-xl border border-yellow-500/30">
                      <div className="flex items-center gap-2 mb-2">
                        <ShoppingCart className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm text-yellow-300">Customers</span>
                      </div>
                      <div className="text-2xl font-bold text-white">{formData.newCustomers}</div>
                      <div className="text-xs text-gray-400">New Acquired</div>
                    </div>
                  </div>

                  {/* Cost Breakdown */}
                  <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <h4 className="text-lg font-semibold text-white mb-4">Cost Breakdown</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-400 mb-1">{results.costBreakdown.adSpend}%</div>
                        <div className="text-sm text-gray-400">Ad Spend</div>
                        <div className="w-full bg-white/10 rounded-full h-2 mt-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${results.costBreakdown.adSpend}%` }}></div>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-400 mb-1">{results.costBreakdown.salesTeam}%</div>
                        <div className="text-sm text-gray-400">Sales Team</div>
                        <div className="w-full bg-white/10 rounded-full h-2 mt-2">
                          <div className="bg-purple-500 h-2 rounded-full" style={{ width: `${results.costBreakdown.salesTeam}%` }}></div>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-400 mb-1">{results.costBreakdown.marketing}%</div>
                        <div className="text-sm text-gray-400">Marketing</div>
                        <div className="w-full bg-white/10 rounded-full h-2 mt-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: `${results.costBreakdown.marketing}%` }}></div>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-yellow-400 mb-1">{results.costBreakdown.other}%</div>
                        <div className="text-sm text-gray-400">Other</div>
                        <div className="w-full bg-white/10 rounded-full h-2 mt-2">
                          <div className="bg-yellow-500 h-2 rounded-full" style={{ width: `${results.costBreakdown.other}%` }}></div>
                        </div>
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
                          totalAdSpend: '',
                          totalSalesTeamCost: '',
                          totalMarketingCost: '',
                          otherAcquisitionCosts: '',
                          newCustomers: '',
                          timePeriod: '30',
                          industry: '',
                          customerSegment: ''
                        })
                      }}
                      className="px-6 py-3 border border-white/20 text-white rounded-lg hover:bg-white/10 transition-all duration-300"
                    >
                      New Calculation
                    </button>
                    <button 
                      onClick={() => {
                        // Generate and download CAC report
                        const reportData = {
                          type: 'CAC Analysis',
                          date: new Date().toLocaleDateString(),
                          results: results
                        }
                        const dataStr = JSON.stringify(reportData, null, 2)
                        const dataBlob = new Blob([dataStr], {type: 'application/json'})
                        const url = URL.createObjectURL(dataBlob)
                        const link = document.createElement('a')
                        link.href = url
                        link.download = 'cac-analysis-report.json'
                        link.click()
                        URL.revokeObjectURL(url)
                      }}
                      className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300 flex items-center gap-2"
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
            <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 p-6 rounded-3xl border border-green-500/30 backdrop-blur-md">
              <h3 className="text-xl font-bold text-white mb-4">CAC Explained</h3>
              <div className="space-y-4">
                <div className="p-3 bg-white/5 rounded-lg">
                  <h4 className="font-semibold text-green-300 mb-1">What is CAC?</h4>
                  <p className="text-xs text-gray-300">Customer Acquisition Cost is the total cost of acquiring a new customer, including all marketing and sales expenses.</p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <h4 className="font-semibold text-emerald-300 mb-1">Why it matters</h4>
                  <p className="text-xs text-gray-300">CAC helps you understand the efficiency of your marketing and sales efforts and determine profitability.</p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <h4 className="font-semibold text-teal-300 mb-1">Good CAC range</h4>
                  <p className="text-xs text-gray-300">Varies by industry, but generally lower CAC indicates more efficient customer acquisition.</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 p-6 rounded-3xl border border-blue-500/30 backdrop-blur-md">
              <h3 className="text-xl font-bold text-white mb-4">Industry Benchmarks</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">SaaS</span>
                  <span className="text-sm font-semibold text-green-400">$100-500</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">E-commerce</span>
                  <span className="text-sm font-semibold text-green-400">$50-200</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">B2B Services</span>
                  <span className="text-sm font-semibold text-green-400">$200-1000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">B2C Products</span>
                  <span className="text-sm font-semibold text-green-400">$30-150</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-6 rounded-3xl border border-purple-500/30 backdrop-blur-md">
              <h3 className="text-xl font-bold text-white mb-4">Optimization Tips</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2 text-purple-300">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Focus on high-converting channels</span>
                </li>
                <li className="flex items-start gap-2 text-purple-300">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Improve landing page conversion rates</span>
                </li>
                <li className="flex items-start gap-2 text-purple-300">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Optimize ad targeting and bidding</span>
                </li>
                <li className="flex items-start gap-2 text-purple-300">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Leverage organic marketing channels</span>
                </li>
                <li className="flex items-start gap-2 text-purple-300">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Implement customer referral programs</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}