'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Target, 
  Activity,
  Calendar,
  Filter,
  Download,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Star,
  Zap,
  Eye,
  MousePointer,
  ShoppingCart,
  CreditCard,
  UserCheck,
  AlertTriangle,
  CheckCircle,
  Plus,
  Settings
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const BusinessAnalytics = () => {
  const [timeRange, setTimeRange] = useState('30d')
  const [activeTab, setActiveTab] = useState('overview')

  const analyticsMetrics = [
    {
      title: 'Monthly Recurring Revenue',
      value: '$45,231',
      change: '+15.3%',
      trend: 'up',
      icon: DollarSign,
      description: 'Last 30 days'
    },
    {
      title: 'Active Users',
      value: '2,847',
      change: '+8.2%',
      trend: 'up',
      icon: Users,
      description: 'Current period'
    },
    {
      title: 'Conversion Rate',
      value: '3.2%',
      change: '+0.8%',
      trend: 'up',
      icon: Target,
      description: 'Free to paid'
    },
    {
      title: 'Customer Lifetime Value',
      value: '$485',
      change: '+12.1%',
      trend: 'up',
      icon: Star,
      description: 'Average CLV'
    },
    {
      title: 'Churn Rate',
      value: '2.1%',
      change: '-0.3%',
      trend: 'down',
      icon: AlertTriangle,
      description: 'Monthly churn'
    },
    {
      title: 'Average Revenue Per User',
      value: '$15.89',
      change: '+5.7%',
      trend: 'up',
      icon: CreditCard,
      description: 'ARPU'
    }
  ]

  const revenueData = [
    { month: 'Jan', revenue: 35000, target: 40000 },
    { month: 'Feb', revenue: 38000, target: 42000 },
    { month: 'Mar', revenue: 42000, target: 45000 },
    { month: 'Apr', revenue: 45000, target: 48000 },
    { month: 'May', revenue: 48000, target: 50000 },
    { month: 'Jun', revenue: 45231, target: 52000 }
  ]

  const userGrowthData = [
    { month: 'Jan', free: 1200, paid: 180, total: 1380 },
    { month: 'Feb', free: 1350, paid: 210, total: 1560 },
    { month: 'Mar', free: 1480, paid: 250, total: 1730 },
    { month: 'Apr', free: 1620, paid: 290, total: 1910 },
    { month: 'May', free: 1750, paid: 340, total: 2090 },
    { month: 'Jun', free: 1847, paid: 400, total: 2247 }
  ]

  const toolUsageData = [
    { tool: 'Keyword Research', usage: 22100, users: 1203, revenue: 2450 },
    { tool: 'Ad Copy Generator', usage: 15420, users: 892, revenue: 1890 },
    { tool: 'Campaign Analyzer', usage: 12450, users: 756, revenue: 1650 },
    { tool: 'Social Media Scheduler', usage: 8900, users: 634, revenue: 1200 },
    { tool: 'Image Editor', usage: 5600, users: 445, revenue: 890 }
  ]

  const conversionFunnel = [
    { stage: 'Visitors', count: 15420, conversion: 100 },
    { stage: 'Signups', count: 3420, conversion: 22.2 },
    { stage: 'Active Users', count: 2156, conversion: 63.0 },
    { stage: 'Paid Trials', count: 456, conversion: 21.1 },
    { stage: 'Paid Customers', count: 284, conversion: 62.3 }
  ]

  const geographicData = [
    { country: 'Egypt', users: 1847, revenue: 28450, percentage: 65 },
    { country: 'Saudi Arabia', users: 456, revenue: 8900, percentage: 16 },
    { country: 'UAE', users: 234, revenue: 4560, percentage: 8 },
    { country: 'Kuwait', users: 156, revenue: 2340, percentage: 4 },
    { country: 'Others', users: 154, revenue: 1981, percentage: 7 }
  ]

  const customerSegments = [
    {
      name: 'Power Users',
      count: 342,
      revenue: 28450,
      percentage: 12,
      characteristics: ['Enterprise plan', 'High engagement', 'Multiple tools'],
      color: 'bg-purple-500'
    },
    {
      name: 'Regular Users',
      count: 892,
      revenue: 13450,
      percentage: 31,
      characteristics: ['Pro plan', 'Moderate usage', 'Good retention'],
      color: 'bg-blue-500'
    },
    {
      name: 'Casual Users',
      count: 1247,
      revenue: 3450,
      percentage: 44,
      characteristics: ['Free plan', 'Low engagement', 'High churn risk'],
      color: 'bg-green-500'
    },
    {
      name: 'Inactive Users',
      count: 366,
      revenue: 0,
      percentage: 13,
      characteristics: ['No recent activity', 'At risk of churn'],
      color: 'bg-gray-500'
    }
  ]

  const keyInsights = [
    {
      type: 'positive',
      title: 'Revenue Growth Accelerating',
      description: 'MRR increased by 15.3% this month, exceeding targets by 8%',
      icon: TrendingUp,
      action: 'Continue current marketing strategy'
    },
    {
      type: 'warning',
      title: 'Free User Churn Increasing',
      description: 'Free plan churn rate increased to 12.5%, needs attention',
      icon: AlertTriangle,
      action: 'Improve onboarding and engagement'
    },
    {
      type: 'positive',
      title: 'Enterprise Adoption Growing',
      description: 'Enterprise plan adoption up 23% month-over-month',
      icon: Star,
      action: 'Expand enterprise features'
    },
    {
      type: 'info',
      title: 'Keyword Research Tool Dominates',
      description: 'Accounts for 35% of total tool usage and revenue',
      icon: Zap,
      action: 'Invest in similar high-performing tools'
    }
  ]

  const renderSimpleChart = (data: any[], type: 'bar' | 'line' = 'bar') => (
    <div className="h-64 bg-gray-50 rounded-lg p-4 flex items-end justify-around">
      {data.map((item, index) => (
        <div key={index} className="flex flex-col items-center flex-1">
          <div 
            className={`w-full ${type === 'bar' ? 'bg-purple-500' : 'bg-purple-300'} rounded-t transition-all duration-300 hover:bg-purple-600`}
            style={{ height: `${(item.revenue || item.usage || item.count / 200) * 100}%` }}
          ></div>
          <span className="text-xs text-gray-600 mt-2">{item.month || item.tool || item.stage}</span>
        </div>
      ))}
    </div>
  )

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Business Analytics</h1>
          <p className="text-gray-600 mt-1">Comprehensive business performance metrics and insights</p>
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
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {analyticsMetrics.map((metric, index) => (
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

      {/* Key Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Key Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {keyInsights.map((insight, index) => (
              <div key={index} className={`p-4 rounded-lg border-l-4 ${
                insight.type === 'positive' ? 'border-green-500 bg-green-50' :
                insight.type === 'warning' ? 'border-yellow-500 bg-yellow-50' :
                'border-blue-500 bg-blue-50'
              }`}>
                <div className="flex items-start gap-3">
                  <insight.icon className={`w-5 h-5 mt-0.5 ${
                    insight.type === 'positive' ? 'text-green-600' :
                    insight.type === 'warning' ? 'text-yellow-600' :
                    'text-blue-600'
                  }`} />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-1">{insight.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">{insight.description}</p>
                    <p className="text-xs font-medium text-gray-700">
                      Action: {insight.action}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Revenue and User Growth */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Monthly Recurring Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            {renderSimpleChart(revenueData)}
            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Current MRR</p>
                <p className="font-bold text-lg">$45,231</p>
              </div>
              <div>
                <p className="text-gray-600">vs Target</p>
                <p className="font-bold text-lg text-green-600">+13.1%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              User Growth
            </CardTitle>
          </CardHeader>
          <CardContent>
            {renderSimpleChart(userGrowthData)}
            <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Free Users</p>
                <p className="font-bold">1,847</p>
              </div>
              <div>
                <p className="text-gray-600">Paid Users</p>
                <p className="font-bold text-green-600">400</p>
              </div>
              <div>
                <p className="text-gray-600">Growth Rate</p>
                <p className="font-bold text-green-600">+8.2%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tool Usage and Conversion Funnel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Tool Usage Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            {renderSimpleChart(toolUsageData)}
            <div className="mt-4 space-y-2">
              {toolUsageData.slice(0, 3).map((tool, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">{tool.tool}</span>
                  <span className="font-medium">{tool.usage.toLocaleString()} uses</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Conversion Funnel
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {conversionFunnel.map((stage, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">{stage.stage}</span>
                    <span className="text-sm text-gray-600">{stage.count.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-purple-600 h-2 rounded-full" 
                      style={{ width: `${stage.conversion}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{stage.conversion}% conversion</span>
                    <span>{index > 0 ? `${((stage.count / conversionFunnel[index - 1].count) * 100).toFixed(1)}%` : '100%'}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Geographic and Customer Segments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MousePointer className="w-5 h-5" />
              Geographic Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {geographicData.map((country, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">{country.country}</span>
                    <span className="text-sm text-gray-600">{country.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${country.percentage}%` }}
                    ></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-xs text-gray-600">
                    <span>{country.users.toLocaleString()} users</span>
                    <span>${country.revenue.toLocaleString()} revenue</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCheck className="w-5 h-5" />
              Customer Segments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {customerSegments.map((segment, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${segment.color}`} />
                      <span className="font-medium text-gray-900">{segment.name}</span>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{segment.count}</p>
                      <p className="text-xs text-gray-600">{segment.percentage}%</p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div 
                      className={`${segment.color} h-2 rounded-full`} 
                      style={{ width: `${segment.percentage}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-600">
                    Revenue: ${segment.revenue.toLocaleString()}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-2">
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
      </div>

      {/* Performance Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Performance Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold text-lg text-green-600">Excellent</h3>
              <p className="text-sm text-gray-600">Revenue Growth</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Clock className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="font-bold text-lg text-yellow-600">Moderate</h3>
              <p className="text-sm text-gray-600">User Retention</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-lg text-blue-600">Growing</h3>
              <p className="text-sm text-gray-600">Market Share</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Star className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-bold text-lg text-purple-600">Strong</h3>
              <p className="text-sm text-gray-600">Product Quality</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default BusinessAnalytics