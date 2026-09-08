import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
    BarChart3,
    BookOpen,
    GraduationCap,
    Layers,
    Pencil,
    Plus,
    Search,
    Trash2,
    Users,
} from 'lucide-react'
import * as courseService from '../services/courseService'
import * as userService from '../services/userService'
import PageLoader from '../components/ui/PageLoader'
import Seo from '../components/seo/Seo'

export default function AdminDashboard() {
    const navigate = useNavigate()
    const [search, setSearch] = useState('')
    const [courseQuery, setCourseQuery] = useState('')
    const [courses, setCourses] = useState([])
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [busyId, setBusyId] = useState('')

    async function load() {
        const [coursesData, usersData] = await Promise.all([
            courseService.listCoursesAdmin(),
            userService.listUsersAdmin(),
        ])
        setCourses(coursesData)
        setUsers(usersData)
    }

    useEffect(() => {
        let cancelled = false
        setLoading(true)
        load()
            .catch((err) => {
                if (!cancelled) setError(err.message)
            })
            .finally(() => {
                if (!cancelled) setLoading(false)
            })
        return () => {
            cancelled = true
        }
    }, [])

    const filteredUsers = users.filter(
        (user) =>
            user.name.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase()),
    )

    const filteredCourses = courses.filter((course) =>
        `${course.title} ${course.category} ${course.status}`.toLowerCase().includes(courseQuery.toLowerCase()),
    )

    const publishedCount = courses.filter((course) => course.status === 'published').length
    const totalLessons = courses.reduce((sum, course) => sum + (course.totalLessons || 0), 0)

    const adminStats = [
        { label: 'Total learners', value: String(users.length), icon: Users },
        { label: 'Published courses', value: String(publishedCount), icon: BookOpen },
        { label: 'Draft courses', value: String(courses.length - publishedCount), icon: Layers },
        { label: 'Total lessons', value: String(totalLessons), icon: BarChart3 },
    ]

    async function togglePublish(course) {
        setBusyId(course._id)
        try {
            const next = course.status === 'published' ? 'draft' : 'published'
            await courseService.updateCourse(course._id, { status: next })
            await load()
        } catch (err) {
            setError(err.message)
        } finally {
            setBusyId('')
        }
    }

    async function handleDelete(course) {
        if (!window.confirm(`Delete “${course.title}”? Learners will lose access.`)) return
        setBusyId(course._id)
        try {
            await courseService.deleteCourse(course._id)
            await load()
        } catch (err) {
            setError(err.message)
        } finally {
            setBusyId('')
        }
    }

    if (loading) {
        return <PageLoader label="Loading admin data…" />
    }

    return (
        <section className="py-16 lg:py-20">
            <Seo title="Admin" description="LearnMQL5 admin." noindex />
            <div className="mx-auto max-w-7xl px-5 lg:px-8">
                <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                    <div>
                    <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#00d181]">Admin panel</p>
                    <h1 className="mt-2 text-3xl font-bold text-fg sm:text-4xl">Course management</h1>
                    <p className="mt-2 text-sm text-muted">
                        Edit curriculum here. Published courses appear on the public Courses page immediately.
                    </p>
                    </div>
                    <button
                        type="button"
                        onClick={() => navigate('/admin/courses/new')}
                        className="inline-flex items-center gap-2 rounded-lg bg-[#00d181] px-4 py-2.5 text-sm font-semibold text-[#0b0e11] transition hover:bg-[#00e891]"
                    >
                        <Plus size={16} />
                        New course
                    </button>
                </div>

                {error && (
                    <p className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                        {error}
                    </p>
                )}

                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                    {adminStats.map(({ label, value, icon: Icon }) => (
                        <div key={label} className="card-hover rounded-2xl border border-line bg-surface p-5">
                            <div className="flex items-center justify-between">
                                <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#00d181]/10 text-[#00d181]">
                                    <Icon className="h-5 w-5" />
                                </div>
                            </div>
                            <p className="mt-5 text-sm text-muted">{label}</p>
                            <p className="mt-2 text-3xl font-bold text-fg">{value}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-10 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
                    <div className="rounded-2xl border border-line bg-surface p-6">
                        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                            <div>
                            <p className="text-sm text-muted">Course catalog</p>
                            <h2 className="mt-1 text-xl font-bold text-fg">All courses</h2>
                            </div>
                            <div className="relative w-full sm:w-[220px]">
                                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                                <input
                                    value={courseQuery}
                                    onChange={(e) => setCourseQuery(e.target.value)}
                                    placeholder="Search courses"
                                    className="w-full rounded-lg border border-line bg-input py-2 pl-9 pr-3 text-sm text-fg placeholder:text-muted focus:border-[#00d181]/40 focus:outline-none"
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            {filteredCourses.length === 0 && <p className="text-sm text-muted">No courses yet.</p>}
                            {filteredCourses.map((course) => (
                                <div key={course._id} className="card-hover rounded-2xl border border-line bg-card p-4">
                                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                                        <div className="flex items-start gap-4">
                                            <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#00d181]/10 text-[#00d181]">
                                                <GraduationCap className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-semibold text-fg">{course.title}</h3>
                                                <p className="mt-1 text-sm text-muted">{course.category}</p>
                                            </div>
                                        </div>

                                        <span
                                            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${course.status === 'published'
                                                ? 'bg-[#00d181]/10 text-[#00d181]'
                                                : 'bg-[#f59e0b]/10 text-[#f59e0b]'
                                                }`}
                                        >
                                            {course.status}
                                        </span>
                                    </div>

                                    <div className="mt-4 grid gap-3 sm:grid-cols-3">
                                        <Metric label="Modules" value={course.totalModules} />
                                        <Metric label="Lessons" value={course.totalLessons} />
                                        <Metric label="Price" value={`$${Number(course.price).toFixed(2)}`} />
                                    </div>

                                    <div className="mt-4 flex flex-wrap gap-2">
                                        <Link
                                            to={`/admin/courses/${course._id}`}
                                            className="inline-flex items-center gap-1.5 rounded-lg bg-[#00d181] px-3 py-2 text-xs font-semibold text-[#0b0e11]"
                                        >
                                            <Pencil size={13} />
                                            Edit
                                        </Link>
                                        <Link
                                            to={`/courses/${course.slug}`}
                                            className="rounded-lg border border-line px-3 py-2 text-xs font-medium text-fg"
                                        >
                                            Preview
                                        </Link>
                                        <button
                                            type="button"
                                            disabled={busyId === course._id}
                                            onClick={() => togglePublish(course)}
                                            className="rounded-lg border border-line px-3 py-2 text-xs font-medium text-fg disabled:opacity-50"
                                        >
                                            {course.status === 'published' ? 'Unpublish' : 'Publish'}
                                        </button>
                                        <button
                                            type="button"
                                            disabled={busyId === course._id}
                                            onClick={() => handleDelete(course)}
                                            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs text-red-400 disabled:opacity-50"
                                        >
                                            <Trash2 size={13} />
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-2xl border border-line bg-surface p-6">
                        <div className="flex items-center justify-between">
                            <div>
                            <p className="text-sm text-muted">Members</p>
                            <h2 className="mt-1 text-xl font-bold text-fg">All users</h2>
                            </div>
                            <div className="relative w-[180px]">
                                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                                <input
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search users"
                                    className="w-full rounded-lg border border-line bg-input py-2 pl-9 pr-3 text-sm text-fg placeholder:text-muted focus:border-[#00d181]/40 focus:outline-none"
                                />
                            </div>
                        </div>

                        <div className="mt-5 space-y-3">
                            {filteredUsers.length === 0 && <p className="text-sm text-muted">No users found.</p>}
                            {filteredUsers.map((user) => (
                                <div key={user.email} className="rounded-xl border border-line bg-card p-3 transition hover:border-[#00d181]/30">
                                    <div className="flex items-center justify-between gap-3">
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <p className="font-medium text-fg">{user.name}</p>
                                                <span
                                                    className={`h-2 w-2 rounded-full ${user.isVerified ? 'bg-[#00d181]' : 'bg-[#f59e0b]'}`}
                                                    title={user.isVerified ? 'Verified' : 'Not verified'}
                                                />
                                            </div>
                                            <p className="mt-1 text-xs text-muted">{user.email}</p>
                                        </div>
                                        <span className="rounded-full bg-[#00d181]/10 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.08em] text-[#00d181]">
                                            {user.role}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

function Metric({ label, value }) {
    return (
        <div className="rounded-xl border border-line bg-page p-3">
            <p className="text-[11px] uppercase tracking-[0.12em] text-muted">{label}</p>
            <p className="mt-2 text-lg font-bold text-fg">{value}</p>
        </div>
    )
}
