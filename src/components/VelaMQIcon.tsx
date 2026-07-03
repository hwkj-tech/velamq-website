import { useId } from 'react'

type VelaMQIconProps = {
  className?: string
  label?: string
}

export function VelaMQIcon({ className, label }: VelaMQIconProps) {
  const id = useId()
  const sailAId = `${id}-velamq-sail-a`
  const sailBId = `${id}-velamq-sail-b`
  const bgId = `${id}-velamq-icon-bg`
  const accessibilityProps = label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true }

  return (
    <svg className={className} focusable="false" viewBox="0 0 64 64" {...accessibilityProps}>
      <defs>
        <linearGradient id={sailAId} x1="15%" x2="82%" y1="12%" y2="92%">
          <stop offset="0%" stopColor="#8df5e4" />
          <stop offset="52%" stopColor="#00acc1" />
          <stop offset="100%" stopColor="#00897b" />
        </linearGradient>
        <linearGradient id={sailBId} x1="8%" x2="92%" y1="28%" y2="82%">
          <stop offset="0%" stopColor="#dffdf8" />
          <stop offset="58%" stopColor="#55d6cf" />
          <stop offset="100%" stopColor="#00acc1" />
        </linearGradient>
        <radialGradient id={bgId} cx="50%" cy="42%" r="68%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="58%" stopColor="#edfdfa" />
          <stop offset="100%" stopColor="#d9f7f3" />
        </radialGradient>
      </defs>
      <rect width="64" height="64" rx="14" fill={`url(#${bgId})`} stroke="#9fe7df" strokeWidth="1.4" />
      <path
        className="velamq-icon__sail velamq-icon__sail--back"
        d="M12 20 C22 27 29 35 32 44 C26 48 20 50 15 50 C16 38 15 29 12 20 Z"
        fill={`url(#${sailBId})`}
      />
      <path
        className="velamq-icon__sail"
        d="M18 51 C30 47 40 35 50 10 C54 25 54 39 49 50 C39 47 31 51 22 56 C21 56 19 54 18 51 Z"
        fill={`url(#${sailAId})`}
      />
      <path className="velamq-icon__wave" d="M13 50 C24 54 33 41 42 39 C47 38 51 40 54 42" />
      <path className="velamq-icon__route" d="M13 50 C25 52 35 42 42 30 C45 25 47 20 49 15" />
      <circle className="velamq-icon__node" cx="24" cy="49" r="4.3" />
      <circle className="velamq-icon__node" cx="38" cy="38" r="4.3" />
      <circle className="velamq-icon__node" cx="49" cy="21" r="4.3" />
    </svg>
  )
}
