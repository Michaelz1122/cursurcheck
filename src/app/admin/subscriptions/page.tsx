'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Star, 
  Crown, 
  Gem, 
  Users, 
  TrendingUp, 
  CreditCard, 
  Settings, 
  Plus,
  Edit,
  Trash2,
  Check,
  X,
  DollarSign,
  Activity,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  Search,
  MoreHorizontal
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const SubscriptionManagement = () => {
  const [activeTab, setActiveTab] = useState('plans')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  const subscriptionPlans = [
    {
      id: 'free',
      name: 'Free',
      price: '$0',
      period: 'month',
      description: 'Perfect for trying out our platform',
      features: [
        '5 marketing tools access',
        '10 copies per day',
        'Basic analytics',
        'Email support',
        '1 user account'
      ],
      limitations: [
        'No advanced features',
        'Limited storage',
        'No API access'
      ],
      users: 1547,
      color: 'bg-gray-500',
      popular: false
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '$29',
      period: 'month',
      description: 'Best for growing businesses',
      features: [
        'All marketing tools',
        '100 copies per day',
        'Advanced analytics',
        'Priority support',
        '5 user accounts',
        'API access',
        'Custom templates'
      ],
      limitations: [
        'Limited white-labeling',
        'Basic integrations'
      ],
      users: 892,
      color: 'bg-blue-500',
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: '$99',
      period: 'month',
      description: 'For large organizations',
      features: [
        'Unlimited marketing tools',
        'Unlimited copies',
        'Enterprise analytics',
        '24/7 dedicated support',
        'Unlimited users',
        'Full API access',
        'White-label solution',
        'Custom integrations',
        'Dedicated account manager'
      ],
      limitations: [],
      users: 156,
      color: 'bg-purple-500',
      popular: false
    }
  ]

  const userSubscriptions = [
    {
      id: 1,
      user: 'Ahmed Mohamed',
      email: 'ahmed@example.com',
      plan: 'Pro',
      status: 'active',
      startDate: '2024-01-15',
      nextBilling: '2024-02-15',
      usage: {
        copies: 45,
        limit: 100,
        tools: 8,
        limit: 12
      },
      revenue: '$29'
    },
    {
      id: 2,
      user: 'Sara Ali',
      email: 'sara@example.com',
      plan: 'Free',
      status: 'active',
      startDate: '2024-01-10',
      nextBilling: null,
      usage: {
        copies: 8,
        limit: 10,
        tools: 3,
        limit: 5
      },
      revenue: '$0'
    },
    {
      id: 3,
      user: 'Mohamed Hassan',
      email: 'mohamed@example.com',
      plan: 'Enterprise',
      status: 'active',
      startDate: '2024-01-05',
      nextBilling: '2024-02-05',
      usage: {
        copies: 234,
        limit: 999,
        tools: 15,
        limit: 20
      },
      revenue: '$99'
    },
    {
      id: 4,
      user: 'Fatima Ahmed',
      email: 'fatima@example.com',
      plan: 'Pro',
      status: 'cancelled',
      startDate: '2023-12-01',
      nextBilling: null,
      usage: {
        copies: 0,
        limit: 100,
        tools: 0,
        limit: 12
      },
      revenue: '$0'
    }
  ]

  const subscriptionMetrics = [
    {
      title: 'Total Subscriptions',
      value: '2,595',
      change: '+12.3%',
      trend: 'up',
      icon: Users
    },
    {
      title: 'MRR',
      value: '$45,231',
      change: '+15.7%',
      trend: 'up',
      icon: DollarSign
    },
    {
      title: 'Conversion Rate',
      value: '3.2%',
      change: '+0.8%',
      trend: 'up',
      icon: TrendingUp
    },
    {
      title: 'Churn Rate',
      value: '2.1%',
      change: '-0.3%',
      trend: 'down',
      icon: Activity
    }
  ]

  const filteredSubscriptions = userSubscriptions.filter(sub => {
    const matchesSearch = sub.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sub.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || sub.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500'
      case 'cancelled': return 'bg-red-500'
      case 'trial': return 'bg-yellow-500'
      default: return 'bg-gray-500'
    }
  }

  const getPlanIcon = (planId: string) => {
    switch (planId) {
      case 'free': return <Star className="w-5 h-5" />
      case 'pro': return <Crown className="w-5 h-5" />
      case 'enterprise': return <Gem className="w-5 h-5" />
      default: return <Star className="w-5 h-5" />
    }
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Subscription Management</h1>
          <p className="text-gray-600 mt-1">Manage subscription plans and user subscriptions</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Plan
          </Button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {subscriptionMetrics.map((metric, index) => (
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
        {['plans', 'users', 'analytics'].map((tab) => (
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

      {/* Plans Tab */}
      {activeTab === 'plans' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {subscriptionPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`relative ${plan.popular ? 'ring-2 ring-purple-500' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-purple-500 text-white">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className={`w-12 h-12 ${plan.color} rounded-lg flex items-center justify-center text-white`}>
                      {getPlanIcon(plan.id)}
                    </div>
                  </div>
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <p className="text-gray-600 text-sm">{plan.description}</p>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-gray-600">/{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900 mb-2">Features</p>
                      <ul className="space-y-2">
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                            <Check className="w-4 h-4 text-green-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    {plan.limitations.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-gray-900 mb-2">Limitations</p>
                        <ul className="space-y-2">
                          {plan.limitations.map((limitation, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                              <X className="w-4 h-4 text-red-500" />
                              {limitation}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <div className="pt-4 border-t">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">{plan.users}</span> active users
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Users Tab */}
      {activeTab === 'users' && (
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <CardTitle>User Subscriptions</CardTitle>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="trial">Trial</option>
                </select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-900">User</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Plan</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Usage</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Revenue</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSubscriptions.map((subscription) => (
                    <tr key={subscription.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium text-gray-900">{subscription.user}</p>
                          <p className="text-sm text-gray-600">{subscription.email}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          {getPlanIcon(subscription.plan.toLowerCase())}
                          <span className="font-medium">{subscription.plan}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${getStatusColor(subscription.status)}`} />
                          <span className="text-sm font-medium capitalize">{subscription.status}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">Copies:</span>
                            <span className="text-sm font-medium">{subscription.usage.copies}/{subscription.usage.limit}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">Tools:</span>
                            <span className="text-sm font-medium">{subscription.usage.tools}/{subscription.usage.tools}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-medium text-gray-900">{subscription.revenue}</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
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
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Revenue by Plan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Revenue Chart Placeholder</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Subscription Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Growth Chart Placeholder</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Churn Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Churn Chart Placeholder</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upgrade/Downgrade Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Trends Chart Placeholder</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

export default SubscriptionManagement