'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Shield, 
  Lock, 
  Eye, 
  EyeOff, 
  Fingerprint,
  Key,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  Activity,
  FileText,
  Database,
  Server,
  Globe,
  Mail,
  Phone,
  CreditCard,
  UserCheck,
  Ban,
  Settings,
  Filter,
  Search,
  Download,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Edit,
  Trash2,
  MoreHorizontal,
  Calendar,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Shield as ShieldIcon,
  Lock as LockIcon,
  AlertCircle,
  Info,
  Zap
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const SecurityCompliance = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [timeRange, setTimeRange] = useState('30d')

  const securityMetrics = [
    {
      title: 'Security Score',
      value: '92/100',
      change: '+3',
      trend: 'up',
      icon: Shield,
      description: 'Overall security rating'
    },
    {
      title: 'Active Threats',
      value: '3',
      change: '-2',
      trend: 'down',
      icon: AlertTriangle,
      description: 'Detected threats'
    },
    {
      title: 'Compliance Status',
      value: '98.5%',
      change: '+1.2%',
      trend: 'up',
      icon: CheckCircle,
      description: 'GDPR compliance'
    },
    {
      title: 'Failed Logins',
      value: '127',
      change: '-15%',
      trend: 'down',
      icon: Ban,
      description: 'Last 30 days'
    }
  ]

  const securityAlerts = [
    {
      id: 1,
      type: 'critical',
      title: 'Suspicious Login Activity',
      description: 'Multiple failed login attempts detected from unusual location',
      user: 'system',
      timestamp: '2024-01-20 14:32',
      ip: '192.168.1.100',
      action: 'Block IP and notify user',
      status: 'resolved'
    },
    {
      id: 2,
      type: 'warning',
      title: 'Outdated SSL Certificate',
      description: 'SSL certificate for api.domain.com expires in 7 days',
      user: 'system',
      timestamp: '2024-01-20 12:15',
      ip: 'system',
      action: 'Renew certificate',
      status: 'pending'
    },
    {
      id: 3,
      type: 'info',
      title: 'Security Scan Completed',
      description: 'Weekly vulnerability scan completed with no issues found',
      user: 'system',
      timestamp: '2024-01-20 10:00',
      ip: 'system',
      action: 'Review report',
      status: 'completed'
    }
  ]

  const accessControls = [
    {
      id: 1,
      role: 'Super Admin',
      users: 3,
      permissions: ['Full access', 'User management', 'Billing', 'Security settings'],
      lastModified: '2024-01-15'
    },
    {
      id: 2,
      role: 'Admin',
      users: 8,
      permissions: ['Content management', 'User support', 'Analytics'],
      lastModified: '2024-01-10'
    },
    {
      id: 3,
      role: 'Support',
      users: 15,
      permissions: ['Ticket management', 'Basic analytics'],
      lastModified: '2024-01-08'
    },
    {
      id: 4,
      role: 'User',
      users: 2847,
      permissions: ['Basic access', 'Profile management'],
      lastModified: '2024-01-05'
    }
  ]

  const auditLogs = [
    {
      id: 1,
      user: 'Ahmed Mohamed',
      action: 'User role changed',
      target: 'Sara Ali',
      timestamp: '2024-01-20 15:30',
      ip: '192.168.1.50',
      result: 'success',
      details: 'Changed role from User to Admin'
    },
    {
      id: 2,
      user: 'system',
      action: 'Backup completed',
      target: 'database',
      timestamp: '2024-01-20 14:00',
      ip: 'localhost',
      result: 'success',
      details: 'Daily backup completed successfully'
    },
    {
      id: 3,
      user: 'Sara Ali',
      action: 'Failed login attempt',
      target: 'admin panel',
      timestamp: '2024-01-20 13:45',
      ip: '203.0.113.1',
      result: 'failed',
      details: 'Invalid credentials'
    }
  ]

  const complianceStandards = [
    {
      name: 'GDPR',
      status: 'compliant',
      score: 98,
      lastAudit: '2024-01-15',
      nextAudit: '2024-07-15',
      requirements: 142,
      completed: 140,
      issues: 2
    },
    {
      name: 'SOC 2',
      status: 'compliant',
      score: 95,
      lastAudit: '2024-01-10',
      nextAudit: '2024-07-10',
      requirements: 89,
      completed: 85,
      issues: 4
    },
    {
      name: 'ISO 27001',
      status: 'in-progress',
      score: 87,
      lastAudit: '2024-01-05',
      nextAudit: '2024-07-05',
      requirements: 114,
      completed: 99,
      issues: 15
    }
  ]

  const dataProtection = [
    {
      category: 'Personal Data',
      records: 2847,
      encrypted: true,
      backup: true,
      retention: '7 years',
      lastBackup: '2024-01-20 14:00'
    },
    {
      category: 'Payment Data',
      records: 456,
      encrypted: true,
      backup: true,
      retention: '5 years',
      lastBackup: '2024-01-20 14:00'
    },
    {
      category: 'System Logs',
      records: 15420,
      encrypted: false,
      backup: true,
      retention: '1 year',
      lastBackup: '2024-01-20 14:00'
    }
  ]

  const backupStatus = {
    lastBackup: '2024-01-20 14:00:00',
    nextBackup: '2024-01-21 14:00:00',
    status: 'completed',
    size: '2.4 GB',
    location: 'AWS S3 (us-east-1)',
    retention: '30 days',
    encryption: 'AES-256'
  }

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'critical': return 'border-red-500 bg-red-50'
      case 'warning': return 'border-yellow-500 bg-yellow-50'
      case 'info': return 'border-blue-500 bg-blue-50'
      default: return 'border-gray-500 bg-gray-50'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'bg-green-500'
      case 'in-progress': return 'bg-yellow-500'
      case 'non-compliant': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Security & Compliance</h1>
          <p className="text-gray-600 mt-1">Manage security settings, access controls, and compliance requirements</p>
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
            <Settings className="w-4 h-4 mr-2" />
            Security Settings
          </Button>
        </div>
      </div>

      {/* Security Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {securityMetrics.map((metric, index) => (
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

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        {['overview', 'alerts', 'access', 'compliance', 'audit', 'backup'].map((tab) => (
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
          {/* Security Alerts */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Recent Security Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {securityAlerts.map((alert) => (
                    <div key={alert.id} className={`p-4 rounded-lg border-l-4 ${getAlertColor(alert.type)}`}>
                      <div className="flex items-start gap-3">
                        {alert.type === 'critical' ? (
                          <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                        ) : alert.type === 'warning' ? (
                          <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                        ) : (
                          <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                        )}
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 mb-1">{alert.title}</h4>
                          <p className="text-sm text-gray-600 mb-2">{alert.description}</p>
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>{alert.timestamp} • {alert.ip}</span>
                            <Badge className={
                              alert.status === 'resolved' ? 'bg-green-500' :
                              alert.status === 'pending' ? 'bg-yellow-500' : 'bg-blue-500'
                            }>
                              {alert.status}
                            </Badge>
                          </div>
                          <p className="text-xs font-medium text-gray-700 mt-1">
                            Action: {alert.action}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Backup Status */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  Backup Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-bold text-lg text-green-600">Backup Complete</h3>
                  <p className="text-sm text-gray-600">Last backup successful</p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Last Backup</span>
                    <span className="font-medium">{backupStatus.lastBackup}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Next Backup</span>
                    <span className="font-medium">{backupStatus.nextBackup}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Size</span>
                    <span className="font-medium">{backupStatus.size}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Location</span>
                    <span className="font-medium text-xs">{backupStatus.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Encryption</span>
                    <span className="font-medium">{backupStatus.encryption}</span>
                  </div>
                </div>

                <div className="pt-3 border-t">
                  <Button variant="outline" size="sm" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Download Backup
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Alerts Tab */}
      {activeTab === 'alerts' && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Security Alerts Management
              </CardTitle>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create Alert Rule
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {securityAlerts.map((alert) => (
                <div key={alert.id} className={`p-4 rounded-lg border-l-4 ${getAlertColor(alert.type)}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      {alert.type === 'critical' ? (
                        <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                      ) : alert.type === 'warning' ? (
                        <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                      ) : (
                        <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                      )}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">{alert.title}</h4>
                        <p className="text-sm text-gray-600 mb-2">{alert.description}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>User: {alert.user}</span>
                          <span>IP: {alert.ip}</span>
                          <span>{alert.timestamp}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={
                        alert.status === 'resolved' ? 'bg-green-500' :
                        alert.status === 'pending' ? 'bg-yellow-500' : 'bg-blue-500'
                      }>
                        {alert.status}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Access Control Tab */}
      {activeTab === 'access' && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Access Control & Permissions
              </CardTitle>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Role
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Role</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Users</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Permissions</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Last Modified</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {accessControls.map((role) => (
                    <tr key={role.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <span className="font-medium text-gray-900">{role.role}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-gray-600">{role.users} users</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex flex-wrap gap-1">
                          {role.permissions.slice(0, 2).map((permission, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {permission}
                            </Badge>
                          ))}
                          {role.permissions.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{role.permissions.length - 2} more
                            </Badge>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-gray-600">{role.lastModified}</span>
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

      {/* Compliance Tab */}
      {activeTab === 'compliance' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Compliance Standards
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {complianceStandards.map((standard) => (
                  <div key={standard.name} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-gray-900">{standard.name}</h4>
                        <p className="text-sm text-gray-600">
                          Last audit: {standard.lastAudit}
                        </p>
                      </div>
                      <Badge className={getStatusColor(standard.status)}>
                        {standard.status}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <p className="text-xs text-gray-500">Compliance Score</p>
                        <p className="font-medium">{standard.score}%</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Next Audit</p>
                        <p className="font-medium">{standard.nextAudit}</p>
                      </div>
                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${standard.score}%` }}
                      ></div>
                    </div>

                    <div className="flex justify-between text-xs text-gray-600">
                      <span>{standard.completed}/{standard.requirements} requirements</span>
                      <span className={standard.issues > 0 ? 'text-red-600' : 'text-green-600'}>
                        {standard.issues} issues
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldIcon className="w-5 h-5" />
                Data Protection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dataProtection.map((data) => (
                  <div key={data.category} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-gray-900">{data.category}</h4>
                      <span className="text-sm text-gray-600">{data.records.toLocaleString()} records</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <LockIcon className={`w-4 h-4 ${data.encrypted ? 'text-green-600' : 'text-red-600'}`} />
                        <span className={data.encrypted ? 'text-green-600' : 'text-red-600'}>
                          {data.encrypted ? 'Encrypted' : 'Not Encrypted'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Database className={`w-4 h-4 ${data.backup ? 'text-green-600' : 'text-red-600'}`} />
                        <span className={data.backup ? 'text-green-600' : 'text-red-600'}>
                          {data.backup ? 'Backed Up' : 'No Backup'}
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-between text-xs text-gray-600 mt-3">
                      <span>Retention: {data.retention}</span>
                      <span>Last backup: {data.lastBackup}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Audit Logs Tab */}
      {activeTab === 'audit' && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Audit Logs
              </CardTitle>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search logs..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
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
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Action</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Target</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Timestamp</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">IP Address</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Result</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {auditLogs.map((log) => (
                    <tr key={log.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <span className="font-medium text-gray-900">{log.user}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-gray-600">{log.action}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-gray-600">{log.target}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-gray-600">{log.timestamp}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-gray-600">{log.ip}</span>
                      </td>
                      <td className="py-3 px-4">
                        <Badge className={
                          log.result === 'success' ? 'bg-green-500' : 'bg-red-500'
                        }>
                          {log.result}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-gray-600">{log.details}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Backup Tab */}
      {activeTab === 'backup' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5" />
                Backup Configuration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <div>
                      <h4 className="font-medium text-gray-900">Backup Status: Active</h4>
                      <p className="text-sm text-gray-600">Automated backups are running normally</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Schedule</p>
                      <p className="font-medium">Daily at 2:00 PM</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Retention</p>
                      <p className="font-medium">30 days</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Location</p>
                      <p className="font-medium">AWS S3</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Encryption</p>
                      <p className="font-medium">AES-256</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">Recent Backups</h4>
                  <div className="space-y-2">
                    {[
                      { date: '2024-01-20 14:00', size: '2.4 GB', status: 'completed' },
                      { date: '2024-01-19 14:00', size: '2.3 GB', status: 'completed' },
                      { date: '2024-01-18 14:00', size: '2.5 GB', status: 'completed' }
                    ].map((backup, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{backup.date}</p>
                          <p className="text-sm text-gray-600">{backup.size}</p>
                        </div>
                        <Badge className="bg-green-500">{backup.status}</Badge>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Settings className="w-4 h-4 mr-2" />
                    Configure
                  </Button>
                  <Button size="sm" className="flex-1">
                    <Database className="w-4 h-4 mr-2" />
                    Backup Now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="w-5 h-5" />
                System Security
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <p className="font-bold text-green-600">Secure</p>
                    <p className="text-sm text-gray-600">Firewall Active</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <LockIcon className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <p className="font-bold text-green-600">Encrypted</p>
                    <p className="text-sm text-gray-600">SSL/TLS Enabled</p>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <Clock className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                    <p className="font-bold text-yellow-600">Update Due</p>
                    <p className="text-sm text-gray-600">3 patches pending</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <Zap className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <p className="font-bold text-green-600">Protected</p>
                    <p className="text-sm text-gray-600">DDoS Protection</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Security Recommendations</h4>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                      <p className="text-sm text-gray-700">Enable two-factor authentication for all admin accounts</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                      <p className="text-sm text-gray-700">Update SSL certificate before expiration</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                      <p className="text-sm text-gray-700">Apply pending security patches</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                      <p className="text-sm text-gray-700">Review user access permissions quarterly</p>
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

export default SecurityCompliance