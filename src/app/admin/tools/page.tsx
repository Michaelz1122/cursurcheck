'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Package, 
  Target, 
  PenTool, 
  BarChart3, 
  FileText, 
  Image,
  Video,
  MessageSquare,
  Hash,
  TrendingUp,
  Settings,
  Plus,
  Edit,
  Trash2,
  Eye,
  ToggleLeft,
  ToggleRight,
  Filter,
  Search,
  MoreHorizontal,
  Users,
  Zap,
  Star,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Upload,
  Activity,
  CheckCircle,
  AlertCircle,
  Clock,
  ArrowRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const MarketingToolsManagement = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')

  const toolMetrics = [
    {
      title: 'Total Tools',
      value: '24',
      change: '+2',
      trend: 'up',
      icon: Package
    },
    {
      title: 'Active Tools',
      value: '22',
      change: '+1',
      trend: 'up',
      icon: Activity
    },
    {
      title: 'Total Usage',
      value: '45.2K',
      change: '+12.5%',
      trend: 'up',
      icon: TrendingUp
    },
    {
      title: 'Avg. Rating',
      value: '4.6',
      change: '+0.2',
      trend: 'up',
      icon: Star
    }
  ]

  const marketingTools = [
    {
      id: 1,
      name: 'Ad Copy Generator',
      category: 'copywriting',
      description: 'Generate compelling ad copies for various platforms',
      status: 'active',
      usage: 15420,
      rating: 4.7,
      users: 892,
      planAccess: ['Pro', 'Enterprise'],
      lastUpdated: '2024-01-15',
      icon: PenTool,
      color: 'bg-blue-500'
    },
    {
      id: 2,
      name: 'Campaign Analyzer',
      category: 'analytics',
      description: 'Analyze campaign performance and ROI',
      status: 'active',
      usage: 12450,
      rating: 4.5,
      users: 756,
      planAccess: ['Pro', 'Enterprise'],
      lastUpdated: '2024-01-14',
      icon: BarChart3,
      color: 'bg-green-500'
    },
    {
      id: 3,
      name: 'Social Media Scheduler',
      category: 'media',
      description: 'Schedule and manage social media posts',
      status: 'maintenance',
      usage: 8900,
      rating: 4.3,
      users: 634,
      planAccess: ['Enterprise'],
      lastUpdated: '2024-01-10',
      icon: MessageSquare,
      color: 'bg-purple-500'
    },
    {
      id: 4,
      name: 'Keyword Research',
      category: 'seo',
      description: 'Find optimal keywords for your content',
      status: 'active',
      usage: 22100,
      rating: 4.8,
      users: 1203,
      planAccess: ['Free', 'Pro', 'Enterprise'],
      lastUpdated: '2024-01-16',
      icon: Hash,
      color: 'bg-orange-500'
    },
    {
      id: 5,
      name: 'Image Editor',
      category: 'design',
      description: 'Edit and optimize images for marketing',
      status: 'beta',
      usage: 5600,
      rating: 4.1,
      users: 445,
      planAccess: ['Pro', 'Enterprise'],
      lastUpdated: '2024-01-12',
      icon: Image,
      color: 'bg-pink-500'
    },
    {
      id: 6,
      name: 'Video Creator',
      category: 'media',
      description: 'Create marketing videos quickly',
      status: 'inactive',
      usage: 0,
      rating: 0,
      users: 0,
      planAccess: ['Enterprise'],
      lastUpdated: '2024-01-08',
      icon: Video,
      color: 'bg-red-500'
    }
  ]

  const toolCategories = [
    { id: 'all', name: 'All Categories', count: 24 },
    { id: 'copywriting', name: 'Copywriting', count: 8 },
    { id: 'analytics', name: 'Analytics', count: 5 },
    { id: 'media', name: 'Media', count: 4 },
    { id: 'seo', name: 'SEO', count: 3 },
    { id: 'design', name: 'Design', count: 4 }
  ]

  const usageQuotas = [
    {
      plan: 'Free',
      dailyLimit: 10,
      monthlyLimit: 300,
      tools: 5,
      features: ['Basic analytics', 'Email support']
    },
    {
      plan: 'Pro',
      dailyLimit: 100,
      monthlyLimit: 3000,
      tools: 15,
      features: ['Advanced analytics', 'Priority support', 'API access']
    },
    {
      plan: 'Enterprise',
      dailyLimit: 1000,
      monthlyLimit: 30000,
      tools: 24,
      features: ['Unlimited access', '24/7 support', 'White-label', 'Custom integrations']
    }
  ]

  const toolPerformance = [
    {
      tool: 'Keyword Research',
      usage: 22100,
      revenue: '$2,450',
      satisfaction: 96,
      trend: 'up'
    },
    {
      tool: 'Ad Copy Generator',
      usage: 15420,
      revenue: '$1,890',
      satisfaction: 94,
      trend: 'up'
    },
    {
      tool: 'Campaign Analyzer',
      usage: 12450,
      revenue: '$1,650',
      satisfaction: 90,
      trend: 'stable'
    },
    {
      tool: 'Social Media Scheduler',
      usage: 8900,
      revenue: '$1,200',
      satisfaction: 86,
      trend: 'down'
    }
  ]

  const filteredTools = marketingTools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === 'all' || tool.category === filterCategory
    const matchesStatus = filterStatus === 'all' || tool.status === filterStatus
    return matchesSearch && matchesCategory && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500'
      case 'maintenance': return 'bg-yellow-500'
      case 'beta': return 'bg-blue-500'
      case 'inactive': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4" />
      case 'maintenance': return <Clock className="w-4 h-4" />
      case 'beta': return <AlertCircle className="w-4 h-4" />
      case 'inactive': return <ToggleLeft className="w-4 h-4" />
      default: return <ToggleLeft className="w-4 h-4" />
    }
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Marketing Tools</h1>
          <p className="text-gray-600 mt-1">Manage and monitor all marketing tools and their usage</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Tool
          </Button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {toolMetrics.map((metric, index) => (
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
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        {['overview', 'tools', 'quotas', 'performance'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab
                ? 'bg-white text-purple-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Top Performing Tools */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Top Performing Tools
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {toolPerformance.slice(0, 4).map((tool, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                          <Zap className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{tool.tool}</p>
                          <p className="text-sm text-gray-600">{tool.usage.toLocaleString()} uses</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">{tool.revenue}</p>
                        <div className="flex items-center gap-1">
                          <div className={`w-2 h-2 rounded-full ${
                            tool.trend === 'up' ? 'bg-green-500' : 
                            tool.trend === 'down' ? 'bg-red-500' : 'bg-yellow-500'
                          }`} />
                          <span className="text-sm text-gray-600">{tool.satisfaction}% satisfaction</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tool Categories */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Categories
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {toolCategories.map((category) => (
                  <div key={category.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Package className="w-4 h-4 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{category.name}</p>
                        <p className="text-sm text-gray-600">{category.count} tools</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Tools Tab */}
      {activeTab === 'tools' && (
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <CardTitle>All Marketing Tools</CardTitle>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search tools..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {toolCategories.map((category) => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="beta">Beta</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTools.map((tool) => (
                <motion.div
                  key={tool.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 ${tool.color} rounded-lg flex items-center justify-center text-white`}>
                            <tool.icon className="w-5 h-5" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{tool.name}</CardTitle>
                            <p className="text-sm text-gray-600 capitalize">{tool.category}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(tool.status)}
                          <div className={`w-2 h-2 rounded-full ${getStatusColor(tool.status)}`} />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-sm mb-4">{tool.description}</p>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-gray-500">Usage</p>
                          <p className="font-medium">{tool.usage.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Rating</p>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="font-medium">{tool.rating}</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Users</p>
                          <p className="font-medium">{tool.users}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Plans</p>
                          <p className="font-medium text-sm">{tool.planAccess.length}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {tool.planAccess.map((plan) => (
                          <Badge key={plan} variant="outline" className="text-xs">
                            {plan}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <p className="text-xs text-gray-500">Updated {tool.lastUpdated}</p>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quotas Tab */}
      {activeTab === 'quotas' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {usageQuotas.map((quota, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5" />
                  {quota.plan} Plan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">{quota.dailyLimit}</p>
                    <p className="text-sm text-gray-600">Daily Limit</p>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">{quota.monthlyLimit}</p>
                    <p className="text-sm text-gray-600">Monthly Limit</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Tools Available</span>
                    <span className="font-medium">{quota.tools}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-purple-600 h-2 rounded-full" 
                      style={{ width: `${(quota.tools / 24) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-900 mb-2">Features</p>
                  <ul className="space-y-1">
                    {quota.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    <Users className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Performance Tab */}
      {activeTab === 'performance' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Tool Usage Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Usage Analytics Chart</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Revenue by Tool</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Revenue Chart</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>User Satisfaction</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {toolPerformance.map((tool, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">{tool.tool}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{ width: `${tool.satisfaction}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{tool.satisfaction}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tool Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">94.2%</p>
                  <p className="text-sm text-gray-600">Avg. Uptime</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">1.2s</p>
                  <p className="text-sm text-gray-600">Avg. Response</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <p className="text-2xl font-bold text-purple-600">98.5%</p>
                  <p className="text-sm text-gray-600">Success Rate</p>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <p className="text-2xl font-bold text-orange-600">4.6</p>
                  <p className="text-sm text-gray-600">Avg. Rating</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

export default MarketingToolsManagement