import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, BookOpen, Loader2 } from 'lucide-react';
import { coursesService } from '../services/api';
import CourseCard from '../components/courses/CourseCard';

export default function Courses() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeLevel, setActiveLevel] = useState('all');
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      coursesService.getAllCourses(),
      coursesService.getCategories()
    ]).then(([coursesData, categoriesData]) => {
      setCourses(coursesData);
      setCategories(categoriesData);
    }).catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchSearch = course.title.en.toLowerCase().includes(search.toLowerCase());
      const matchCat = activeCategory === 'all' || course.category.slug === activeCategory;
      const matchLevel = activeLevel === 'all' || course.level === activeLevel;
      return matchSearch && matchCat && matchLevel;
    });
  }, [search, activeCategory, activeLevel]);

  return (
    <div className="pt-24 pb-20 min-h-screen">
      {/* Header Section */}
      <div className="relative py-16 mb-12 border-b border-white/5 overflow-hidden bg-dark-900/40">
        <div className="absolute inset-0 bg-brand-cyan/5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Explore <span className="gradient-text-purple">Courses</span>
            </h1>
            <p className="text-lg text-white/60 mb-8 text-balance">
              Level up your skills with our expert-led programming courses designed specifically for high school students.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-white/40 group-focus-within:text-brand-cyan transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Search courses (e.g. Python, React...)"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-dark-950/80 border border-white/10 rounded-2xl focus:ring-2 focus:ring-brand-cyan/50 focus:border-brand-cyan outline-none transition-all text-white placeholder-white/30 shadow-card backdrop-blur-md"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar Filters */}
        <aside className="lg:w-64 shrink-0 space-y-8">
          <div className="glass p-6 rounded-2xl border border-white/5 sticky top-24">
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-white/10">
              <Filter className="w-5 h-5 text-brand-purple" />
              <h3 className="font-bold text-lg">Filters</h3>
            </div>

            {/* Categories */}
            <div className="mb-8">
              <h4 className="text-sm font-semibold text-white/40 uppercase tracking-wider mb-4">Categories</h4>
              <div className="space-y-2">
                <button
                  onClick={() => setActiveCategory('all')}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                    activeCategory === 'all' 
                      ? 'bg-brand-purple/20 text-brand-purple font-medium' 
                      : 'text-white/60 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  All Categories
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.slug)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all ${
                      activeCategory === cat.slug 
                        ? 'bg-brand-purple/20 text-brand-purple font-medium' 
                        : 'text-white/60 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span>{typeof cat.name === 'object' ? (cat.name?.en || cat.name?.ar) : cat.name}</span>
                    <span className="text-xs opacity-50">{cat.courses_count || 0}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Levels */}
            <div>
              <h4 className="text-sm font-semibold text-white/40 uppercase tracking-wider mb-4">Level</h4>
              <div className="space-y-2">
                {['all', 'beginner', 'intermediate', 'advanced'].map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setActiveLevel(lvl)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm capitalize transition-all ${
                      activeLevel === lvl 
                        ? 'bg-brand-cyan/20 text-brand-cyan font-medium' 
                        : 'text-white/60 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>
            
          </div>
        </aside>

        {/* Main Content Grid */}
        <main className="flex-grow">
          {/* Results Count */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-brand-cyan" />
              {filteredCourses.length} {filteredCourses.length === 1 ? 'Course' : 'Courses'} Found
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {isLoading ? (
              <div className="col-span-full flex justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-brand-cyan" />
              </div>
            ) : (
              <AnimatePresence mode="popLayout">
                {filteredCourses.map((course, index) => (
                  <CourseCard key={course.id} course={course} index={index} />
                ))}
              </AnimatePresence>
            )}
          </div>

          {!isLoading && filteredCourses.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="text-center py-20 glass rounded-2xl"
            >
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-10 h-10 text-white/20" />
              </div>
              <h3 className="text-xl font-bold mb-2">No courses found</h3>
              <p className="text-white/50">Try adjusting your filters or search query.</p>
              <button 
                onClick={() => { setSearch(''); setActiveCategory('all'); setActiveLevel('all'); }}
                className="mt-6 px-6 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
              >
                Clear all filters
              </button>
            </motion.div>
          )}
        </main>

      </div>
    </div>
  );
}
