import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, BookOpen, Star, Play, CheckCircle2, Lock, ArrowLeft, Award, Loader2 } from 'lucide-react';
import { coursesService } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  const [course, setCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    coursesService.getCourseDetails(id)
      .then(setCourse)
      .catch(err => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [id]);

  const handleEnroll = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    setIsEnrolling(true);
    try {
      await coursesService.enrollCourse(id);
      navigate(`/classroom/${id}`);
    } catch (err) {
      console.error('Failed to enroll:', err);
      // Fallback navigate to classroom if already enrolled
      navigate(`/classroom/${id}`);
    } finally {
      setIsEnrolling(false);
    }
  };

  if (isLoading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-10 h-10 animate-spin text-brand-cyan" /></div>;
  if (error || !course) return <div className="min-h-screen flex items-center justify-center text-white/50">Failed to load course details.</div>;

  return (
    <div className="min-h-screen pt-16">
      
      {/* 1. Hero Section */}
      <section className="relative pt-12 pb-24 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0">
          <img src={course.thumbnail} alt={course.title.en} className="w-full h-full object-cover opacity-20 blur-xl" />
          <div className="absolute inset-0 bg-gradient-to-b from-dark-950/80 via-dark-950 to-dark-950" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <Link to="/courses" className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Courses
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Main Info */}
            <div className="lg:col-span-2">
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-brand-cyan/20 text-brand-cyan capitalize border border-brand-cyan/20">
                  {course.category.name.en}
                </span>
                <span className="px-3 py-1 text-xs font-semibold rounded-full glass capitalize">
                  {course.level} Level
                </span>
                {course.is_free && (
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-brand-emerald/20 text-brand-emerald border border-brand-emerald/20">
                    Free Course
                  </span>
                )}
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance leading-tight">
                {course.title.en}
              </h1>

              <p className="text-lg text-white/60 mb-8 max-w-2xl leading-relaxed">
                {course.description.en}
              </p>

              <div className="flex flex-wrap items-center gap-8 text-sm text-white/70">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full border-2 border-white/10 bg-gradient-to-br from-brand-purple to-brand-cyan flex items-center justify-center font-bold">
                    {course.instructor.username.charAt(0)}
                  </div>
                  <div>
                    <div className="text-white/50 text-xs">Instructor</div>
                    <div className="font-semibold text-white">{course.instructor.username}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 border-l border-white/10 pl-8">
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  <div>
                    <span className="font-bold text-white text-lg group">4.8</span>
                    <span className="text-white/40 ml-1">({course.enrolled_count} students)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sticky Action Card */}
            <div className="lg:col-span-1">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass p-6 rounded-[2rem] border border-white/10 shadow-card sticky top-24"
              >
                <div className="aspect-video rounded-xl overflow-hidden relative mb-6">
                  <img src={course.thumbnail} alt="Course Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <button className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center hover:bg-white/30 transition-all hover:scale-105">
                      <Play className="w-6 h-6 text-white ml-1" fill="currentColor" />
                    </button>
                  </div>
                </div>

                <div className="text-3xl font-bold mb-6">
                  {course.is_free ? (
                    <span className="text-brand-emerald">Free</span>
                  ) : (
                    <span>${course.price}</span>
                  )}
                </div>

                <button onClick={handleEnroll} disabled={isEnrolling} className="w-full py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-brand-violet to-brand-indigo hover:from-brand-purple hover:to-brand-violet transition-all duration-300 shadow-glow-sm hover:shadow-glow-purple flex items-center justify-center gap-2 mb-4 disabled:opacity-50">
                  {isEnrolling ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Enroll Now'}
                </button>
                <p className="text-center text-xs text-white/40 mb-6">Full lifetime access. Certificate of completion included.</p>

                <div className="space-y-4 pt-6 border-t border-white/10">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-white/60 flex items-center gap-2"><Clock className="w-4 h-4" /> Duration</span>
                    <span className="font-medium text-white">{course.duration_hours} Hours</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-white/60 flex items-center gap-2"><BookOpen className="w-4 h-4" /> Lessons</span>
                    <span className="font-medium text-white">{course.lessons_count} Modules</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-white/60 flex items-center gap-2"><Award className="w-4 h-4" /> Extra</span>
                    <span className="font-medium text-white">{course.quizzes_count} Quizzes</span>
                  </div>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Curriculum Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold mb-2">Course Curriculum</h2>
            <p className="text-white/50 mb-10">Step-by-step roadmap to master {course.title.en}</p>

            <div className="space-y-3">
              {(course.lessons || []).map((lesson, idx) => (
                <div 
                  key={lesson.id} 
                  className={`glass p-5 rounded-2xl border flex items-center justify-between transition-all ${
                    lesson.is_free_preview ? 'border-brand-cyan/20 hover:border-brand-cyan/50 hover:bg-white/5' : 'border-white/5 bg-dark-900/50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold ${
                      lesson.is_free_preview ? 'bg-brand-cyan/20 text-brand-cyan' : 'bg-white/5 text-white/50'
                    }`}>
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">{lesson.title.en}</h4>
                      <div className="text-sm text-white/50 mt-1 flex items-center gap-2">
                        <Clock className="w-3 h-3" /> {lesson.duration_minutes} mins
                      </div>
                    </div>
                  </div>

                  <div>
                    {lesson.is_free_preview ? (
                      <button className="text-brand-cyan hover:text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2">
                        <Play className="w-4 h-4 fill-current" /> Preview
                      </button>
                    ) : (
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-white/20">
                        <Lock className="w-5 h-5" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
          </div>
        </div>
      </section>
      
    </div>
  );
}
