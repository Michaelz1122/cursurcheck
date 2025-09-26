'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  FileText, 
  Image, 
  Video, 
  FolderOpen, 
  Plus,
  Edit,
  Trash2,
  Eye,
  Download,
  Upload,
  Filter,
  Search,
  Calendar,
  User,
  Tag,
  Star,
  TrendingUp,
  BarChart3,
  MessageSquare,
  Heart,
  Share2,
  Play,
  Clock,
  CheckCircle,
  AlertCircle,
  Settings,
  Grid,
  List,
  Folder,
  File,
  Image as ImageIcon,
  Video as VideoIcon,
  FileText as FileTextIcon,
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownRight,
  ExternalLink,
  Copy,
  Move,
  ArrowRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const ContentManagement = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [viewMode, setViewMode] = useState('grid')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')

  const contentMetrics = [
    {
      title: 'Total Content',
      value: '1,247',
      change: '+156',
      trend: 'up',
      icon: FileText,
      description: 'All content pieces'
    },
    {
      title: 'Portfolio Items',
      value: '89',
      change: '+12',
      trend: 'up',
      icon: FolderOpen,
      description: 'Showcase projects'
    },
    {
      title: 'Avg. Engagement',
      value: '4.2/5',
      change: '+0.3',
      trend: 'up',
      icon: Star,
      description: 'Content rating'
    },
    {
      title: 'Content Views',
      value: '45.2K',
      change: '+12.5%',
      trend: 'up',
      icon: Eye,
      description: 'Total views'
    }
  ]

  const portfolioProjects = [
    {
      id: 1,
      title: 'E-commerce Platform Redesign',
      client: 'TechCorp Solutions',
      category: 'Web Design',
      type: 'project',
      status: 'published',
      featured: true,
      image: '/api/placeholder/400/300',
      views: 2450,
      likes: 89,
      comments: 12,
      date: '2024-01-15',
      tags: ['UI/UX', 'E-commerce', 'React'],
      description: 'Complete redesign of e-commerce platform with modern UI/UX principles'
    },
    {
      id: 2,
      title: 'Mobile App Development',
      client: 'StartupXYZ',
      category: 'Mobile Apps',
      type: 'project',
      status: 'published',
      featured: false,
      image: '/api/placeholder/400/300',
      views: 1890,
      likes: 67,
      comments: 8,
      date: '2024-01-10',
      tags: ['iOS', 'Android', 'React Native'],
      description: 'Cross-platform mobile application for startup company'
    },
    {
      id: 3,
      title: 'Brand Identity Design',
      client: 'Creative Agency',
      category: 'Branding',
      type: 'project',
      status: 'draft',
      featured: false,
      image: '/api/placeholder/400/300',
      views: 0,
      likes: 0,
      comments: 0,
      date: '2024-01-20',
      tags: ['Logo', 'Branding', 'Design'],
      description: 'Complete brand identity package including logo and guidelines'
    }
  ]

  const contentLibrary = [
    {
      id: 1,
      title: '2024 Marketing Trends Guide',
      type: 'blog',
      category: 'Marketing',
      status: 'published',
      author: 'Ahmed Mohamed',
      views: 3420,
      likes: 156,
      comments: 23,
      date: '2024-01-18',
      readTime: '8 min',
      featured: true
    },
    {
      id: 2,
      title: 'Case Study: SaaS Growth Strategy',
      type: 'case-study',
      category: 'Business',
      status: 'published',
      author: 'Sara Ali',
      views: 2890,
      likes: 134,
      comments: 18,
      date: '2024-01-15',
      readTime: '12 min',
      featured: false
    },
    {
      id: 3,
      title: 'Product Demo Video',
      type: 'video',
      category: 'Product',
      status: 'published',
      author: 'Mohamed Hassan',
      views: 5670,
      likes: 289,
      comments: 45,
      date: '2024-01-12',
      duration: '5:30',
      featured: true
    },
    {
      id: 4,
      title: 'Infographic: Digital Marketing Stats',
      type: 'infographic',
      category: 'Marketing',
      status: 'draft',
      author: 'Fatima Ahmed',
      views: 0,
      likes: 0,
      comments: 0,
      date: '2024-01-20',
      readTime: '2 min',
      featured: false
    }
  ]

  const servicePackages = [
    {
      id: 1,
      name: 'Basic Marketing Package',
      price: '$999',
      duration: 'month',
      description: 'Essential marketing services for small businesses',
      features: [
        'Social media management',
        'Basic SEO optimization',
        'Monthly reporting',
        'Email support'
      ],
      popular: false,
      clients: 45
    },
    {
      id: 2,
      name: 'Pro Marketing Suite',
      price: '$2,499',
      duration: 'month',
      description: 'Comprehensive marketing solution for growing businesses',
      features: [
        'Advanced SEO & content strategy',
        'PPC campaign management',
        'Analytics & reporting',
        'Priority support',
        'A/B testing'
      ],
      popular: true,
      clients: 23
    },
    {
      id: 3,
      name: 'Enterprise Marketing',
      price: '$4,999',
      duration: 'month',
      description: 'Full-service marketing for large organizations',
      features: [
        'Custom strategy development',
        'Multi-channel campaigns',
        'Dedicated account manager',
        'Advanced analytics',
        'White-label reporting'
      ],
      popular: false,
      clients: 8
    }
  ]

  const testimonials = [
    {
      id: 1,
      client: 'John Smith',
      company: 'TechCorp Inc.',
      role: 'CEO',
      content: 'Outstanding service and results. Our conversion rates increased by 40% within 3 months.',
      rating: 5,
      date: '2024-01-15',
      verified: true,
      featured: true
    },
    {
      id: 2,
      client: 'Sarah Johnson',
      company: 'StartupXYZ',
      role: 'Marketing Director',
      content: 'Professional team with excellent communication. Delivered exactly what we needed.',
      rating: 4,
      date: '2024-01-10',
      verified: true,
      featured: false
    },
    {
      id: 3,
      client: 'Mike Davis',
      company: 'Creative Agency',
      role: 'Founder',
      content: 'Innovative solutions and great attention to detail. Highly recommend their services.',
      rating: 5,
      date: '2024-01-05',
      verified: true,
      featured: true
    }
  ]

  const contentCategories = [
    { id: 'all', name: 'All Content', count: 1247, icon: FileText },
    { id: 'blog', name: 'Blog Posts', count: 456, icon: FileTextIcon },
    { id: 'case-study', name: 'Case Studies', count: 89, icon: BarChart3 },
    { id: 'video', name: 'Videos', count: 124, icon: VideoIcon },
    { id: 'infographic', name: 'Infographics', count: 67, icon: ImageIcon },
    { id: 'portfolio', name: 'Portfolio', count: 89, icon: FolderOpen }
  ]

  const filteredContent = contentLibrary.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.author.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'all' || item.type === filterType
    return matchesSearch && matchesType
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-500'
      case 'draft': return 'bg-yellow-500'
      case 'archived': return 'bg-gray-500'
      default: return 'bg-gray-500'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'blog': return <FileTextIcon className="w-4 h-4" />
      case 'case-study': return <BarChart3 className="w-4 h-4" />
      case 'video': return <VideoIcon className="w-4 h-4" />
      case 'infographic': return <ImageIcon className="w-4 h-4" />
      default: return <FileText className="w-4 h-4" />
    }
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Content & Portfolio Management</h1>
          <p className="text-gray-600 mt-1">Manage your content library, portfolio, and service offerings</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Content
          </Button>
        </div>
      </div>

      {/* Content Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {contentMetrics.map((metric, index) => (
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
        {['overview', 'portfolio', 'content', 'services', 'testimonials'].map((tab) => (
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
          {/* Recent Portfolio Items */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <FolderOpen className="w-5 h-5" />
                    Recent Portfolio Items
                  </CardTitle>
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {portfolioProjects.slice(0, 4).map((project) => (
                    <div key={project.id} className="bg-gray-50 rounded-lg overflow-hidden">
                      <div className="h-32 bg-gray-200 relative">
                        {project.featured && (
                          <Badge className="absolute top-2 left-2 bg-purple-500">
                            Featured
                          </Badge>
                        )}
                      </div>
                      <div className="p-4">
                        <h4 className="font-medium text-gray-900 mb-1">{project.title}</h4>
                        <p className="text-sm text-gray-600 mb-2">{project.client}</p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{project.category}</span>
                          <span>{project.views} views</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Content Categories */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Folder className="w-5 h-5" />
                  Content Categories
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {contentCategories.map((category) => (
                  <div key={category.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                        <category.icon className="w-4 h-4 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{category.name}</p>
                        <p className="text-sm text-gray-600">{category.count} items</p>
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

      {/* Portfolio Tab */}
      {activeTab === 'portfolio' && (
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <CardTitle>Portfolio Projects</CardTitle>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Project
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {portfolioProjects.map((project) => (
                  <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="h-48 bg-gray-200 relative">
                      {project.featured && (
                        <Badge className="absolute top-2 left-2 bg-purple-500">
                          Featured
                        </Badge>
                      )}
                      <Badge className={`absolute top-2 right-2 ${
                        project.status === 'published' ? 'bg-green-500' : 'bg-yellow-500'
                      }`}>
                        {project.status}
                      </Badge>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 mb-2">{project.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{project.client}</p>
                      <p className="text-sm text-gray-700 mb-3 line-clamp-2">{project.description}</p>
                      
                      <div className="flex flex-wrap gap-1 mb-3">
                        {project.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            {project.views}
                          </span>
                          <span className="flex items-center gap-1">
                            <Heart className="w-4 h-4" />
                            {project.likes}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageSquare className="w-4 h-4" />
                            {project.comments}
                          </span>
                        </div>
                        <span>{project.date}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Project</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Client</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Category</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-900">Views</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-900">Date</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {portfolioProjects.map((project) => (
                      <tr key={project.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gray-200 rounded"></div>
                            <div>
                              <p className="font-medium text-gray-900">{project.title}</p>
                              {project.featured && (
                                <Badge className="bg-purple-500 text-white">Featured</Badge>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-gray-900">{project.client}</span>
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant="outline">{project.category}</Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Badge className={
                            project.status === 'published' ? 'bg-green-500' : 'bg-yellow-500'
                          }>
                            {project.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <span className="font-medium">{project.views.toLocaleString()}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-sm text-gray-600">{project.date}</span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
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
            )}
          </CardContent>
        </Card>
      )}

      {/* Content Library Tab */}
      {activeTab === 'content' && (
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <CardTitle>Content Library</CardTitle>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search content..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="all">All Types</option>
                  <option value="blog">Blog Posts</option>
                  <option value="case-study">Case Studies</option>
                  <option value="video">Videos</option>
                  <option value="infographic">Infographics</option>
                </select>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Content
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredContent.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      {getTypeIcon(item.type)}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{item.title}</h4>
                      <p className="text-sm text-gray-600">By {item.author} • {item.date}</p>
                      <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {item.views.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart className="w-3 h-3" />
                          {item.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageSquare className="w-3 h-3" />
                          {item.comments}
                        </span>
                        {item.readTime && (
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {item.readTime}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={
                      item.status === 'published' ? 'bg-green-500' : 'bg-yellow-500'
                    }>
                      {item.status}
                    </Badge>
                    {item.featured && (
                      <Badge className="bg-purple-500">Featured</Badge>
                    )}
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
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Service Packages Tab */}
      {activeTab === 'services' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {servicePackages.map((service) => (
            <Card key={service.id} className={`relative ${service.popular ? 'ring-2 ring-purple-500' : ''}`}>
              {service.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-purple-500 text-white">
                    Most Popular
                  </Badge>
                </div>
              )}
              <CardHeader className="text-center">
                <CardTitle className="text-xl">{service.name}</CardTitle>
                <p className="text-gray-600 text-sm">{service.description}</p>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{service.price}</span>
                  <span className="text-gray-600">/{service.duration}</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-2">Features</p>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-4 border-t">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">{service.clients}</span> active clients
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Testimonials Tab */}
      {activeTab === 'testimonials' && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5" />
                Client Testimonials
              </CardTitle>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Testimonial
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < testimonial.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    {testimonial.verified && (
                      <Badge className="bg-green-500 text-white">Verified</Badge>
                    )}
                  </div>
                  
                  <p className="text-gray-700 mb-4 italic">"{testimonial.content}"</p>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                    <div>
                      <p className="font-medium text-gray-900">{testimonial.client}</p>
                      <p className="text-sm text-gray-600">{testimonial.role}, {testimonial.company}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xs text-gray-500">{testimonial.date}</span>
                    {testimonial.featured && (
                      <Badge className="bg-purple-500">Featured</Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-2 mt-4">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default ContentManagement