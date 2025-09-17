import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Wrench, 
  HardHat, 
  Building2, 
  Shield, 
  Users, 
  ArrowRight,
  CheckCircle,
  Star,
  TrendingUp
} from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/login');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15
      }
    }
  };

  const floatingAnimation = {
    y: [-10, 10, -10],
    rotate: [-2, 2, -2],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut" as const
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Construction Grid Lines */}
        <motion.div
          className="absolute inset-0 opacity-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 2 }}
        >
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(30, 58, 138, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(30, 58, 138, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }} />
        </motion.div>

        {/* Floating Construction Icons */}
        <motion.div
          className="absolute top-20 left-20 text-construction-blue opacity-10"
          animate={floatingAnimation}
        >
          <HardHat size={80} />
        </motion.div>
        
        <motion.div
          className="absolute top-40 right-32 text-primary opacity-15"
          animate={{...floatingAnimation, transition: {...floatingAnimation.transition, delay: 1}}}
        >
          <Building2 size={60} />
        </motion.div>
        
        <motion.div
          className="absolute bottom-40 left-32 text-construction-blue opacity-10"
          animate={{...floatingAnimation, transition: {...floatingAnimation.transition, delay: 2}}}
        >
          <Wrench size={50} />
        </motion.div>
      </div>

      {/* Main Content */}
      <motion.div
        className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero Section */}
        <motion.div
          className="text-center max-w-6xl mx-auto"
          variants={itemVariants}
        >
          {/* Construction Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Professional Construction Management</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            className="text-6xl md:text-8xl font-bold mb-6 leading-none"
            variants={itemVariants}
          >
            <span className="text-transparent bg-gradient-to-r from-construction-blue via-primary to-construction-blue bg-clip-text">
              BUILDING
            </span>
            <br />
            <span className="text-foreground">DREAMS</span>
            <br />
            <span className="text-transparent bg-gradient-to-r from-primary via-construction-blue to-primary bg-clip-text">
              WITH PRECISION
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Transform your construction projects with our comprehensive management platform. 
            <span className="text-primary font-semibold"> Connect teams</span>, 
            <span className="text-construction-blue font-semibold"> track progress</span>, and 
            <span className="text-primary font-semibold"> deliver excellence</span>.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            variants={itemVariants}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={handleGetStarted}
                size="lg"
                className="bg-gradient-to-r from-primary to-orange-500 hover:from-orange-500 hover:to-primary text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Get Started Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="lg"
                className="glass-card border-2 border-construction-blue text-construction-blue hover:bg-construction-blue hover:text-white px-8 py-6 text-lg font-semibold rounded-xl transition-all duration-300"
              >
                Watch Demo
              </Button>
            </motion.div>
          </motion.div>

          {/* Feature Cards */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
            variants={containerVariants}
          >
            <motion.div
              className="glass-card p-8 text-center rounded-2xl hover:shadow-xl transition-all duration-300"
              variants={itemVariants}
              whileHover={{ 
                y: -10,
                boxShadow: "0 25px 50px -12px rgba(30, 58, 138, 0.25)"
              }}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Team Management</h3>
              <p className="text-muted-foreground">
                Coordinate workers, supervisors, and contractors with real-time communication and task tracking.
              </p>
            </motion.div>

            <motion.div
              className="glass-card p-8 text-center rounded-2xl hover:shadow-xl transition-all duration-300"
              variants={itemVariants}
              whileHover={{ 
                y: -10,
                boxShadow: "0 25px 50px -12px rgba(251, 146, 60, 0.25)"
              }}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-construction-blue to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Progress Tracking</h3>
              <p className="text-muted-foreground">
                Monitor project milestones, budget allocation, and timeline adherence with advanced analytics.
              </p>
            </motion.div>

            <motion.div
              className="glass-card p-8 text-center rounded-2xl hover:shadow-xl transition-all duration-300"
              variants={itemVariants}
              whileHover={{ 
                y: -10,
                boxShadow: "0 25px 50px -12px rgba(34, 197, 94, 0.25)"
              }}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Quality Assurance</h3>
              <p className="text-muted-foreground">
                Ensure safety standards and quality control with digital inspections and automated reporting.
              </p>
            </motion.div>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
            variants={containerVariants}
          >
            {[
              { number: "500+", label: "Projects Completed" },
              { number: "99.9%", label: "Uptime Guarantee" },
              { number: "50K+", label: "Active Users" },
              { number: "4.9★", label: "Customer Rating" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                variants={itemVariants}
              >
                <motion.div
                  className="text-3xl md:text-4xl font-bold text-transparent bg-gradient-to-r from-construction-blue to-primary bg-clip-text mb-2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1 + index * 0.1, type: "spring" as const }}
                >
                  {stat.number}
                </motion.div>
                <p className="text-muted-foreground font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <motion.div
            className="w-6 h-10 border-2 border-construction-blue rounded-full flex justify-center"
            animate={{ 
              borderColor: ["rgba(30, 58, 138, 0.5)", "rgba(251, 146, 60, 0.8)", "rgba(30, 58, 138, 0.5)"] as const
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-1 h-3 bg-primary rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Index;
