import { useEffect, useRef } from 'react';
import { GlassStyles } from './glass-layer';
import { mountGlassLens } from './glass-lens-motion';

export type GlassLensProps = {
  observeSelection?: boolean
  clearMotion?: boolean
  /** The selected value (any change slides the lens). `null` = nothing selected. */
  value: string | number | null
  disabled?: boolean
}

export function GlassLens({ value, disabled = false, clearMotion = false, observeSelection = false }: GlassLensProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const syncRef = useRef<((slide: boolean) => void) | null>(null)

  useEffect(() => mountGlassLens(canvasRef.current, { disabled, clearMotion, observeSelection },
    sync => { syncRef.current = sync }), [disabled, clearMotion, observeSelection])

  useEffect(() => {
    syncRef.current?.(true)
  }, [value])

  return (
    <>
      <GlassStyles />
      <canvas
        ref={canvasRef}
        aria-hidden
        data-glass-route-lens={clearMotion ? '' : undefined}
        style={{ position: 'absolute', zIndex: 30, maxWidth: 'none', pointerEvents: 'none', width: 0, height: 0 }}
      />
    </>
  )
}

export default GlassLens
