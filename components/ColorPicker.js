import { useState, useEffect, useRef } from 'react'
import styles from '../styles/ColorPicker.module.scss'

const ColorPicker = ({ className = '', onChange = () => {} }) => {
  const area = useRef(null)

  const [state, setState] = useState({
    coords: [0.57, 0.15],
    hue: 209,
    mouseDown: false,
  })

  const updateReticle = e => {
    if (area) {
      const bounds = area.current.getBoundingClientRect()
      const x = clampPercent((e.clientX - bounds.x) / bounds.width)
      const y = clampPercent((e.clientY - bounds.y) / bounds.height)
      setState(s => ({ ...s, coords: [x, y] }))
    }
  }

  const handleHSLInput = e => {
    try {
      const hsl = e.target.value.split(/[,\(\)]/).slice(1, 4).map(parseFloat)
      const color = hslToColorState(...hsl)
      if (color) {
        setState(s => ({
          ...s,
          coords: [color.x, color.y],
          hue: Math.round(color.h),
        }))
      }
    } catch (err) {
      console.warn('Uncaught error in HSL input processor:', err)
    }
  }

  const handleRGBInput = e => {
    try {
      const rgb = e.target.value.split(/[,\(\)]/).slice(1, 4).map(parseFloat)
      const color = rgbToColorState(...rgb)
      if (color) {
        setState(s => ({
          ...s,
          coords: [color.x, color.y],
          hue: Math.round(color.h),
        }))
      }
    } catch (err) {
      console.warn('Uncaught error in RGB input processor:', err)
    }
  }

  const handleHexInput = e => {
    try {
      const match = e.target.value.match(/([\dA-f]{2})/g)
      if (Array.isArray(match) && match.length === 3) {
        const rgb = match.map(x => parseInt(x, 16))
        const color = rgbToColorState(...rgb)
        if (color) {
          setState(s => ({
            ...s,
            coords: [color.x, color.y],
            hue: Math.round(color.h),
          }))
        }
      }
    } catch (err) {
      console.warn('Uncaught error in hex input processor:', err)
    }
  }

  const updateHue =  e => {
    setState(s => ({ ...s, hue: e.target.value }))
  }

  const pressMouse = e => {
    setState(s => ({ ...s, mouseDown: true }))
    updateReticle(e)
  }

  useEffect(() => {
    const moveMouse =  e => {
      if (state.mouseDown) {
        updateReticle(e)
      }
    }
    window.addEventListener('mousemove', moveMouse)

    const releaseMouse = () => setState(s => ({ ...s, mouseDown: false }))
    window.addEventListener('mouseup', releaseMouse)

    return () => {
      window.removeEventListener('mousemove', moveMouse)
      window.removeEventListener('mouseup', releaseMouse)
    }
  })

  const [x, y] = state.coords
  const s = x * 100
  const l = (1 - y) / (1 + x) * 100
  const style = {
    '--hue': `${state.hue}deg`,
    '--saturation': `${s}%`,
    '--lightness':  `${l}%`,
    '--hsl': 'var(--hue), var(--saturation), var(--lightness)',
    '--text': l > 55 ? 'var(--hue), 75%, 10%' : 'var(--hue), 5%, 99%',
  }

  useEffect(() => onChange(style, { h: state.hue, s, l }), [state.hue, s, l])

  return (
    <div className={`${styles.colorPicker} ${className}`} style={style}>
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        ref={area}
        onMouseDown={pressMouse}
      >
        <defs>
          <linearGradient x1="0%" y1="0%" x2="100%" y2="0%" id="swatch-gradient">
            <stop stopColor="hsl(var(--hue), 0%, 100%)" offset="0%" />
            <stop stopColor="hsl(var(--hue), 100%, 50%)" offset="100%" />
          </linearGradient>
          <linearGradient x1="0%" y1="0%" x2="0%" y2="100%" id="vignette">
            <stop stopColor="rgba(0, 0, 0, 0)" offset="0%" />
            <stop stopColor="rgba(0, 0, 0, 1)" offset="100%" />
          </linearGradient>
        </defs>
        <rect
          fill="url(#swatch-gradient)"
          height="100"
          width="100"
          x="0"
          y="0"
        />
        <rect
          fill="url(#vignette)"
          height="100"
          width="100"
          x="0"
          y="0"
        />
        <circle
          cx={state.coords[0] * 100}
          cy={state.coords[1] * 100}
          fill="hsl(var(--hsl))"
          r="2"
          stroke="#fff"
        />
      </svg>

      <div className={styles.controls}>
        <div className={styles.hueSlider}>
          <input
            type="range"
            min="0"
            max="360"
            value={state.hue}
            onInput={updateHue}
          />
        </div>

        <div className={styles.swatchPreview} />

        <label>
          <span>HSL</span>
          <input
            type="text"
            value={`hsl(${state.hue}deg, ${Math.trunc(s)}%, ${Math.trunc(l)}%)`}
            onChange={handleHSLInput}
          />
        </label>

        <label>
          <span>RGB</span>
          <input
            type="text"
            value={`rgb(${hslToRgb(state.hue, s, l).join(', ')})`}
            onChange={handleRGBInput}
          />
        </label>

        <label>
          <span>Hex</span>
          <input
            type="text"
            value={`#${hslToHex(state.hue, s, l).join('')}`}
            onChange={handleHexInput}
          />
        </label>
      </div>
    </div>
  )
}

const clamp = (min, max, v) => Math.max(min, Math.min(v, max))

const clampPercent = clamp.bind(null, 0, 1)

const hslToRgb = (h, s, l) => {
  l /= 100
  const a = s * Math.min(l, 1 - l) / 100
  const f = n => {
    const k = (n + h / 30) % 12
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
    return Math.round(255 * color)
  }
  return [f(0), f(8), f(4)]
}

const hslToHex = (...hsl) =>
  hslToRgb(...hsl).map(x => x.toString(16).padStart(2, '0'))

const rgbToHsl = (r, g, b) => {
  (r /= 255), (g /= 255), (b /= 255)
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b)
  const l = (max + min) / 2
  let h, s
  if (max == min) {
    h = s = 0 // achromatic
  } else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }
    h /= 6
  }
  return [h * 360, s * 100, l * 100]
}

const hslToColorState = (h, s, l) => {
  if (typeof h === 'number' && typeof s === 'number' && typeof l === 'number') {
    l /= 100
    const x = s / 100
    const y = 1 - l - (l * x)
    if (!isNaN(h) && !isNaN(x) && !isNaN(y)) {
      return { h, x, y }
    }
  }
}

const rgbToColorState = (r, g, b) => {
  if (typeof r === 'number' && typeof g === 'number' && typeof b === 'number') {
    const hsl = rgbToHsl(r, g, b)
    return hslToColorState(...hsl)
  }
}

export default ColorPicker
