'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import RTLWrapper from '@/components/RTLWrapper'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
  RefreshCw
} from 'lucide-react'

export default function ROICalculatorArabic() {
  const [activeTab, setActiveTab] = useState<'roi' | 'roas'>('roi')
  const [formData, setFormData] = useState({
    monthlyAdSpend: '',
    averageOrderValue: '',
    monthlyOrders: '',
    conversionRate: '',
    customerLifetimeValue: '',
    profitMargin: '',
    industry: '',
    marketingChannel: ''
  })

  const [roasData, setRoasData] = useState({
    adSpend: '',
    revenue: '',
    campaignName: '',
    platform: '',
    duration: '30'
  })

  const [results, setResults] = useState<any>(null)
  const [roasResults, setRoasResults] = useState<any>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const industries = [
    'التجارة الإلكترونية', 'البرمجيات كخدمة', 'الأعمال المحلية', 'الرعاية الصحية', 'التعليم', 
    'العقارات', 'التمويل', 'السفر والسياحة', 'المطاعم والمشروبات', 'أخرى'
  ]

  const channels = [
    'إعلانات فيسبوك', 'إعلانات جوجل', 'إنستجرام', 'لينكدإن', 'تيك توك',
    'التسويق عبر البريد', 'السيو', 'تسويق المحتوى', 'تسويق المؤثرين', 'أخرى'
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleRoasChange = (field: string, value: string) => {
    setRoasData(prev => ({ ...prev, [field]: value }))
  }

  const calculateROAS = () => {
    const adSpend = parseFloat(roasData.adSpend) || 0
    const revenue = parseFloat(roasData.revenue) || 0
    const duration = parseInt(roasData.duration) || 30

    const roas = adSpend > 0 ? revenue / adSpend : 0
    const profit = revenue - adSpend
    const profitMargin = revenue > 0 ? (profit / revenue) * 100 : 0
    const dailyAdSpend = adSpend / duration
    const dailyRevenue = revenue / duration
    const dailyROAS = dailyAdSpend > 0 ? dailyRevenue / dailyAdSpend : 0

    // Calculate efficiency scores
    const roasScore = roas >= 4 ? 100 : roas >= 3 ? 80 : roas >= 2 ? 60 : roas >= 1 ? 40 : 20
    const profitScore = profitMargin >= 50 ? 100 : profitMargin >= 30 ? 80 : profitMargin >= 15 ? 60 : profitMargin >= 0 ? 40 : 20
    const efficiencyScore = (roasScore + profitScore) / 2

    // Generate recommendations
    const recommendations = []
    const strengths = []

    if (roas >= 4) {
      strengths.push('أداء ROAS ممتاز')
    } else if (roas >= 3) {
      strengths.push('أداء ROAS جيد')
    } else if (roas >= 2) {
      recommendations.push('ROAS مقبول ولكن يمكن تحسينه')
    } else if (roas >= 1) {
      recommendations.push('ROAS أقل من المتوسط - قم بتحسين استهداف الحملة')
    } else {
      recommendations.push('الحملة غير مربحة - فكر في إيقافها أو إجراء تغييرات كبيرة')
    }

    if (profitMargin >= 50) {
      strengths.push('هوامش ربح استثنائية')
    } else if (profitMargin >= 30) {
      strengths.push('هوامش ربح صحية')
    } else if (profitMargin >= 15) {
      recommendations.push('يمكن تحسين هوامش الربح')
    } else if (profitMargin >= 0) {
      recommendations.push('هوامش ربح منخفضة - راجع التسعير أو التكاليف')
    } else {
      recommendations.push('الحملة تخسر أموالاً - إجراء فوري مطلوب')
    }

    if (dailyROAS >= 3) {
      strengths.push('أداء يومي متسق')
    } else if (dailyROAS < roas * 0.8) {
      recommendations.push('الأداء اليومي غير متسق - حلل الاتجاهات')
    }

    return {
      roas: roas.toFixed(2),
      profit: profit.toFixed(2),
      profitMargin: profitMargin.toFixed(1),
      dailyAdSpend: dailyAdSpend.toFixed(2),
      dailyRevenue: dailyRevenue.toFixed(2),
      dailyROAS: dailyROAS.toFixed(2),
      efficiencyScore: efficiencyScore.toFixed(0),
      recommendations,
      strengths,
      metrics: {
        roasScore,
        profitScore
      }
    }
  }

  const calculateROI = () => {
    const monthlyAdSpend = parseFloat(formData.monthlyAdSpend) || 0
    const averageOrderValue = parseFloat(formData.averageOrderValue) || 0
    const monthlyOrders = parseFloat(formData.monthlyOrders) || 0
    const conversionRate = parseFloat(formData.conversionRate) || 0
    const customerLifetimeValue = parseFloat(formData.customerLifetimeValue) || 0
    const profitMargin = parseFloat(formData.profitMargin) || 0

    // Calculate metrics
    const monthlyRevenue = monthlyOrders * averageOrderValue
    const monthlyProfit = monthlyRevenue * (profitMargin / 100)
    const netProfit = monthlyProfit - monthlyAdSpend
    const roi = monthlyAdSpend > 0 ? ((netProfit / monthlyAdSpend) * 100) : 0
    const roas = monthlyAdSpend > 0 ? monthlyRevenue / monthlyAdSpend : 0
    const cac = monthlyOrders > 0 ? monthlyAdSpend / monthlyOrders : 0
    const breakEvenOrders = monthlyAdSpend > 0 && averageOrderValue > 0 ? monthlyAdSpend / averageOrderValue : 0

    // Calculate efficiency scores
    const roiScore = roi >= 300 ? 100 : roi >= 200 ? 80 : roi >= 100 ? 60 : roi >= 50 ? 40 : 20
    const roasScore = roas >= 4 ? 100 : roas >= 3 ? 80 : roas >= 2 ? 60 : roas >= 1 ? 40 : 20
    const cacScore = cac <= averageOrderValue * 0.3 ? 100 : cac <= averageOrderValue * 0.5 ? 80 : cac <= averageOrderValue * 0.7 ? 60 : cac <= averageOrderValue ? 40 : 20

    const overallScore = (roiScore + roasScore + cacScore) / 3

    // Generate recommendations
    const recommendations = []
    const strengths = []

    if (roi >= 200) {
      strengths.push('أداء ROI ممتاز')
    } else if (roi >= 100) {
      strengths.push('أداء ROI جيد')
    } else if (roi > 0) {
      recommendations.push('ركز على تحسين معدلات التحويل لزيادة ROI')
    } else {
      recommendations.push('الحملة غير مربحة - فكر في الإيقاف أو التحسين')
    }

    if (roas >= 3) {
      strengths.push('عائد قوي على إنفاق الإعلانات')
    } else if (roas >= 2) {
      recommendations.push('حسن الإعلانات الإبداعية والاستهداف لتحسين ROAS')
    } else {
      recommendations.push('تحسين كبير مطلوب في أداء الإعلانات')
    }

    if (cac <= averageOrderValue * 0.3) {
      strengths.push('تكلفة اكتساب العملاء فعالة')
    } else if (cac <= averageOrderValue * 0.5) {
      recommendations.push('اعمل على تقليل تكلفة اكتساب العملاء')
    } else {
      recommendations.push('تكلفة اكتساب العملاء مرتفعة جداً - راجع الاستهداف والمزايدة')
    }

    if (conversionRate >= 5) {
      strengths.push('معدل تحويل قوي')
    } else if (conversionRate >= 2) {
      recommendations.push('حسن صفحات الهبوط ونصوص الإعلانات لتحسين التحويلات')
    } else {
      recommendations.push('معدل التحويل يحتاج إلى تحسين كبير')
    }

    return {
      roi: roi.toFixed(1),
      roas: roas.toFixed(2),
      cac: cac.toFixed(2),
      breakEvenOrders: breakEvenOrders.toFixed(0),
      monthlyRevenue: monthlyRevenue.toFixed(0),
      monthlyProfit: monthlyProfit.toFixed(0),
      netProfit: netProfit.toFixed(0),
      overallScore: overallScore.toFixed(0),
      recommendations,
      strengths,
      metrics: {
        roiScore,
        roasScore,
        cacScore
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsCalculating(true)

    // Simulate calculation
    setTimeout(() => {
      if (activeTab === 'roi') {
        const calculatedResults = calculateROI()
        setResults(calculatedResults)
        setRoasResults(null)
      } else {
        const calculatedResults = calculateROAS()
        setRoasResults(calculatedResults)
        setResults(null)
      }
      setIsCalculating(false)
    }, 1500)
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400'
    if (score >= 60) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'ممتاز'
    if (score >= 60) return 'جيد'
    if (score >= 40) return 'مقبول'
    return 'ضعيف'
  }

  const formatCurrency = (value: string) => {
    const num = parseFloat(value)
    return new Intl.NumberFormat('ar-EG', {
      style: 'currency',
      currency: 'EGP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(num)
  }

  const resetForm = () => {
    setFormData({
      monthlyAdSpend: '',
      averageOrderValue: '',
      monthlyOrders: '',
      conversionRate: '',
      customerLifetimeValue: '',
      profitMargin: '',
      industry: '',
      marketingChannel: ''
    })
    setRoasData({
      adSpend: '',
      revenue: '',
      campaignName: '',
      platform: '',
      duration: '30'
    })
    setResults(null)
    setRoasResults(null)
  }

  return (
    <RTLWrapper className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <Navigation currentPath="/roi-calculator-ar" />

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
            <span className="text-sm font-medium">حاسبات التسويق</span>
          </div>
          
          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="bg-white/5 backdrop-blur-md rounded-full p-1 border border-white/10">
              <button
                onClick={() => setActiveTab('roi')}
                className={`px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === 'roi'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                حاسبة العائد على الاستثمار
              </button>
              <button
                onClick={() => setActiveTab('roas')}
                className={`px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === 'roas'
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                حاسبة العائد على إنفاق الإعلانات
              </button>
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            {activeTab === 'roi' ? 'حاسبة العائد على الاستثمار التسويقي' : 'حاسبة العائد على إنفاق الإعلانات'}
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {activeTab === 'roi' 
              ? 'احسب عائدك على الاستثمار، حلل أداء الحملة، واكتشف الفرص لتعظيم فعالية تسويقك.'
              : 'احسب عائدك على إنفاق الإعلانات، قس ربحية الحملة، وحسن استثمارك الإعلاني لأقصى عائد.'
            }
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
            <Card className="bg-white/5 backdrop-blur-md border-white/10 shadow-2xl">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl font-bold text-white mb-2">
                  {activeTab === 'roi' ? 'بيانات الحملة' : 'بيانات أداء الإعلانات'}
                </CardTitle>
                <p className="text-gray-300">
                  {activeTab === 'roi' 
                    ? 'أدخل مقاييس حملتك لحساب العائد على الاستثمار والأداء'
                    : 'أدخل بيانات إعلاناتك لحساب العائد على إنفاق الإعلانات والربحية'
                  }
                </p>
              </CardHeader>

              <CardContent className="space-y-6">
                {activeTab === 'roi' ? (
                  !results ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Basic Metrics */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                            <DollarSign className="w-4 h-4 text-purple-400" />
                            الإنفاق الإعلاني الشهري *
                          </label>
                          <input
                            type="number"
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 text-white placeholder-gray-400"
                            value={formData.monthlyAdSpend}
                            onChange={(e) => handleInputChange('monthlyAdSpend', e.target.value)}
                            placeholder="5000"
                            min="0"
                            step="100"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                            <Target className="w-4 h-4 text-purple-400" />
                            متوسط قيمة الطلب *
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
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                            <Users className="w-4 h-4 text-purple-400" />
                            الطلبات الشهرية *
                          </label>
                          <input
                            type="number"
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 text-white placeholder-gray-400"
                            value={formData.monthlyOrders}
                            onChange={(e) => handleInputChange('monthlyOrders', e.target.value)}
                            placeholder="100"
                            min="0"
                            step="1"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                            <BarChart3 className="w-4 h-4 text-purple-400" />
                            معدل التحويل (%)
                          </label>
                          <input
                            type="number"
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 text-white placeholder-gray-400"
                            value={formData.conversionRate}
                            onChange={(e) => handleInputChange('conversionRate', e.target.value)}
                            placeholder="2.5"
                            min="0"
                            max="100"
                            step="0.1"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-purple-400" />
                            هامش الربح (%)
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
                            <Award className="w-4 h-4 text-purple-400" />
                            قيمة العميل مدى الحياة
                          </label>
                          <input
                            type="number"
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 text-white placeholder-gray-400"
                            value={formData.customerLifetimeValue}
                            onChange={(e) => handleInputChange('customerLifetimeValue', e.target.value)}
                            placeholder="1000"
                            min="0"
                            step="10"
                          />
                        </div>
                      </div>

                      <div className="flex gap-4 pt-4">
                        <Button
                          type="submit"
                          disabled={isCalculating || !formData.monthlyAdSpend || !formData.averageOrderValue || !formData.monthlyOrders}
                          className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                          {isCalculating ? (
                            <>
                              <RefreshCw className="w-4 h-4 ml-2 animate-spin" />
                              جاري الحساب...
                            </>
                          ) : (
                            <>
                              <Calculator className="w-4 h-4 ml-2" />
                              احسب العائد
                            </>
                          )}
                        </Button>
                        <Button
                          type="button"
                          onClick={resetForm}
                          variant="outline"
                          className="border-white/20 text-white hover:bg-white/10 font-medium py-3 px-6 rounded-lg transition-all duration-300"
                        >
                          <RefreshCw className="w-4 h-4 ml-2" />
                          إعادة تعيين
                        </Button>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-6">
                      <div className="text-center">
                        <h3 className="text-2xl font-bold text-white mb-4">نتائج العائد على الاستثمار</h3>
                        <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-300 px-4 py-2 rounded-full">
                          <CheckCircle className="w-4 h-4" />
                          <span className="text-sm font-medium">تم الحساب بنجاح</span>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/30">
                          <CardContent className="p-6 text-center">
                            <div className="text-3xl font-bold text-white mb-2">{results.roi}%</div>
                            <div className="text-sm text-gray-300">العائد على الاستثمار</div>
                          </CardContent>
                        </Card>
                        <Card className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-blue-500/30">
                          <CardContent className="p-6 text-center">
                            <div className="text-3xl font-bold text-white mb-2">{results.roas}x</div>
                            <div className="text-sm text-gray-300">العائد على إنفاق الإعلانات</div>
                          </CardContent>
                        </Card>
                        <Card className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-500/30">
                          <CardContent className="p-6 text-center">
                            <div className="text-3xl font-bold text-white mb-2">{formatCurrency(results.cac)}</div>
                            <div className="text-sm text-gray-300">تكلفة اكتساب العميل</div>
                          </CardContent>
                        </Card>
                        <Card className="bg-gradient-to-br from-orange-500/20 to-red-500/20 border-orange-500/30">
                          <CardContent className="p-6 text-center">
                            <div className="text-3xl font-bold text-white mb-2">{results.breakEvenOrders}</div>
                            <div className="text-sm text-gray-300">طلبات التعادل</div>
                          </CardContent>
                        </Card>
                      </div>

                      <div className="text-center">
                        <Button
                          onClick={() => setResults(null)}
                          variant="outline"
                          className="border-white/20 text-white hover:bg-white/10"
                        >
                          <RefreshCw className="w-4 h-4 ml-2" />
                          حساب جديد
                        </Button>
                      </div>
                    </div>
                  )
                ) : (
                  !roasResults ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                            <DollarSign className="w-4 h-4 text-blue-400" />
                            الإنفاق الإعلاني *
                          </label>
                          <input
                            type="number"
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 text-white placeholder-gray-400"
                            value={roasData.adSpend}
                            onChange={(e) => handleRoasChange('adSpend', e.target.value)}
                            placeholder="5000"
                            min="0"
                            step="100"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-blue-400" />
                            الإيرادات *
                          </label>
                          <input
                            type="number"
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 text-white placeholder-gray-400"
                            value={roasData.revenue}
                            onChange={(e) => handleRoasChange('revenue', e.target.value)}
                            placeholder="15000"
                            min="0"
                            step="100"
                            required
                          />
                        </div>
                      </div>

                      <div className="flex gap-4 pt-4">
                        <Button
                          type="submit"
                          disabled={isCalculating || !roasData.adSpend || !roasData.revenue}
                          className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                          {isCalculating ? (
                            <>
                              <RefreshCw className="w-4 h-4 ml-2 animate-spin" />
                              جاري الحساب...
                            </>
                          ) : (
                            <>
                              <Calculator className="w-4 h-4 ml-2" />
                              احسب ROAS
                            </>
                          )}
                        </Button>
                        <Button
                          type="button"
                          onClick={resetForm}
                          variant="outline"
                          className="border-white/20 text-white hover:bg-white/10 font-medium py-3 px-6 rounded-lg transition-all duration-300"
                        >
                          <RefreshCw className="w-4 h-4 ml-2" />
                          إعادة تعيين
                        </Button>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-6">
                      <div className="text-center">
                        <h3 className="text-2xl font-bold text-white mb-4">نتائج العائد على إنفاق الإعلانات</h3>
                        <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-300 px-4 py-2 rounded-full">
                          <CheckCircle className="w-4 h-4" />
                          <span className="text-sm font-medium">تم الحساب بنجاح</span>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <Card className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-blue-500/30">
                          <CardContent className="p-6 text-center">
                            <div className="text-3xl font-bold text-white mb-2">{roasResults.roas}x</div>
                            <div className="text-sm text-gray-300">العائد على إنفاق الإعلانات</div>
                          </CardContent>
                        </Card>
                        <Card className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-500/30">
                          <CardContent className="p-6 text-center">
                            <div className="text-3xl font-bold text-white mb-2">{formatCurrency(roasResults.profit)}</div>
                            <div className="text-sm text-gray-300">الربح الصافي</div>
                          </CardContent>
                        </Card>
                        <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/30">
                          <CardContent className="p-6 text-center">
                            <div className="text-3xl font-bold text-white mb-2">{roasResults.profitMargin}%</div>
                            <div className="text-sm text-gray-300">هامش الربح</div>
                          </CardContent>
                        </Card>
                        <Card className="bg-gradient-to-br from-orange-500/20 to-red-500/20 border-orange-500/30">
                          <CardContent className="p-6 text-center">
                            <div className="text-3xl font-bold text-white mb-2">{roasResults.efficiencyScore}/100</div>
                            <div className="text-sm text-gray-300">نقاط الكفاءة</div>
                          </CardContent>
                        </Card>
                      </div>

                      <div className="text-center">
                        <Button
                          onClick={() => setRoasResults(null)}
                          variant="outline"
                          className="border-white/20 text-white hover:bg-white/10"
                        >
                          <RefreshCw className="w-4 h-4 ml-2" />
                          حساب جديد
                        </Button>
                      </div>
                    </div>
                  )
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Results Panel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            {(results || roasResults) && (
              <Card className="bg-white/5 backdrop-blur-md border-white/10 shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
                    <Activity className="w-5 h-5 text-purple-400" />
                    التحليل والتوصيات
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {(results?.strengths.length > 0 || roasResults?.strengths.length > 0) && (
                    <div>
                      <h4 className="text-sm font-medium text-green-400 mb-2">نقاط القوة:</h4>
                      <ul className="space-y-1">
                        {(results?.strengths || roasResults?.strengths || []).map((strength: string, index: number) => (
                          <li key={index} className="text-sm text-gray-300 flex items-center gap-2">
                            <CheckCircle className="w-3 h-3 text-green-400" />
                            {strength}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {(results?.recommendations.length > 0 || roasResults?.recommendations.length > 0) && (
                    <div>
                      <h4 className="text-sm font-medium text-yellow-400 mb-2">التوصيات:</h4>
                      <ul className="space-y-1">
                        {(results?.recommendations || roasResults?.recommendations || []).map((recommendation: string, index: number) => (
                          <li key={index} className="text-sm text-gray-300 flex items-center gap-2">
                            <AlertCircle className="w-3 h-3 text-yellow-400" />
                            {recommendation}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            <Card className="bg-white/5 backdrop-blur-md border-white/10 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-purple-400" />
                  نصائح احترافية
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm text-gray-300">
                  <div className="flex items-start gap-2 mb-2">
                    <Zap className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>ركز على تحسين معدل التحويل قبل زيادة الإنفاق الإعلاني</span>
                  </div>
                  <div className="flex items-start gap-2 mb-2">
                    <Target className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span>استهدف الجمهور المناسب لزيادة فعالية حملاتك</span>
                  </div>
                  <div className="flex items-start gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>تابع المقاييس بانتظام لاتخاذ قرارات مستنيرة</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Award className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                    <span>اختبر إعلانات مختلفة لتحسين الأداء باستمرار</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </RTLWrapper>
  )
}