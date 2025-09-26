'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  CreditCard, 
  DollarSign, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle, 
  Clock,
  Plus,
  Download,
  Filter,
  Search,
  ArrowUpRight,
  ArrowDownRight,
  Settings,
  FileText,
  Bell,
  Mail,
  Phone,
  CreditCard as CardIcon,
  Building2,
  Users,
  BarChart3,
  Calendar,
  Repeat,
  Gift,
  Percent
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const BillingManagement = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  const billingMetrics = [
    {
      title: 'Total Revenue',
      value: '$124,563',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign
    },
    {
      title: 'MRR',
      value: '$45,231',
      change: '+15.3%',
      trend: 'up',
      icon: TrendingUp
    },
    {
      title: 'Failed Payments',
      value: '23',
      change: '-5.2%',
      trend: 'down',
      icon: AlertCircle
    },
    {
      title: 'Success Rate',
      value: '98.2%',
      change: '+0.8%',
      trend: 'up',
      icon: CheckCircle
    }
  ]

  const recentTransactions = [
    {
      id: 1,
      user: 'Ahmed Mohamed',
      amount: '$29.00',
      status: 'success',
      method: 'card',
      date: '2024-01-15 14:30',
      invoice: 'INV-2024-001',
      plan: 'Pro'
    },
    {
      id: 2,
      user: 'Sara Ali',
      amount: '$99.00',
      status: 'success',
      method: 'paypal',
      date: '2024-01-15 13:45',
      invoice: 'INV-2024-002',
      plan: 'Enterprise'
    },
    {
      id: 3,
      user: 'Mohamed Hassan',
      amount: '$29.00',
      status: 'failed',
      method: 'card',
      date: '2024-01-15 12:20',
      invoice: 'INV-2024-003',
      plan: 'Pro'
    },
    {
      id: 4,
      user: 'Fatima Ahmed',
      amount: '$0.00',
      status: 'refunded',
      method: 'card',
      date: '2024-01-15 11:15',
      invoice: 'INV-2024-004',
      plan: 'Free'
    }
  ]

  const paymentMethods = [
    {
      id: 1,
      type: 'card',
      name: 'Visa ending in 4242',
      last4: '4242',
      expiry: '12/25',
      brand: 'visa',
      isDefault: true
    },
    {
      id: 2,
      type: 'paypal',
      name: 'PayPal',
      email: 'admin@company.com',
      isDefault: false
    },
    {
      id: 3,
      type: 'card',
      name: 'Mastercard ending in 5555',
      last4: '5555',
      expiry: '08/24',
      brand: 'mastercard',
      isDefault: false
    }
  ]

  const coupons = [
    {
      id: 1,
      code: 'WELCOME20',
      discount: '20%',
      type: 'percentage',
      maxUses: 100,
      used: 45,
      status: 'active',
      validUntil: '2024-12-31'
    },
    {
      id: 2,
      code: 'ANNUAL50',
      discount: '$50',
      type: 'fixed',
      maxUses: 50,
      used: 12,
      status: 'active',
      validUntil: '2024-06-30'
    },
    {
      id: 3,
      code: 'LAUNCH15',
      discount: '15%',
      type: 'percentage',
      maxUses: 200,
      used: 200,
      status: 'expired',
      validUntil: '2024-01-01'
    }
  ]

  const invoices = [
    {
      id: 'INV-2024-001',
      user: 'Ahmed Mohamed',
      amount: '$29.00',
      status: 'paid',
      date: '2024-01-15',
      dueDate: '2024-01-15',
      items: ['Pro Plan - January 2024']
    },
    {
      id: 'INV-2024-002',
      user: 'Sara Ali',
      amount: '$99.00',
      status: 'paid',
      date: '2024-01-15',
      dueDate: '2024-01-15',
      items: ['Enterprise Plan - January 2024']
    },
    {
      id: 'INV-2024-003',
      user: 'Mohamed Hassan',
      amount: '$29.00',
      status: 'overdue',
      date: '2024-01-15',
      dueDate: '2024-01-15',
      items: ['Pro Plan - January 2024']
    }
  ]

  const filteredTransactions = recentTransactions.filter(transaction => {
    const matchesSearch = transaction.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.invoice.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || transaction.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-500'
      case 'failed': return 'bg-red-500'
      case 'pending': return 'bg-yellow-500'
      case 'refunded': return 'bg-blue-500'
      case 'paid': return 'bg-green-500'
      case 'overdue': return 'bg-red-500'
      case 'active': return 'bg-green-500'
      case 'expired': return 'bg-gray-500'
      default: return 'bg-gray-500'
    }
  }

  const getPaymentIcon = (method: string) => {
    switch (method) {
      case 'card': return <CardIcon className="w-4 h-4" />
      case 'paypal': return <Building2 className="w-4 h-4" />
      default: return <CreditCard className="w-4 h-4" />
    }
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Billing & Payments</h1>
          <p className="text-gray-600 mt-1">Manage payments, invoices, and billing settings</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Payment Method
          </Button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {billingMetrics.map((metric, index) => (
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
        {['overview', 'transactions', 'invoices', 'coupons'].map((tab) => (
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
          {/* Payment Methods */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Payment Methods
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {paymentMethods.map((method) => (
                  <div key={method.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        {method.type === 'card' ? (
                          <CardIcon className="w-5 h-5 text-blue-600" />
                        ) : (
                          <Building2 className="w-5 h-5 text-blue-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{method.name}</p>
                        {method.type === 'card' && (
                          <p className="text-sm text-gray-600">Expires {method.expiry}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {method.isDefault && (
                        <Badge className="bg-green-500 text-white">Default</Badge>
                      )}
                      <Button variant="ghost" size="sm">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Payment Method
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Recent Transactions */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Recent Transactions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTransactions.slice(0, 5).map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${getStatusColor(transaction.status)}`} />
                        <div>
                          <p className="font-medium text-gray-900">{transaction.user}</p>
                          <p className="text-sm text-gray-600">{transaction.invoice} • {transaction.plan}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">{transaction.amount}</p>
                        <p className="text-sm text-gray-600">{transaction.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Transactions Tab */}
      {activeTab === 'transactions' && (
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <CardTitle>All Transactions</CardTitle>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search transactions..."
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
                  <option value="success">Success</option>
                  <option value="failed">Failed</option>
                  <option value="pending">Pending</option>
                  <option value="refunded">Refunded</option>
                </select>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-900">User</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Invoice</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Amount</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Method</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Date</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map((transaction) => (
                    <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <p className="font-medium text-gray-900">{transaction.user}</p>
                        <p className="text-sm text-gray-600">{transaction.plan}</p>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-medium text-gray-900">{transaction.invoice}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-medium text-gray-900">{transaction.amount}</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          {getPaymentIcon(transaction.method)}
                          <span className="text-sm font-medium capitalize">{transaction.method}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${getStatusColor(transaction.status)}`} />
                          <span className="text-sm font-medium capitalize">{transaction.status}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-gray-600">{transaction.date}</span>
                      </td>
                      <td className="py-3 px-4">
                        <Button variant="ghost" size="sm">
                          <FileText className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Invoices Tab */}
      {activeTab === 'invoices' && (
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <CardTitle>Invoices</CardTitle>
              <div className="flex items-center gap-3">
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export All
                </Button>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Invoice
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Invoice #</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">User</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Amount</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Due Date</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((invoice) => (
                    <tr key={invoice.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <span className="font-medium text-gray-900">{invoice.id}</span>
                      </td>
                      <td className="py-3 px-4">
                        <p className="font-medium text-gray-900">{invoice.user}</p>
                        <p className="text-sm text-gray-600">{invoice.items[0]}</p>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-medium text-gray-900">{invoice.amount}</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${getStatusColor(invoice.status)}`} />
                          <span className="text-sm font-medium capitalize">{invoice.status}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-gray-600">{invoice.dueDate}</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <FileText className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Mail className="w-4 h-4" />
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

      {/* Coupons Tab */}
      {activeTab === 'coupons' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Percent className="w-5 h-5" />
                  Active Coupons
                </CardTitle>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Coupon
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {coupons.filter(c => c.status === 'active').map((coupon) => (
                <div key={coupon.id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="font-bold text-lg text-purple-600">{coupon.code}</p>
                      <p className="text-sm text-gray-600">
                        {coupon.type === 'percentage' ? `${coupon.discount} off` : `$${coupon.discount} off`}
                      </p>
                    </div>
                    <Badge className="bg-green-500 text-white">Active</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Used</p>
                      <p className="font-medium">{coupon.used} / {coupon.maxUses}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Valid Until</p>
                      <p className="font-medium">{coupon.validUntil}</p>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-purple-600 h-2 rounded-full" 
                        style={{ width: `${(coupon.used / coupon.maxUses) * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">
                      {Math.round((coupon.used / coupon.maxUses) * 100)}% used
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Coupon Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">57</p>
                    <p className="text-sm text-gray-600">Total Redemptions</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">$1,245</p>
                    <p className="text-sm text-gray-600">Total Discount</p>
                  </div>
                </div>
                
                <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Coupon Usage Chart</p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Top Performing Coupons</h4>
                  <div className="space-y-2">
                    {coupons.slice(0, 3).map((coupon) => (
                      <div key={coupon.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="font-medium">{coupon.code}</span>
                        <span className="text-sm text-gray-600">{coupon.used} uses</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

export default BillingManagement