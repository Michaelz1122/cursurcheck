'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Target, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Activity,
  Funnel,
  BarChart3,
  PieChart,
  Filter,
  Download,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Settings,
  Eye,
  Edit,
  Trash2,
  Play,
  Pause,
  CheckCircle,
  AlertCircle,
  Clock,
  Zap,
  MousePointer,
  ShoppingCart,
  CreditCard,
  UserCheck,
  MessageSquare,
  Mail,
  Bell,
  Calendar,
  Percent,
  Star,
  Award,
  Trophy
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const ConversionOptimization = () => {
  const [timeRange, setTimeRange] = useState('30d')
  const [activeTab, setActiveTab] = useState('overview')

  const conversionMetrics = [
    {
      title: 'Overall Conversion Rate',
      value: '3.2%',
      change: '+0.8%',
      trend: 'up',
      icon: Target,
      description: 'Visitor to customer'
    },
    {
      title: 'Free to Paid Rate',
      value: '12.5%',
      change: '+2.1%',
      trend: 'up',
      icon: TrendingUp,
      description: 'Free plan conversion'
    },
    {
      title: 'Trial Conversion',
      value: '28.4%',
      change: '+4.2%',
      trend: 'up',
      icon: UserCheck,
      description: 'Trial to paid'
    },
    {
      title: 'Cart Abandonment',
      value: '68.2%',
      change: '-3.1%',
      trend: 'down',
      icon: ShoppingCart,
      description: 'Shopping cart rate'
    },
    {
      title: 'Lead Quality Score',
      value: '7.8/10',
      change: '+0.6',
      trend: 'up',
      icon: Star,
      description: 'Average lead score'
    },
    {
      title: 'Customer Acquisition Cost',
      value: '$45',
      change: '-$8',
      trend: 'down',
      icon: DollarSign,
      description: 'Per new customer'
    }
  ]

  const conversionFunnel = [
    {
      stage: 'Visitors',
      count: 15420,
      conversion: 100,
      dropoff: 0,
      rate: 0,
      color: 'bg-blue-500'
    },
    {
      stage: 'Sign-ups',
      count: 3420,
      conversion: 22.2,
      dropoff: 12000,
      rate: 77.8,
      color: 'bg-purple-500'
    },
    {
      stage: 'Activated Users',
      count: 2156,
      conversion: 63.0,
      dropoff: 1264,
      rate: 37.0,
      color: 'bg-green-500'
    },
    {
      stage: 'Trial Users',
      count: 456,
      conversion: 21.1,
      dropoff: 1700,
      rate: 78.9,
      color: 'bg-yellow-500'
    },
    {
      stage: 'Paid Customers',
      count: 284,
      conversion: 62.3,
      dropoff: 172,
      rate: 37.7,
      color: 'bg-orange-500'
    }
  ]

  const aBTests = [
    {
      id: 1,
      name: 'Homepage CTA Button',
      status: 'running',
      variantA: 'Get Started',
      variantB: 'Start Free Trial',
      traffic: 50,
      duration: '14 days',
      conversionsA: 245,
      conversionsB: 289,
      improvement: '+18.0%',
      confidence: 95,
      winner: 'B'
    },
    {
      id: 2,
      name: 'Pricing Page Layout',
      status: 'completed',
      variantA: '3 Column Layout',
      variantB: '2 Column Layout',
      traffic: 50,
      duration: '21 days',
      conversionsA: 156,
      conversionsB: 142,
      improvement: '-9.0%',
      confidence: 88,
      winner: 'A'
    },
    {
      id: 3,
      name: 'Email Subject Line',
      status: 'draft',
      variantA: 'Special Offer Inside',
      variantB: 'Limited Time Discount',
      traffic: 0,
      duration: 'Not started',
      conversionsA: 0,
      conversionsB: 0,
      improvement: 0,
      confidence: 0,
      winner: null
    }
  ]

  const automatedCampaigns = [
    {
      id: 1,
      name: 'Welcome Series',
      type: 'email',
      status: 'active',
      trigger: 'New sign-up',
      sent: 3420,
      opened: 2856,
      clicked: 892,
      converted: 156,
      revenue: 4680
    },
    {
      id: 2,
      name: 'Trial Expiration',
      type: 'email',
      status: 'active',
      trigger: 'Trial day 5',
      sent: 456,
      opened: 389,
      clicked: 156,
      converted: 89,
      revenue: 2670
    },
    {
      id: 3,
      name: 'Win-back Campaign',
      type: 'email',
      status: 'paused',
      trigger: '30 days inactive',
      sent: 234,
      opened: 156,
      clicked: 45,
      converted: 12,
      revenue: 360
    },
    {
      id: 4,
      name: 'Upgrade Nudges',
      type: 'in-app',
      status: 'active',
      trigger: 'Usage threshold',
      sent: 892,
      opened: 789,
      clicked: 234,
      converted: 67,
      revenue: 2010
    }
  ]

  const userSegments = [
    {
      name: 'High Intent Users',
      count: 456,
      conversion: 28.4,
      characteristics: ['Multiple page views', 'Added to cart', 'Returned visitors'],
      strategy: 'Personalized offers',
      color: 'bg-purple-500'
    },
    {
      name: 'Price Sensitive',
      count: 892,
      conversion: 8.2,
      characteristics: ['Free plan users', 'Price comparison', 'Discount seekers'],
      strategy: 'Discount campaigns',
      color: 'bg-blue-500'
    },
    {
      name: 'Feature Explorers',
      count: 1247,
      conversion: 15.6,
      characteristics: ['Tool usage', 'Documentation views', 'Support interactions'],
      strategy: 'Feature highlights',
      color: 'bg-green-500'
    },
    {
      name: 'Cart Abandoners',
      count: 634,
      conversion: 3.1,
      characteristics: ['Started checkout', 'Left without purchase', 'Return visits'],
      strategy: 'Retargeting ads',
      color: 'bg-orange-500'
    }
  ]

  const optimizationInsights = [
    {
      type: 'opportunity',
      title: 'High Cart Abandonment Rate',
      description: '68.2% cart abandonment rate is 15% above industry average',
      impact: 'High',
      effort: 'Medium',
      potential: '+$12,500 monthly',
      recommendations: ['Simplify checkout process', 'Add guest checkout', 'Send abandonment emails']
    },
    {
      type: 'success',
      title: 'Email Campaign Performance',
      description: 'Welcome series achieving 23.6% conversion rate',
      impact: 'Medium',
      effort: 'Low',
      potential: 'Maintain current performance',
      recommendations: ['Continue optimization', 'A/B test subject lines', 'Segment audience further']
    },
    {
      type: 'warning',
      title: 'Mobile Conversion Drop',
      description: 'Mobile conversion rate 40% lower than desktop',
      impact: 'High',
      effort: 'High',
      potential: '+$8,200 monthly',
      recommendations: ['Improve mobile UX', 'Optimize page speed', 'Mobile-specific offers']
    }
  ]

  const renderFunnelChart = () => (
    <div className="space-y-3">
      {conversionFunnel.map((stage, index) => (
        <div key={index} className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-4 h-4 rounded ${stage.color}`}></div>
              <span className="font-medium text-gray-900">{stage.stage}</span>
            </div>
            <div className="text-right">
              <span className="font-bold">{stage.count.toLocaleString()}</span>
              <span className="text-sm text-gray-600 ml-2">({stage.conversion}%)</span>
            </div>
          </div>
          <div className="relative">
            <div className="w-full bg-gray-200 rounded-full h-8">
              <div 
                className={`${stage.color} h-8 rounded-full transition-all duration-500`}
                style={{ width: `${stage.conversion}%` }}
              ></div>
            </div>
            {index < conversionFunnel.length - 1 && (
              <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                <div className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs font-medium">
                  -{stage.dropoff.toLocaleString()} ({stage.rate}%)
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Conversion Optimization</h1>
          <p className="text-gray-600 mt-1">Tools and insights to improve conversion rates and revenue</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <Button variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Campaign
          </Button>
        </div>
      </div>

      {/* Conversion Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {conversionMetrics.map((metric, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <metric.icon className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className={`flex items-center gap-1 text-sm font-medium ${
                    metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {metric.trend === 'up' ? (
                      <ArrowUpRight className="w-4 h-4" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4" />
                    )}
                    {metric.change}
                  </div>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                  <p className="text-gray-600 text-sm">{metric.title}</p>
                  <p className="text-xs text-gray-500 mt-1">{metric.description}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Conversion Funnel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Funnel className="w-5 h-5" />
            Conversion Funnel Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          {renderFunnelChart()}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-lg font-bold text-blue-600">22.2%</p>
              <p className="text-sm text-gray-600">Sign-up Rate</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <p className="text-lg font-bold text-purple-600">63.0%</p>
              <p className="text-sm text-gray-600">Activation Rate</p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <p className="text-lg font-bold text-yellow-600">21.1%</p>
              <p className="text-sm text-gray-600">Trial Rate</p>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg">
              <p className="text-lg font-bold text-orange-600">62.3%</p>
              <p className="text-sm text-gray-600">Conversion Rate</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* A/B Testing */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              A/B Testing
            </CardTitle>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Test
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {aBTests.map((test) => (
              <div key={test.id} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-gray-900">{test.name}</h4>
                    <p className="text-sm text-gray-600">
                      {test.variantA} vs {test.variantB} • {test.duration}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={
                      test.status === 'running' ? 'bg-green-500' :
                      test.status === 'completed' ? 'bg-blue-500' : 'bg-gray-500'
                    }>
                      {test.status}
                    </Badge>
                    {test.winner && (
                      <Badge className="bg-purple-500">
                        Winner: {test.winner}
                      </Badge>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Traffic Split</p>
                    <p className="font-medium">{test.traffic}% / {100 - test.traffic}%</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Conversions A/B</p>
                    <p className="font-medium">{test.conversionsA} / {test.conversionsB}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Improvement</p>
                    <p className={`font-medium ${test.improvement > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {test.improvement > 0 ? '+' : ''}{test.improvement}%
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Confidence</p>
                    <p className="font-medium">{test.confidence}%</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-3">
                  {test.status === 'running' ? (
                    <Button variant="outline" size="sm">
                      <Pause className="w-4 h-4 mr-2" />
                      Pause
                    </Button>
                  ) : test.status === 'draft' ? (
                    <Button size="sm">
                      <Play className="w-4 h-4 mr-2" />
                      Start Test
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      View Results
                    </Button>
                  )}
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Automated Campaigns */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Automated Campaigns
            </CardTitle>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Campaign
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Campaign</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Type</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Trigger</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900">Sent</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900">Opened</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900">Clicked</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900">Converted</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900">Revenue</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {automatedCampaigns.map((campaign) => (
                  <tr key={campaign.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <p className="font-medium text-gray-900">{campaign.name}</p>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="outline">{campaign.type}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-gray-600">{campaign.trigger}</span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="font-medium">{campaign.sent.toLocaleString()}</span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="font-medium">{campaign.opened.toLocaleString()}</span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="font-medium">{campaign.clicked.toLocaleString()}</span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="font-medium text-green-600">{campaign.converted}</span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="font-medium">${campaign.revenue.toLocaleString()}</span>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={
                        campaign.status === 'active' ? 'bg-green-500' :
                        campaign.status === 'paused' ? 'bg-yellow-500' : 'bg-gray-500'
                      }>
                        {campaign.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm">
                          {campaign.status === 'active' ? (
                            <Pause className="w-4 h-4" />
                          ) : (
                            <Play className="w-4 h-4" />
                          )}
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* User Segments & Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              User Segments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {userSegments.map((segment, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${segment.color}`} />
                      <span className="font-medium text-gray-900">{segment.name}</span>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{segment.conversion}%</p>
                      <p className="text-xs text-gray-600">{segment.count} users</p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div 
                      className={`${segment.color} h-2 rounded-full`} 
                      style={{ width: `${segment.conversion}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-600 mb-2">
                    Strategy: {segment.strategy}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {segment.characteristics.slice(0, 2).map((char, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {char}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5" />
              Optimization Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {optimizationInsights.map((insight, index) => (
                <div key={index} className={`p-4 rounded-lg border-l-4 ${
                  insight.type === 'opportunity' ? 'border-orange-500 bg-orange-50' :
                  insight.type === 'success' ? 'border-green-500 bg-green-50' :
                  'border-yellow-500 bg-yellow-50'
                }`}>
                  <div className="flex items-start gap-3">
                    {insight.type === 'opportunity' ? (
                      <Target className="w-5 h-5 text-orange-600 mt-0.5" />
                    ) : insight.type === 'success' ? (
                      <Award className="w-5 h-5 text-green-600 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 mb-1">{insight.title}</h4>
                      <p className="text-sm text-gray-600 mb-3">{insight.description}</p>
                      
                      <div className="grid grid-cols-3 gap-3 mb-3 text-xs">
                        <div>
                          <p className="text-gray-500">Impact</p>
                          <p className="font-medium">{insight.impact}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Effort</p>
                          <p className="font-medium">{insight.effort}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Potential</p>
                          <p className="font-medium text-green-600">{insight.potential}</p>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-xs font-medium text-gray-700 mb-1">Recommendations:</p>
                        <ul className="text-xs text-gray-600 space-y-1">
                          {insight.recommendations.map((rec, idx) => (
                            <li key={idx} className="flex items-start gap-1">
                              <span className="text-purple-500">•</span>
                              {rec}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ConversionOptimization