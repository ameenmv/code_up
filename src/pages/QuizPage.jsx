import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, Clock, HelpCircle, CheckCircle2, XCircle, ArrowRight, RotateCcw, Loader2 } from 'lucide-react';
import { quizzesService } from '../services/api';

export default function QuizPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [quizData, setQuizData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [result, setResult] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    quizzesService.getQuizDetails(id)
      .then(setQuizData)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, [id]);

  if (isLoading) return <div className="min-h-screen flex items-center justify-center bg-dark-950"><Loader2 className="w-10 h-10 animate-spin text-brand-cyan" /></div>;
  if (!quizData) return <div className="min-h-screen flex items-center justify-center bg-dark-950 text-white/50">Quiz not found.</div>;

  const questions = quizData.questions || [];
  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleSelectChoice = (choiceId) => {
    if (isSubmitted) return;
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion.id]: choiceId
    });
  };

  const handleNext = () => {
    if (!selectedAnswers[currentQuestion.id]) return; // require answer
    if (isLastQuestion) {
      submitQuiz();
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const submitQuiz = async () => {
    setIsSubmitting(true);
    try {
      const response = await quizzesService.submitQuiz(id, selectedAnswers);
      setResult(response);
      setIsSubmitted(true);
    } catch (err) {
      console.error('Failed to submit quiz', err);
      // Fallback if backend does not return full result payload
      let newScore = 0;
      questions.forEach(q => {
        const correctChoice = q.choices.find(c => c.is_correct);
        if (correctChoice && selectedAnswers[q.id] === correctChoice.id) {
          newScore += 1;
        }
      });
      setResult({ score: newScore, total: questions.length });
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const scorePercentage = result ? (result.score / result.total) * 100 : 0;
  const passed = scorePercentage >= 70;

  if (isSubmitted) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-4 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full glass p-8 md:p-12 rounded-[2.5rem] border border-white/10 shadow-card text-center"
        >
          <div className="w-24 h-24 rounded-full mx-auto flex items-center justify-center mb-6">
            {passed ? (
              <div className="absolute inset-0 bg-brand-emerald/20 blur-xl rounded-full" />
            ) : (
             <div className="absolute inset-0 bg-brand-pink/20 blur-xl rounded-full" /> 
            )}
            {passed ? (
              <CheckCircle2 className="w-20 h-20 text-brand-emerald relative z-10" />
            ) : (
              <XCircle className="w-20 h-20 text-brand-pink relative z-10" />
            )}
          </div>
          
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            {passed ? 'Congratulations!' : 'Keep Learning!'}
          </h1>
          <p className="text-white/60 mb-8 text-lg">
            You scored <span className={`font-bold ${passed ? 'text-brand-emerald' : 'text-brand-pink'}`}>{Math.round(scorePercentage)}%</span> on this quiz.
          </p>

          <div className="bg-dark-900 border border-white/5 rounded-2xl p-6 text-left mb-8 max-h-96 overflow-y-auto custom-scrollbar space-y-6">
            <h3 className="font-bold text-lg border-b border-white/10 pb-4">Review Answers</h3>
            {questions.map((q, idx) => {
              const selected = selectedAnswers[q.id];
              const correctChoice = q.choices.find(c => c.is_correct);
              const isRight = correctChoice ? selected === correctChoice.id : false;
              
              return (
                <div key={q.id} className="space-y-2">
                  <div className="flex gap-2 text-white/90">
                    <span className="font-bold">{idx + 1}.</span> 
                    <span>{q.text.en}</span>
                  </div>
                  <div className="pl-6 flex items-center gap-2">
                     {isRight ? (
                       <span className="text-brand-emerald text-sm flex items-center gap-1"><CheckCircle2 className="w-4 h-4"/> Correct</span>
                     ) : (
                       <span className="text-brand-pink text-sm flex items-center gap-1"><XCircle className="w-4 h-4"/> Incorrect</span>
                     )}
                  </div>
                  {!isRight && (
                    <div className="pl-6 text-sm text-white/50 bg-white/5 p-3 rounded-lg border border-white/10 mt-2">
                      <span className="text-brand-cyan font-semibold">Explanation:</span> {q.explanation.en}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <div className="flex gap-4 justify-center">
            <button 
              onClick={() => { setIsSubmitted(false); setCurrentQuestionIndex(0); setSelectedAnswers({}); }}
              className="px-6 py-3 rounded-xl border border-white/10 hover:bg-white/5 transition-colors flex items-center gap-2 font-medium"
            >
              <RotateCcw className="w-4 h-4" /> Try Again
            </button>
            <button 
              onClick={() => navigate('/dashboard')}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-brand-violet to-brand-indigo hover:opacity-90 transition-opacity flex items-center gap-2 font-medium"
            >
              Return Home <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 max-w-4xl mx-auto flex flex-col justify-center">
      
      {/* Header Info */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3 glass px-4 py-2 rounded-xl border border-white/10">
          <BrainCircuit className="w-5 h-5 text-brand-purple" />
          <span className="font-semibold text-sm">{typeof quizData.title === 'object' ? (quizData.title?.en || quizData.title?.ar) : (quizData.title || 'Quiz')}</span>
        </div>
        <div className="flex items-center gap-2 text-brand-cyan font-mono glass px-4 py-2 rounded-xl border border-white/10">
          <Clock className="w-5 h-5" />
          <span>15:00</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-xs text-white/50 font-bold mb-2 uppercase tracking-wider">
          <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-2 w-full bg-dark-900 rounded-full overflow-hidden border border-white/5">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-gradient-to-r from-brand-violet to-brand-cyan rounded-full" 
          />
        </div>
      </div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={currentQuestion.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="glass p-8 md:p-12 rounded-[2rem] border border-white/10 shadow-card flex-grow flex flex-col"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-8 leading-relaxed flex items-start gap-4">
            <span className="text-brand-purple/50 text-4xl leading-none">Q.</span>
            {currentQuestion.text.en}
          </h2>

          <div className="space-y-4 mb-12">
            {currentQuestion.choices.map((choice, i) => {
              const isSelected = selectedAnswers[currentQuestion.id] === choice.id;
              
              return (
                <button
                  key={choice.id}
                  onClick={() => handleSelectChoice(choice.id)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between group ${
                    isSelected 
                      ? 'bg-brand-purple/20 border-brand-purple shadow-glow-sm' 
                      : 'bg-dark-900/50 border-white/10 hover:border-brand-purple/50 hover:bg-white/5'
                  }`}
                >
                  <span className="text-lg font-medium">{choice.text.en}</span>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                    isSelected ? 'border-brand-purple bg-brand-purple' : 'border-white/20 group-hover:border-brand-purple/50'
                  }`}>
                    {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                  </div>
                </button>
              )
            })}
          </div>

          <div className="mt-auto flex justify-end pt-6 border-t border-white/5">
            <button 
              onClick={handleNext}
              disabled={!selectedAnswers[currentQuestion?.id] || isSubmitting}
              className="px-8 py-4 rounded-xl font-bold text-lg bg-white text-dark-950 hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
            >
              {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : (isLastQuestion ? 'Submit Quiz' : 'Next Question')}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>

    </div>
  );
}
