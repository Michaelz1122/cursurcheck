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
  MousePointer,
  ShoppingCart,
  Eye
} from 'lucide-react'

export default function ConversionRateCalculator() {
  const [formData, setFormData] = useState({
    visitors: '',
    leads: '',
    customers: '',
    pageViews: '',
    sessions: '',
    conversionType: 'visitor_to_customer',
    industry: '',
    trafficSource: ''
  })

  const [results, setResults] = useState<any>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const industries = [
    'E-commerce', 'SaaS', 'Local Business', 'Healthcare', 'Education', 
    'Real Estate', 'Finance', 'Travel & Tourism', 'Food & Beverage', 'Other'
  ]

  const trafficSources = [
    'Organic Search', 'Paid Search', 'Social Media', 'Email', 'Direct', 'Referral', 'Other'
  ]

  const conversionTypes = [
    { value: 'visitor_to_lead', label: 'Visitor to Lead', icon: Users },
    { value: 'lead_to_customer', label: 'Lead to Customer', icon: ShoppingCart },
    { value: 'visitor_to_customer', label: 'Visitor to Customer', icon: Target },
    { value: 'click_to_lead', label: 'Click to Lead', icon: MousePointer },
    { value: 'page_view_to_conversion', label: 'Page View to Conversion', icon: Eye }
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const calculateConversionRates = () => {
    const visitors = parseFloat(formData.visitors) || 0
    const leads = parseFloat(formData.leads) || 0
    const customers = parseFloat(formData.customers) || 0
    const pageViews = parseFloat(formData.pageViews) || 0
    const sessions = parseFloat(formData.sessions) || 0

    // Calculate conversion rates based on type
    let conversionRates: any = {}

    switch (formData.conversionType) {
      case 'visitor_to_lead':
        conversionRates = {
          primary: visitors > 0 ? (leads / visitors) * 100 : 0,
          visitorToCustomer: visitors > 0 ? (customers / visitors) * 100 : 0,
          leadToCustomer: leads > 0 ? (customers / leads) * 100 : 0
        }
        break
      case 'lead_to_customer':
        conversionRates = {
          primary: leads > 0 ? (customers / leads) * 100 : 0,
          visitorToCustomer: visitors > 0 ? (customers / visitors) * 100 : 0,
          visitorToLead: visitors > 0 ? (leads / visitors) * 100 : 0
        }
        break
      case 'visitor_to_customer':
        conversionRates = {
          primary: visitors > 0 ? (customers / visitors) * 100 : 0,
          visitorToLead: visitors > 0 ? (leads / visitors) * 100 : 0,
          leadToCustomer: leads > 0 ? (customers / leads) * 100 : 0
        }
        break
      case 'click_to_lead':
        conversionRates = {
          primary: visitors > 0 ? (leads / visitors) * 100 : 0,
          visitorToCustomer: visitors > 0 ? (customers / visitors) * 100 : 0,
          leadToCustomer: leads > 0 ? (customers / leads) * 100 : 0
        }
        break
      case 'page_view_to_conversion':
        conversionRates = {
          primary: pageViews > 0 ? (customers / pageViews) * 100 : 0,
          visitorToCustomer: visitors > 0 ? (customers / visitors) * 100 : 0,
          visitorToLead: visitors > 0 ? (leads / visitors) * 100 : 0
        }
        break
    }

    // Calculate additional metrics
    const bounceRate = sessions > 0 ? Math.max(0, (sessions - visitors) / sessions * 100) : 0
    const pagesPerSession = sessions > 0 ? pageViews / sessions : 0
    const avgSessionDuration = 180 // Assuming 3 minutes average

    // Calculate funnel metrics
    const funnelDropOff = {
      visitorToLead: visitors > 0 ? ((visitors - leads) / visitors) * 100 : 0,
      leadToCustomer: leads > 0 ? ((leads - customers) / leads) * 100 : 0,
      overall: visitors > 0 ? ((visitors - customers) / visitors) * 100 : 0
    }

    // Calculate scores
    const primaryScore = conversionRates.primary >= 5 ? 100 : 
                         conversionRates.primary >= 3 ? 80 : 
                         conversionRates.primary >= 1.5 ? 60 : 
                         conversionRates.primary >= 0.5 ? 40 : 20
    
    const funnelScore = funnelDropOff.overall <= 80 ? 100 : 
                       funnelDropOff.overall <= 90 ? 80 : 
                       funnelDropOff.overall <= 95 ? 60 : 40
    
    const engagementScore = pagesPerSession >= 3 ? 100 : 
                           pagesPerSession >= 2 ? 80 : 
                           pagesPerSession >= 1.5 ? 60 : 40
    
    const overallScore = (primaryScore + funnelScore + engagementScore) / 3

    // Generate recommendations
    const recommendations = []
    const strengths = []

    // Primary conversion rate analysis
    if (conversionRates.primary >= 5) {
      strengths.push('Excellent primary conversion rate')
    } else if (conversionRates.primary >= 3) {
      strengths.push('Good primary conversion rate')
    } else if (conversionRates.primary >= 1.5) {
      recommendations.push('Primary conversion rate is acceptable but could be improved')
    } else {
      recommendations.push('Primary conversion rate needs significant improvement')
    }

    // Funnel analysis
    if (funnelDropOff.visitorToLead <= 70) {
      strengths.push('Good visitor-to-lead conversion')
    } else if (funnelDropOff.visitorToLead > 85) {
      recommendations.push('High visitor drop-off - improve lead capture')
    }

    if (funnelDropOff.leadToCustomer <= 50) {
      strengths.push('Good lead-to-customer conversion')
    } else if (funnelDropOff.leadToCustomer > 70) {
      recommendations.push('High lead drop-off - improve sales process')
    }

    // Engagement analysis
    if (pagesPerSession >= 3) {
      strengths.push('Good user engagement')
    } else if (pagesPerSession < 1.5) {
      recommendations.push('Low user engagement - improve content and UX')
    }

    // Traffic quality analysis
    if (bounceRate <= 40) {
      strengths.push('Low bounce rate indicates quality traffic')
    } else if (bounceRate > 60) {
      recommendations.push('High bounce rate - review targeting and landing pages')
    }

    return {
      conversionRates: {
        primary: conversionRates.primary.toFixed(2),
        visitorToLead: conversionRates.visitorToLead?.toFixed(2) || '0.00',
        leadToCustomer: conversionRates.leadToCustomer?.toFixed(2) || '0.00',
        visitorToCustomer: conversionRates.visitorToCustomer?.toFixed(2) || '0.00'
      },
      funnelMetrics: {
        bounceRate: bounceRate.toFixed(1),
        pagesPerSession: pagesPerSession.toFixed(1),
        avgSessionDuration: avgSessionDuration
      },
      funnelDropOff: {
        visitorToLead: funnelDropOff.visitorToLead.toFixed(1),
        leadToCustomer: funnelDropOff.leadToCustomer.toFixed(1),
        overall: funnelDropOff.overall.toFixed(1)
      },
      overallScore: overallScore.toFixed(0),
      recommendations,
      strengths,
      metrics: {
        primaryScore,
        funnelScore,
        engagementScore
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsCalculating(true)

    // Simulate calculation
    setTimeout(() => {
      const calculatedResults = calculateConversionRates()
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

  const getConversionTypeLabel = () => {
    const type = conversionTypes.find(t => t.value === formData.conversionType)
    return type ? type.label : 'Conversion Rate'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <Navigation currentPath="/conversion-rate-calculator" />

      <div className="relative z-40 container mx-auto px-6 pt-24 pb-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 px-6 py-3 rounded-full mb-6 backdrop-blur-sm border border-cyan-500/30">
            <Calculator className="w-5 h-5" />
            <span className="text-sm font-medium">Conversion Rate Calculator</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
            Conversion Rate Calculator
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Analyze your conversion funnel, identify optimization opportunities, and maximize your marketing effectiveness with data-driven insights.
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
                <h2 className="text-2xl font-bold text-white mb-2">Conversion Data</h2>
                <p className="text-gray-300">Enter your traffic and conversion metrics</p>
              </div>

              {!results ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Conversion Type Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3 flex items-center gap-2">
                      <Target className="w-4 h-4 text-cyan-400" />
                      Conversion Type *
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {conversionTypes.map((type) => {
                        const Icon = type.icon
                        return (
                          <button
                            key={type.value}
                            type="button"
                            onClick={() => handleInputChange('conversionType', type.value)}
                            className={`p-4 rounded-lg border transition-all duration-300 text-left ${
                              formData.conversionType === type.value
                                ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300'
                                : 'bg-white/5 border-white/20 text-gray-300 hover:bg-white/10'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <Icon className="w-5 h-5" />
                              <div>
                                <div className="font-medium">{type.label}</div>
                                <div className="text-xs opacity-70">Primary metric</div>
                              </div>
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Traffic Metrics */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                        <Eye className="w-4 h-4 text-cyan-400" />
                        Visitors *
                      </label>
                      <input
                        type="number"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 text-white placeholder-gray-400"
                        value={formData.visitors}
                        onChange={(e) => handleInputChange('visitors', e.target.value)}
                        placeholder="10000"
                        min="0"
                        step="100"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                        <Users className="w-4 h-4 text-cyan-400" />
                        Leads *
                      </label>
                      <input
                        type="number"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 text-white placeholder-gray-400"
                        value={formData.leads}
                        onChange={(e) => handleInputChange('leads', e.target.value)}
                        placeholder="500"
                        min="0"
                        step="10"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                        <ShoppingCart className="w-4 h-4 text-cyan-400" />
                        Customers *
                      </label>
                      <input
                        type="number"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 text-white placeholder-gray-400"
                        value={formData.customers}
                        onChange={(e) => handleInputChange('customers', e.target.value)}
                        placeholder="100"
                        min="0"
                        step="1"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                        <BarChart3 className="w-4 h-4 text-cyan-400" />
                        Page Views
                      </label>
                      <input
                        type="number"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 text-white placeholder-gray-400"
                        value={formData.pageViews}
                        onChange={(e) => handleInputChange('pageViews', e.target.value)}
                        placeholder="25000"
                        min="0"
                        step="100"
                      />
                    </div>
                  </div>

                  {/* Context Information */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                        <Activity className="w-4 h-4 text-cyan-400" />
                        Industry
                      </label>
                      <select
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 text-white appearance-none cursor-pointer"
                        value={formData.industry}
                        onChange={(e) => handleInputChange('industry', e.target.value)}
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%2322d3ee' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
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
                        <Zap className="w-4 h-4 text-cyan-400" />
                        Traffic Source
                      </label>
                      <select
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 text-white appearance-none cursor-pointer"
                        value={formData.trafficSource}
                        onChange={(e) => handleInputChange('trafficSource', e.target.value)}
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%2322d3ee' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                          backgroundPosition: `right 0.5rem center`,
                          backgroundRepeat: `no-repeat`,
                          backgroundSize: `1.5em 1.5em`,
                          paddingRight: `2.5rem`
                        }}
                      >
                        <option value="" className="bg-gray-900 text-white">Select source</option>
                        {trafficSources.map(source => (
                          <option key={source} value={source} className="bg-gray-900 text-white">{source}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isCalculating}
                    className="w-full px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isCalculating ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Calculating...
                      </>
                    ) : (
                      <>
                        <Calculator className="w-5 h-5" />
                        Calculate Rates
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
                      <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Award className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">Conversion Analysis Complete</h3>
                      <p className="text-gray-300">Your conversion funnel breakdown</p>
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
                    <div className="bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 p-4 rounded-xl border border-cyan-500/30">
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="w-4 h-4 text-cyan-400" />
                        <span className="text-sm text-cyan-300">{getConversionTypeLabel()}</span>
                      </div>
                      <div className="text-2xl font-bold text-white">{results.conversionRates.primary}%</div>
                      <div className="text-xs text-gray-400">Primary Rate</div>
                    </div>

                    <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 p-4 rounded-xl border border-blue-500/30">
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="w-4 h-4 text-blue-400" />
                        <span className="text-sm text-blue-300">Visitor to Lead</span>
                      </div>
                      <div className="text-2xl font-bold text-white">{results.conversionRates.visitorToLead}%</div>
                      <div className="text-xs text-gray-400">Lead Generation</div>
                    </div>

                    <div className="bg-gradient-to-br from-indigo-500/20 to-indigo-600/20 p-4 rounded-xl border border-indigo-500/30">
                      <div className="flex items-center gap-2 mb-2">
                        <ShoppingCart className="w-4 h-4 text-indigo-400" />
                        <span className="text-sm text-indigo-300">Lead to Customer</span>
                      </div>
                      <div className="text-2xl font-bold text-white">{results.conversionRates.leadToCustomer}%</div>
                      <div className="text-xs text-gray-400">Sales Conversion</div>
                    </div>

                    <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 p-4 rounded-xl border border-purple-500/30">
                      <div className="flex items-center gap-2 mb-2">
                        <Eye className="w-4 h-4 text-purple-400" />
                        <span className="text-sm text-purple-300">Bounce Rate</span>
                      </div>
                      <div className="text-2xl font-bold text-white">{results.funnelMetrics.bounceRate}%</div>
                      <div className="text-xs text-gray-400">Engagement</div>
                    </div>
                  </div>

                  {/* Funnel Visualization */}
                  <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <h4 className="text-lg font-semibold text-white mb-4">Conversion Funnel</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-300">Visitors</span>
                        <span className="text-lg font-semibold text-cyan-400">{formData.visitors}</span>
                      </div>
                      <div className="w-full bg-cyan-500/20 rounded-full h-2">
                        <div className="bg-cyan-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-300">Leads ({results.conversionRates.visitorToLead}%)</span>
                        <span className="text-lg font-semibold text-blue-400">{formData.leads}</span>
                      </div>
                      <div className="w-full bg-blue-500/20 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${results.conversionRates.visitorToLead}%` }}></div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-300">Customers ({results.conversionRates.leadToCustomer}%)</span>
                        <span className="text-lg font-semibold text-indigo-400">{formData.customers}</span>
                      </div>
                      <div className="w-full bg-indigo-500/20 rounded-full h-2">
                        <div className="bg-indigo-500 h-2 rounded-full" style={{ width: `${results.conversionRates.leadToCustomer}%` }}></div>
                      </div>
                    </div>
                  </div>

                  {/* Drop-off Analysis */}
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <div className="text-sm text-gray-400 mb-1">Visitor Drop-off</div>
                      <div className="text-xl font-bold text-red-400">{results.funnelDropOff.visitorToLead}%</div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <div className="text-sm text-gray-400 mb-1">Lead Drop-off</div>
                      <div className="text-xl font-bold text-orange-400">{results.funnelDropOff.leadToCustomer}%</div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <div className="text-sm text-gray-400 mb-1">Overall Drop-off</div>
                      <div className="text-xl font-bold text-yellow-400">{results.funnelDropOff.overall}%</div>
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
                          visitors: '',
                          leads: '',
                          customers: '',
                          pageViews: '',
                          sessions: '',
                          conversionType: 'visitor_to_customer',
                          industry: '',
                          trafficSource: ''
                        })
                      }}
                      className="px-6 py-3 border border-white/20 text-white rounded-lg hover:bg-white/10 transition-all duration-300"
                    >
                      New Calculation
                    </button>
                    <button 
                      onClick={() => {
                        // Generate and download conversion rate report
                        const reportData = {
                          type: 'Conversion Rate Analysis',
                          date: new Date().toLocaleDateString(),
                          results: results
                        }
                        const dataStr = JSON.stringify(reportData, null, 2)
                        const dataBlob = new Blob([dataStr], {type: 'application/json'})
                        const url = URL.createObjectURL(dataBlob)
                        const link = document.createElement('a')
                        link.href = url
                        link.download = 'conversion-rate-analysis-report.json'
                        link.click()
                        URL.revokeObjectURL(url)
                      }}
                      className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 flex items-center gap-2"
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
            <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 p-6 rounded-3xl border border-cyan-500/30 backdrop-blur-md">
              <h3 className="text-xl font-bold text-white mb-4">Conversion Metrics</h3>
              <div className="space-y-4">
                <div className="p-3 bg-white/5 rounded-lg">
                  <h4 className="font-semibold text-cyan-300 mb-1">What is Conversion Rate?</h4>
                  <p className="text-xs text-gray-300">The percentage of users who take a desired action, such as making a purchase or filling out a form.</p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <h4 className="font-semibold text-blue-300 mb-1">Why it matters</h4>
                  <p className="text-xs text-gray-300">Higher conversion rates mean more efficient marketing spend and better ROI on your campaigns.</p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <h4 className="font-semibold text-indigo-300 mb-1">Funnel Analysis</h4>
                  <p className="text-xs text-gray-300">Understanding drop-off points helps identify where to focus optimization efforts.</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 p-6 rounded-3xl border border-green-500/30 backdrop-blur-md">
              <h3 className="text-xl font-bold text-white mb-4">Industry Benchmarks</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">E-commerce</span>
                  <span className="text-sm font-semibold text-green-400">2-5%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">SaaS</span>
                  <span className="text-sm font-semibold text-green-400">3-7%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">B2B Services</span>
                  <span className="text-sm font-semibold text-green-400">5-10%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">Lead Generation</span>
                  <span className="text-sm font-semibold text-green-400">10-20%</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-6 rounded-3xl border border-purple-500/30 backdrop-blur-md">
              <h3 className="text-xl font-bold text-white mb-4">Optimization Tips</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2 text-purple-300">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Improve landing page design</span>
                </li>
                <li className="flex items-start gap-2 text-purple-300">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Optimize call-to-action buttons</span>
                </li>
                <li className="flex items-start gap-2 text-purple-300">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Reduce form fields</span>
                </li>
                <li className="flex items-start gap-2 text-purple-300">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Improve page load speed</span>
                </li>
                <li className="flex items-start gap-2 text-purple-300">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>A/B test continuously</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}