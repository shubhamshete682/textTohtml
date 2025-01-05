import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {  Sparkles, Code, Zap, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
// import { Button } from '@/components/ui/button';

const LandingPage = () => {
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate(); 
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900 overflow-hidden">
      {/* Animated background effect */}
      <div className="absolute inset-0 bg-[url('../public/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

      
      {/* Floating shapes background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-72 h-72 bg-purple-500/10 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, 30, 0],
              y: [0, 50, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <motion.div 
        className="relative mx-auto max-w-7xl px-6 pt-20 pb-24 sm:pt-32 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="text-center" variants={itemVariants}>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
            Transform Text to HTML
            <motion.span 
              className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 animate-gradient bg-300%"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              with AI in Seconds
            </motion.span>
          </h1>
          
          <motion.p 
            className="mx-auto mt-6 max-w-2xl text-lg text-gray-300"
            variants={itemVariants}
          >
            Create beautiful, responsive HTML components instantly using natural language. 
            Powered by advanced AI to turn your ideas into code.
          </motion.p>

          {/* Search-like input */}
          <motion.div 
            className="mt-12 flex items-center justify-center gap-4"
            variants={itemVariants}
          >
            <div className="relative flex-1 max-w-xl">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Describe your component..."
                className="w-full px-6 py-4 rounded-full bg-black/30 border border-purple-500/30 text-white placeholder-gray-400 backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
              />
              {/* <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              > */}
                <button 
                  className="absolute right-2 top-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full px-6 py-2"
                //   onMouseEnter={() => setIsHovered(true)}
                //   onMouseLeave={() => setIsHovered(false)}
                  onClick={() => navigate('/generate-html', { state: { code: inputValue } })}
                >
                  Generate 
                  {/* <motion.div
                    animate={ { rotate: 360 } }
                    transition={{ duration: 0.5 }}
                  >
                    <Sparkles className="ml-2 h-4 w-4" />
                  </motion.div> */}
                </button>
              {/* </motion.div> */}
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            {/* <Button 
              variant="ghost" 
              className="mt-8 text-gray-300 hover:text-white transition-colors duration-300"
            >
              Watch the demo <ArrowRight className="ml-2 h-4 w-4" />
            </Button> */}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Features Grid */}
      <motion.div 
        className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Zap className="h-6 w-6 text-purple-400" />,
              title: "Instant Generation",
              description: "Transform your text descriptions into clean, semantic HTML in seconds",
              color: "purple"
            },
            {
              icon: <Code className="h-6 w-6 text-blue-400" />,
              title: "Clean Code",
              description: "Generate well-structured, responsive HTML that follows best practices",
              color: "blue"
            },
            {
              icon: <Shield className="h-6 w-6 text-green-400" />,
              title: "Production Ready",
              description: "Get deployment-ready code that works across all modern browsers",
              color: "green"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="bg-black/20 backdrop-blur-xl border border-purple-500/20 rounded-xl p-6"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className={`rounded-lg bg-${feature.color}-500/20 p-3 w-fit`}>
                {feature.icon}
              </div>
              <h3 className="mt-4 text-xl font-semibold text-white">{feature.title}</h3>
              <p className="mt-2 text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div 
        className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <motion.div 
          className="bg-black/30 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-8 md:p-12"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Start Creating Now
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of developers using AI to accelerate their HTML development workflow
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* <Button 
                className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-full px-8 py-6 text-lg hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
              >
                Try Text to HTML Free <ArrowRight className="ml-2 h-5 w-5" />
              </Button> */}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LandingPage;