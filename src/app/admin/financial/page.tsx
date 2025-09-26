'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  PieChart, 
  BarChart3, 
  CreditCard,
  AlertTriangle,
  CheckCircle,
  Calendar,
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
  FileText,
  Calculator,
  Target,
  Activity,
  Users,
  Percent,
  Clock,
  Banknote,
  Receipt,
  Scale,
  TrendingUp as TrendIcon
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const FinancialManagement = () => {
  const [timeRange, setTimeRange] = useState('30d')
  const [activeTab, setActiveTab] = useState('overview')

  const financialMetrics = [
    {
      title: 'Total Revenue',
      value: '$124,563',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      description: 'Year to date'
    },
    {
      title: 'Monthly Recurring Revenue',
      value: '$45,231',
      change: '+15.3%',
      trend: 'up',
      icon: TrendingUp,
      description: 'Current month'
    },
    {
      title: 'Operating Expenses',
      value: '$28,450',
      change: '+8.1%',
      trend: 'up',
      icon: TrendingDown,
      description: 'Monthly expenses'
    },
    {
      title: 'Net Profit',
      value: '$16,781',
      change: '+22.7%',
      trend: 'up',
      icon: Calculator,
      description: 'Monthly profit'
    },
    {
      title: 'Profit Margin',
      value: '37.1%',
      change: '+2.8%',
      trend: 'up',
      icon: Percent,
      description: 'Net margin'
    },
    {
      title: 'Cash Flow',
      value: '$89,234',
      change: '+18.2%',
      trend: 'up',
      icon: Banknote,
      description: 'Available cash'
    }
  ]

  const revenueBreakdown = [
    {
      category: 'Subscription Revenue',
      amount: 89200,
      percentage: 71.6,
      change: '+15.3%',
      trend: 'up',
      color: 'bg-purple-500'
    },
    {
      category: 'One-time Purchases',
      amount: 18450,
      percentage: 14.8,
      change: '+8.7%',
      trend: 'up',
      color: 'bg-blue-500'
    },
    {
      category: 'Consulting Services',
      amount: 12450,
      percentage: 10.0,
      change: '+22.1%',
      trend: 'up',
      color: 'bg-green-500'
    },
    {
      category: 'Other Revenue',
      amount: 4463,
      percentage: 3.6,
      change: '-5.2%',
      trend: 'down',
      color: 'bg-orange-500'
    }
  ]

  const expenseCategories = [
    {
      category: 'Salaries & Benefits',
      amount: 15600,
      percentage: 54.8,
      budget: 16000,
      variance: -2.5,
      color: 'bg-red-500'
    },
    {
      category: 'Marketing & Advertising',
      amount: 6800,
      percentage: 23.9,
      budget: 7000,
      variance: -2.9,
      color: 'bg-blue-500'
    },
    {
      category: 'Software & Technology',
      amount: 3850,
      percentage: 13.5,
      budget: 4000,
      variance: -3.8,
      color: 'bg-green-500'
    },
    {
      category: 'Office & Operations',
      amount: 2200,
      percentage: 7.7,
      budget: 2500,
      variance: -12.0,
      color: 'bg-orange-500'
    }
  ]

  const cashFlowStatement = [
    {
      period: 'Jan 2024',
      opening: 65400,
      inflow: 42100,
      outflow: 28900,
      closing: 78600,
      net: 13200
    },
    {
      period: 'Feb 2024',
      opening: 78600,
      inflow: 45300,
      outflow: 31200,
      closing: 92700,
      net: 14100
    },
    {
      period: 'Mar 2024',
      opening: 92700,
      inflow: 48900,
      outflow: 34500,
      closing: 107100,
      net: 14400
    },
    {
      period: 'Apr 2024',
      opening: 107100,
      inflow: 52100,
      outflow: 36800,
      closing: 122400,
      net: 15300
    },
    {
      period: 'May 2024',
      opening: 122400,
      inflow: 54800,
      outflow: 38200,
      closing: 139000,
      net: 16600
    },
    {
      period: 'Jun 2024',
      opening: 139000,
      inflow: 57200,
      outflow: 41900,
      closing: 154300,
      net: 15300
    }
  ]

  const financialAlerts = [
    {
      type: 'warning',
      title: 'Marketing Budget Exceeded',
      description: 'Marketing expenses are 15% over budget for Q2',
      amount: '$1,050 over budget',
      action: 'Review marketing campaigns',
      priority: 'high'
    },
    {
      type: 'info',
      title: 'Revenue Target Achieved',
      description: 'Monthly revenue target exceeded by 12%',
      amount: '$4,823 above target',
      action: 'Analyze growth drivers',
      priority: 'medium'
    },
    {
      type: 'success',
      title: 'Profit Margin Improved',
      description: 'Net profit margin increased to 37.1%',
      amount: '+2.8% improvement',
      action: 'Maintain current strategy',
      priority: 'low'
    }
  ]

  const financialForecasts = [
    {
      metric: 'Revenue',
      current: 45231,
      projected: 52100,
      growth: 15.2,
      confidence: 85,
      factors: ['Seasonal growth', 'New product launch', 'Market expansion']
    },
    {
      metric: 'Expenses',
      current: 28450,
      projected: 31200,
      growth: 9.7,
      confidence: 78,
      factors: ['Hiring plans', 'Technology investments', 'Inflation']
    },
    {
      metric: 'Profit',
      current: 16781,
      projected: 20900,
      growth: 24.5,
      confidence: 72,
      factors: ['Revenue growth', 'Cost optimization', 'Operational efficiency']
    }
  ]

  const taxSummary = [
    {
      type: 'VAT',
      period: 'Q2 2024',
      taxable: 124563,
      rate: 14,
      due: 17439,
      status: 'pending',
      dueDate: '2024-07-15'
    },
    {
      type: 'Corporate Tax',
      period: 'FY 2024',
      taxable: 284500,
      rate: 22.5,
      due: 64013,
      status: 'estimated',
      dueDate: '2025-03-31'
    },
    {
      type: 'Withholding Tax',
      period: 'Jun 2024',
      taxable: 28450,
      rate: 10,
      due: 2845,
      status: 'paid',
      dueDate: '2024-07-10'
    }
  ]

  const renderSimpleBarChart = (data: any[], valueKey: string) => (
    <div className="h-48 bg-gray-50 rounded-lg p-4 flex items-end justify-around">
      {data.map((item, index) => (
        <div key={index} className="flex flex-col items-center flex-1">
          <div 
            className="w-full bg-purple-500 rounded-t transition-all duration-300 hover:bg-purple-600"
            style={{ height: `${(item[valueKey] / Math.max(...data.map(d => d[valueKey]))) * 100}%` }}
          ></div>
          <span className="text-xs text-gray-600 mt-2">{item.period || item.category}</span>
        </div>
      ))}
    </div>
  )

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Financial Management</h1>
          <p className="text-gray-600 mt-1">Comprehensive financial overview and management tools</p>
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
            Export Report
          </Button>
        </div>
      </div>

      {/* Financial Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {financialMetrics.map((metric, index) => (
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

      {/* Financial Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Financial Alerts & Notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {financialAlerts.map((alert, index) => (
              <div key={index} className={`p-4 rounded-lg border-l-4 ${
                alert.type === 'warning' ? 'border-yellow-500 bg-yellow-50' :
                alert.type === 'success' ? 'border-green-500 bg-green-50' :
                'border-blue-500 bg-blue-50'
              }`}>
                <div className="flex items-start gap-3">
                  {alert.type === 'warning' ? (
                    <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  ) : alert.type === 'success' ? (
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  ) : (
                    <Activity className="w-5 h-5 text-blue-600 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-1">{alert.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">{alert.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-gray-700">{alert.amount}</span>
                      <Badge className={
                        alert.priority === 'high' ? 'bg-red-500' :
                        alert.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                      }>
                        {alert.priority}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">Action: {alert.action}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Revenue Breakdown & Expense Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="w-5 h-5" />
              Revenue Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {revenueBreakdown.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${item.color}`} />
                      <span className="font-medium text-gray-900">{item.category}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-medium">${item.amount.toLocaleString()}</span>
                      <div className={`flex items-center gap-1 text-xs ${
                        item.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {item.trend === 'up' ? (
                          <ArrowUpRight className="w-3 h-3" />
                        ) : (
                          <ArrowDownRight className="w-3 h-3" />
                        )}
                        {item.change}
                      </div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`${item.color} h-2 rounded-full`} 
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>{item.percentage}% of total</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Expense Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {expenseCategories.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${item.color}`} />
                      <span className="font-medium text-gray-900">{item.category}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-medium">${item.amount.toLocaleString()}</span>
                      <div className="text-xs text-gray-600">
                        Budget: ${item.budget.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`${item.color} h-2 rounded-full`} 
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">{item.percentage}% of expenses</span>
                    <span className={item.variance < 0 ? 'text-green-600' : 'text-red-600'}>
                      {item.variance > 0 ? '+' : ''}{item.variance}% vs budget
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cash Flow Statement */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Banknote className="w-5 h-5" />
            Cash Flow Statement
          </CardTitle>
        </CardHeader>
        <CardContent>
          {renderSimpleBarChart(cashFlowStatement, 'net')}
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 px-4 font-medium text-gray-900">Period</th>
                  <th className="text-right py-2 px-4 font-medium text-gray-900">Opening</th>
                  <th className="text-right py-2 px-4 font-medium text-gray-900">Inflow</th>
                  <th className="text-right py-2 px-4 font-medium text-gray-900">Outflow</th>
                  <th className="text-right py-2 px-4 font-medium text-gray-900">Net</th>
                  <th className="text-right py-2 px-4 font-medium text-gray-900">Closing</th>
                </tr>
              </thead>
              <tbody>
                {cashFlowStatement.slice(-3).map((item, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="py-2 px-4 font-medium">{item.period}</td>
                    <td className="py-2 px-4 text-right">${item.opening.toLocaleString()}</td>
                    <td className="py-2 px-4 text-right text-green-600">+${item.inflow.toLocaleString()}</td>
                    <td className="py-2 px-4 text-right text-red-600">-${item.outflow.toLocaleString()}</td>
                    <td className="py-2 px-4 text-right font-medium">${item.net.toLocaleString()}</td>
                    <td className="py-2 px-4 text-right font-bold">${item.closing.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Financial Forecasts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Financial Forecasts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {financialForecasts.map((forecast, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-bold text-lg text-gray-900 mb-3">{forecast.metric}</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Current</span>
                    <span className="font-medium">${forecast.current.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Projected</span>
                    <span className="font-medium text-green-600">${forecast.projected.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Growth</span>
                    <span className="font-medium text-green-600">+{forecast.growth}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Confidence</span>
                    <span className="font-medium">{forecast.confidence}%</span>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t">
                  <p className="text-xs text-gray-600 mb-2">Key Factors:</p>
                  <div className="flex flex-wrap gap-1">
                    {forecast.factors.slice(0, 2).map((factor, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {factor}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tax Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Receipt className="w-5 h-5" />
            Tax Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Tax Type</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Period</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900">Taxable Amount</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900">Rate</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900">Due Amount</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Due Date</th>
                </tr>
              </thead>
              <tbody>
                {taxSummary.map((tax, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <span className="font-medium text-gray-900">{tax.type}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-gray-600">{tax.period}</span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="font-medium">${tax.taxable.toLocaleString()}</span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="font-medium">{tax.rate}%</span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="font-medium">${tax.due.toLocaleString()}</span>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={
                        tax.status === 'paid' ? 'bg-green-500' :
                        tax.status === 'pending' ? 'bg-yellow-500' : 'bg-blue-500'
                      }>
                        {tax.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-gray-600">{tax.dueDate}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default FinancialManagement