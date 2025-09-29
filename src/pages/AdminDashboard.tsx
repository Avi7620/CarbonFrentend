import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Mail, 
  Building2, 
  Phone, 
  Calendar,
  Search,
  Download,
  RefreshCw,
  MessageSquare,
  Settings,
  ChevronDown,
  TrendingUp,
  Clock,
  LogOut
} from 'lucide-react';

type FormSubmission = {
  id: number;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  service?: string;
  message: string;
  created_at?: string;
};

const API_BASE = "https://ecocarbonbackend.onrender.com/api";

function Admin() {
  const [formSubmissions, setFormSubmissions] = useState<FormSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedService, setSelectedService] = useState('all');

  const servicesOptions = [
    'Web Development',
    'Mobile App Development',
    'Digital Marketing',
    'Graphic Design',
    'E-commerce Development',
    'Consulting',
    'SEO Services',
    'UI/UX Design'
  ];

  // Check authentication on component mount
  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    try {
      const response = await fetch(`${API_BASE}/admin/check-auth`, {
        credentials: 'include'
      });
      
      if (!response.ok) {
        window.location.href = '/admin-login';
        return;
      }
      
      setAuthLoading(false);
      fetchData();
    } catch (error) {
      console.error("Auth check failed:", error);
      window.location.href = '/admin-login';
    }
  };

  // Fetch data from Flask API
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/contacts`, {
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      
      const data = await response.json();
      setFormSubmissions(data);
    } catch (error) {
      console.error("Error fetching submissions:", error);
      alert("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch(`${API_BASE}/admin/logout`, {
        method: 'POST',
        credentials: 'include'
      });
      window.location.href = '/admin-login';
    } catch (error) {
      console.error("Logout error:", error);
      window.location.href = '/admin-login';
    }
  };

  // Filter submissions based on search and service
  const filteredSubmissions = formSubmissions.filter(submission => {
    const matchesSearch = submission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         submission.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (submission.company && submission.company.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesService = selectedService === 'all' || submission.service === selectedService;
    return matchesSearch && matchesService;
  });

  // Calculate statistics
  const totalSubmissions = formSubmissions.length;
  const todaySubmissions = formSubmissions.filter(sub => {
    if (!sub.created_at) return false;
    const today = new Date();
    const submissionDate = new Date(sub.created_at);
    return today.toDateString() === submissionDate.toDateString();
  }).length;

  const thisWeekSubmissions = formSubmissions.filter(sub => {
    if (!sub.created_at) return false;
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);
    
    const submissionDate = new Date(sub.created_at);
    return submissionDate >= startOfWeek && submissionDate <= now;
  }).length;

  // Service distribution
  const serviceStats = servicesOptions.map(service => ({
    service,
    count: formSubmissions.filter(sub => sub.service === service).length
  })).filter(stat => stat.count > 0);

  // Export to CSV function
  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Company', 'Phone', 'Service', 'Message', 'Submitted At'];
    const csvContent = [
      headers.join(','),
      ...filteredSubmissions.map(submission => [
        `"${submission.name}"`,
        `"${submission.email}"`,
        `"${submission.company || ''}"`,
        `"${submission.phone || ''}"`,
        `"${submission.service || ''}"`,
        `"${submission.message.replace(/"/g, '""')}"`,
        `"${submission.created_at || ''}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `form-submissions-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Format date function
  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateString;
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 text-blue-600 mx-auto mb-4 animate-spin" />
          <p className="text-gray-500 text-lg">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20">
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 mt-1">Manage and track all website form submissions</p>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={exportToCSV}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <Download className="w-4 h-4" />
                <span>Export CSV</span>
              </button>
              <button 
                onClick={fetchData}
                disabled={loading}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>
              <button 
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Rest of your dashboard content remains the same */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Submissions</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{totalSubmissions}</p>
                <p className="text-xs text-green-600 mt-1 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  All time
                </p>
              </div>
              <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Today</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{todaySubmissions}</p>
                <p className="text-xs text-blue-600 mt-1 flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  Last 24 hours
                </p>
              </div>
              <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">This Week</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{thisWeekSubmissions}</p>
                <p className="text-xs text-purple-600 mt-1 flex items-center">
                  <Calendar className="w-3 h-3 mr-1" />
                  Last 7 days
                </p>
              </div>
              <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Services Distribution */}
        {serviceStats.length > 0 && (
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
              <Settings className="w-5 h-5 mr-2 text-blue-600" />
              Services Requested
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {serviceStats.map((stat, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border hover:shadow-md transition-all duration-200">
                  <span className="text-sm font-medium text-gray-700">{stat.service}</span>
                  <span className="text-lg font-bold text-blue-600 bg-blue-100 px-3 py-1 rounded-full">{stat.count}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Search and Filter */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by name, email, or company..."
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="relative">
              <select
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm min-w-[200px]"
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
              >
                <option value="all">All Services</option>
                {servicesOptions.map(service => (
                  <option key={service} value={service}>{service}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-20">
            <div className="text-center">
              <RefreshCw className="w-12 h-12 text-blue-600 mx-auto mb-4 animate-spin" />
              <p className="text-gray-500 text-lg">Loading submissions...</p>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <MessageSquare className="w-5 h-5 mr-2 text-blue-600" />
                Form Submissions
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Showing {filteredSubmissions.length} of {totalSubmissions} submissions
              </p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Company</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Phone</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Service</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Message</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Submitted At</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredSubmissions.map((submission, index) => (
                    <tr key={submission.id} className={`hover:bg-blue-50 transition-all duration-200 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="p-2 bg-blue-100 rounded-full mr-3">
                            <Users className="w-4 h-4 text-blue-600" />
                          </div>
                          <span className="font-medium text-gray-900">{submission.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="p-2 bg-green-100 rounded-full mr-3">
                            <Mail className="w-4 h-4 text-green-600" />
                          </div>
                          <span className="text-gray-900">{submission.email}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="p-2 bg-purple-100 rounded-full mr-3">
                            <Building2 className="w-4 h-4 text-purple-600" />
                          </div>
                          <span className="text-gray-900">{submission.company || "-"}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="p-2 bg-orange-100 rounded-full mr-3">
                            <Phone className="w-4 h-4 text-orange-600" />
                          </div>
                          <span className="text-gray-900">{submission.phone || "-"}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {submission.service ? (
                          <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                            {submission.service}
                          </span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4 max-w-xs">
                        <div className="text-sm text-gray-900 truncate" title={submission.message}>
                          {submission.message}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="p-2 bg-gray-100 rounded-full mr-3">
                            <Calendar className="w-4 h-4 text-gray-600" />
                          </div>
                          <span className="text-sm text-gray-900">{formatDate(submission.created_at)}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredSubmissions.length === 0 && (
                    <tr>
                      <td colSpan={7} className="text-center py-16">
                        <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 text-lg">No submissions found.</p>
                        <p className="text-gray-400 text-sm mt-2">Try adjusting your search or filter criteria.</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Admin;