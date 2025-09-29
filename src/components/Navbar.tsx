import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Leaf, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Admin', href: '/Admin' },

  ];

  const servicesDropdown = [
    { name: 'Carbon Offsetting', href: '/services#carbon-offsetting' },
    { name: 'Renewable Energy', href: '/services#renewable-energy' },
    { name: 'Forest Conservation', href: '/services#forest-conservation' },
    { name: 'Sustainability Consulting', href: '/services#consulting' },
    { name: 'Solar Energy Solutions', href: '/services#solar-energy' },
    { name: 'Community Programs', href: '/services#community' },
  ];

  const projectsDropdown = [
    { name: 'All Projects', href: '/projects' },
    { name: 'Renewable Energy', href: '/projects#1' },
    { name: 'Forest Conservation', href: '/projects?filter=forest' },
    { name: 'Solar Projects', href: '/projects?filter=solar' },
    { name: 'Wind Power', href: '/projects?filter=wind' },
  ];

  return (
    <nav className="bg-white/95 backdrop-blur-sm fixed w-full z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-green-600 p-2 rounded-full">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">EcoCarbon</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`relative px-3 py-2 text-sm font-medium transition-colors duration-300 ${location.pathname === item.href
                    ? 'text-green-600'
                    : 'text-gray-700 hover:text-green-600'
                  }`}
              >
                {item.name}
                {location.pathname === item.href && (
                  <motion.div
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-green-600"
                    layoutId="navbar-indicator"
                  />
                )}
              </Link>
            ))}

            {/* Services Dropdown */}
            <div className="relative group">
              <Link
                to="/services"
                className={`flex items-center px-3 py-2 text-sm font-medium transition-colors duration-300 ${location.pathname === '/services'
                    ? 'text-green-600'
                    : 'text-gray-700 hover:text-green-600'
                  }`}
              >
                Services
                <ChevronDown className="ml-1 h-4 w-4" />
              </Link>

              {/* Dropdown */}
              <div className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-lg opacity-0 invisible 
                  group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-2">
                  {servicesDropdown.map((service) => (
                    <Link
                      key={service.name}
                      to={service.href}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600"
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>


            {/* Projects Dropdown */}
            <div className="relative group">
              <Link
                to="/projects"
                className={`flex items-center px-3 py-2 text-sm font-medium transition-colors duration-300 ${location.pathname.includes('/projects')
                    ? 'text-green-600'
                    : 'text-gray-700 hover:text-green-600'
                  }`}
              >
                Projects
                <ChevronDown className="ml-1 h-4 w-4" />
              </Link>

              {/* Dropdown */}
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible
                  group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-2">
                  {projectsDropdown.map((project) => (
                    <Link
                      key={project.name}
                      to={project.href}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600"
                    >
                      {project.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>


            <Link
              to="/contact"
              className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-colors duration-300"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${location.pathname === item.href
                      ? 'text-green-600 bg-green-50'
                      : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
                    }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to="/services"
                className={`block px-3 py-2 rounded-md text-base font-medium ${location.pathname === '/services'
                    ? 'text-green-600 bg-green-50'
                    : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
                  }`}
                onClick={() => setIsOpen(false)}
              >
                Services
              </Link>
              <Link
                to="/projects"
                className={`block px-3 py-2 rounded-md text-base font-medium ${location.pathname === '/projects'
                    ? 'text-green-600 bg-green-50'
                    : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
                  }`}
                onClick={() => setIsOpen(false)}
              >
                Projects
              </Link>
              <Link
                to="/contact"
                className="block mx-3 mt-4 text-center bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
