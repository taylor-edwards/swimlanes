(() => {
  const clamp = (min, max, v) => Math.max(min, Math.min(v, max))
  const clampPercent = clamp.bind(null, 0, 1)
  const hslToRgb = (h, s, l) => {
    const lPerc = l / 100
    const a = s * Math.min(lPerc, 1 - lPerc) / 100
    const f = n => {
      const k = (n + h / 30) % 12
      const color = lPerc - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
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

  const area = document.getElementById('color-area')
  const reticle = document.getElementById('reticle')
  const hue = document.getElementById('hue')
  const hslInput = document.getElementById('hsl-input')
  const rgbInput = document.getElementById('rgb-input')
  const hexInput = document.getElementById('hex-input')

  if (area && reticle && hue && hslInput) {
    const state = {
      coords: [0.6, 0.3],// [Math.random() / 2 + 0.5, Math.random() * 0.75],
      frame: null,
      hue: 190, //Math.floor(Math.random() * 360),
      mouseDown: false,
    }

    const render = () => {
      cancelAnimationFrame(state.frame)
      state.frame = requestAnimationFrame(() => {
        // console.log(state)
        const [x, y] = state.coords
        const s = x * 100
        const l = (1 - y) / (1 + x) * 100
        hue.value = state.hue
        reticle.setAttribute('cx', x * 100)
        reticle.setAttribute('cy', y * 100)
        document.body.setAttribute(
          'style',
          `--hue: ${state.hue}deg;` +
            `--hsl: ${state.hue}deg, ${s}%, ${l}%;` +
            `--text: ${l > 25 ? '#000' : '#fff'}`,
        )
        hslInput.value = `hsl(${state.hue}deg, ${Math.trunc(s)}%, ${Math.trunc(l)}%)`
        rgbInput.value = `rgb(${hslToRgb(state.hue, s, l).join(', ')})`
        hexInput.value = `#${hslToHex(state.hue, s, l).join('')}`
      })
    }

    render()

    const updateReticle = e => {
      const bounds = area.getBoundingClientRect()
      const x = clampPercent((e.clientX - bounds.x) / bounds.width)
      const y = clampPercent((e.clientY - bounds.y) / bounds.height)
      state.coords = [x, y]
      render()
    }

    area.addEventListener('mousedown', e => {
      state.mouseDown = true
      updateReticle(e)
    })

    window.addEventListener('mousemove', e => {
      if (state.mouseDown) {
        updateReticle(e)
      }
    })

    window.addEventListener('mouseup', () => {
      state.mouseDown = false
    })

    hue.addEventListener('input', e => {
      state.hue = e.target.value
      render()
    })

    const hslToColorState = (h, s, l) => {
      if (typeof h === 'number' && typeof s === 'number' && typeof l === 'number') {
        const x = s / 100
        const lPerc = l / 100
        const y = 1 - lPerc - (lPerc * x)
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

    hslInput.addEventListener('input', e => {
      try {
        const hsl = e.target.value.split(/[,\(\)]/).slice(1, 4).map(parseFloat)
        const color = hslToColorState(...hsl)
        if (color) {
          state.coords = [color.x, color.y]
          state.hue = Math.round(color.h)
          render()
        }
      } catch (err) {
        console.warn('Uncaught error in HSL input processor:', err)
      }
    })

    rgbInput.addEventListener('input', e => {
      try {
        const rgb = e.target.value.split(/[,\(\)]/).slice(1, 4).map(parseFloat)
        const color = rgbToColorState(...rgb)
        if (color) {
          state.coords = [color.x, color.y]
          state.hue = Math.round(color.h)
          render()
        }
      } catch (err) {
        console.warn('Uncaught error in RGB input processor:', err)
      }
    })

    hexInput.addEventListener('input', e => {
      try {
        const match = e.target.value.match(/([\dA-f]{2})/g)
        if (Array.isArray(match) && match.length === 3) {
          const rgb = match.map(x => parseInt(x, 16))
          const color = rgbToColorState(...rgb)
          if (color) {
            state.coords = [color.x, color.y]
            state.hue = Math.round(color.h)
            render()
          }
        }
      } catch (err) {
        console.warn('Uncaught error in hex input processor:', err)
      }
    })
  }
})()
