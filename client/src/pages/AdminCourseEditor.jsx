import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  ChevronDown,
  Plus,
  Save,
  Trash2,
} from 'lucide-react'
import * as courseService from '../services/courseService'
import * as uploadService from '../services/uploadService'
import PageLoader from '../components/ui/PageLoader'

const emptyCourse = {
  title: '',
  slug: '',
  description: '',
  category: 'MQL5',
  price: 0,
  level: 'beginner',
  duration: '',
  status: 'draft',
  featured: false,
}

const emptyQuestion = () => ({
  prompt: '',
  options: ['', '', '', ''],
  answer: 0,
  explanation: '',
})

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-[0.12em] text-muted">{label}</span>
      {children}
    </label>
  )
}

const inputClass =
  'w-full rounded-lg border border-line bg-input px-3 py-2.5 text-sm text-fg outline-none transition placeholder:text-muted focus:border-[#00d181]/50'

export default function AdminCourseEditor() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isNew = id === 'new'
  const [course, setCourse] = useState(emptyCourse)
  const [modules, setModules] = useState([])
  const [loading, setLoading] = useState(!isNew)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [openModule, setOpenModule] = useState(null)
  const [openLesson, setOpenLesson] = useState(null)
  const [slugLocked, setSlugLocked] = useState(!isNew)

  useEffect(() => {
    if (isNew) return undefined
    let cancelled = false
    setLoading(true)
    courseService
      .getCourseByIdAdmin(id)
      .then((data) => {
        if (cancelled) return
        setCourse({
          title: data.title || '',
          slug: data.slug || '',
          description: data.description || '',
          category: data.category || 'MQL5',
          price: data.price ?? 0,
          level: data.level || 'beginner',
          duration: data.duration || '',
          status: data.status || 'draft',
          featured: Boolean(data.featured),
        })
        setModules(data.modules || [])
      })
      .catch((err) => {
        if (!cancelled) setError(err.message)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [id, isNew])

  const lessonCount = useMemo(
    () => modules.reduce((sum, module) => sum + (module.lessons?.length || 0), 0),
    [modules],
  )

  function flash(text) {
    setMessage(text)
    window.setTimeout(() => setMessage(''), 2500)
  }

  async function refreshCourse(courseId = id) {
    const data = await courseService.getCourseByIdAdmin(courseId)
    setModules(data.modules || [])
    return data
  }

  async function handleSaveCourse(event) {
    event.preventDefault()
    setError('')
    setSaving(true)
    try {
      const payload = {
        ...course,
        price: Number(course.price) || 0,
        featured: Boolean(course.featured),
      }
      if (isNew) {
        const created = await courseService.createCourse({ ...payload, status: payload.status || 'draft' })
        flash('Course created')
        navigate(`/admin/courses/${created._id}`, { replace: true })
        return
      }
      await courseService.updateCourse(id, payload)
      flash('Course saved — published courses show on the public catalog')
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  async function handleAddModule() {
    if (isNew) return
    setSaving(true)
    try {
      await courseService.createModule(id, {
        title: `Module ${modules.length + 1}`,
        description: '',
        isPublished: true,
      })
      await refreshCourse()
      flash('Module added')
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  async function handleSaveModule(module) {
    setSaving(true)
    try {
      await courseService.updateModule(module._id, {
        title: module.title,
        description: module.description || '',
        isPublished: Boolean(module.isPublished),
        order: module.order,
      })
      await refreshCourse()
      flash('Module saved')
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  async function handleDeleteModule(moduleId) {
    if (!window.confirm('Delete this module and all of its lessons?')) return
    setSaving(true)
    try {
      await courseService.deleteModule(moduleId)
      await refreshCourse()
      flash('Module deleted')
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  async function handleAddLesson(moduleId) {
    setSaving(true)
    try {
      await courseService.createLesson(moduleId, {
        title: 'New lesson',
        summary: '',
        type: 'article',
        duration: 10,
        isPublished: true,
        content: [{ heading: 'Overview', body: 'Write the lesson here.' }],
        quiz: { passingScore: 70, questions: [emptyQuestion()] },
      })
      await refreshCourse()
      flash('Lesson added')
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  async function handleSaveLesson(lesson) {
    setSaving(true)
    try {
      await courseService.updateLesson(lesson._id, {
        title: lesson.title,
        summary: lesson.summary || '',
        type: lesson.type,
        duration: Number(lesson.duration) || 0,
        videoUrl: lesson.videoUrl || '',
        code: lesson.code || '',
        isPublished: Boolean(lesson.isPublished),
        content: (lesson.content || []).filter((block) => block.heading && block.body),
        quiz: {
          passingScore: lesson.quiz?.passingScore ?? 70,
          questions: (lesson.quiz?.questions || [])
            .filter((question) => question.prompt)
            .map((question) => ({
              prompt: question.prompt,
              options: (question.options || []).filter(Boolean),
              answer: Number(question.answer) || 0,
              explanation: question.explanation || '',
            })),
        },
      })
      await refreshCourse()
      flash('Lesson saved — learners see this after the course is published')
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  async function handleDeleteLesson(lessonId) {
    if (!window.confirm('Delete this lesson?')) return
    setSaving(true)
    try {
      await courseService.deleteLesson(lessonId)
      await refreshCourse()
      flash('Lesson deleted')
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  function patchModule(moduleId, patch) {
    setModules((current) =>
      current.map((module) => (module._id === moduleId ? { ...module, ...patch } : module)),
    )
  }

  function patchLesson(moduleId, lessonId, patch) {
    setModules((current) =>
      current.map((module) =>
        module._id === moduleId
          ? {
            ...module,
            lessons: (module.lessons || []).map((lesson) =>
              lesson._id === lessonId ? { ...lesson, ...patch } : lesson,
            ),
          }
          : module,
      ),
    )
  }

  if (loading) return <PageLoader label="Loading course editor…" />

  return (
    <section className="py-12 lg:py-16">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <Link
          to="/admin"
          className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-[#00d181]"
        >
          <ArrowLeft size={16} />
          Back to admin
        </Link>

        <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#00d181]">Course editor</p>
            <h1 className="mt-2 text-3xl font-bold text-fg">
              {isNew ? 'Create a course' : course.title || 'Edit course'}
            </h1>
            <p className="mt-2 text-sm text-muted">
              {modules.length} modules · {lessonCount} lessons · changes go live when status is published
            </p>
          </div>
          {!isNew && course.slug && (
            <Link
              to={`/courses/${course.slug}`}
              className="rounded-lg border border-line px-4 py-2 text-sm font-medium text-fg transition hover:border-[#00d181]/40"
            >
              View public page
            </Link>
          )}
        </div>

        {error && (
          <p className="mt-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </p>
        )}
        {message && (
          <p className="mt-6 rounded-lg border border-[#00d181]/30 bg-[#00d181]/10 px-4 py-3 text-sm text-[#00d181]">
            {message}
          </p>
        )}

        <form
          onSubmit={handleSaveCourse}
          className="mt-8 space-y-5 rounded-2xl border border-line bg-surface p-6 shadow-sm"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Title">
              <input
                className={inputClass}
                value={course.title}
                required
                onChange={(event) => {
                  const title = event.target.value
                  setCourse((current) => ({
                    ...current,
                    title,
                    slug: slugLocked ? current.slug : slugify(title),
                  }))
                }}
              />
            </Field>
            <Field label="Slug">
              <input
                className={inputClass}
                value={course.slug}
                required
                onChange={(event) => {
                  setSlugLocked(true)
                  setCourse((current) => ({ ...current, slug: slugify(event.target.value) }))
                }}
              />
            </Field>
            <Field label="Category">
              <input
                className={inputClass}
                value={course.category}
                onChange={(event) => setCourse((current) => ({ ...current, category: event.target.value }))}
              />
            </Field>
            <Field label="Duration label">
              <input
                className={inputClass}
                placeholder="6h 20m"
                value={course.duration}
                onChange={(event) => setCourse((current) => ({ ...current, duration: event.target.value }))}
              />
            </Field>
            <Field label="Price (USD)">
              <input
                type="number"
                min="0"
                step="0.01"
                className={inputClass}
                value={course.price}
                onChange={(event) => setCourse((current) => ({ ...current, price: event.target.value }))}
              />
            </Field>
            <Field label="Level">
              <select
                className={inputClass}
                value={course.level}
                onChange={(event) => setCourse((current) => ({ ...current, level: event.target.value }))}
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </Field>
            <Field label="Status">
              <select
                className={inputClass}
                value={course.status}
                onChange={(event) => setCourse((current) => ({ ...current, status: event.target.value }))}
              >
                <option value="draft">Draft (hidden from users)</option>
                <option value="published">Published (visible to users)</option>
              </select>
            </Field>
            <label className="flex items-center gap-3 pt-6 text-sm text-fg">
              <input
                type="checkbox"
                checked={course.featured}
                onChange={(event) => setCourse((current) => ({ ...current, featured: event.target.checked }))}
              />
              Featured on homepage
            </label>
          </div>
          <Field label="Description">
            <textarea
              rows={4}
              required
              className={inputClass}
              value={course.description}
              onChange={(event) => setCourse((current) => ({ ...current, description: event.target.value }))}
            />
          </Field>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-lg bg-[#00d181] px-5 py-2.5 text-sm font-semibold text-[#0b0e11] transition hover:bg-[#00e891] disabled:opacity-60"
          >
            <Save size={16} />
            {isNew ? 'Create course' : 'Save course details'}
          </button>
        </form>

        {!isNew && (
          <div className="mt-10">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-fg">Curriculum</h2>
              <button
                type="button"
                onClick={handleAddModule}
                className="inline-flex items-center gap-2 rounded-lg border border-line px-4 py-2 text-sm font-medium text-fg transition hover:border-[#00d181]/40"
              >
                <Plus size={16} />
                Add module
              </button>
            </div>

            <div className="space-y-4">
              {modules.length === 0 && (
                <p className="rounded-2xl border border-dashed border-line px-5 py-10 text-center text-sm text-muted">
                  No modules yet. Add one to start building lessons learners will see.
                </p>
              )}
              {modules.map((module) => (
                <article key={module._id} className="overflow-hidden rounded-2xl border border-line bg-surface">
                  <button
                    type="button"
                    onClick={() => setOpenModule(openModule === module._id ? null : module._id)}
                    className="flex w-full items-center justify-between px-5 py-4 text-left"
                  >
                    <div>
                      <p className="font-semibold text-fg">{module.title}</p>
                      <p className="mt-1 text-xs text-muted">
                        {(module.lessons || []).length} lessons · {module.isPublished ? 'visible' : 'hidden'}
                      </p>
                    </div>
                    <ChevronDown
                      className={`h-5 w-5 text-muted transition ${openModule === module._id ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {openModule === module._id && (
                    <div className="space-y-4 border-t border-line px-5 py-5">
                      <div className="grid gap-4 md:grid-cols-2">
                        <Field label="Module title">
                          <input
                            className={inputClass}
                            value={module.title}
                            onChange={(event) => patchModule(module._id, { title: event.target.value })}
                          />
                        </Field>
                        <label className="flex items-center gap-3 pt-6 text-sm text-fg">
                          <input
                            type="checkbox"
                            checked={Boolean(module.isPublished)}
                            onChange={(event) => patchModule(module._id, { isPublished: event.target.checked })}
                          />
                          Visible to users
                        </label>
                      </div>
                      <Field label="Module description">
                        <textarea
                          rows={2}
                          className={inputClass}
                          value={module.description || ''}
                          onChange={(event) => patchModule(module._id, { description: event.target.value })}
                        />
                      </Field>
                      <div className="flex flex-wrap gap-3">
                        <button
                          type="button"
                          onClick={() => handleSaveModule(module)}
                          className="rounded-lg bg-[#00d181] px-4 py-2 text-sm font-semibold text-[#0b0e11]"
                        >
                          Save module
                        </button>
                        <button
                          type="button"
                          onClick={() => handleAddLesson(module._id)}
                          className="rounded-lg border border-line px-4 py-2 text-sm text-fg"
                        >
                          Add lesson
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteModule(module._id)}
                          className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-400"
                        >
                          <Trash2 size={15} />
                          Delete module
                        </button>
                      </div>

                      <div className="space-y-3 pt-2">
                        {(module.lessons || []).map((lesson) => (
                          <div key={lesson._id} className="rounded-xl border border-line bg-page/60 p-4">
                            <button
                              type="button"
                              onClick={() =>
                                setOpenLesson(openLesson === lesson._id ? null : lesson._id)
                              }
                              className="flex w-full items-center justify-between text-left"
                            >
                              <div>
                                <p className="font-medium text-fg">{lesson.title}</p>
                                <p className="text-xs text-muted">
                                  {lesson.type} · {lesson.duration || 0} min ·{' '}
                                  {lesson.isPublished ? 'visible' : 'hidden'}
                                </p>
                              </div>
                              <ChevronDown
                                className={`h-4 w-4 text-muted transition ${openLesson === lesson._id ? 'rotate-180' : ''}`}
                              />
                            </button>

                            {openLesson === lesson._id && (
                              <LessonEditor
                                lesson={lesson}
                                onChange={(patch) => patchLesson(module._id, lesson._id, patch)}
                                onSave={() => handleSaveLesson(lesson)}
                                onDelete={() => handleDeleteLesson(lesson._id)}
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

function LessonEditor({ lesson, onChange, onSave, onDelete }) {
  const content = lesson.content?.length ? lesson.content : [{ heading: '', body: '' }]
  const quiz = lesson.quiz || { passingScore: 70, questions: [emptyQuestion()] }
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')

  async function handleVideoFile(event) {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return

    setUploadError('')
    setUploading(true)
    try {
      const result = await uploadService.uploadLessonVideo(file)
      onChange({
        videoUrl: result.url,
        ...(result.durationMinutes ? { duration: result.durationMinutes } : {}),
      })
    } catch (err) {
      setUploadError(err.message)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="mt-4 space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Lesson title">
          <input className={inputClass} value={lesson.title} onChange={(event) => onChange({ title: event.target.value })} />
        </Field>
        <Field label="Type">
          <select className={inputClass} value={lesson.type || 'article'} onChange={(event) => onChange({ type: event.target.value })}>
            <option value="article">Article</option>
            <option value="video">Video</option>
            <option value="code">Code</option>
            <option value="quiz">Quiz</option>
            <option value="exercise">Exercise</option>
          </select>
        </Field>
        <Field label="Duration (minutes)">
          <input
            type="number"
            min="0"
            className={inputClass}
            value={lesson.duration || 0}
            onChange={(event) => onChange({ duration: event.target.value })}
          />
        </Field>
        <label className="flex items-center gap-3 pt-6 text-sm text-fg">
          <input
            type="checkbox"
            checked={Boolean(lesson.isPublished)}
            onChange={(event) => onChange({ isPublished: event.target.checked })}
          />
          Visible to users
        </label>
      </div>
      <Field label="Summary">
        <textarea
          rows={2}
          className={inputClass}
          value={lesson.summary || ''}
          onChange={(event) => onChange({ summary: event.target.value })}
        />
      </Field>
      <Field label="Video URL">
        <input
          className={inputClass}
          placeholder="Paste a video URL, or upload a file below"
          value={lesson.videoUrl || ''}
          onChange={(event) => onChange({ videoUrl: event.target.value })}
        />
        <div className="mt-2 flex items-center gap-3">
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-line px-3 py-1.5 text-xs font-medium text-fg hover:border-[#00d181]/40">
            <input type="file" accept="video/*" className="hidden" onChange={handleVideoFile} disabled={uploading} />
            {uploading ? 'Uploading…' : 'Upload video file'}
          </label>
          {lesson.videoUrl && !uploading && (
            <span className="truncate text-xs text-muted">{lesson.videoUrl}</span>
          )}
        </div>
        {uploadError && <p className="mt-1 text-xs text-red-400">{uploadError}</p>}
      </Field>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-muted">Lesson sections</p>
          <button
            type="button"
            className="text-xs font-medium text-[#00d181]"
            onClick={() => onChange({ content: [...content, { heading: '', body: '' }] })}
          >
            Add section
          </button>
        </div>
        <div className="space-y-3">
          {content.map((block, index) => (
            <div key={index} className="rounded-lg border border-line p-3">
              <input
                className={`${inputClass} mb-2`}
                placeholder="Heading"
                value={block.heading}
                onChange={(event) => {
                  const next = content.map((item, itemIndex) =>
                    itemIndex === index ? { ...item, heading: event.target.value } : item,
                  )
                  onChange({ content: next })
                }}
              />
              <textarea
                rows={4}
                className={inputClass}
                placeholder="Body"
                value={block.body}
                onChange={(event) => {
                  const next = content.map((item, itemIndex) =>
                    itemIndex === index ? { ...item, body: event.target.value } : item,
                  )
                  onChange({ content: next })
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-muted">Quiz</p>
          <button
            type="button"
            className="text-xs font-medium text-[#00d181]"
            onClick={() =>
              onChange({
                quiz: { ...quiz, questions: [...(quiz.questions || []), emptyQuestion()] },
              })
            }
          >
            Add question
          </button>
        </div>
        <Field label="Passing score">
          <input
            type="number"
            min="0"
            max="100"
            className={inputClass}
            value={quiz.passingScore ?? 70}
            onChange={(event) => onChange({ quiz: { ...quiz, passingScore: Number(event.target.value) } })}
          />
        </Field>
        <div className="mt-3 space-y-4">
          {(quiz.questions || []).map((question, qIndex) => (
            <div key={qIndex} className="rounded-lg border border-line p-3">
              <input
                className={`${inputClass} mb-2`}
                placeholder={`Question ${qIndex + 1}`}
                value={question.prompt}
                onChange={(event) => {
                  const questions = quiz.questions.map((item, index) =>
                    index === qIndex ? { ...item, prompt: event.target.value } : item,
                  )
                  onChange({ quiz: { ...quiz, questions } })
                }}
              />
              {(question.options || []).map((option, oIndex) => (
                <div key={oIndex} className="mb-2 flex items-center gap-2">
                  <input
                    type="radio"
                    name={`answer-${lesson._id}-${qIndex}`}
                    checked={question.answer === oIndex}
                    onChange={() => {
                      const questions = quiz.questions.map((item, index) =>
                        index === qIndex ? { ...item, answer: oIndex } : item,
                      )
                      onChange({ quiz: { ...quiz, questions } })
                    }}
                  />
                  <input
                    className={inputClass}
                    placeholder={`Option ${oIndex + 1}`}
                    value={option}
                    onChange={(event) => {
                      const options = question.options.map((item, index) =>
                        index === oIndex ? event.target.value : item,
                      )
                      const questions = quiz.questions.map((item, index) =>
                        index === qIndex ? { ...item, options } : item,
                      )
                      onChange({ quiz: { ...quiz, questions } })
                    }}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onSave}
          className="rounded-lg bg-[#00d181] px-4 py-2 text-sm font-semibold text-[#0b0e11]"
        >
          Save lesson
        </button>
        <button type="button" onClick={onDelete} className="text-sm text-red-400">
          Delete lesson
        </button>
      </div>
    </div>
  )
}
