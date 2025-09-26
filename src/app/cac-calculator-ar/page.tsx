'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import RTLWrapper from '@/components/RTLWrapper'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
  RefreshCw
} from 'lucide-react'

export default function CACCalculatorArabic() {
  const [formData, setFormData] = useState({
    totalAdSpend: '',
    totalLeads: '',
    totalCustomers: '',
    salesTeamCosts: '',
    marketingTeamCosts: '',
    overheadCosts: '',
    timePeriod: 'monthly',
    industry: '',
    avgCustomerValue: ''
  })

  const [results, setResults] = useState<any>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const industries = [
    'التجارة الإلكترونية', 'البرمجيات كخدمة', 'الأعمال المحلية', 'الرعاية الصحية', 'التعليم', 
    'العقارات', 'التمويل', 'السفر والسياحة', 'المطاعم والمشروبات', 'أخرى'
  ]

  const timePeriods = [
    { value: 'monthly', label: 'شهري' },
    { value: 'quarterly', label: 'ربع سنوي' },
    { value: 'yearly', label: 'سنوي' }
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const calculateCAC = () => {
    const totalAdSpend = parseFloat(formData.totalAdSpend) || 0
    const totalLeads = parseFloat(formData.totalLeads) || 0
    const totalCustomers = parseFloat(formData.totalCustomers) || 0
    const salesTeamCosts = parseFloat(formData.salesTeamCosts) || 0
    const marketingTeamCosts = parseFloat(formData.marketingTeamCosts) || 0
    const overheadCosts = parseFloat(formData.overheadCosts) || 0
    const avgCustomerValue = parseFloat(formData.avgCustomerValue) || 0

    // Calculate CAC
    const totalMarketingCosts = totalAdSpend + marketingTeamCosts + overheadCosts
    const totalSalesCosts = salesTeamCosts
    const totalAcquisitionCosts = totalMarketingCosts + totalSalesCosts
    
    const cac = totalCustomers > 0 ? totalAcquisitionCosts / totalCustomers : 0
    const marketingCAC = totalCustomers > 0 ? totalMarketingCosts / totalCustomers : 0
    const salesCAC = totalCustomers > 0 ? totalSalesCosts / totalCustomers : 0
    
    // Calculate Lead to Customer Rate
    const leadToCustomerRate = totalLeads > 0 ? (totalCustomers / totalLeads) * 100 : 0
    const costPerLead = totalLeads > 0 ? totalMarketingCosts / totalLeads : 0
    
    // Calculate ROI and Payback Period
    const customerLTV = avgCustomerValue || (cac * 3) // Estimate LTV if not provided
    const roi = cac > 0 ? ((customerLTV - cac) / cac) * 100 : 0
    const paybackPeriod = cac > 0 && avgCustomerValue > 0 ? cac / avgCustomerValue : 0
    
    // Calculate efficiency scores
    const cacScore = cac <= customerLTV * 0.3 ? 100 : cac <= customerLTV * 0.5 ? 80 : cac <= customerLTV * 0.7 ? 60 : cac <= customerLTV ? 40 : 20
    const conversionScore = leadToCustomerRate >= 10 ? 100 : leadToCustomerRate >= 5 ? 80 : leadToCustomerRate >= 2 ? 60 : leadToCustomerRate >= 1 ? 40 : 20
    const roiScore = roi >= 200 ? 100 : roi >= 100 ? 80 : roi >= 50 ? 60 : roi >= 0 ? 40 : 20
    
    const overallScore = (cacScore + conversionScore + roiScore) / 3

    // Generate recommendations
    const recommendations = []
    const strengths = []

    if (cac <= customerLTV * 0.3) {
      strengths.push('تكلفة اكتساب العملاء ممتازة وفعالة')
    } else if (cac <= customerLTV * 0.5) {
      strengths.push('تكلفة اكتساب العملاء جيدة')
    } else if (cac <= customerLTV * 0.7) {
      recommendations.push('يمكن تحسين تكلفة اكتساب العملاء')
    } else if (cac <= customerLTV) {
      recommendations.push('تكلفة اكتساب العملاء مرتفعة - راجع استراتيجيات التسويق')
    } else {
      recommendations.push('تكلفة اكتساب العملاء أعلى من قيمة العميل - إجراء فوري مطلوب')
    }

    if (leadToCustomerRate >= 10) {
      strengths.push('معدل تحويل العملاء ممتاز')
    } else if (leadToCustomerRate >= 5) {
      strengths.push('معدل تحويل العملاء جيد')
    } else if (leadToCustomerRate >= 2) {
      recommendations.push('حسن عملية تحويل العملاء المحتملين')
    } else {
      recommendations.push('معدل تحويل العملاء منخفض - ركز على تحسين جودة العملاء المحتملين')
    }

    if (roi >= 200) {
      strengths.push('عائد استثمار ممتاز على اكتساب العملاء')
    } else if (roi >= 100) {
      strengths.push('عائد استثمار جيد على اكتساب العملاء')
    } else if (roi >= 50) {
      recommendations.push('ركز على زيادة قيمة العميل لتحسين العائد')
    } else {
      recommendations.push('عائد استثمار منخفض - راجع نموذج التسعير واستراتيجية اكتساب العملاء')
    }

    return {
      cac: cac.toFixed(2),
      marketingCAC: marketingCAC.toFixed(2),
      salesCAC: salesCAC.toFixed(2),
      costPerLead: costPerLead.toFixed(2),
      leadToCustomerRate: leadToCustomerRate.toFixed(1),
      roi: roi.toFixed(1),
      paybackPeriod: paybackPeriod.toFixed(1),
      overallScore: overallScore.toFixed(0),
      totalMarketingCosts: totalMarketingCosts.toFixed(2),
      totalSalesCosts: totalSalesCosts.toFixed(2),
      recommendations,
      strengths,
      metrics: {
        cacScore,
        conversionScore,
        roiScore
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
      totalAdSpend: '',
      totalLeads: '',
      totalCustomers: '',
      salesTeamCosts: '',
      marketingTeamCosts: '',
      overheadCosts: '',
      timePeriod: 'monthly',
      industry: '',
      avgCustomerValue: ''
    })
    setResults(null)
  }

  return (
    <RTLWrapper className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <Navigation currentPath="/cac-calculator-ar" />

      <div className="relative z-40 container mx-auto px-6 pt-24 pb-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-300 px-6 py-3 rounded-full mb-6 backdrop-blur-sm border border-blue-500/30">
            <Calculator className="w-5 h-5" />
            <span className="text-sm font-medium">حاسبة تكلفة اكتساب العملاء</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
            حاسبة تكلفة اكتساب العملاء (CAC)
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            احسب تكلفة اكتساب العملاء، حلل كفاءة حملاتك التسويقية، واكتشف الفرص لتحسين عائد استثمارك في التسويق والمبيعات.
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
                  بيانات اكتساب العملاء
                </CardTitle>
                <p className="text-gray-300">
                  أدخل بيانات تسويقك ومبيعاتك لحساب تكلفة اكتساب العملاء وتحليل الأداء
                </p>
              </CardHeader>

              <CardContent className="space-y-6">
                {!results ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Marketing Costs */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-blue-400 mb-3">التكاليف التسويقية</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                            <DollarSign className="w-4 h-4 text-blue-400" />
                            إجمالي الإنفاق الإعلاني *
                          </label>
                          <input
                            type="number"
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 text-white placeholder-gray-400"
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
                            <Users className="w-4 h-4 text-blue-400" />
                            تكاليف فريق التسويق
                          </label>
                          <input
                            type="number"
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 text-white placeholder-gray-400"
                            value={formData.marketingTeamCosts}
                            onChange={(e) => handleInputChange('marketingTeamCosts', e.target.value)}
                            placeholder="5000"
                            min="0"
                            step="100"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                          <BarChart3 className="w-4 h-4 text-blue-400" />
                          التكاليف العامة (overhead)
                        </label>
                        <input
                          type="number"
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 text-white placeholder-gray-400"
                          value={formData.overheadCosts}
                          onChange={(e) => handleInputChange('overheadCosts', e.target.value)}
                          placeholder="2000"
                          min="0"
                          step="100"
                        />
                      </div>
                    </div>

                    {/* Sales Costs */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-purple-400 mb-3">التكاليف البيعية</h3>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                          <Target className="w-4 h-4 text-purple-400" />
                          تكاليف فريق المبيعات
                        </label>
                        <input
                          type="number"
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 text-white placeholder-gray-400"
                          value={formData.salesTeamCosts}
                          onChange={(e) => handleInputChange('salesTeamCosts', e.target.value)}
                          placeholder="8000"
                          min="0"
                          step="100"
                        />
                      </div>
                    </div>

                    {/* Results */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-green-400 mb-3">النتائج</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                            <Users className="w-4 h-4 text-green-400" />
                            إجمالي العملاء المحتملين (Leads) *
                          </label>
                          <input
                            type="number"
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 text-white placeholder-gray-400"
                            value={formData.totalLeads}
                            onChange={(e) => handleInputChange('totalLeads', e.target.value)}
                            placeholder="500"
                            min="0"
                            step="1"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                            <Award className="w-4 h-4 text-green-400" />
                            إجمالي العملاء *
                          </label>
                          <input
                            type="number"
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 text-white placeholder-gray-400"
                            value={formData.totalCustomers}
                            onChange={(e) => handleInputChange('totalCustomers', e.target.value)}
                            placeholder="50"
                            min="0"
                            step="1"
                            required
                          />
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-green-400" />
                            متوسط قيمة العميل
                          </label>
                          <input
                            type="number"
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 text-white placeholder-gray-400"
                            value={formData.avgCustomerValue}
                            onChange={(e) => handleInputChange('avgCustomerValue', e.target.value)}
                            placeholder="1000"
                            min="0"
                            step="10"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                            <Activity className="w-4 h-4 text-green-400" />
                            الفترة الزمنية
                          </label>
                          <select
                            value={formData.timePeriod}
                            onChange={(e) => handleInputChange('timePeriod', e.target.value)}
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 text-white"
                          >
                            {timePeriods.map((period) => (
                              <option key={period.value} value={period.value}>
                                {period.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <Button
                        type="submit"
                        disabled={isCalculating || !formData.totalAdSpend || !formData.totalLeads || !formData.totalCustomers}
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
                            احسب CAC
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
                      <h3 className="text-2xl font-bold text-white mb-4">نتائج تكلفة اكتساب العملاء</h3>
                      <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-300 px-4 py-2 rounded-full">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm font-medium">تم الحساب بنجاح</span>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <Card className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-blue-500/30">
                        <CardContent className="p-6 text-center">
                          <div className="text-3xl font-bold text-white mb-2">{formatCurrency(results.cac)}</div>
                          <div className="text-sm text-gray-300">تكلفة اكتساب العميل (CAC)</div>
                        </CardContent>
                      </Card>
                      <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/30">
                        <CardContent className="p-6 text-center">
                          <div className="text-3xl font-bold text-white mb-2">{results.leadToCustomerRate}%</div>
                          <div className="text-sm text-gray-300">معدل تحويل العميل</div>
                        </CardContent>
                      </Card>
                      <Card className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-500/30">
                        <CardContent className="p-6 text-center">
                          <div className="text-3xl font-bold text-white mb-2">{formatCurrency(results.costPerLead)}</div>
                          <div className="text-sm text-gray-300">تكلفة العميل المحتمل</div>
                        </CardContent>
                      </Card>
                      <Card className="bg-gradient-to-br from-orange-500/20 to-red-500/20 border-orange-500/30">
                        <CardContent className="p-6 text-center">
                          <div className="text-3xl font-bold text-white mb-2">{results.roi}%</div>
                          <div className="text-sm text-gray-300">العائد على الاستثمار</div>
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
            {results && (
              <Card className="bg-white/5 backdrop-blur-md border-white/10 shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
                    <Activity className="w-5 h-5 text-blue-400" />
                    التحليل والتوصيات
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {results.strengths.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-green-400 mb-2">نقاط القوة:</h4>
                      <ul className="space-y-1">
                        {results.strengths.map((strength: string, index: number) => (
                          <li key={index} className="text-sm text-gray-300 flex items-center gap-2">
                            <CheckCircle className="w-3 h-3 text-green-400" />
                            {strength}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {results.recommendations.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-yellow-400 mb-2">التوصيات:</h4>
                      <ul className="space-y-1">
                        {results.recommendations.map((recommendation: string, index: number) => (
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
                  <PieChart className="w-5 h-5 text-blue-400" />
                  نصائح احترافية
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm text-gray-300">
                  <div className="flex items-start gap-2 mb-2">
                    <Zap className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>ركز على تحسين جودة العملاء المحتملين وليس الكمية فقط</span>
                  </div>
                  <div className="flex items-start gap-2 mb-2">
                    <Target className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span>استخدم استهدافاً دقيقاً للوصول إلى العملاء المناسبين</span>
                  </div>
                  <div className="flex items-start gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>تابع CAC بانتظام لقياس كفاءة حملاتك التسويقية</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Award className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                    <span>وازن بين تكاليف التسويق والمبيعات للحصول على أفضل النتائج</span>
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