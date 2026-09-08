import { Link } from 'react-router-dom'

export default function BrandLogo({ compact = false, onClick }) {
    return (
        <Link to="/" className="flex items-center gap-2 text-fg" onClick={onClick}>
            <img
                src={`${import.meta.env.BASE_URL}favicon.svg`}
                alt="LearnMQL5"
                width={compact ? 32 : 28}
                height={compact ? 32 : 28}
                className={compact ? 'mx-auto h-8 w-8' : 'h-7 w-7'}
            />
            {!compact && (
                <span className="text-lg font-bold tracking-tight">
                    Learn<span className="text-[#00d181]">MQL5</span>
                </span>
            )}
        </Link>
    )
}