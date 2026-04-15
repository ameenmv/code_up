import { motion } from 'framer-motion';
import { Sparkles, Brain, Award, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CATEGORIES, COURSES } from '../data/mockData';

export default function Home() {
  const featuredCourses = COURSES.filter((c) => c.level === 'beginner').slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-purple/20 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-brand-cyan/20 rounded-full blur-[100px] mix-blend-screen" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 border-white/10"
            >
              <Sparkles className="w-4 h-4 text-brand-cyan" />
              <span className="text-sm font-medium text-white/80">The best way for high schoolers to learn coding</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-tight"
            >
              Start Your Programming <br />
              <span className="gradient-text">Journey Today</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-white/50 mb-10 max-w-2xl mx-auto"
            >
              Learn logical thinking, solve complex problems, and build amazing things.
              No boring lectures, just writing code and having fun.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                to="/register"
                className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-brand-violet to-brand-indigo hover:from-brand-purple hover:to-brand-violet transition-all duration-300 shadow-glow-sm hover:shadow-glow-purple flex items-center justify-center gap-2"
              >
                Start Learning For Free
                <Play className="w-5 h-5 fill-current" />
              </Link>
              <Link
                to="/courses"
                className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-lg border border-white/10 hover:bg-white/5 transition-colors"
              >
                Browse Courses
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Stats Section */}
      <section className="py-12 border-y border-white/5 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/5">
            {[
              { value: '5,000+', label: 'Happy Students' },
              { value: '30+', label: 'Interactive Courses' },
              { value: '10k+', label: 'Lines of Code Written' },
              { value: '4.9/5', label: 'Average Rating' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="text-center px-4"
              >
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">{stat.value}</div>
                <div className="text-sm text-white/50">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Features */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-balance">Why learn with <span className="gradient-text-purple">CodeUp</span>?</h2>
            <p className="text-white/50 max-w-2xl mx-auto">We designed our platform specifically for high school students. It's not just about syntax, it's about thinking.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Brain, title: 'Logical Thinking', desc: 'Train your brain to dissect complex problems and solve them step-by-step.', color: 'text-brand-cyan' },
              { icon: Sparkles, title: 'Interactive Learning', desc: 'No long boring videos. Watch, write code, and see results instantly.', color: 'text-brand-purple' },
              { icon: Award, title: 'Earn Certificates', desc: 'Complete courses, pass quizzes, and earn verifiable certificates for your college applications.', color: 'text-brand-emerald' },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass p-8 rounded-2xl hover:bg-white/10 transition-colors group"
              >
                <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className={`w-7 h-7 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-white/50 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Top Categories */}
      <section className="py-24 bg-black/20 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">Explore Categories</h2>
              <p className="text-white/50">Find what interests you the most.</p>
            </div>
            <Link to="/courses" className="hidden sm:block text-brand-cyan hover:text-brand-cyan/80 font-medium">
              View all courses →
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {CATEGORIES.map((cat, i) => (
              <Link key={cat.id} to={`/courses?category=${cat.slug}`}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="glass p-6 rounded-2xl text-center hover:border-brand-purple/50 hover:shadow-glow-sm transition-all"
                >
                  <div className="text-4xl mb-4">{cat.icon}</div>
                  <h3 className="font-semibold text-sm">{cat.name.en}</h3>
                  <div className="text-xs text-white/40 mt-1">{cat.courses_count} courses</div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-violet/10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl aspect-square bg-gradient-to-tr from-brand-purple/20 to-brand-cyan/20 rounded-full blur-[100px]" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">Ready to shape the future?</h2>
          <p className="text-xl text-white/60 mb-10">Join thousands of students who are already learning to code. It is free to start.</p>
          <Link
            to="/register"
            className="inline-flex py-4 px-10 rounded-xl font-bold text-lg bg-white text-dark-950 hover:bg-white/90 hover:scale-105 transition-all duration-300 shadow-glow-cyan"
          >
            Create Your Free Account
          </Link>
        </div>
      </section>
    </div>
  );
}
