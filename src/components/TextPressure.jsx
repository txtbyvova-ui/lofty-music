import { useRef, useEffect, useCallback } from 'react'

export default function TextPressure({
  text = 'TextPressure',
  fontFamily = 'Inter',
  fontUrl = '',
  width = true,
  weight = true,
  italic = false,
  alpha = false,
  stroke = false,
  flex = true,
  textColor = '#ffffff',
  strokeColor = '#00043a',
  minFontSize = 36,
}) {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const rafRef = useRef(null)
  const fontLoadedRef = useRef(false)

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const W = canvas.width
    const H = canvas.height
    const mx = mouseRef.current.x
    const my = mouseRef.current.y

    ctx.clearRect(0, 0, W, H)

    const chars = text.split('')
    const fontSize = flex
      ? Math.min(Math.max(W / (chars.length * 0.6), minFontSize), H * 0.85)
      : minFontSize

    const totalWidth = chars.length * fontSize * 0.6
    let startX = (W - totalWidth) / 2

    chars.forEach((char, i) => {
      const charX = startX + i * fontSize * 0.6 + fontSize * 0.3
      const charY = H / 2

      const dx = mx - charX
      const dy = my - charY
      const dist = Math.sqrt(dx * dx + dy * dy)
      const maxDist = 200
      const proximity = Math.max(0, 1 - dist / maxDist)

      const wght = weight ? Math.round(100 + proximity * 800) : 400
      const wdth = width ? Math.round(100 + proximity * 25) : 100
      const ital = italic ? proximity : 0
      const a = alpha ? 0.3 + proximity * 0.7 : 1

      let fontStr = ''
      if (italic) fontStr += `oblique ${Math.round(ital * 10)}deg `
      fontStr += `${wght} ${fontSize}px '${fontFamily}', system-ui, sans-serif`

      ctx.save()
      ctx.font = fontStr
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      if (stroke) {
        ctx.strokeStyle = strokeColor
        ctx.lineWidth = 1.5
        ctx.globalAlpha = a
        ctx.strokeText(char, charX, charY)
      }

      ctx.fillStyle = textColor
      ctx.globalAlpha = a
      ctx.fillText(char, charX, charY)
      ctx.restore()
    })

    rafRef.current = requestAnimationFrame(draw)
  }, [text, fontFamily, width, weight, italic, alpha, stroke, flex, textColor, strokeColor, minFontSize])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const resizeCanvas = () => {
      const rect = canvas.parentElement.getBoundingClientRect()
      canvas.width = rect.width * window.devicePixelRatio
      canvas.height = rect.height * window.devicePixelRatio
      canvas.style.width = rect.width + 'px'
      canvas.style.height = rect.height + 'px'
      const ctx = canvas.getContext('2d')
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
      canvas.width = rect.width
      canvas.height = rect.height
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const handleMouse = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    const handleLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 }
    }

    canvas.addEventListener('mousemove', handleMouse)
    canvas.addEventListener('mouseleave', handleLeave)

    if (fontUrl) {
      const font = new FontFace(fontFamily, `url(${fontUrl})`)
      font.load().then((loaded) => {
        document.fonts.add(loaded)
        fontLoadedRef.current = true
      })
    }

    rafRef.current = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      canvas.removeEventListener('mousemove', handleMouse)
      canvas.removeEventListener('mouseleave', handleLeave)
      cancelAnimationFrame(rafRef.current)
    }
  }, [draw, fontFamily, fontUrl])

  return (
    <canvas
      ref={canvasRef}
      style={{ display: 'block', width: '100%', height: '100%', cursor: 'default' }}
    />
  )
}
