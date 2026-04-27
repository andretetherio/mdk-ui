/// <reference path="../../types/react-gauge-chart.d.ts" />
import * as React from 'react'
import ReactGaugeChart from 'react-gauge-chart'
import { COLOR } from '../../constants'
import { cn } from '../../utils'

export type GaugeChartProps = {
  /** Value between 0 and 1 (e.g. 0.75 = 75%) */
  percent: number
  /** Arc colors in HEX format */
  colors?: string[]
  /** Arc thickness (0-1) */
  arcWidth?: number
  /** Number of arc segments */
  nrOfLevels?: number
  /** Hide percentage text */
  hideText?: boolean
  /** Unique id for the chart (required by react-gauge-chart) */
  id?: string
  /** Chart height in pixels or CSS units (e.g. '200px' or '50%') */
  height?: number | string
  className?: string
}

/**
 * GaugeChart - Presentational gauge/speedometer chart
 * Data (percent) must be provided via props; no fetching.
 *
 * @example
 * ```tsx
 * <GaugeChart percent={0.75} colors={['#00FF00', '#FF0000']} />
 * ```
 */
export const GaugeChart = React.forwardRef<HTMLDivElement, GaugeChartProps>(
  (
    {
      percent,
      colors = [COLOR.GREEN, COLOR.RED],
      arcWidth = 0.2,
      nrOfLevels = 3,
      hideText = false,
      id = 'mdk-gauge-chart',
      height = 200,
      className,
    },
    ref,
  ) => {
    const containerRef = React.useRef<HTMLDivElement | null>(null)
    const [width, setWidth] = React.useState<number>(0)

    React.useEffect(() => {
      const currentElement = containerRef.current

      if (!currentElement) return

      const observer = new ResizeObserver(([entry]) => {
        const width = entry!.contentRect.width
        if (width > 0) setWidth(Math.round(width))
      })

      observer.observe(currentElement)
      return () => observer.disconnect()
    }, [])

    return (
      <div
        ref={(node) => {
          containerRef.current = node
          if (typeof ref === 'function') ref(node)
          else if (ref) ref.current = node
        }}
        className={cn('mdk-gauge-chart', className)}
        style={{ height }}
      >
        {width > 0 && (
          <ReactGaugeChart
            key={width}
            id={id}
            percent={Math.max(0, Math.min(1, percent))}
            colors={colors}
            arcWidth={arcWidth}
            nrOfLevels={nrOfLevels}
            hideText={hideText}
            style={{ width: '100%', height: '100%' }}
          />
        )}
      </div>
    )
  },
)
GaugeChart.displayName = 'GaugeChart'
