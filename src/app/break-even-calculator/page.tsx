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
  Scale,
  Package,
  TrendingDown,
  Clock
} from 'lucide-react'

export default function BreakEvenCalculator() {
  const [formData, setFormData] = useState({
    fixedCosts: '',
    variableCostPerUnit: '',
    sellingPricePerUnit: '',
    expectedSalesVolume: '',
    timePeriod: 'monthly',
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
    'Product-based', 'Service-based', 'Subscription', 'Hybrid', 'Marketplace', 'Other'
  ]

  const timePeriods = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' },
    { value: 'yearly', label: 'Yearly' }
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const calculateBreakEven = () => {
    const fixedCosts = parseFloat(formData.fixedCosts) || 0
    const variableCostPerUnit = parseFloat(formData.variableCostPerUnit) || 0
    const sellingPricePerUnit = parseFloat(formData.sellingPricePerUnit) || 0
    const expectedSalesVolume = parseFloat(formData.expectedSalesVolume) || 0

    // Calculate contribution margin
    const contributionMarginPerUnit = sellingPricePerUnit - variableCostPerUnit
    const contributionMarginRatio = sellingPricePerUnit > 0 ? 
      (contributionMarginPerUnit / sellingPricePerUnit) * 100 : 0

    // Calculate break-even point
    const breakEvenUnits = contributionMarginPerUnit > 0 ? 
      fixedCosts / contributionMarginPerUnit : 0
    const breakEvenRevenue = breakEvenUnits * sellingPricePerUnit

    // Calculate margin of safety
    const marginOfSafetyUnits = expectedSalesVolume > breakEvenUnits ? 
      expectedSalesVolume - breakEvenUnits : 0
    const marginOfSafetyRevenue = marginOfSafetyUnits * sellingPricePerUnit
    const marginOfSafetyPercentage = expectedSalesVolume > 0 ? 
      (marginOfSafetyUnits / expectedSalesVolume) * 100 : 0

    // Calculate profit/loss at expected sales
    const totalVariableCosts = expectedSalesVolume * variableCostPerUnit
    const totalRevenue = expectedSalesVolume * sellingPricePerUnit
    const totalCosts = fixedCosts + totalVariableCosts
    const netProfit = totalRevenue - totalCosts

    // Calculate time-based metrics
    const timeMultiplier = getTimeMultiplier(formData.timePeriod)
    const breakEvenPerPeriod = breakEvenUnits / timeMultiplier
    const expectedSalesPerPeriod = expectedSalesVolume / timeMultiplier

    // Calculate scores
    const marginScore = contributionMarginRatio >= 50 ? 100 : 
                      contributionMarginRatio >= 30 ? 80 : 
                      contributionMarginRatio >= 20 ? 60 : 
                      contributionMarginRatio >= 10 ? 40 : 20

    const safetyScore = marginOfSafetyPercentage >= 50 ? 100 : 
                      marginOfSafetyPercentage >= 30 ? 80 : 
                      marginOfSafetyPercentage >= 15 ? 60 : 
                      marginOfSafetyPercentage >= 5 ? 40 : 20

    const profitabilityScore = netProfit >= 0 ? 100 : 0
    const overallScore = (marginScore + safetyScore + profitabilityScore) / 3

    // Generate recommendations
    const recommendations = []
    const strengths = []

    // Contribution margin analysis
    if (contributionMarginRatio >= 40) {
      strengths.push('Excellent contribution margin')
    } else if (contributionMarginRatio >= 25) {
      strengths.push('Good contribution margin')
    } else if (contributionMarginRatio < 15) {
      recommendations.push('Low contribution margin - consider increasing prices or reducing costs')
    }

    // Margin of safety analysis
    if (marginOfSafetyPercentage >= 40) {
      strengths.push('Strong margin of safety')
    } else if (marginOfSafetyPercentage >= 20) {
      strengths.push('Good margin of safety')
    } else if (marginOfSafetyPercentage < 10) {
      recommendations.push('Low margin of safety - high risk of losses')
    }

    // Profitability analysis
    if (netProfit > 0) {
      strengths.push('Currently profitable at expected sales')
    } else if (netProfit < 0) {
      recommendations.push('Operating at loss at expected sales volume')
    }

    // Break-even analysis
    if (breakEvenUnits <= expectedSalesVolume * 0.5) {
      strengths.push('Low break-even point relative to expected sales')
    } else if (breakEvenUnits > expectedSalesVolume) {
      recommendations.push('Break-even point exceeds expected sales - high risk')
    }

    return {
      breakEvenUnits: breakEvenUnits.toFixed(0),
      breakEvenRevenue: breakEvenRevenue.toFixed(2),
      contributionMarginPerUnit: contributionMarginPerUnit.toFixed(2),
      contributionMarginRatio: contributionMarginRatio.toFixed(1),
      marginOfSafetyUnits: marginOfSafetyUnits.toFixed(0),
      marginOfSafetyRevenue: marginOfSafetyRevenue.toFixed(2),
      marginOfSafetyPercentage: marginOfSafetyPercentage.toFixed(1),
      netProfit: netProfit.toFixed(2),
      totalRevenue: totalRevenue.toFixed(2),
      totalCosts: totalCosts.toFixed(2),
      breakEvenPerPeriod: breakEvenPerPeriod.toFixed(0),
      expectedSalesPerPeriod: expectedSalesPerPeriod.toFixed(0),
      overallScore: overallScore.toFixed(0),
      recommendations,
      strengths,
      metrics: {
        marginScore,
        safetyScore,
        profitabilityScore
      }
    }
  }

  const getTimeMultiplier = (period: string) => {
    switch (period) {
      case 'daily': return 365
      case 'weekly': return 52
      case 'monthly': return 12
      case 'quarterly': return 4
      case 'yearly': return 1
      default: return 12
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsCalculating(true)

    // Simulate calculation
    setTimeout(() => {
      const calculatedResults = calculateBreakEven()
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
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-900/20 via-transparent to-transparent"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <Navigation currentPath="/break-even-calculator" />

      <div className="relative z-40 container mx-auto px-6 pt-24 pb-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500/20 to-orange-500/20 text-red-300 px-6 py-3 rounded-full mb-6 backdrop-blur-sm border border-red-500/30">
            <Calculator className="w-5 h-5" />
            <span className="text-sm font-medium">Break-even Calculator</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
            Break-even Calculator
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Calculate your break-even point, analyze profitability, and make informed pricing and cost decisions for your business.
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
                <h2 className="text-2xl font-bold text-white mb-2">Cost & Pricing Data</h2>
                <p className="text-gray-300">Enter your cost structure and pricing information</p>
              </div>

              {!results ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Cost Structure */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-red-400" />
                        Fixed Costs *
                      </label>
                      <input
                        type="number"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300 text-white placeholder-gray-400"
                        value={formData.fixedCosts}
                        onChange={(e) => handleInputChange('fixedCosts', e.target.value)}
                        placeholder="50000"
                        min="0"
                        step="1000"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                        <Package className="w-4 h-4 text-red-400" />
                        Variable Cost per Unit *
                      </label>
                      <input
                        type="number"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300 text-white placeholder-gray-400"
                        value={formData.variableCostPerUnit}
                        onChange={(e) => handleInputChange('variableCostPerUnit', e.target.value)}
                        placeholder="30"
                        min="0"
                        step="1"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                        <Target className="w-4 h-4 text-red-400" />
                        Selling Price per Unit *
                      </label>
                      <input
                        type="number"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300 text-white placeholder-gray-400"
                        value={formData.sellingPricePerUnit}
                        onChange={(e) => handleInputChange('sellingPricePerUnit', e.target.value)}
                        placeholder="100"
                        min="0"
                        step="1"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                        <Users className="w-4 h-4 text-red-400" />
                        Expected Sales Volume *
                      </label>
                      <input
                        type="number"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300 text-white placeholder-gray-400"
                        value={formData.expectedSalesVolume}
                        onChange={(e) => handleInputChange('expectedSalesVolume', e.target.value)}
                        placeholder="1000"
                        min="0"
                        step="10"
                        required
                      />
                    </div>
                  </div>

                  {/* Time Period */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-red-400" />
                      Time Period *
                    </label>
                    <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                      {timePeriods.map((period) => (
                        <button
                          key={period.value}
                          type="button"
                          onClick={() => handleInputChange('timePeriod', period.value)}
                          className={`p-3 rounded-lg border transition-all duration-300 text-center ${
                            formData.timePeriod === period.value
                              ? 'bg-red-500/20 border-red-500/50 text-red-300'
                              : 'bg-white/5 border-white/20 text-gray-300 hover:bg-white/10'
                          }`}
                        >
                          <div className="text-sm font-medium">{period.label}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Context Information */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                        <Activity className="w-4 h-4 text-red-400" />
                        Industry
                      </label>
                      <select
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300 text-white appearance-none cursor-pointer"
                        value={formData.industry}
                        onChange={(e) => handleInputChange('industry', e.target.value)}
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23ef4444' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
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
                        <Zap className="w-4 h-4 text-red-400" />
                        Business Model
                      </label>
                      <select
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300 text-white appearance-none cursor-pointer"
                        value={formData.businessModel}
                        onChange={(e) => handleInputChange('businessModel', e.target.value)}
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23ef4444' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
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
                    className="w-full px-8 py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-red-500/25 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isCalculating ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Calculating...
                      </>
                    ) : (
                      <>
                        <Calculator className="w-5 h-5" />
                        Calculate Break-even
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
                      <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Award className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">Break-even Analysis Complete</h3>
                      <p className="text-gray-300">Your profitability breakdown</p>
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
                    <div className="bg-gradient-to-br from-red-500/20 to-red-600/20 p-4 rounded-xl border border-red-500/30">
                      <div className="flex items-center gap-2 mb-2">
                        <Scale className="w-4 h-4 text-red-400" />
                        <span className="text-sm text-red-300">Break-even Units</span>
                      </div>
                      <div className="text-2xl font-bold text-white">{results.breakEvenUnits}</div>
                      <div className="text-xs text-gray-400">Units to break even</div>
                    </div>

                    <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 p-4 rounded-xl border border-orange-500/30">
                      <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="w-4 h-4 text-orange-400" />
                        <span className="text-sm text-orange-300">Break-even Revenue</span>
                      </div>
                      <div className="text-2xl font-bold text-white">{formatCurrency(results.breakEvenRevenue)}</div>
                      <div className="text-xs text-gray-400">Revenue needed</div>
                    </div>

                    <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 p-4 rounded-xl border border-yellow-500/30">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm text-yellow-300">Margin %</span>
                      </div>
                      <div className="text-2xl font-bold text-white">{results.contributionMarginRatio}%</div>
                      <div className="text-xs text-gray-400">Contribution margin</div>
                    </div>

                    <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 p-4 rounded-xl border border-green-500/30">
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="w-4 h-4 text-green-400" />
                        <span className="text-sm text-green-300">Safety %</span>
                      </div>
                      <div className="text-2xl font-bold text-white">{results.marginOfSafetyPercentage}%</div>
                      <div className="text-xs text-gray-400">Margin of safety</div>
                    </div>
                  </div>

                  {/* Profitability Analysis */}
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <div className="text-sm text-gray-400 mb-1">Total Revenue</div>
                      <div className="text-xl font-bold text-white">{formatCurrency(results.totalRevenue)}</div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <div className="text-sm text-gray-400 mb-1">Total Costs</div>
                      <div className="text-xl font-bold text-white">{formatCurrency(results.totalCosts)}</div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <div className="text-sm text-gray-400 mb-1">Net Profit/Loss</div>
                      <div className={`text-xl font-bold ${parseFloat(results.netProfit) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {formatCurrency(results.netProfit)}
                      </div>
                    </div>
                  </div>

                  {/* Break-even Visualization */}
                  <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <h4 className="text-lg font-semibold text-white mb-4">Break-even Analysis</h4>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-300">Break-even Point</span>
                        <span className="text-lg font-semibold text-red-400">{results.breakEvenUnits} units</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-300">Expected Sales</span>
                        <span className="text-lg font-semibold text-blue-400">{formData.expectedSalesVolume} units</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-300">Margin of Safety</span>
                        <span className="text-lg font-semibold text-green-400">{results.marginOfSafetyUnits} units</span>
                      </div>
                      
                      <div className="mt-6">
                        <div className="flex justify-between text-xs text-gray-400 mb-2">
                          <span>0</span>
                          <span>Break-even</span>
                          <span>Expected Sales</span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-4 relative">
                          <div className="absolute left-0 top-0 h-4 bg-red-500 rounded-l-full" style={{ width: `${(parseFloat(results.breakEvenUnits) / parseFloat(formData.expectedSalesVolume)) * 100}%` }}></div>
                          <div className="absolute left-0 top-0 h-4 bg-green-500 rounded-r-full" style={{ left: `${(parseFloat(results.breakEvenUnits) / parseFloat(formData.expectedSalesVolume)) * 100}%`, width: `${100 - (parseFloat(results.breakEvenUnits) / parseFloat(formData.expectedSalesVolume)) * 100}%` }}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Time-based Analysis */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <div className="text-sm text-gray-400 mb-1">Break-even per {formData.timePeriod}</div>
                      <div className="text-xl font-bold text-white">{results.breakEvenPerPeriod} units</div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <div className="text-sm text-gray-400 mb-1">Expected sales per {formData.timePeriod}</div>
                      <div className="text-xl font-bold text-white">{results.expectedSalesPerPeriod} units</div>
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
                          fixedCosts: '',
                          variableCostPerUnit: '',
                          sellingPricePerUnit: '',
                          expectedSalesVolume: '',
                          timePeriod: 'monthly',
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
                        // Generate and download break-even report
                        const reportData = {
                          type: 'Break-even Analysis',
                          date: new Date().toLocaleDateString(),
                          results: results
                        }
                        const dataStr = JSON.stringify(reportData, null, 2)
                        const dataBlob = new Blob([dataStr], {type: 'application/json'})
                        const url = URL.createObjectURL(dataBlob)
                        const link = document.createElement('a')
                        link.href = url
                        link.download = 'break-even-analysis-report.json'
                        link.click()
                        URL.revokeObjectURL(url)
                      }}
                      className="px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg hover:shadow-lg hover:shadow-red-500/25 transition-all duration-300 flex items-center gap-2"
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
            <div className="bg-gradient-to-br from-red-500/20 to-orange-500/20 p-6 rounded-3xl border border-red-500/30 backdrop-blur-md">
              <h3 className="text-xl font-bold text-white mb-4">Break-even Analysis</h3>
              <div className="space-y-4">
                <div className="p-3 bg-white/5 rounded-lg">
                  <h4 className="font-semibold text-red-300 mb-1">What is Break-even?</h4>
                  <p className="text-xs text-gray-300">The point where total revenue equals total costs, resulting in neither profit nor loss.</p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <h4 className="font-semibold text-orange-300 mb-1">Why it matters</h4>
                  <p className="text-xs text-gray-300">Helps determine minimum sales needed, set pricing strategies, and assess business viability.</p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <h4 className="font-semibold text-yellow-300 mb-1">Margin of Safety</h4>
                  <p className="text-xs text-gray-300">The cushion between actual sales and break-even point, indicating risk level.</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 p-6 rounded-3xl border border-green-500/30 backdrop-blur-md">
              <h3 className="text-xl font-bold text-white mb-4">Key Metrics</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">Good Margin %</span>
                  <span className="text-sm font-semibold text-green-400">30%+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">Safety Margin</span>
                  <span className="text-sm font-semibold text-green-400">20%+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">Contribution Margin</span>
                  <span className="text-sm font-semibold text-green-400">High = Better</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">Break-even Time</span>
                  <span className="text-sm font-semibold text-green-400">&lt; 6 months</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-6 rounded-3xl border border-purple-500/30 backdrop-blur-md">
              <h3 className="text-xl font-bold text-white mb-4">Optimization Tips</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2 text-purple-300">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Reduce variable costs</span>
                </li>
                <li className="flex items-start gap-2 text-purple-300">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Increase selling prices</span>
                </li>
                <li className="flex items-start gap-2 text-purple-300">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Lower fixed costs</span>
                </li>
                <li className="flex items-start gap-2 text-purple-300">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Improve sales volume</span>
                </li>
                <li className="flex items-start gap-2 text-purple-300">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Diversify product mix</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}