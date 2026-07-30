type VelaEdgeIconProps = {
  className?: string
  label?: string
}

export function VelaEdgeIcon({ className, label }: VelaEdgeIconProps) {
  const accessibilityProps = label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true }

  return (
    <svg className={className} focusable="false" viewBox="0 0 64 64" {...accessibilityProps}>
      <rect width="64" height="64" rx="15" fill="#071713" stroke="#67e0bf" strokeWidth="1.2" />
      <path d="M14 16 29.5 47.5" fill="none" stroke="#67e0bf" strokeLinecap="round" strokeWidth="7" />
      <path d="M50 16 34.5 47.5" fill="none" stroke="#55a8ff" strokeLinecap="round" strokeWidth="7" />
      <path
        d="m22 28 10 8 10-8"
        fill="none"
        stroke="#dffbf3"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
      />
      <circle cx="14" cy="16" r="4" fill="#67e0bf" stroke="#071713" strokeWidth="2" />
      <circle cx="50" cy="16" r="4" fill="#55a8ff" stroke="#071713" strokeWidth="2" />
      <circle cx="32" cy="36" r="3.5" fill="#f8fffd" stroke="#071713" strokeWidth="2" />
    </svg>
  )
}
