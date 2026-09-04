import { useMemo, useState } from 'react'
import { CheckCircle2, RotateCcw, XCircle } from 'lucide-react'

export default function LessonQuiz({ quiz, onSubmit }) {
  const questions = quiz.questions
  const passingScore = quiz.passingScore ?? 70
  const [answers, setAnswers] = useState({})
  const [result, setResult] = useState(null)

  const allAnswered = questions.every((question) => answers[question.id] !== undefined)

  const scorePreview = useMemo(() => {
    if (!result) return 0
    return result.score
  }, [result])

  function handleSubmit(event) {
    event.preventDefault()
    if (!allAnswered) return

    const correctCount = questions.filter((question) => answers[question.id] === question.answer).length
    const score = Math.round((correctCount / questions.length) * 100)
    const passed = score >= passingScore
    const payload = { score, passed, correctCount, total: questions.length }
    setResult(payload)
    onSubmit?.(payload)
  }

  function handleRetry() {
    setAnswers({})
    setResult(null)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm text-muted">Post-class quiz</p>
          <h3 className="mt-1 text-lg font-semibold text-fg">Pass with {passingScore}% or higher</h3>
        </div>
        {result && (
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              result.passed ? 'bg-[#00d181]/15 text-[#00d181]' : 'bg-red-500/15 text-red-400'
            }`}
          >
            {scorePreview}% · {result.passed ? 'Passed' : 'Try again'}
          </span>
        )}
      </div>

      {questions.map((question, index) => {
        const selected = answers[question.id]
        const showReview = Boolean(result)
        const isCorrect = selected === question.answer

        return (
          <fieldset key={question.id} className="rounded-2xl border border-line bg-card p-4">
            <legend className="px-1 text-sm font-medium text-fg">
              {index + 1}. {question.prompt}
            </legend>
            <div className="mt-3 space-y-2">
              {question.options.map((option, optionIndex) => {
                const checked = selected === optionIndex
                let optionClass = 'border-line hover:border-[#00d181]/30'
                if (checked && !showReview) optionClass = 'border-[#00d181]/50 bg-[#00d181]/10'
                if (showReview && optionIndex === question.answer) optionClass = 'border-[#00d181]/50 bg-[#00d181]/10'
                if (showReview && checked && !isCorrect) optionClass = 'border-red-500/40 bg-red-500/10'

                return (
                  <label
                    key={option}
                    className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3 transition ${optionClass} ${
                      showReview ? 'cursor-default' : ''
                    }`}
                  >
                    <input
                      type="radio"
                      name={question.id}
                      value={optionIndex}
                      checked={checked}
                      disabled={showReview}
                      onChange={() => setAnswers((current) => ({ ...current, [question.id]: optionIndex }))}
                      className="mt-0.5 h-4 w-4 accent-[#00d181]"
                    />
                    <span className="text-sm text-fg">{option}</span>
                  </label>
                )
              })}
            </div>
            {showReview && (
              <p className={`mt-3 flex items-start gap-2 text-sm ${isCorrect ? 'text-[#00d181]' : 'text-red-400'}`}>
                {isCorrect ? <CheckCircle2 size={16} className="mt-0.5 shrink-0" /> : <XCircle size={16} className="mt-0.5 shrink-0" />}
                {question.explanation}
              </p>
            )}
          </fieldset>
        )
      })}

      {result ? (
        <button
          type="button"
          onClick={handleRetry}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-line px-4 py-2.5 text-sm font-semibold text-fg transition hover:border-[#00d181]/40 hover:text-[#00d181]"
        >
          <RotateCcw size={16} />
          {result.passed ? 'Retake quiz' : 'Retry quiz'}
        </button>
      ) : (
        <button
          type="submit"
          disabled={!allAnswered}
          className="w-full rounded-lg bg-[#00d181] px-4 py-2.5 text-sm font-semibold text-[#0b0e11] transition hover:bg-[#00e891] disabled:cursor-not-allowed disabled:opacity-50"
        >
          Submit quiz
        </button>
      )}
    </form>
  )
}
