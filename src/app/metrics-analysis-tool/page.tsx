'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import ToolOutput from '@/components/ToolOutput'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  BarChart3, 
  TrendingUp, 
  Target, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Eye,
  MousePointer,
  Users,
  Activity,
  Zap,
  RefreshCw,
  Download,
  Copy,
  ArrowRight,
  Clock,
  DollarSign,
  Percent,
  Gauge
} from 'lucide-react'

export default function MetricsAnalysisTool() {
  const [activeTab, setActiveTab] = useState('metrics-dashboard')
  const [formData, setFormData] = useState({
    cpm: '',
    ctrAll: '',
    ctrLink: '',
    ctrUnique: '',
    outboundCtr: '',
    landingPageViews: '',
    adSpend: '',
    impressions: '',
    clicks: '',
    conversions: ''
  })
  const [generatedAnalysis, setGeneratedAnalysis] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [metrics, setMetrics] = useState<any[]>([])
  const [recommendations, setRecommendations] = useState<string[]>([])
  const [score, setScore] = useState<number | undefined>(undefined)

  const analysisTools = [
    {
      id: 'metrics-dashboard',
      title: 'Metrics Dashboard',
      description: 'Comprehensive analysis of all key performance indicators',
      icon: BarChart3,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'ctr-diagnosis',
      title: 'CTR Diagnosis Tool',
      description: 'Identify and fix CTR issues with targeted solutions',
      icon: Target,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'performance-scoring',
      title: 'Performance Scoring',
      description: 'Calculate overall performance score and health metrics',
      icon: Gauge,
      color: 'from-green-500 to-emerald-500'
    }
  ]

  const generateMetricsDashboard = () => {
    const cpm = parseFloat(formData.cpm) || 0
    const ctrAll = parseFloat(formData.ctrAll) || 0
    const ctrLink = parseFloat(formData.ctrLink) || 0
    const ctrUnique = parseFloat(formData.ctrUnique) || 0
    const outboundCtr = parseFloat(formData.outboundCtr) || 0
    const landingPageViews = parseFloat(formData.landingPageViews) || 0
    const adSpend = parseFloat(formData.adSpend) || 0
    const impressions = parseFloat(formData.impressions) || 0
    const clicks = parseFloat(formData.clicks) || 0
    const conversions = parseFloat(formData.conversions) || 0

    // Calculate derived metrics
    const actualCpm = adSpend && impressions ? (adSpend / impressions) * 1000 : 0
    const actualCtrAll = clicks && impressions ? (clicks / impressions) * 100 : 0
    const actualCtrLink = ctrLink || 0
    const conversionRate = conversions && clicks ? (conversions / clicks) * 100 : 0
    const costPerConversion = conversions && adSpend ? adSpend / conversions : 0
    const lpvToOutboundRatio = outboundCtr && landingPageViews ? landingPageViews / outboundCtr : 0

    // Performance thresholds
    const cpmThreshold = { good: 10, average: 20, poor: 30 }
    const ctrAllThreshold = { good: 2, average: 1, poor: 0.5 }
    const ctrLinkThreshold = { good: 1.5, average: 0.8, poor: 0.3 }
    const conversionRateThreshold = { good: 5, average: 2, poor: 1 }

    const getPerformanceStatus = (value: number, thresholds: any) => {
      if (value >= thresholds.good) return { status: 'Excellent', color: 'text-green-400', icon: '✅' }
      if (value >= thresholds.average) return { status: 'Good', color: 'text-yellow-400', icon: '⚠️' }
      return { status: 'Needs Improvement', color: 'text-red-400', icon: '❌' }
    }

    const cpmStatus = getPerformanceStatus(actualCpm, cpmThreshold)
    const ctrAllStatus = getPerformanceStatus(actualCtrAll, ctrAllThreshold)
    const ctrLinkStatus = getPerformanceStatus(actualCtrLink, ctrLinkThreshold)
    const conversionRateStatus = getPerformanceStatus(conversionRate, conversionRateThreshold)

    return `📊 **Comprehensive Metrics Dashboard**

## 🎯 **Key Performance Indicators**

### **Cost Metrics**
| Metric | Value | Status | Benchmark |
|--------|-------|---------|-----------|
| **CPM (Cost Per Mille)** | $${actualCpm.toFixed(2)} | ${cpmStatus.icon} ${cpmStatus.status} | <$10 |
| **Ad Spend** | $${adSpend.toFixed(2)} | 💰 Budget Used | 100% |
| **Cost Per Conversion** | $${costPerConversion.toFixed(2)} | ${costPerConversion < 50 ? '✅ Good' : '⚠️ High'} | <$50 |

### **Engagement Metrics**
| Metric | Value | Status | Benchmark |
|--------|-------|---------|-----------|
| **CTR (All)** | ${actualCtrAll.toFixed(2)}% | ${ctrAllStatus.icon} ${ctrAllStatus.status} | >2% |
| **CTR (Link)** | ${actualCtrLink.toFixed(2)}% | ${ctrLinkStatus.icon} ${ctrLinkStatus.status} | >1.5% |
| **CTR (Unique)** | ${ctrUnique.toFixed(2)}% | ${ctrUnique > 0.5 ? '✅ Good' : '⚠️ Low'} | >0.5% |
| **Outbound CTR** | ${outboundCtr.toFixed(2)}% | ${outboundCtr > 0.8 ? '✅ Good' : '⚠️ Low'} | >0.8% |

### **Conversion Metrics**
| Metric | Value | Status | Benchmark |
|--------|-------|---------|-----------|
| **Landing Page Views** | ${landingPageViews} | 👁️ Views | N/A |
| **LPV / Outbound CTR Ratio** | ${lpvToOutboundRatio.toFixed(2)}:1 | ${lpvToOutboundRatio > 0.7 ? '✅ Good' : '⚠️ Low'} | >0.7:1 |
| **Conversion Rate** | ${conversionRate.toFixed(2)}% | ${conversionRateStatus.icon} ${conversionRateStatus.status} | >5% |

## 🔍 **Performance Analysis**

### **CPM Analysis**
${cpmStatus.status === 'Excellent' ? 
  '✅ **Great job!** Your CPM is well within the acceptable range. This indicates efficient audience targeting and competitive bidding.' :
  cpmStatus.status === 'Good' ? 
  '⚠️ **Acceptable but could be better.** Consider refining your audience targeting or adjusting bid strategies to improve CPM.' :
  '❌ **High CPM detected!** This could indicate poor audience targeting, high competition, or inefficient bidding. Immediate action recommended.'
}

### **CTR Analysis**
${ctrAllStatus.status === 'Excellent' ? 
  '✅ **Outstanding CTR!** Your ad creative and targeting are working well together. Users are engaging with your content.' :
  ctrAllStatus.status === 'Good' ? 
  '⚠️ **Decent CTR with room for improvement.** Consider A/B testing different creatives or refining your audience targeting.' :
  '❌ **Low CTR detected!** This is a critical issue that needs immediate attention. Review your ad creative, targeting, and messaging.'
}

### **Conversion Analysis**
${conversionRateStatus.status === 'Excellent' ? 
  '✅ **Excellent conversion rate!** Your landing page and offer are effectively converting users.' :
  conversionRateStatus.status === 'Good' ? 
  '⚠️ **Acceptable conversion rate.** Consider optimizing your landing page or improving your offer to increase conversions.' :
  '❌ **Low conversion rate!** This indicates issues with your landing page, offer, or user experience. Immediate optimization needed.'
}

## 📈 **Recommendations**

### **Immediate Actions**
${cpmStatus.status === 'Needs Improvement' ? '• Review and refine audience targeting\n• Adjust bid strategies\n• Consider different ad placements\n' : ''}
${ctrAllStatus.status === 'Needs Improvement' ? '• A/B test ad creatives\n• Improve ad copy and visuals\n• Refine audience targeting\n' : ''}
${conversionRateStatus.status === 'Needs Improvement' ? '• Optimize landing page design\n• Improve call-to-action clarity\n• Reduce friction in conversion process\n' : ''}

### **Long-term Strategies**
• Implement continuous A/B testing
• Monitor competitor performance
• Regularly update audience targeting
• Optimize landing page experience

## 💡 **Key Insights**
• **Total Impressions:** ${impressions.toLocaleString()}
• **Total Clicks:** ${clicks.toLocaleString()}
• **Total Conversions:** ${conversions.toLocaleString()}
• **Overall Performance Score:** ${calculateOverallScore(actualCpm, actualCtrAll, conversionRate)}/100

---
*Last updated: ${new Date().toLocaleDateString()}*
*Analysis based on industry benchmarks and best practices*`
  }

  const generateCTRDiagnosis = () => {
    const ctrAll = parseFloat(formData.ctrAll) || 0
    const ctrLink = parseFloat(formData.ctrLink) || 0
    const ctrUnique = parseFloat(formData.ctrUnique) || 0

    let diagnosis = ''
    let solutions = []

    // Case 1: Low CTR (Link)
    if (ctrLink < 0.8) {
      diagnosis = '🚨 **Case 1 Detected: Low CTR (Link)**\n\nYour link click-through rate is below the recommended threshold of 0.8%. This indicates that users are not compelled to click on your call-to-action.'
      solutions = [
        '🎯 **Improve Hook (Visual/Video):** Test more attention-grabbing visuals or video thumbnails in the first 3 seconds',
        '✍️ **Enhance Ad Copy:** Make your value proposition clearer and more compelling',
        '🎨 **Test Different Creatives:** Run A/B tests with different visual elements and messaging',
        '📍 **Refine Targeting:** Ensure you\'re reaching the right audience with relevant content'
      ]
    }
    // Case 2: High CTR (All) but Low CTR (Link)
    else if (ctrAll > 1.5 && ctrLink < 0.8) {
      diagnosis = '⚖️ **Case 2 Detected: High CTR (All) but Low CTR (Link)**\n\nUsers are engaging with your ad (likes, comments, shares) but not clicking through. This suggests your CTA or messaging needs clarification.'
      solutions = [
        '🔗 **Clarify CTA:** Make your call-to-action more prominent and clear',
        '💬 **Refine Messaging:** Ensure your ad copy clearly communicates what users will get after clicking',
        '🎯 **Set Clear Expectations:** Be transparent about what users will find on the landing page',
        '🔄 **Test CTA Variations:** Try different CTA button colors, text, and placement'
      ]
    }
    // Case 3: Low CTR (Unique)
    else if (ctrUnique < 0.5) {
      diagnosis = '👥 **Case 3 Detected: Low CTR (Unique)**\n\nLow unique click-through rate suggests audience targeting issues or retargeting inefficiencies.'
      solutions = [
        '🎯 **Review Audience Size:** Your target audience might be too small or too broad',
        '🔄 **Adjust Retargeting:** Modify your retargeting strategy to avoid showing ads to the same users too frequently',
        '📊 **Expand Audience:** Consider lookalike audiences or interest-based targeting',
        '⏰ **Optimize Frequency:** Adjust ad frequency to avoid audience fatigue'
      ]
    }
    else {
      diagnosis = '✅ **No Critical CTR Issues Detected**\n\nYour CTR metrics appear to be within acceptable ranges. Continue monitoring and consider incremental optimizations.'
      solutions = [
        '📈 **Continue Monitoring:** Keep tracking your CTR metrics regularly',
        '🧪 **Run A/B Tests:** Test small variations to find incremental improvements',
        '🎯 **Optimize Creatives:** Continue refining your ad creatives for better performance',
        '📊 **Analyze Competitors:** Keep an eye on competitor strategies and performance'
      ]
    }

    return `${diagnosis}

## 🛠️ **Recommended Solutions**

${solutions.map((solution, index) => `${index + 1}. ${solution}`).join('\n')}

## 📊 **Current Metrics**
- **CTR (All):** ${ctrAll.toFixed(2)}%
- **CTR (Link):** ${ctrLink.toFixed(2)}%
- **CTR (Unique):** ${ctrUnique.toFixed(2)}%

## 🎯 **Next Steps**
1. Implement the recommended solutions above
2. Monitor changes in CTR metrics over the next 7-14 days
3. Document what works and what doesn't
4. Scale successful strategies across other campaigns

---
*CTR diagnosis based on industry benchmarks and best practices*`
  }

  const calculateOverallScore = (cpm: number, ctrAll: number, conversionRate: number) => {
    let score = 100
    
    // CPM scoring (lower is better)
    if (cpm > 30) score -= 30
    else if (cpm > 20) score -= 20
    else if (cpm > 10) score -= 10
    
    // CTR scoring (higher is better)
    if (ctrAll < 0.5) score -= 30
    else if (ctrAll < 1) score -= 20
    else if (ctrAll < 2) score -= 10
    
    // Conversion rate scoring (higher is better)
    if (conversionRate < 1) score -= 30
    else if (conversionRate < 2) score -= 20
    else if (conversionRate < 5) score -= 10
    
    return Math.max(0, Math.min(100, score))
  }

  const generatePerformanceScoring = () => {
    const cpm = parseFloat(formData.cpm) || 0
    const ctrAll = parseFloat(formData.ctrAll) || 0
    const ctrLink = parseFloat(formData.ctrLink) || 0
    const conversionRate = formData.conversions && formData.clicks ? 
      (parseFloat(formData.conversions) / parseFloat(formData.clicks)) * 100 : 0

    const overallScore = calculateOverallScore(cpm, ctrAll, conversionRate)

    const getScoreGrade = (score: number) => {
      if (score >= 90) return { grade: 'A+', color: 'text-green-400', message: 'Excellent performance!' }
      if (score >= 80) return { grade: 'A', color: 'text-green-400', message: 'Very good performance' }
      if (score >= 70) return { grade: 'B', color: 'text-yellow-400', message: 'Good performance' }
      if (score >= 60) return { grade: 'C', color: 'text-yellow-400', message: 'Average performance' }
      if (score >= 50) return { grade: 'D', color: 'text-orange-400', message: 'Below average' }
      return { grade: 'F', color: 'text-red-400', message: 'Poor performance - needs attention' }
    }

    const grade = getScoreGrade(overallScore)

    return `📊 **Performance Score Analysis**

## 🎯 **Overall Performance Score**

### **Grade: ${grade.grade}** (${overallScore}/100)
<div style="background: linear-gradient(90deg, #10b981 0%, #10b981 ${overallScore}%, #374151 ${overallScore}%, #374151 100%); height: 20px; border-radius: 10px; margin: 10px 0;"></div>

**Status:** ${grade.message}

## 📈 **Individual Metric Scores**

### **Cost Efficiency (CPM)**
${cpm <= 10 ? '✅ **Excellent (25/25)** - Your CPM is very competitive' : 
  cpm <= 20 ? '⚠️ **Good (20/25)** - CPM is acceptable but could be better' : 
  '❌ **Poor (10/25)** - CPM is too high, needs immediate attention'}

### **Engagement (CTR All)**
${ctrAll >= 2 ? '✅ **Excellent (25/25)** - Great user engagement with your ads' : 
  ctrAll >= 1 ? '⚠️ **Good (20/25)** - Decent engagement with room for improvement' : 
  '❌ **Poor (10/25)** - Low engagement, needs creative optimization'}

### **Click Quality (CTR Link)**
${ctrLink >= 1.5 ? '✅ **Excellent (25/25)** - Users are clicking through effectively' : 
  ctrLink >= 0.8 ? '⚠️ **Good (20/25)** - Click-through rate is acceptable' : 
  '❌ **Poor (10/25)** - Low click-through rate, check CTA clarity'}

### **Conversion Rate**
${conversionRate >= 5 ? '✅ **Excellent (25/25)** - Excellent conversion performance' : 
  conversionRate >= 2 ? '⚠️ **Good (20/25)** - Good conversion rate with optimization potential' : 
  '❌ **Poor (10/25)** - Low conversion rate, landing page needs attention'}

## 🎯 **Performance Breakdown**

| Metric | Score | Weight | Weighted Score |
|--------|-------|--------|----------------|
| CPM Efficiency | ${cpm <= 10 ? 25 : cpm <= 20 ? 20 : 10} | 25% | ${cpm <= 10 ? 6.25 : cpm <= 20 ? 5 : 2.5} |
| CTR Performance | ${ctrAll >= 2 ? 25 : ctrAll >= 1 ? 20 : 10} | 25% | ${ctrAll >= 2 ? 6.25 : ctrAll >= 1 ? 5 : 2.5} |
| Click Quality | ${ctrLink >= 1.5 ? 25 : ctrLink >= 0.8 ? 20 : 10} | 25% | ${ctrLink >= 1.5 ? 6.25 : ctrLink >= 0.8 ? 5 : 2.5} |
| Conversion Rate | ${conversionRate >= 5 ? 25 : conversionRate >= 2 ? 20 : 10} | 25% | ${conversionRate >= 5 ? 6.25 : conversionRate >= 2 ? 5 : 2.5} |
| **Total** | | **100%** | **${overallScore}** |

## 🚀 **Improvement Recommendations**

### **High Priority (Score < 70)**
${overallScore < 70 ? 
  '• Immediate creative review and optimization\n• Landing page UX audit\n• Audience targeting refinement\n• Bid strategy adjustment' : 
  '• Continue current strategies\n• Monitor for performance changes\n• Plan for A/B testing'
}

### **Medium Priority**
• Implement A/B testing for underperforming elements
• Review competitor strategies
• Optimize ad frequency and timing
• Enhance landing page experience

### **Low Priority**
• Expand successful creatives to other campaigns
• Document and scale winning strategies
• Explore new audience segments

## 📊 **Next Steps**
1. **Week 1:** Implement high-priority recommendations
2. **Week 2:** Monitor changes and collect data
3. **Week 3:** Analyze results and adjust strategy
4. **Week 4:** Re-evaluate performance score

---
*Performance scoring based on industry benchmarks and best practices*`
  }

  const generateAnalysis = async () => {
    setIsGenerating(true)
    
    try {
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tool: 'metrics-analysis',
          formData,
          language: 'en',
          context: `Active tab: ${activeTab}, Tool: ${analysisTools.find(t => t.id === activeTab)?.title}`
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate analysis')
      }

      const result = await response.json()
      
      setGeneratedAnalysis(result.content)
      setMetrics(result.metrics || [])
      setRecommendations(result.recommendations || [])
      setScore(result.score || 85)
      
    } catch (error) {
      console.error('AI generation error:', error)
      // Fallback to original generation
      let analysis = ''
      
      switch (activeTab) {
        case 'metrics-dashboard':
          analysis = generateMetricsDashboard()
          break
        case 'ctr-diagnosis':
          analysis = generateCTRDiagnosis()
          break
        case 'performance-scoring':
          analysis = generatePerformanceScoring()
          break
        default:
          analysis = generateMetricsDashboard()
      }
      
      setGeneratedAnalysis(analysis)
    } finally {
      setIsGenerating(false)
    }
  }

  const resetForm = () => {
    setFormData({
      cpm: '',
      ctrAll: '',
      ctrLink: '',
      ctrUnique: '',
      outboundCtr: '',
      landingPageViews: '',
      adSpend: '',
      impressions: '',
      clicks: '',
      conversions: ''
    })
    setGeneratedAnalysis('')
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedAnalysis)
      alert('Copied to clipboard!')
    } catch (err) {
      console.error('Failed to copy: ', err)
      alert('Failed to copy, please try again.')
    }
  }

  const downloadAsText = () => {
    const blob = new Blob([generatedAnalysis], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${activeTab}-analysis.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <Navigation currentPath="/metrics-analysis-tool" />

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-32 pb-20 relative">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-center"
            >
              <motion.div 
                className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full mb-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <BarChart3 className="w-4 h-4" />
                <span className="text-sm font-medium">Advanced Metrics Analysis</span>
              </motion.div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Metrics Analysis Tool
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
                Don't judge your creative by CPP alone. Analyze all key metrics including CPM, CTR, 
                conversion rates, and more to make data-driven decisions.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button 
                  onClick={() => document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                >
                  Explore Tools
                </button>
                <button 
                  onClick={() => document.getElementById('analyzer')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 border border-white/20 text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300"
                >
                  Start Analysis
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Tools Section */}
        <section id="tools" className="py-20 bg-gradient-to-b from-black to-gray-900">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4">Advanced Analysis Tools</h2>
              <p className="text-xl text-gray-400">Choose the right tool for your analysis needs</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {analysisTools.map((tool, index) => (
                <motion.div
                  key={tool.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  onClick={() => setActiveTab(tool.id)}
                  className={`bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border cursor-pointer transition-all duration-300 hover:scale-105 ${
                    activeTab === tool.id 
                      ? 'border-blue-500/50 shadow-lg shadow-blue-500/20' 
                      : 'border-white/10 hover:border-blue-500/30'
                  }`}
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${tool.color} rounded-2xl flex items-center justify-center mb-6`}>
                    <tool.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">{tool.title}</h3>
                  <p className="text-gray-300 mb-4">{tool.description}</p>
                  <div className="flex items-center gap-2 text-blue-400">
                    <ArrowRight className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      {activeTab === tool.id ? 'Selected' : 'Select tool'}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Analyzer Section */}
        <section id="analyzer" className="py-20 bg-gradient-to-b from-gray-900 to-black">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4">Enter Your Metrics</h2>
              <p className="text-xl text-gray-400">Input your campaign data for comprehensive analysis</p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Input Form */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Card className="bg-white/5 backdrop-blur-md border-white/10 shadow-2xl">
                  <CardHeader className="pb-6">
                    <CardTitle className="text-2xl font-bold text-white flex items-center gap-3">
                      <BarChart3 className="w-8 h-8 text-blue-400" />
                      Campaign Metrics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          CPM ($)
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          value={formData.cpm}
                          onChange={(e) => handleInputChange('cpm', e.target.value)}
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="10.50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          CTR (All) (%)
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          value={formData.ctrAll}
                          onChange={(e) => handleInputChange('ctrAll', e.target.value)}
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="1.5"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          CTR (Link) (%)
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          value={formData.ctrLink}
                          onChange={(e) => handleInputChange('ctrLink', e.target.value)}
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="0.8"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          CTR (Unique) (%)
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          value={formData.ctrUnique}
                          onChange={(e) => handleInputChange('ctrUnique', e.target.value)}
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="0.5"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Outbound CTR (%)
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          value={formData.outboundCtr}
                          onChange={(e) => handleInputChange('outboundCtr', e.target.value)}
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="0.7"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Landing Page Views
                        </label>
                        <input
                          type="number"
                          value={formData.landingPageViews}
                          onChange={(e) => handleInputChange('landingPageViews', e.target.value)}
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="1000"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Ad Spend ($)
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          value={formData.adSpend}
                          onChange={(e) => handleInputChange('adSpend', e.target.value)}
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Impressions
                        </label>
                        <input
                          type="number"
                          value={formData.impressions}
                          onChange={(e) => handleInputChange('impressions', e.target.value)}
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="50000"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Clicks
                        </label>
                        <input
                          type="number"
                          value={formData.clicks}
                          onChange={(e) => handleInputChange('clicks', e.target.value)}
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="750"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Conversions
                        </label>
                        <input
                          type="number"
                          value={formData.conversions}
                          onChange={(e) => handleInputChange('conversions', e.target.value)}
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="25"
                        />
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button
                        onClick={generateAnalysis}
                        disabled={isGenerating}
                        className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
                      >
                        {isGenerating ? (
                          <>
                            <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                            Analyzing...
                          </>
                        ) : (
                          <>
                            <BarChart3 className="w-5 h-5 mr-2" />
                            Generate Analysis
                          </>
                        )}
                      </Button>
                      <Button
                        onClick={resetForm}
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10"
                      >
                        Reset
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Output */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <ToolOutput
                  title={analysisTools.find(t => t.id === activeTab)?.title || 'Metrics Analysis'}
                  content={generatedAnalysis}
                  metrics={metrics}
                  recommendations={recommendations}
                  score={score}
                  isLoading={isGenerating}
                  onCopy={copyToClipboard}
                  onDownload={downloadAsText}
                  language="en"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gradient-to-b from-black to-gray-900">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4">Why Use Metrics Analysis?</h2>
              <p className="text-xl text-gray-400">Go beyond CPP and make informed decisions</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 p-8 rounded-2xl border border-blue-500/20 backdrop-blur-sm"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Comprehensive Analysis</h3>
                <p className="text-gray-300">
                  Analyze all key metrics including CPM, CTR variations, conversion rates, and more to get a complete picture of your campaign performance.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-8 rounded-2xl border border-purple-500/20 backdrop-blur-sm"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6">
                  <AlertTriangle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Problem Diagnosis</h3>
                <p className="text-gray-300">
                  Identify specific issues with your campaigns through intelligent CTR diagnosis and get targeted solutions to fix performance problems.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 p-8 rounded-2xl border border-green-500/20 backdrop-blur-sm"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Performance Scoring</h3>
                <p className="text-gray-300">
                  Get an overall performance score with detailed breakdowns and actionable recommendations to improve your campaign effectiveness.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}