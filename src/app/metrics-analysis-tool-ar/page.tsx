'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import RTLWrapper from '@/components/RTLWrapper'
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

export default function MetricsAnalysisToolArabic() {
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
      title: 'لوحة المقاييس',
      description: 'تحليل شامل لجميع مؤشرات الأداء الرئيسية',
      icon: BarChart3,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'ctr-diagnosis',
      title: 'أداة تشخيص CTR',
      description: 'تحديد وإصلاح مشاكل CTR بحلول مستهدفة',
      icon: Target,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'performance-scoring',
      title: 'تسجيل الأداء',
      description: 'حساب درجة الأداء الإجمالية ومقاييس الصحة',
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
      if (value >= thresholds.good) return { status: 'ممتاز', color: 'text-green-400', icon: '✅' }
      if (value >= thresholds.average) return { status: 'جيد', color: 'text-yellow-400', icon: '⚠️' }
      return { status: 'يحتاج تحسين', color: 'text-red-400', icon: '❌' }
    }

    const cpmStatus = getPerformanceStatus(actualCpm, cpmThreshold)
    const ctrAllStatus = getPerformanceStatus(actualCtrAll, ctrAllThreshold)
    const ctrLinkStatus = getPerformanceStatus(actualCtrLink, ctrLinkThreshold)
    const conversionRateStatus = getPerformanceStatus(conversionRate, conversionRateThreshold)

    return `📊 **لوحة المقاييس الشاملة**

## 🎯 **مؤشرات الأداء الرئيسية**

### **مقاييس التكلفة**
| المقياس | القيمة | الحالة | المعيار |
|--------|-------|---------|-----------|
| **CPM (التكلفة لكل ألف)** | $${actualCpm.toFixed(2)} | ${cpmStatus.icon} ${cpmStatus.status} | <$10 |
| **الإنفاق الإعلاني** | $${adSpend.toFixed(2)} | 💰 الميزانية المستخدمة | 100% |
| **التكلفة لكل تحويل** | $${costPerConversion.toFixed(2)} | ${costPerConversion < 50 ? '✅ جيد' : '⚠️ مرتفع'} | <$50 |

### **مقاييس المشاركة**
| المقياس | القيمة | الحالة | المعيار |
|--------|-------|---------|-----------|
| **CTR (الكل)** | ${actualCtrAll.toFixed(2)}% | ${ctrAllStatus.icon} ${ctrAllStatus.status} | >2% |
| **CTR (الرابط)** | ${actualCtrLink.toFixed(2)}% | ${ctrLinkStatus.icon} ${ctrLinkStatus.status} | >1.5% |
| **CTR (فريد)** | ${ctrUnique.toFixed(2)}% | ${ctrUnique > 0.5 ? '✅ جيد' : '⚠️ منخفض'} | >0.5% |
| **CTR الصادر** | ${outboundCtr.toFixed(2)}% | ${outboundCtr > 0.8 ? '✅ جيد' : '⚠️ منخفض'} | >0.8% |

### **مقاييس التحويل**
| المقياس | القيمة | الحالة | المعيار |
|--------|-------|---------|-----------|
| **مشاهدات صفحة الهبوط** | ${landingPageViews} | 👁️ المشاهدات | غير متوفر |
| **نسبة LPV / CTR الصادر** | ${lpvToOutboundRatio.toFixed(2)}:1 | ${lpvToOutboundRatio > 0.7 ? '✅ جيد' : '⚠️ منخفض'} | >0.7:1 |
| **معدل التحويل** | ${conversionRate.toFixed(2)}% | ${conversionRateStatus.icon} ${conversionRateStatus.status} | >5% |

## 🔍 **تحليل الأداء**

### **تحليل CPM**
${cpmStatus.status === 'ممتاز' ? 
  '✅ **عمل رائع!** CPM الخاص بك ضمن النطاق المقبول تماماً. هذا يشير إلى استهداف فعال للجمهور ومناولة تنافسية.' :
  cpmStatus.status === 'جيد' ? 
  '⚠️ **مقبول ولكن يمكن تحسينه.** فكر في تحسين استهداف الجمهور أو تعديل استراتيجيات المزايدة لتحسين CPM.' :
  '❌ **تم اكتشاف CPM مرتفع!** هذا قد يشير إلى استهداف سيئ للجمهور أو منافسة عالية أو مزايدة غير فعالة. يوصى بإجراء فوري.'
}

### **تحليل CTR**
${ctrAllStatus.status === 'ممتاز' ? 
  '✅ **CTR استثنائي!** الإعلان الإبداعي والاستهداف يعملان معاً بشكل جيد. المستخدمون يتفاعلون مع محتواك.' :
  ctrAllStatus.status === 'جيد' ? 
  '⚠️ **CTR لائق مع مجال للتحسين.** فكر في اختبار A/B لإبداعات مختلفة أو تحسين استهداف الجمهور.' :
  '❌ **تم اكتشاف CTR منخفض!** هذه مشكلة حرجة تتطلب اهتماماً فورياً. راجع الإعلان الإبداعي والاستهداف والرسالة.'
}

### **تحليل التحويل**
${conversionRateStatus.status === 'ممتاز' ? 
  '✅ **معدل تحويل ممتاز!** صفحة الهبوط والعرض يحولان المستخدمين بفعالية.' :
  conversionRateStatus.status === 'جيد' ? 
  '⚠️ **معدل تحويل مقبول.** فكر في تحسين صفحة الهبوط أو تحسين العرض لزيادة التحويلات.' :
  '❌ **معدل تحويل منخفض!** هذا يشير إلى مشاكل في صفحة الهبوط أو العرض أو تجربة المستخدم. تحسين فوري مطلوب.'
}

## 📈 **التوصيات**

### **إجراءات فورية**
${cpmStatus.status === 'يحتاج تحسين' ? '• راجع وحسّن استهداف الجمهور\n• اضبط استراتيجيات المزايدة\n• فكر في مواضع إعلانية مختلفة\n' : ''}
${ctrAllStatus.status === 'يحتاج تحسين' ? '• اختبر A/B للإعلانات الإبداعية\n• حسّن نص الإعلان والعناصر المرئية\n• حسّن استهداف الجمهور\n' : ''}
${conversionRateStatus.status === 'يحتاج تحسين' ? '• حسّن تصميم صفحة الهبوط\n• حسّن وضوح دعوة العمل\n• قلل الاحتكاك في عملية التحويل\n' : ''}

### **استراتيجيات طويلة الأمد**
• طبق اختبار A/B المستمر
• راقب أداء المنافسين
• حدّث استهداف الجمهور بانتظام
• حسّن تجربة صفحة الهبوط

## 💡 **رؤى رئيسية**
• **إجمالي مرات الظهور:** ${impressions.toLocaleString()}
• **إجمالي النقرات:** ${clicks.toLocaleString()}
• **إجمالي التحويلات:** ${conversions.toLocaleString()}
• **درجة الأداء الإجمالية:** ${calculateOverallScore(actualCpm, actualCtrAll, conversionRate)}/100

---
*آخر تحديث: ${new Date().toLocaleDateString()}*
*التحليل يعتمد على معايير الصناعة وأفضل الممارسات*`
  }

  const generateCTRDiagnosis = () => {
    const ctrAll = parseFloat(formData.ctrAll) || 0
    const ctrLink = parseFloat(formData.ctrLink) || 0
    const ctrUnique = parseFloat(formData.ctrUnique) || 0

    let diagnosis = ''
    let solutions = []

    // Case 1: Low CTR (Link)
    if (ctrLink < 0.8) {
      diagnosis = '🚨 **الحالة 1 مكتشفة: CTR منخفض (الرابط)**\n\nمعدل النقر عبر الرابط الخاص بك أقل من العتبة الموصى بها 0.8%. هذا يشير إلى أن المستخدمين لا يشعرون بالرغبة في النقر على دعوتك للعمل.'
      solutions = [
        '🎯 **حسّن الخطاف (مرئي/فيديو):** اختبر عناصر مرئية أكثر جذباً للانتباه أو مصغرات فيديو في أول 3 ثوانٍ',
        '✍️ **حسّن نص الإعلان:** اجعل عرض القيمة أكثر وضوحاً وجاذبية',
        '🎨 **اختبر إبداعات مختلفة:** شغّل اختبارات A/B مع عناصر مرئية ورسائل مختلفة',
        '📍 **حسّن الاستهداف:** تأكد من أنك تستهدف الجمهور المناسب بمحتوى ذي صلة'
      ]
    }
    // Case 2: High CTR (All) but Low CTR (Link)
    else if (ctrAll > 1.5 && ctrLink < 0.8) {
      diagnosis = '⚖️ **الحالة 2 مكتشفة: CTR مرتفع (الكل) لكن CTR منخفض (الرابط)**\n\nالمستخدمون يتفاعلون مع إعلانك (إعجابات، تعليقات، مشاركات) لكنهم لا ينقرون. هذا يشير إلى أن CTA أو رسالتك تحتاج إلى توضيح.'
      solutions = [
        '🔗 **وضح CTA:** اجعل دعوتك للعمل أكثر بروزاً ووضوحاً',
        '💬 **حسّن الرسالة:** تأكد من أن نص الإعلان يوضح بوضوح ما سيحصل عليه المستخدمون بعد النقر',
        '🎯 **ضع توقعات واضحة:** كن شفافاً بشأن ما سيجده المستخدمون على صفحة الهبوط',
        '🔄 **اختبر تباينات CTA:** جرب ألوان وأماكن ونصوص مختلفة لزر CTA'
      ]
    }
    // Case 3: Low CTR (Unique)
    else if (ctrUnique < 0.5) {
      diagnosis = '👥 **الحالة 3 مكتشفة: CTR منخفض (فريد)**\n\nمعدل النقر الفريد المنخفض يشير إلى مشاكل في استهداف الجمهور أو عدم كفاءة إعادة الاستهداف.'
      solutions = [
        '🎯 **راجع حجم الجمهور:** قد يكون جمهورك المستهدف صغيراً جداً أو واسعاً جداً',
        '🔄 **اضبط إعادة الاستهداف:** عدّل استراتيجية إعادة الاستهداف لتجنب عرض الإعلانات على نفس المستخدمين بشكل متكرر جداً',
        '📊 **وسّع الجمهور:** فكر في جماهير مشابهة أو الاستهداف القائم على الاهتمامات',
        '⏰ **حسّن التكرار:** اضبط تكرار الإعلانات لتجنب إرهاق الجمهور'
      ]
    }
    else {
      diagnosis = '✅ **لم يتم اكتشاف مشاكل CTR حرجة**\n\nيبدو أن مقاييس CTR الخاصة بك ضمن النطاقات المقبولة. استمر في المراقبة وفكر في تحسينات تدريجية.'
      solutions = [
        '📈 **استمر في المراقبة:** استمر في تتبع مقاييس CTR بانتظام',
        '🧪 **شغّل اختبارات A/B:** اختبر تباينات صغيرة للعثور على تحسينات تدريجية',
        '🎯 **حسّن الإبداعات:** استمر في تحسين الإعلانات الإبداعية للحصول على أداء أفضل',
        '📊 **حلل المنافسين:** ابق عيناً على استراتيجيات وأداء المنافسين'
      ]
    }

    return `${diagnosis}

## 🛠️ **الحلول الموصى بها**

${solutions.map((solution, index) => `${index + 1}. ${solution}`).join('\n')}

## 📊 **المقاييس الحالية**
- **CTR (الكل):** ${ctrAll.toFixed(2)}%
- **CTR (الرابط):** ${ctrLink.toFixed(2)}%
- **CTR (فريد):** ${ctrUnique.toFixed(2)}%

## 🎯 **الخطوات التالية**
1. طبق الحلول الموصى بها أعلاه
2. راقب التغييرات في مقاييس CTR خلال 7-14 يوماً القادمة
3. وثق ما يعمل وما لا يعمل
4. وسّع الاستراتيجيات الناجحة عبر الحملات الأخرى

---
*تشخيص CTR يعتمد على معايير الصناعة وأفضل الممارسات*`
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
      if (score >= 90) return { grade: 'A+', color: 'text-green-400', message: 'أداء ممتاز!' }
      if (score >= 80) return { grade: 'A', color: 'text-green-400', message: 'أداء جيد جداً' }
      if (score >= 70) return { grade: 'B', color: 'text-yellow-400', message: 'أداء جيد' }
      if (score >= 60) return { grade: 'C', color: 'text-yellow-400', message: 'أداء متوسط' }
      if (score >= 50) return { grade: 'D', color: 'text-orange-400', message: 'أقل من المتوسط' }
      return { grade: 'F', color: 'text-red-400', message: 'أداء ضعيف - يحتاج اهتماماً' }
    }

    const grade = getScoreGrade(overallScore)

    return `📊 **تحليل درجة الأداء**

## 🎯 **درجة الأداء الإجمالية**

### **التقدير: ${grade.grade}** (${overallScore}/100)
<div style="background: linear-gradient(90deg, #10b981 0%, #10b981 ${overallScore}%, #374151 ${overallScore}%, #374151 100%); height: 20px; border-radius: 10px; margin: 10px 0;"></div>

**الحالة:** ${grade.message}

## 📈 **درجات المقاييس الفردية**

### **كفاءة التكلفة (CPM)**
${cpm <= 10 ? '✅ **ممتاز (25/25)** - CPM الخاص بك تنافسي جداً' : 
  cpm <= 20 ? '⚠️ **جيد (20/25)** - CPM مقبول ولكن يمكن تحسينه' : 
  '❌ **ضعيف (10/25)** - CPM مرتفع جداً، يحتاج اهتماماً فورياً'}

### **المشاركة (CTR الكل)**
${ctrAll >= 2 ? '✅ **ممتاز (25/25)** - مشاركة مستخدمين رائعة مع إعلاناتك' : 
  ctrAll >= 1 ? '⚠️ **جيد (20/25)** - مشاركة لائقة مع مجال للتحسين' : 
  '❌ **ضعيف (10/25)** - مشاركة منخفضة، يحتاج تحسين إبداعي'}

### **جودة النقرات (CTR الرابط)**
${ctrLink >= 1.5 ? '✅ **ممتاز (25/25)** - المستخدمين ينقرون بفعالية' : 
  ctrLink >= 0.8 ? '⚠️ **جيد (20/25)** - معدل النقر مقبول' : 
  '❌ **ضعيف (10/25)** - معدل نقر منخفض، تحقق من وضوح CTA'}

### **معدل التحويل**
${conversionRate >= 5 ? '✅ **ممتاز (25/25)** - أداء تحويل ممتاز' : 
  conversionRate >= 2 ? '⚠️ **جيد (20/25)** - معدل تحويل جيد مع إمكانية التحسين' : 
  '❌ **ضعيف (10/25)** - معدل تحويل منخفض، صفحة الهبوط تحتاج اهتماماً'}

## 🎯 **تفصيل الأداء**

| المقياس | الدرجة | الوزن | الدرجة المرجحة |
|--------|-------|--------|----------------|
| كفاءة CPM | ${cpm <= 10 ? 25 : cpm <= 20 ? 20 : 10} | 25% | ${cpm <= 10 ? 6.25 : cpm <= 20 ? 5 : 2.5} |
| أداء CTR | ${ctrAll >= 2 ? 25 : ctrAll >= 1 ? 20 : 10} | 25% | ${ctrAll >= 2 ? 6.25 : ctrAll >= 1 ? 5 : 2.5} |
| جودة النقرات | ${ctrLink >= 1.5 ? 25 : ctrLink >= 0.8 ? 20 : 10} | 25% | ${ctrLink >= 1.5 ? 6.25 : ctrLink >= 0.8 ? 5 : 2.5} |
| معدل التحويل | ${conversionRate >= 5 ? 25 : conversionRate >= 2 ? 20 : 10} | 25% | ${conversionRate >= 5 ? 6.25 : conversionRate >= 2 ? 5 : 2.5} |
| **الإجمالي** | | **100%** | **${overallScore}** |

## 🚀 **توصيات التحسين**

### **الأولوية العالية (الدرجة < 70)**
${overallScore < 70 ? 
  '• مراجعة وتحسين الإبداع فوري\n• تدقيق تجربة المستخدم لصفحة الهبوط\n• تحسين استهداف الجمهور\n• تعديل استراتيجية المزايدة' : 
  '• استمر في الاستراتيجيات الحالية\n• راقب التغييرات في الأداء\n• خطط لاختبار A/B'
}

### **الأولوية المتوسطة**
• طبق اختبار A/B للعناصر ذات الأداء الضعيف
• راقب استراتيجيات المنافسين
• حسّن ترددات الإعلان
• حسّن جودة الجمهور المستهدف

### **أهداف طويلة الأمد**
• طور استراتيجية محتوى شاملة
• وسّع قنوات التسويق
• استثمر في أدوات التحليل المتقدمة
• بناء علامة تجارية قوية

---
*تسجيل الأداء يعتمد على معايير الصناعة وأفضل الممارسات*`
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleGenerate = async () => {
    setIsGenerating(true)
    
    // Simulate API call
    setTimeout(() => {
      let analysis = ''
      let newMetrics = []
      let newRecommendations = []
      let newScore = undefined

      switch (activeTab) {
        case 'metrics-dashboard':
          analysis = generateMetricsDashboard()
          newMetrics = [
            { name: 'CPM', value: formData.cpm || '0', status: 'good' },
            { name: 'CTR الكل', value: formData.ctrAll || '0', status: 'excellent' },
            { name: 'CTR الرابط', value: formData.ctrLink || '0', status: 'good' },
            { name: 'معدل التحويل', value: formData.conversions && formData.clicks ? 
              ((parseFloat(formData.conversions) / parseFloat(formData.clicks)) * 100).toFixed(2) : '0', status: 'average' }
          ]
          newScore = calculateOverallScore(
            parseFloat(formData.cpm) || 0,
            parseFloat(formData.ctrAll) || 0,
            formData.conversions && formData.clicks ? 
            (parseFloat(formData.conversions) / parseFloat(formData.clicks)) * 100 : 0
          )
          break
        case 'ctr-diagnosis':
          analysis = generateCTRDiagnosis()
          newMetrics = [
            { name: 'CTR الكل', value: formData.ctrAll || '0', status: 'warning' },
            { name: 'CTR الرابط', value: formData.ctrLink || '0', status: 'critical' },
            { name: 'CTR فريد', value: formData.ctrUnique || '0', status: 'good' }
          ]
          break
        case 'performance-scoring':
          analysis = generatePerformanceScoring()
          newScore = calculateOverallScore(
            parseFloat(formData.cpm) || 0,
            parseFloat(formData.ctrAll) || 0,
            formData.conversions && formData.clicks ? 
            (parseFloat(formData.conversions) / parseFloat(formData.clicks)) * 100 : 0
          )
          break
      }

      newRecommendations = [
        'حسّن جودة الإعلانات الإبداعية',
        'اختبر استهداف جمهور مختلف',
        'حسّن صفحات الهبوط',
        'راقب أداء المنافسين'
      ]

      setGeneratedAnalysis(analysis)
      setMetrics(newMetrics)
      setRecommendations(newRecommendations)
      setScore(newScore)
      setIsGenerating(false)
    }, 2000)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedAnalysis)
  }

  const downloadAnalysis = () => {
    const blob = new Blob([generatedAnalysis], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `analysis-${activeTab}-${Date.now()}.md`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-400'
      case 'good': return 'text-blue-400'
      case 'average': return 'text-yellow-400'
      case 'warning': return 'text-orange-400'
      case 'critical': return 'text-red-400'
      default: return 'text-gray-400'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent': return <CheckCircle className="w-4 h-4" />
      case 'good': return <CheckCircle className="w-4 h-4" />
      case 'average': return <AlertTriangle className="w-4 h-4" />
      case 'warning': return <AlertTriangle className="w-4 h-4" />
      case 'critical': return <XCircle className="w-4 h-4" />
      default: return <Activity className="w-4 h-4" />
    }
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

  return (
    <RTLWrapper className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <Navigation currentPath="/metrics-analysis-tool-ar" />

      <div className="relative z-40 container mx-auto px-6 pt-24 pb-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-300 px-6 py-3 rounded-full mb-6 backdrop-blur-sm border border-blue-500/30">
            <BarChart3 className="w-5 h-5" />
            <span className="text-sm font-medium">أداة تحليل المقاييس</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
            أداة تحليل المقاييس التسويقية
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            حلل شامل لمقاييس الأداء التسويقي، وتحديد المشاكل، وتوليد توصيات قابلة للتنفيذ لتحسين الحملات.
          </p>
        </motion.div>

        {/* Tool Selection */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {analysisTools.map((tool) => {
              const Icon = tool.icon
              return (
                <button
                  key={tool.id}
                  onClick={() => setActiveTab(tool.id)}
                  className={`p-6 rounded-xl border transition-all duration-300 text-right ${
                    activeTab === tool.id
                      ? `bg-gradient-to-br ${tool.color} border-white/20 shadow-lg`
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-4 flex-row-reverse">
                    <div className={`w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center ${
                      activeTab === tool.id ? 'text-white' : 'text-gray-400'
                    }`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-1">{tool.title}</h3>
                      <p className="text-sm opacity-80">{tool.description}</p>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Input Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-1"
          >
            <Card className="bg-white/5 backdrop-blur-md border-white/10 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-400" />
                  أدخل المقاييس
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-blue-400" />
                    CPM (التكلفة لكل ألف)
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 text-white placeholder-gray-400"
                    value={formData.cpm}
                    onChange={(e) => handleInputChange('cpm', e.target.value)}
                    placeholder="15.50"
                    step="0.01"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                    <Percent className="w-4 h-4 text-blue-400" />
                    CTR (الكل) %
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 text-white placeholder-gray-400"
                    value={formData.ctrAll}
                    onChange={(e) => handleInputChange('ctrAll', e.target.value)}
                    placeholder="1.25"
                    step="0.01"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                    <MousePointer className="w-4 h-4 text-blue-400" />
                    CTR (الرابط) %
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 text-white placeholder-gray-400"
                    value={formData.ctrLink}
                    onChange={(e) => handleInputChange('ctrLink', e.target.value)}
                    placeholder="0.85"
                    step="0.01"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                    <Users className="w-4 h-4 text-blue-400" />
                    CTR (فريد) %
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 text-white placeholder-gray-400"
                    value={formData.ctrUnique}
                    onChange={(e) => handleInputChange('ctrUnique', e.target.value)}
                    placeholder="0.45"
                    step="0.01"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                    <Eye className="w-4 h-4 text-blue-400" />
                    مشاهدات صفحة الهبوط
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 text-white placeholder-gray-400"
                    value={formData.landingPageViews}
                    onChange={(e) => handleInputChange('landingPageViews', e.target.value)}
                    placeholder="2500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-blue-400" />
                    الإنفاق الإعلاني
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 text-white placeholder-gray-400"
                    value={formData.adSpend}
                    onChange={(e) => handleInputChange('adSpend', e.target.value)}
                    placeholder="5000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-blue-400" />
                    مرات الظهور
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 text-white placeholder-gray-400"
                    value={formData.impressions}
                    onChange={(e) => handleInputChange('impressions', e.target.value)}
                    placeholder="500000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                    <MousePointer className="w-4 h-4 text-blue-400" />
                    النقرات
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 text-white placeholder-gray-400"
                    value={formData.clicks}
                    onChange={(e) => handleInputChange('clicks', e.target.value)}
                    placeholder="6250"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-blue-400" />
                    التحويلات
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 text-white placeholder-gray-400"
                    value={formData.conversions}
                    onChange={(e) => handleInputChange('conversions', e.target.value)}
                    placeholder="125"
                  />
                </div>

                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 disabled:opacity-50"
                >
                  {isGenerating ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>جاري التحليل...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <Zap className="w-4 h-4" />
                      <span>حلل المقاييس</span>
                    </div>
                  )}
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Metrics Overview */}
            {metrics.length > 0 && (
              <Card className="bg-white/5 backdrop-blur-md border-white/10">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-blue-400" />
                    نظرة عامة على المقاييس
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {metrics.map((metric, index) => (
                      <div key={index} className="bg-white/5 rounded-lg p-4 border border-white/10">
                        <div className="text-sm text-gray-400 mb-1">{metric.name}</div>
                        <div className={`text-xl font-bold ${getStatusColor(metric.status)}`}>
                          {metric.value}{metric.name.includes('CTR') ? '%' : metric.name.includes('CPM') ? '' : ''}
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          {getStatusIcon(metric.status)}
                          <span className={`text-xs ${getStatusColor(metric.status)}`}>
                            {metric.status === 'excellent' ? 'ممتاز' :
                             metric.status === 'good' ? 'جيد' :
                             metric.status === 'average' ? 'متوسط' :
                             metric.status === 'warning' ? 'تحذير' :
                             metric.status === 'critical' ? 'حرج' : 'غير معروف'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Score Display */}
            {score !== undefined && (
              <Card className="bg-white/5 backdrop-blur-md border-white/10">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
                    <Gauge className="w-5 h-5 text-blue-400" />
                    درجة الأداء الإجمالية
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className={`text-6xl font-bold ${getScoreColor(score)} mb-2`}>
                      {score}/100
                    </div>
                    <div className={`text-lg font-semibold ${getScoreColor(score)} mb-4`}>
                      {getScoreLabel(score)}
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-4 mb-4">
                      <div 
                        className={`h-4 rounded-full transition-all duration-1000 ${
                          score >= 80 ? 'bg-green-500' :
                          score >= 60 ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`}
                        style={{ width: `${score}%` }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Analysis Results */}
            {generatedAnalysis && (
              <Card className="bg-white/5 backdrop-blur-md border-white/10">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
                      <Activity className="w-5 h-5 text-blue-400" />
                      نتائج التحليل
                    </CardTitle>
                    <div className="flex gap-2">
                      <Button
                        onClick={copyToClipboard}
                        variant="outline"
                        size="sm"
                        className="border-white/20 text-white hover:bg-white/10"
                      >
                        <Copy className="w-4 h-4 ml-1" />
                        نسخ
                      </Button>
                      <Button
                        onClick={downloadAnalysis}
                        variant="outline"
                        size="sm"
                        className="border-white/20 text-white hover:bg-white/10"
                      >
                        <Download className="w-4 h-4 ml-1" />
                        تحميل
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700 max-h-96 overflow-y-auto">
                    <pre className="whitespace-pre-wrap text-sm text-gray-300 font-mono leading-relaxed">
                      {generatedAnalysis}
                    </pre>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Recommendations */}
            {recommendations.length > 0 && (
              <Card className="bg-white/5 backdrop-blur-md border-white/10">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-400" />
                    التوصيات
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {recommendations.map((recommendation, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-300">{recommendation}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </div>
      </div>
    </RTLWrapper>
  )
}