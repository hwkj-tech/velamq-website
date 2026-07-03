import type { SolutionVisualContent } from '../content'
import { VelaMQIcon } from './VelaMQIcon'

const routes = [
  'M96 70 C140 42 196 44 236 82',
  'M96 116 C146 112 190 116 236 106',
  'M238 88 C286 48 344 44 392 76',
  'M238 112 C292 126 340 126 392 112',
] as const

type SolutionScenarioVisualProps = {
  content: SolutionVisualContent
}

function IndustrialScene() {
  return (
    <svg className="solution-scenario-visual__scene" viewBox="0 0 460 188" aria-hidden="true">
      <path className="solution-scene-shadow" d="M52 154 H202" />
      <path className="solution-industrial-building" d="M60 138 V78 L88 96 V78 L118 96 V64 H160 V138 Z" />
      <path className="solution-industrial-roof" d="M118 64 H160 V46 H118 Z" />
      <rect className="solution-industrial-window" x="76" y="108" width="18" height="18" rx="4" />
      <rect className="solution-industrial-window" x="108" y="108" width="18" height="18" rx="4" />
      <rect className="solution-industrial-window solution-industrial-window--accent" x="140" y="108" width="18" height="18" rx="4" />
      <path className="solution-conveyor" d="M50 156 H190" />
      <rect className="solution-conveyor-box solution-conveyor-box--a" x="70" y="142" width="28" height="15" rx="4" />
      <rect className="solution-conveyor-box solution-conveyor-box--b" x="122" y="142" width="28" height="15" rx="4" />
      <path className="solution-arm" d="M176 118 L210 94 L224 110" />
      <circle className="solution-arm-node" cx="176" cy="118" r="7" />
      <circle className="solution-arm-node" cx="210" cy="94" r="7" />
    </svg>
  )
}

function VehicleScene() {
  return (
    <svg className="solution-scenario-visual__scene" viewBox="0 0 460 188" aria-hidden="true">
      <g transform="translate(24 54) scale(0.92)">
        <path className="solution-vehicle-shadow" d="M20 96 H188" />
        <path className="solution-vehicle-body" d="M34 74 H58 L80 46 H132 L156 74 H174 C186 74 195 83 195 95 V100 H34 Z" />
        <path className="solution-vehicle-cabin" d="M72 68 L88 46 H128 L146 68 Z" />
        <rect className="solution-vehicle-window" x="90" y="53" width="31" height="14" rx="4" />
        <rect className="solution-vehicle-window solution-vehicle-window--b" x="128" y="53" width="27" height="14" rx="4" />
        <circle className="solution-vehicle-wheel" cx="64" cy="100" r="16" />
        <circle className="solution-vehicle-wheel" cx="158" cy="100" r="16" />
        <path className="solution-vehicle-signal" d="M54 24 C70 12 98 10 114 22" />
        <path className="solution-vehicle-signal solution-vehicle-signal--b" d="M68 32 C78 25 98 24 110 32" />
      </g>
    </svg>
  )
}

function EnergyScene() {
  return (
    <svg className="solution-scenario-visual__scene" viewBox="0 0 460 188" aria-hidden="true">
      <path className="solution-scene-shadow" d="M52 154 H210" />
      <path className="solution-building-tower" d="M62 150 V58 H122 V150 Z" />
      <path className="solution-building-tower solution-building-tower--back" d="M128 150 V82 H180 V150 Z" />
      <path className="solution-building-roof" d="M62 58 L92 38 L122 58" />
      <rect className="solution-building-window" x="78" y="74" width="12" height="12" rx="3" />
      <rect className="solution-building-window" x="100" y="74" width="12" height="12" rx="3" />
      <rect className="solution-building-window solution-building-window--accent" x="78" y="102" width="12" height="12" rx="3" />
      <rect className="solution-building-window" x="100" y="102" width="12" height="12" rx="3" />
      <rect className="solution-building-window" x="142" y="98" width="12" height="12" rx="3" />
      <rect className="solution-building-window solution-building-window--accent" x="162" y="98" width="12" height="12" rx="3" />
      <path className="solution-energy-bolt" d="M208 62 L190 100 H212 L198 136" />
      <circle className="solution-meter-ring" cx="210" cy="100" r="34" />
    </svg>
  )
}

function CityScene() {
  return (
    <svg className="solution-scenario-visual__scene" viewBox="0 0 460 188" aria-hidden="true">
      <path className="solution-scene-shadow" d="M48 154 H222" />
      <path className="solution-city-block" d="M56 150 V92 H96 V150 Z" />
      <path className="solution-city-block solution-city-block--tall" d="M104 150 V58 H150 V150 Z" />
      <path className="solution-city-block solution-city-block--wide" d="M158 150 V78 H210 V150 Z" />
      <path className="solution-city-antenna" d="M128 58 V34 M116 44 H140" />
      <rect className="solution-city-window" x="70" y="106" width="10" height="10" rx="2" />
      <rect className="solution-city-window solution-city-window--accent" x="116" y="78" width="10" height="10" rx="2" />
      <rect className="solution-city-window" x="138" y="78" width="10" height="10" rx="2" />
      <rect className="solution-city-window" x="174" y="96" width="10" height="10" rx="2" />
      <rect className="solution-city-window solution-city-window--accent" x="194" y="96" width="10" height="10" rx="2" />
      <path className="solution-camera-arm" d="M222 74 H250 L264 88" />
      <rect className="solution-camera-body" x="250" y="78" width="30" height="18" rx="5" />
      <path className="solution-camera-cone" d="M280 82 L302 72 L302 104 L280 94 Z" />
    </svg>
  )
}

function Scene({ kind }: Pick<SolutionVisualContent, 'kind'>) {
  if (kind === 'industrial') {
    return <IndustrialScene />
  }

  if (kind === 'energy') {
    return <EnergyScene />
  }

  if (kind === 'city') {
    return <CityScene />
  }

  return <VehicleScene />
}

export function SolutionScenarioVisual({ content }: SolutionScenarioVisualProps) {
  return (
    <div
      className={`solution-scenario-visual solution-scenario-visual--${content.kind}`}
      role="img"
      aria-label={content.ariaLabel}
    >
      <div className="solution-scenario-visual__status" aria-hidden="true">
        <span>{content.hubCaption}</span>
        <strong>live</strong>
      </div>

      <div className="solution-scenario-visual__mesh" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <div className="solution-scenario-visual__chips solution-scenario-visual__chips--left">
        {content.inputs.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>

      <Scene kind={content.kind} />

      <svg className="solution-scenario-visual__routes" viewBox="0 0 460 188" aria-hidden="true">
        {routes.map((route, index) => (
          <path className={`solution-scenario-route solution-scenario-route--${index + 1}`} d={route} key={route} />
        ))}
        {routes.map((route, index) => (
          <circle className={`solution-scenario-packet solution-scenario-packet--${index + 1}`} key={`${route}-packet`} r="4">
            <animateMotion begin={`${index * 0.42}s`} dur={`${5.4 + index * 0.34}s`} path={route} repeatCount="indefinite" />
          </circle>
        ))}
      </svg>

      <div className="solution-scenario-visual__hub">
        <VelaMQIcon className="solution-scenario-visual__hub-icon" />
        <strong>VelaMQ</strong>
        <span>{content.hubCaption}</span>
      </div>

      <div className="solution-scenario-visual__chips solution-scenario-visual__chips--right">
        {content.outputs.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </div>
  )
}
