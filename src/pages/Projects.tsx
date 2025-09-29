import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Leaf, ArrowRight } from 'lucide-react';
import AnimatedCounter from '../components/AnimatedCounter';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', name: 'All Projects' },
    { id: 'renewable', name: 'Renewable Energy' },
    { id: 'forest', name: 'Forest Conservation' },
    { id: 'solar', name: 'Solar Energy' },
    { id: 'wind', name: 'Wind Power' }
  ];

  const projects = [
    {
      id: 1,
      title: 'Amazon Rainforest Conservation',
      category: 'forest',
      location: 'Brazil',
      year: '2024',
      impact: '500,000',
      unit: 'tonnes CO₂/year',
      image: 'https://images.pexels.com/photos/957024/forest-trees-perspective-bright-957024.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      description: 'Protecting 10,000 hectares of primary rainforest while supporting local communities through sustainable economic alternatives.',
      status: 'Active',
      verified: true
    },
    {
      id: 2,
      title: 'Texas Wind Farm Project',
      category: 'wind',
      location: 'Texas, USA',
      year: '2023',
      impact: '750,000',
      unit: 'tonnes CO₂/year',
      image: 'https://images.pexels.com/photos/414837/pexels-photo-414837.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      description: 'Large-scale wind energy project generating clean electricity for 200,000 homes while creating local jobs.',
      status: 'Active',
      verified: true
    },
    {
      id: 3,
      title: 'Indian Solar Initiative',
      category: 'solar',
      location: 'Rajasthan, India',
      year: '2024',
      impact: '300,000',
      unit: 'tonnes CO₂/year',
      image: 'https://images.pexels.com/photos/356036/pexels-photo-356036.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      description: 'Distributed solar program providing clean energy access to rural communities while reducing emissions.',
      status: 'Active',
      verified: true
    },
    {
      id: 4,
      title: 'African Reforestation Program',
      category: 'forest',
      location: 'Kenya',
      year: '2023',
      impact: '200,000',
      unit: 'tonnes CO₂/year',
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      description: 'Community-led reforestation program planting native species and providing sustainable livelihoods.',
      status: 'Active',
      verified: true
    },
    {
      id: 5,
      title: 'Nordic Hydroelectric Expansion',
      category: 'renewable',
      location: 'Norway',
      year: '2024',
      impact: '450,000',
      unit: 'tonnes CO₂/year',
      image: 'https://images.pexels.com/photos/1108175/pexels-photo-1108175.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      description: 'Upgrading existing hydroelectric infrastructure to increase clean energy generation capacity.',
      status: 'In Development',
      verified: false
    },
    {
      id: 6,
      title: 'California Solar Farm Network',
      category: 'solar',
      location: 'California, USA',
      year: '2023',
      impact: '600,000',
      unit: 'tonnes CO₂/year',
      image: 'https://images.pexels.com/photos/9800029/pexels-photo-9800029.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      description: 'Network of utility-scale solar installations providing clean energy to the California grid.',
      status: 'Active',
      verified: true
    }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop)'
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Our Impact Projects
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-200 max-w-3xl mx-auto"
          >
            Verified carbon offset projects around the world creating measurable environmental and social impact.
          </motion.p>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">
                <AnimatedCounter end={2.8} decimals={1} suffix="M" />
              </div>
              <p className="text-gray-600">Total CO₂ Offset (tonnes)</p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">
                <AnimatedCounter end={25} suffix="+" />
              </div>
              <p className="text-gray-600">Active Projects</p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">
                <AnimatedCounter end={12} suffix="" />
              </div>
              <p className="text-gray-600">Countries</p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">
                <AnimatedCounter end={1.2} decimals={1} suffix="M" />
              </div>
              <p className="text-gray-600">Trees Planted</p>
            </div>
          </div>
        </div>
      </section>

      {/* Project Filters */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  activeFilter === filter.id
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {filter.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      project.status === 'Active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  {project.verified && (
                    <div className="absolute top-4 right-4">
                      <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                        Verified
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{project.description}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {project.location}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {project.year}
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center text-green-600 mb-1">
                          <Leaf className="h-4 w-4 mr-1" />
                          <span className="text-sm font-medium">Carbon Impact</span>
                        </div>
                        <div className="text-2xl font-bold text-gray-900">
                          {project.impact}
                        </div>
                        <div className="text-sm text-gray-500">{project.unit}</div>
                      </div>
                      <button className="bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition-colors">
                        <ArrowRight className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Map Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Global Reach</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our projects span across continents, creating positive environmental impact worldwide.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl shadow-lg p-8 text-center"
          >
            <img 
              src="https://images.pexels.com/photos/355935/pexels-photo-355935.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop"
              alt="World map showing project locations"
              className="w-full rounded-lg"
            />
            <p className="text-gray-600 mt-4">
              Interactive project map showing our global carbon offset initiatives across 12 countries.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Projects;