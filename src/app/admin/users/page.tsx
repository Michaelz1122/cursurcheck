'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Users, 
  UserPlus, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  TrendingUp,
  Activity,
  Star,
  Crown,
  Gem,
  Filter,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  MessageSquare,
  PhoneCall,
  Mail as MailIcon,
  CheckCircle,
  AlertCircle,
  Clock,
  BarChart3,
  Target,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Download
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const UserManagement = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterPlan, setFilterPlan] = useState('all')

  const userMetrics = [
    {
      title: 'Total Users',
      value: '2,847',
      change: '+8.2%',
      trend: 'up',
      icon: Users
    },
    {
      title: 'Active Users',
      value: '2,156',
      change: '+12.5%',
      trend: 'up',
      icon: Activity
    },
    {
      title: 'New Users (30d)',
      value: '342',
      change: '+15.3%',
      trend: 'up',
      icon: UserPlus
    },
    {
      title: 'Avg. Session',
      value: '24m',
      change: '+2.1%',
      trend: 'up',
      icon: Clock
    }
  ]

  const users = [
    {
      id: 1,
      name: 'Ahmed Mohamed',
      email: 'ahmed@example.com',
      phone: '+20 123 456 7890',
      location: 'Cairo, Egypt',
      plan: 'Pro',
      status: 'active',
      joinDate: '2024-01-15',
      lastActive: '2024-01-20',
      totalSpent: '$348',
      sessions: 45,
      supportTickets: 2,
      avatar: 'https://ui-avatars.com/api/?name=Ahmed+Mohamed&background=6366f1&color=fff'
    },
    {
      id: 2,
      name: 'Sara Ali',
      email: 'sara@example.com',
      phone: '+20 987 654 3210',
      location: 'Alexandria, Egypt',
      plan: 'Enterprise',
      status: 'active',
      joinDate: '2024-01-10',
      lastActive: '2024-01-19',
      totalSpent: '$1,188',
      sessions: 89,
      supportTickets: 1,
      avatar: 'https://ui-avatars.com/api/?name=Sara+Ali&background=8b5cf6&color=fff'
    },
    {
      id: 3,
      name: 'Mohamed Hassan',
      email: 'mohamed@example.com',
      phone: '+20 555 123 4567',
      location: 'Giza, Egypt',
      plan: 'Free',
      status: 'active',
      joinDate: '2024-01-05',
      lastActive: '2024-01-18',
      totalSpent: '$0',
      sessions: 12,
      supportTickets: 0,
      avatar: 'https://ui-avatars.com/api/?name=Mohamed+Hassan&background=10b981&color=fff'
    },
    {
      id: 4,
      name: 'Fatima Ahmed',
      email: 'fatima@example.com',
      phone: '+20 111 222 3333',
      location: 'Luxor, Egypt',
      plan: 'Pro',
      status: 'inactive',
      joinDate: '2023-12-01',
      lastActive: '2024-01-10',
      totalSpent: '$58',
      sessions: 23,
      supportTickets: 3,
      avatar: 'https://ui-avatars.com/api/?name=Fatima+Ahmed&background=f59e0b&color=fff'
    }
  ]

  const supportTickets = [
    {
      id: 1,
      user: 'Ahmed Mohamed',
      subject: 'Billing Issue',
      priority: 'high',
      status: 'open',
      created: '2024-01-20',
      assigned: 'Support Team',
      messages: 3
    },
    {
      id: 2,
      user: 'Sara Ali',
      subject: 'Feature Request',
      priority: 'medium',
      status: 'in-progress',
      created: '2024-01-19',
      assigned: 'Development Team',
      messages: 5
    },
    {
      id: 3,
      user: 'Fatima Ahmed',
      subject: 'Account Access',
      priority: 'high',
      status: 'resolved',
      created: '2024-01-18',
      assigned: 'Support Team',
      messages: 7
    }
  ]

  const userSegments = [
    {
      name: 'Power Users',
      count: 342,
      percentage: 12,
      description: 'Enterprise plan, high engagement',
      color: 'bg-purple-500'
    },
    {
      name: 'Regular Users',
      count: 892,
      percentage: 31,
      description: 'Pro plan, moderate engagement',
      color: 'bg-blue-500'
    },
    {
      name: 'Casual Users',
      count: 1247,
      percentage: 44,
      description: 'Free plan, low engagement',
      color: 'bg-green-500'
    },
    {
      name: 'Inactive Users',
      count: 366,
      percentage: 13,
      description: 'No recent activity',
      color: 'bg-gray-500'
    }
  ]

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus
    const matchesPlan = filterPlan === 'all' || user.plan === filterPlan
    return matchesSearch && matchesStatus && matchesPlan
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500'
      case 'inactive': return 'bg-gray-500'
      case 'pending': return 'bg-yellow-500'
      case 'suspended': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500'
      case 'medium': return 'bg-yellow-500'
      case 'low': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  const getPlanIcon = (plan: string) => {
    switch (plan) {
      case 'Free': return <Star className="w-4 h-4" />
      case 'Pro': return <Crown className="w-4 h-4" />
      case 'Enterprise': return <Gem className="w-4 h-4" />
      default: return <Star className="w-4 h-4" />
    }
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600 mt-1">Manage users, support tickets, and customer relationships</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Users
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add User
          </Button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {userMetrics.map((metric, index) => (
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
        {['overview', 'users', 'support', 'segments'].map((tab) => (
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
          {/* User Segments */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  User Segments
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {userSegments.map((segment, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${segment.color}`} />
                        <span className="font-medium text-gray-900">{segment.name}</span>
                      </div>
                      <span className="text-sm text-gray-600">{segment.count}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`${segment.color} h-2 rounded-full`} 
                        style={{ width: `${segment.percentage}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-600">{segment.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Recent Support Tickets */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Recent Support Tickets
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {supportTickets.slice(0, 4).map((ticket) => (
                    <div key={ticket.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${getPriorityColor(ticket.priority)}`} />
                        <div>
                          <p className="font-medium text-gray-900">{ticket.subject}</p>
                          <p className="text-sm text-gray-600">{ticket.user} • {ticket.created}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={
                          ticket.status === 'open' ? 'bg-red-500' :
                          ticket.status === 'in-progress' ? 'bg-yellow-500' : 'bg-green-500'
                        }>
                          {ticket.status}
                        </Badge>
                        <p className="text-xs text-gray-600 mt-1">{ticket.messages} messages</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Users Tab */}
      {activeTab === 'users' && (
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <CardTitle>All Users</CardTitle>
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
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                </select>
                <select
                  value={filterPlan}
                  onChange={(e) => setFilterPlan(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="all">All Plans</option>
                  <option value="Free">Free</option>
                  <option value="Pro">Pro</option>
                  <option value="Enterprise">Enterprise</option>
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
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Contact</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Plan</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Revenue</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
                          <div>
                            <p className="font-medium text-gray-900">{user.name}</p>
                            <p className="text-sm text-gray-600">{user.location}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600">{user.email}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600">{user.phone}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          {getPlanIcon(user.plan)}
                          <span className="font-medium">{user.plan}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${getStatusColor(user.status)}`} />
                          <span className="text-sm font-medium capitalize">{user.status}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-medium text-gray-900">{user.totalSpent}</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
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
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Support Tab */}
      {activeTab === 'support' && (
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <CardTitle>Support Tickets</CardTitle>
              <div className="flex items-center gap-3">
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                  <option value="all">All Status</option>
                  <option value="open">Open</option>
                  <option value="in-progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                </select>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  New Ticket
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Ticket ID</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">User</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Subject</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Priority</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Assigned</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {supportTickets.map((ticket) => (
                    <tr key={ticket.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <span className="font-medium text-gray-900">#{ticket.id}</span>
                      </td>
                      <td className="py-3 px-4">
                        <p className="font-medium text-gray-900">{ticket.user}</p>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-medium text-gray-900">{ticket.subject}</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${getPriorityColor(ticket.priority)}`} />
                          <span className="text-sm font-medium capitalize">{ticket.priority}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge className={
                          ticket.status === 'open' ? 'bg-red-500' :
                          ticket.status === 'in-progress' ? 'bg-yellow-500' : 'bg-green-500'
                        }>
                          {ticket.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-gray-600">{ticket.assigned}</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <MessageSquare className="w-4 h-4" />
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
      )}

      {/* Segments Tab */}
      {activeTab === 'segments' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Segment Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {userSegments.map((segment, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full ${segment.color}`} />
                        <h3 className="font-medium text-gray-900">{segment.name}</h3>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">{segment.count}</p>
                        <p className="text-sm text-gray-600">{segment.percentage}%</p>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className={`${segment.color} h-3 rounded-full`} 
                        style={{ width: `${segment.percentage}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">{segment.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Segment Behavior</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Engagement Chart</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Key Insights</h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">Power Users Drive Revenue</p>
                        <p className="text-sm text-gray-600">12% of users generate 68% of total revenue</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-yellow-500 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">High Churn Risk</p>
                        <p className="text-sm text-gray-600">44% of casual users show low engagement</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <TrendingUp className="w-5 h-5 text-blue-500 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">Growth Opportunity</p>
                        <p className="text-sm text-gray-600">31% regular users have upgrade potential</p>
                      </div>
                    </div>
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

export default UserManagement