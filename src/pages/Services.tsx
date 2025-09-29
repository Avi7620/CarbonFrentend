import { motion } from 'framer-motion';
import { Leaf, Wind, Trees, Sun, BarChart3, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = () => {
  const services = [
    {
      id: "carbon-offsetting", // ✅ Added ID for dynamic route
      icon: <Leaf className="h-12 w-12" />,
      title: 'Carbon Offsetting',
      description: 'Comprehensive carbon footprint analysis and verified offset solutions tailored to your business needs.',
      features: ['Carbon footprint assessment', 'Offset project selection', 'Verification and monitoring', 'Annual reporting'],
      image: 'https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop'
    },
    {
      id: "renewable-energy",
      icon: <Wind className="h-12 w-12" />,
      title: 'Renewable Energy Projects',
      description: 'Investment in wind, solar, and hydroelectric projects that generate clean energy and reduce emissions.',
      features: ['Wind farm development', 'Solar installations', 'Hydroelectric projects', 'Energy storage solutions'],
      image: 'https://images.pexels.com/photos/414837/pexels-photo-414837.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop'
    },
    {
      id: "forest-conservation",
      icon: <Trees className="h-12 w-12" />,
      title: 'Forest Conservation',
      description: 'Protecting existing forests and reforestation projects that preserve biodiversity and capture carbon.',
      features: ['Reforestation programs', 'Forest protection', 'Biodiversity conservation', 'Community engagement'],
      image: 'https://images.pexels.com/photos/957024/forest-trees-perspective-bright-957024.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop'
    },
    {
      id: "sustainability-consulting",
      icon: <BarChart3 className="h-12 w-12" />,
      title: 'Sustainability Consulting',
      description: 'Strategic guidance to help organizations develop and implement comprehensive sustainability programs.',
      features: ['Sustainability strategy', 'ESG reporting', 'Compliance consulting', 'Performance tracking'],
      image: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop'
    },
    {
      id: "solar-energy",
      icon: <Sun className="h-12 w-12" />,
      title: 'Solar Energy Solutions',
      description: 'Large-scale solar installations and distributed solar programs for commercial and industrial clients.',
      features: ['Commercial solar', 'Solar farm development', 'Energy purchase agreements', 'Grid integration'],
      image: 'https://images.pexels.com/photos/356036/pexels-photo-356036.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop'
    },
    {
      id: "community-programs",
      icon: <Users className="h-12 w-12" />,
      title: 'Community Programs',
      description: 'Local community engagement and development programs that create social value alongside environmental benefits.',
      features: ['Community development', 'Education programs', 'Local job creation', 'Capacity building'],
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop'
    }
  ];

  const process = [
    { step: '01', title: 'Assessment', description: 'We analyze your current carbon footprint and sustainability goals.' },
    { step: '02', title: 'Strategy', description: 'Develop a customized offset strategy aligned with your objectives.' },
    { step: '03', title: 'Implementation', description: 'Execute verified carbon offset projects with transparent monitoring.' },
    { step: '04', title: 'Verification', description: 'Third-party verification and detailed impact reporting.' }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(https://images.pexels.com/photos/1108175/pexels-photo-1108175.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop)'
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Our Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-200 max-w-3xl mx-auto"
          >
            Comprehensive carbon offset solutions designed to meet your organization's unique sustainability goals and environmental commitments.
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-48">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-green-600 text-white p-3 rounded-full">
                    {service.icon}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center text-sm text-gray-600">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  {/* ✅ Link goes to service-specific page */}
                  <Link
                    to={`/services/${service.id}`}
                    className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
                  >
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Process</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A systematic approach to carbon offsetting that ensures transparency, effectiveness, and measurable impact.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="bg-green-600 text-white text-2xl font-bold w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full">
                    <ArrowRight className="h-6 w-6 text-green-300 mx-auto" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Start Your Carbon Offset Journey?
            </h2>
            <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
              Contact us today to discuss how our services can help your organization achieve carbon neutrality.
            </p>
            <Link
              to="/contact"
              className="bg-white text-green-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 inline-flex items-center"
            >
              Get Started Today <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;
