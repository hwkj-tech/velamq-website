import type { MouseEventHandler } from 'react'
import { companyDisplayName } from '../content'

type BrandMarkProps = {
  ariaLabel?: string
  href?: string
  onClick?: MouseEventHandler<HTMLAnchorElement>
}

export function BrandMark({ ariaLabel = '瀚网科技 首页', href = '#home', onClick }: BrandMarkProps) {
  return (
    <a className="brand-mark" href={href} aria-label={ariaLabel} onClick={onClick}>
      <span className="brand-mark__symbol hannet-logo" aria-hidden="true">
        <svg viewBox="0 0 48 48" focusable="false">
          <rect className="logo-frame" x="4" y="4" width="40" height="40" rx="7" />
          <path className="logo-rail logo-rail--left" d="M16 14v20" />
          <path className="logo-rail logo-rail--right" d="M32 14v20" />
          <path className="logo-bridge" d="M16 24h16" />
          <path className="logo-link logo-link--top" d="M16 14l16 10" />
          <path className="logo-link logo-link--bottom" d="M32 34L16 24" />
          <circle className="logo-node logo-node--a" cx="16" cy="14" r="3" />
          <circle className="logo-node logo-node--b" cx="32" cy="24" r="3" />
          <circle className="logo-node logo-node--c" cx="16" cy="34" r="3" />
          <circle className="logo-node logo-node--d" cx="32" cy="34" r="2.5" />
        </svg>
      </span>
      <span className="brand-mark__text">
        <span className="brand-mark__word">{companyDisplayName}</span>
        <span className="brand-mark__meta">HANWANG TECH</span>
      </span>
    </a>
  )
}
