import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PlayCircle, CheckCircle2, FileText, ArrowLeft, Menu, X, ChevronRight } from 'lucide-react';
import { COURSES, LESSONS } from '../data/mockData';

export default function Classroom() {
  const { courseId, lessonId } = useParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Fallback to first course/lesson if no ID
  const course = COURSES.find(c => c.id === parseInt(courseId || '1', 10)) || COURSES[0];
  const [activeLesson, setActiveLesson] = useState(LESSONS[0]);

  return (
    <div className="flex h-screen overflow-hidden bg-dark-950 top-0 left-0 fixed w-full z-50">
      
      {/* Mobile Sidebar Toggle */}
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden absolute top-4 left-4 z-50 w-10 h-10 rounded-xl bg-dark-900 border border-white/10 flex items-center justify-center text-white"
      >
        {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Sidebar (Curriculum) */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.aside 
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="w-80 shrink-0 h-full bg-dark-900 border-r border-white/5 flex flex-col absolute lg:relative z-40"
          >
            <div className="p-6 border-b border-white/5">
              <Link to={`/courses/${course.id}`} className="text-sm text-brand-cyan hover:text-brand-cyan/80 flex items-center gap-2 mb-4 transition-colors">
                <ArrowLeft className="w-4 h-4" /> Back to Course
              </Link>
              <h2 className="font-bold text-lg leading-tight text-white mb-2">{course.title.en}</h2>
              
              <div className="flex items-center gap-2 mt-4">
                <div className="w-full h-1.5 bg-dark-950 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-brand-violet to-brand-cyan w-[40%]" />
                </div>
                <span className="text-xs text-white/50 font-bold">40%</span>
              </div>
            </div>

            <div className="flex-grow overflow-y-auto custom-scrollbar p-4 space-y-2">
              {LESSONS.map((lesson, idx) => {
                const isActive = activeLesson.id === lesson.id;
                return (
                  <button
                    key={lesson.id}
                    onClick={() => { setActiveLesson(lesson); if(window.innerWidth < 1024) setIsSidebarOpen(false); }}
                    className={`w-full flex items-start gap-3 p-3 rounded-xl transition-all text-left ${
                      isActive ? 'bg-brand-purple/20 border border-brand-purple/30' : 'hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {lesson.is_completed ? (
                        <CheckCircle2 className={`w-5 h-5 ${isActive ? 'text-brand-cyan' : 'text-brand-emerald'}`} />
                      ) : (
                        <PlayCircle className={`w-5 h-5 ${isActive ? 'text-brand-purple' : 'text-white/20'}`} />
                      )}
                    </div>
                    <div className="flex-grow">
                      <div className={`text-sm font-medium ${isActive ? 'text-white font-semibold' : 'text-white/70'}`}>
                        {idx + 1}. {lesson.title.en}
                      </div>
                      <div className="text-xs text-white/40 mt-1 flex items-center gap-1.5">
                        <FileText className="w-3 h-3" /> {lesson.duration_minutes} min
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-grow h-full bg-dark-950 relative overflow-y-auto">
        <div className="max-w-5xl mx-auto px-4 sm:px-8 py-8 lg:py-12">
          
          <div className="flex items-center gap-2 text-brand-cyan text-sm font-bold mb-4">
            <span className="tracking-widest uppercase text-xs">Module 1</span> 
            <ChevronRight className="w-4 h-4 text-white/30" />
            <span className="text-white/70 font-normal">Lesson {activeLesson.order}</span>
          </div>

          <h1 className="text-3xl lg:text-4xl font-bold mb-8">{activeLesson.title.en}</h1>

          {/* Video Player Mockup / Iframe container */}
          <div className="aspect-video w-full rounded-2xl overflow-hidden glass border border-white/10 mb-8 relative group shadow-card">
            {/* If there was a real video, iframe goes here. For now, a mock cover */}
            <div className="absolute inset-0 bg-dark-900 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-brand-purple/20 flex items-center justify-center cursor-pointer group-hover:scale-110 transition-transform duration-300">
                <PlayCircle className="w-10 h-10 text-brand-purple ml-1" />
              </div>
            </div>
            {/* Real implementation would use: <iframe src={activeLesson.video_embed} ... /> */}
          </div>

          {/* Lesson Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12 pb-8 border-b border-white/5">
            <p className="text-white/60">Watch the video above, then read the supplementary materials below before continuing.</p>
            <button className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-brand-emerald/80 to-brand-cyan/80 hover:from-brand-emerald hover:to-brand-cyan transition-all text-dark-950 flex items-center gap-2 shadow-glow-sm hover:shadow-glow-cyan">
              <CheckCircle2 className="w-5 h-5" />
              Mark as Complete
            </button>
          </div>

          {/* Lesson Written Content */}
          <article className="prose prose-invert prose-brand max-w-none">
            <h3 className="text-2xl font-semibold mb-4 text-white">Lesson Notes</h3>
            <p className="text-white/70 leading-relaxed mb-6 text-lg">
              In this lesson, we covered the fundamental building blocks of programming. A variable is simply a container for storing data values. Unlike other programming languages, Python has no command for declaring a variable.
            </p>
            
            <div className="bg-dark-900 border border-white/10 rounded-xl overflow-hidden mb-6">
              <div className="flex items-center px-4 py-2 border-b border-white/5 bg-dark-950">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <div className="text-xs text-white/30 ml-4 font-code">python_example.py</div>
              </div>
              <pre className="p-4 overflow-x-auto text-sm font-code text-white/80">
<code className="text-brand-pink">x</code> <span className="text-brand-cyan">=</span> <span className="text-brand-emerald">5</span>
<code className="text-brand-pink">y</code> <span className="text-brand-cyan">=</span> <span className="text-brand-emerald">"John"</span>
<br/>
<span className="text-brand-purple">print</span>(x)
<span className="text-brand-purple">print</span>(y)
              </pre>
            </div>
            
            <h4 className="text-xl font-semibold mt-8 mb-3 text-white">Key Takeaways</h4>
            <ul className="list-disc pl-5 space-y-2 text-white/70 text-lg">
              <li>Variables do not need to be declared with any particular type.</li>
              <li>Python is a dynamically typed language.</li>
              <li>String variables can be declared either by using single or double quotes.</li>
            </ul>
          </article>

          {/* Next Lesson Button */}
          <div className="mt-16 pt-8 border-t border-white/5 flex justify-between">
            <Link to={`/quiz/${course.id}`} className="px-6 py-3 rounded-xl bg-brand-purple/20 text-brand-purple hover:bg-brand-purple/30 transition-colors flex items-center gap-2 font-bold my-auto">
              Test your knowledge
            </Link>
            <button className="px-6 py-3 rounded-xl border border-white/10 hover:bg-white/5 transition-colors flex items-center gap-2 text-white">
              Next Lesson <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </main>

    </div>
  );
}
