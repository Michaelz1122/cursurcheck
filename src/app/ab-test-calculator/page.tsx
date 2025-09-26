'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import { 
  Calculator, 
  TrendingUp, 
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
  FlaskConical,
  GitBranch,
  Percent
} from 'lucide-react'

export default function ABTestCalculator() {
  const [formData, setFormData] = useState({
    controlVisitors: '',
    controlConversions: '',
    variantVisitors: '',
    variantConversions: '',
    confidenceLevel: '95',
    testType: 'two_tailed',
    hypothesisType: 'superiority'
  })

  const [results, setResults] = useState<any>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const confidenceLevels = [
    { value: '90', label: '90%' },
    { value: '95', label: '95%' },
    { value: '99', label: '99%' }
  ]

  const testTypes = [
    { value: 'two_tailed', label: 'Two-tailed' },
    { value: 'one_tailed', label: 'One-tailed' }
  ]

  const hypothesisTypes = [
    { value: 'superiority', label: 'Superiority' },
    { value: 'non_inferiority', label: 'Non-inferiority' },
    { value: 'equivalence', label: 'Equivalence' }
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  // Z-score calculation for normal distribution
  const getZScore = (confidenceLevel: number) => {
    const zScores: { [key: number]: number } = {
      90: 1.645,
      95: 1.96,
      99: 2.576
    }
    return zScores[confidenceLevel] || 1.96
  }

  // Calculate p-value using normal approximation
  const calculatePValue = (zScore: number, testType: string) => {
    // Simplified p-value calculation (in practice, you'd use a statistical library)
    const absZ = Math.abs(zScore)
    let pValue
    
    if (testType === 'one_tailed') {
      pValue = 1 - (0.5 * (1 + Math.sign(zScore) * (1 - Math.exp(-2 * absZ * absZ / Math.PI))))
    } else {
      pValue = 2 * (1 - (0.5 * (1 + Math.sign(absZ) * (1 - Math.exp(-2 * absZ * absZ / Math.PI)))))
    }
    
    return Math.min(Math.max(pValue, 0.0001), 0.9999)
  }

  const calculateABTest = () => {
    const controlVisitors = parseFloat(formData.controlVisitors) || 0
    const controlConversions = parseFloat(formData.controlConversions) || 0
    const variantVisitors = parseFloat(formData.variantVisitors) || 0
    const variantConversions = parseFloat(formData.variantConversions) || 0
    const confidenceLevel = parseFloat(formData.confidenceLevel) || 95
    const testType = formData.testType
    const hypothesisType = formData.hypothesisType

    // Calculate conversion rates
    const controlRate = controlVisitors > 0 ? controlConversions / controlVisitors : 0
    const variantRate = variantVisitors > 0 ? variantConversions / variantVisitors : 0

    // Calculate pooled proportion
    const totalConversions = controlConversions + variantConversions
    const totalVisitors = controlVisitors + variantVisitors
    const pooledProportion = totalVisitors > 0 ? totalConversions / totalVisitors : 0

    // Calculate standard error
    const standardError = Math.sqrt(
      pooledProportion * (1 - pooledProportion) * (1/controlVisitors + 1/variantVisitors)
    )

    // Calculate z-score
    const zScore = standardError > 0 ? 
      (variantRate - controlRate) / standardError : 0

    // Calculate p-value
    const pValue = calculatePValue(zScore, testType)

    // Calculate confidence interval
    const zCritical = getZScore(confidenceLevel)
    const marginOfError = zCritical * standardError
    const difference = variantRate - controlRate
    const ciLower = difference - marginOfError
    const ciUpper = difference + marginOfError

    // Calculate relative improvement
    const relativeImprovement = controlRate > 0 ? 
      ((variantRate - controlRate) / controlRate) * 100 : 0

    // Calculate statistical power
    const effectSize = Math.abs(variantRate - controlRate)
    const power = calculatePower(effectSize, controlVisitors, variantVisitors, confidenceLevel)

    // Determine significance
    const alpha = 1 - (confidenceLevel / 100)
    const isSignificant = pValue < alpha

    // Calculate sample size requirements
    const requiredSampleSize = calculateSampleSize(controlRate, effectSize, confidenceLevel, testType)

    // Generate insights
    const insights = generateInsights(
      controlRate, variantRate, isSignificant, pValue, relativeImprovement, power
    )

    return {
      controlRate: (controlRate * 100).toFixed(2),
      variantRate: (variantRate * 100).toFixed(2),
      difference: (difference * 100).toFixed(2),
      relativeImprovement: relativeImprovement.toFixed(1),
      zScore: zScore.toFixed(3),
      pValue: pValue.toFixed(4),
      confidenceInterval: {
        lower: (ciLower * 100).toFixed(2),
        upper: (ciUpper * 100).toFixed(2)
      },
      isSignificant,
      power: (power * 100).toFixed(1),
      requiredSampleSize: requiredSampleSize.toFixed(0),
      insights,
      confidenceLevel
    }
  }

  const calculatePower = (effectSize: number, n1: number, n2: number, confidenceLevel: number) => {
    // Simplified power calculation
    const alpha = 1 - (confidenceLevel / 100)
    const zAlpha = getZScore(confidenceLevel)
    const n = (n1 + n2) / 2
    
    if (effectSize === 0 || n === 0) return 0.5
    
    const zBeta = (effectSize * Math.sqrt(n / 2)) - zAlpha
    const power = 0.5 + (0.5 * Math.sign(zBeta) * (1 - Math.exp(-2 * zBeta * zBeta / Math.PI)))
    
    return Math.min(Math.max(power, 0.1), 0.99)
  }

  const calculateSampleSize = (baselineRate: number, effectSize: number, confidenceLevel: number, testType: string) => {
    // Simplified sample size calculation
    const alpha = 1 - (confidenceLevel / 100)
    const zAlpha = getZScore(confidenceLevel)
    const zBeta = 0.84 // 80% power
    
    if (baselineRate === 0 || effectSize === 0) return 1000
    
    const p1 = baselineRate
    const p2 = baselineRate + effectSize
    const pBar = (p1 + p2) / 2
    
    const sampleSizePerGroup = Math.ceil(
      (zAlpha + zBeta) ** 2 * (p1 * (1 - p1) + p2 * (1 - p2)) / (effectSize ** 2)
    )
    
    return sampleSizePerGroup * 2
  }

  const generateInsights = (
    controlRate: number, 
    variantRate: number, 
    isSignificant: boolean, 
    pValue: number, 
    relativeImprovement: number, 
    power: number
  ) => {
    const insights = []
    
    if (isSignificant) {
      insights.push({
        type: 'success',
        title: 'Statistically Significant',
        message: `The difference is statistically significant (p = ${pValue.toFixed(4)})`
      })
      
      if (relativeImprovement > 0) {
        insights.push({
          type: 'success',
          title: 'Positive Impact',
          message: `Variant shows ${relativeImprovement.toFixed(1)}% improvement over control`
        })
      } else {
        insights.push({
          type: 'warning',
          title: 'Negative Impact',
          message: `Variant shows ${Math.abs(relativeImprovement).toFixed(1)}% decrease in performance`
        })
      }
    } else {
      insights.push({
        type: 'info',
        title: 'Not Statistically Significant',
        message: `No significant difference detected (p = ${pValue.toFixed(4)})`
      })
    }
    
    if (power < 0.8) {
      insights.push({
        type: 'warning',
        title: 'Low Statistical Power',
        message: `Test power is ${(power * 100).toFixed(1)}%. Consider larger sample size.`
      })
    }
    
    if (controlRate < 0.01) {
      insights.push({
        type: 'info',
        title: 'Low Conversion Rate',
        message: 'Very low conversion rates may require larger sample sizes'
      })
    }
    
    return insights
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsCalculating(true)

    // Simulate calculation
    setTimeout(() => {
      const calculatedResults = calculateABTest()
      setResults(calculatedResults)
      setIsCalculating(false)
    }, 1500)
  }

  const formatPercent = (value: string) => {
    return `${value}%`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-transparent to-transparent"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <Navigation currentPath="/ab-test-calculator" />

      <div className="relative z-40 container mx-auto px-6 pt-24 pb-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-300 px-6 py-3 rounded-full mb-6 backdrop-blur-sm border border-indigo-500/30">
            <Calculator className="w-5 h-5" />
            <span className="text-sm font-medium">A/B Test Calculator</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            A/B Test Significance Calculator
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Calculate statistical significance, analyze test results, and make data-driven decisions with confidence intervals and power analysis.
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
                <h2 className="text-2xl font-bold text-white mb-2">Test Data</h2>
                <p className="text-gray-300">Enter your A/B test results</p>
              </div>

              {!results ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Test Results */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                        <FlaskConical className="w-4 h-4 text-indigo-400" />
                        Control Group Visitors *
                      </label>
                      <input
                        type="number"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300 text-white placeholder-gray-400"
                        value={formData.controlVisitors}
                        onChange={(e) => handleInputChange('controlVisitors', e.target.value)}
                        placeholder="10000"
                        min="0"
                        step="100"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                        <Target className="w-4 h-4 text-indigo-400" />
                        Control Group Conversions *
                      </label>
                      <input
                        type="number"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300 text-white placeholder-gray-400"
                        value={formData.controlConversions}
                        onChange={(e) => handleInputChange('controlConversions', e.target.value)}
                        placeholder="500"
                        min="0"
                        step="1"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                        <GitBranch className="w-4 h-4 text-indigo-400" />
                        Variant Group Visitors *
                      </label>
                      <input
                        type="number"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300 text-white placeholder-gray-400"
                        value={formData.variantVisitors}
                        onChange={(e) => handleInputChange('variantVisitors', e.target.value)}
                        placeholder="10000"
                        min="0"
                        step="100"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                        <Users className="w-4 h-4 text-indigo-400" />
                        Variant Group Conversions *
                      </label>
                      <input
                        type="number"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300 text-white placeholder-gray-400"
                        value={formData.variantConversions}
                        onChange={(e) => handleInputChange('variantConversions', e.target.value)}
                        placeholder="600"
                        min="0"
                        step="1"
                        required
                      />
                    </div>
                  </div>

                  {/* Test Configuration */}
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                        <Percent className="w-4 h-4 text-indigo-400" />
                        Confidence Level
                      </label>
                      <select
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300 text-white appearance-none cursor-pointer"
                        value={formData.confidenceLevel}
                        onChange={(e) => handleInputChange('confidenceLevel', e.target.value)}
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%238182cf' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                          backgroundPosition: `right 0.5rem center`,
                          backgroundRepeat: `no-repeat`,
                          backgroundSize: `1.5em 1.5em`,
                          paddingRight: `2.5rem`
                        }}
                      >
                        {confidenceLevels.map(level => (
                          <option key={level.value} value={level.value} className="bg-gray-900 text-white">{level.label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                        <BarChart3 className="w-4 h-4 text-indigo-400" />
                        Test Type
                      </label>
                      <select
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300 text-white appearance-none cursor-pointer"
                        value={formData.testType}
                        onChange={(e) => handleInputChange('testType', e.target.value)}
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%238182cf' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                          backgroundPosition: `right 0.5rem center`,
                          backgroundRepeat: `no-repeat`,
                          backgroundSize: `1.5em 1.5em`,
                          paddingRight: `2.5rem`
                        }}
                      >
                        {testTypes.map(type => (
                          <option key={type.value} value={type.value} className="bg-gray-900 text-white">{type.label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                        <Activity className="w-4 h-4 text-indigo-400" />
                        Hypothesis
                      </label>
                      <select
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300 text-white appearance-none cursor-pointer"
                        value={formData.hypothesisType}
                        onChange={(e) => handleInputChange('hypothesisType', e.target.value)}
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%238182cf' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                          backgroundPosition: `right 0.5rem center`,
                          backgroundRepeat: `no-repeat`,
                          backgroundSize: `1.5em 1.5em`,
                          paddingRight: `2.5rem`
                        }}
                      >
                        {hypothesisTypes.map(type => (
                          <option key={type.value} value={type.value} className="bg-gray-900 text-white">{type.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isCalculating}
                    className="w-full px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isCalculating ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Calculating...
                      </>
                    ) : (
                      <>
                        <Calculator className="w-5 h-5" />
                        Calculate Significance
                      </>
                    )}
                  </button>
                </form>
              ) : (
                /* Results Section */
                <div className="space-y-8">
                  {/* Results Header */}
                  <div className="text-center">
                    <div className="mb-6">
                      <div className={`w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center ${
                        results.isSignificant ? 'bg-green-500' : 'bg-yellow-500'
                      }`}>
                        <Award className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {results.isSignificant ? 'Statistically Significant!' : 'Not Statistically Significant'}
                      </h3>
                      <p className="text-gray-300">Your A/B test results analysis</p>
                    </div>
                  </div>

                  {/* Key Metrics */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-gradient-to-br from-indigo-500/20 to-indigo-600/20 p-4 rounded-xl border border-indigo-500/30">
                      <div className="flex items-center gap-2 mb-2">
                        <FlaskConical className="w-4 h-4 text-indigo-400" />
                        <span className="text-sm text-indigo-300">Control Rate</span>
                      </div>
                      <div className="text-2xl font-bold text-white">{formatPercent(results.controlRate)}</div>
                      <div className="text-xs text-gray-400">Baseline</div>
                    </div>

                    <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 p-4 rounded-xl border border-purple-500/30">
                      <div className="flex items-center gap-2 mb-2">
                        <GitBranch className="w-4 h-4 text-purple-400" />
                        <span className="text-sm text-purple-300">Variant Rate</span>
                      </div>
                      <div className="text-2xl font-bold text-white">{formatPercent(results.variantRate)}</div>
                      <div className="text-xs text-gray-400">Test version</div>
                    </div>

                    <div className="bg-gradient-to-br from-pink-500/20 to-pink-600/20 p-4 rounded-xl border border-pink-500/30">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-4 h-4 text-pink-400" />
                        <span className="text-sm text-pink-300">Improvement</span>
                      </div>
                      <div className={`text-2xl font-bold ${parseFloat(results.relativeImprovement) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {results.relativeImprovement >= 0 ? '+' : ''}{results.relativeImprovement}%
                      </div>
                      <div className="text-xs text-gray-400">Relative change</div>
                    </div>

                    <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 p-4 rounded-xl border border-blue-500/30">
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="w-4 h-4 text-blue-400" />
                        <span className="text-sm text-blue-300">P-value</span>
                      </div>
                      <div className="text-2xl font-bold text-white">{results.pValue}</div>
                      <div className="text-xs text-gray-400">Significance level</div>
                    </div>
                  </div>

                  {/* Statistical Analysis */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                      <h4 className="text-lg font-semibold text-white mb-4">Confidence Interval</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-300">Difference</span>
                          <span className="text-lg font-semibold text-white">{formatPercent(results.difference)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-300">Lower Bound</span>
                          <span className="text-lg font-semibold text-blue-400">{formatPercent(results.confidenceInterval.lower)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-300">Upper Bound</span>
                          <span className="text-lg font-semibold text-blue-400">{formatPercent(results.confidenceInterval.upper)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-300">Confidence</span>
                          <span className="text-lg font-semibold text-green-400">{results.confidenceLevel}%</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                      <h4 className="text-lg font-semibold text-white mb-4">Test Power</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-300">Statistical Power</span>
                          <span className="text-lg font-semibold text-white">{results.power}%</span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-3">
                          <div 
                            className={`h-3 rounded-full transition-all duration-1000 ${
                              parseFloat(results.power) >= 80 ? 'bg-green-500' :
                              parseFloat(results.power) >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${Math.min(parseFloat(results.power), 100)}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-400">
                          {parseFloat(results.power) >= 80 ? 'Excellent power' :
                           parseFloat(results.power) >= 60 ? 'Good power' : 'Low power - consider larger sample'}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Sample Size Recommendation */}
                  <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <h4 className="text-lg font-semibold text-white mb-4">Sample Size Recommendation</h4>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-gray-400 mb-1">Recommended sample size per group</div>
                        <div className="text-2xl font-bold text-white">{results.requiredSampleSize}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-400 mb-1">Total required</div>
                        <div className="text-2xl font-bold text-purple-400">{parseInt(results.requiredSampleSize) * 2}</div>
                      </div>
                    </div>
                  </div>

                  {/* Insights */}
                  <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <h4 className="text-lg font-semibold text-white mb-4">Key Insights</h4>
                    <div className="space-y-3">
                      {results.insights.map((insight: any, index: number) => (
                        <div key={index} className={`p-3 rounded-lg ${
                          insight.type === 'success' ? 'bg-green-500/10 border border-green-500/30' :
                          insight.type === 'warning' ? 'bg-yellow-500/10 border border-yellow-500/30' :
                          'bg-blue-500/10 border border-blue-500/30'
                        }`}>
                          <div className={`font-semibold mb-1 ${
                            insight.type === 'success' ? 'text-green-400' :
                            insight.type === 'warning' ? 'text-yellow-400' :
                            'text-blue-400'
                          }`}>
                            {insight.title}
                          </div>
                          <div className="text-sm text-gray-300">{insight.message}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4 justify-center">
                    <button
                      onClick={() => {
                        setResults(null)
                        setFormData({
                          controlVisitors: '',
                          controlConversions: '',
                          variantVisitors: '',
                          variantConversions: '',
                          confidenceLevel: '95',
                          testType: 'two_tailed',
                          hypothesisType: 'superiority'
                        })
                      }}
                      className="px-6 py-3 border border-white/20 text-white rounded-lg hover:bg-white/10 transition-all duration-300"
                    >
                      New Test
                    </button>
                    <button 
                      onClick={() => {
                        // Generate and download A/B test report
                        const reportData = {
                          type: 'A/B Test Analysis',
                          date: new Date().toLocaleDateString(),
                          results: results
                        }
                        const dataStr = JSON.stringify(reportData, null, 2)
                        const dataBlob = new Blob([dataStr], {type: 'application/json'})
                        const url = URL.createObjectURL(dataBlob)
                        const link = document.createElement('a')
                        link.href = url
                        link.download = 'ab-test-analysis-report.json'
                        link.click()
                        URL.revokeObjectURL(url)
                      }}
                      className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-300 flex items-center gap-2"
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
            <div className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 p-6 rounded-3xl border border-indigo-500/30 backdrop-blur-md">
              <h3 className="text-xl font-bold text-white mb-4">Statistical Testing</h3>
              <div className="space-y-4">
                <div className="p-3 bg-white/5 rounded-lg">
                  <h4 className="font-semibold text-indigo-300 mb-1">What is A/B Testing?</h4>
                  <p className="text-xs text-gray-300">A method of comparing two versions of a webpage or app against each other to determine which performs better.</p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <h4 className="font-semibold text-purple-300 mb-1">Statistical Significance</h4>
                  <p className="text-xs text-gray-300">The likelihood that the difference between groups is not due to random chance (typically p &lt; 0.05).</p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <h4 className="font-semibold text-pink-300 mb-1">Confidence Interval</h4>
                  <p className="text-xs text-gray-300">A range of values that likely contains the true difference between groups with a specified confidence level.</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 p-6 rounded-3xl border border-green-500/30 backdrop-blur-md">
              <h3 className="text-xl font-bold text-white mb-4">Best Practices</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2 text-green-300">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Use adequate sample sizes</span>
                </li>
                <li className="flex items-start gap-2 text-green-300">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Run tests for sufficient duration</span>
                </li>
                <li className="flex items-start gap-2 text-green-300">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Test one variable at a time</span>
                </li>
                <li className="flex items-start gap-2 text-green-300">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Consider statistical power</span>
                </li>
                <li className="flex items-start gap-2 text-green-300">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Document hypotheses and results</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 p-6 rounded-3xl border border-blue-500/30 backdrop-blur-md">
              <h3 className="text-xl font-bold text-white mb-4">Interpretation Guide</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">p &lt; 0.01</span>
                  <span className="text-sm font-semibold text-green-400">Highly significant</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">p &lt; 0.05</span>
                  <span className="text-sm font-semibold text-blue-400">Significant</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">p &gt; 0.05</span>
                  <span className="text-sm font-semibold text-yellow-400">Not significant</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">Power &gt; 80%</span>
                  <span className="text-sm font-semibold text-green-400">Good power</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}