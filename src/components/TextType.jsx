import { useState, useEffect, useRef } from 'react'

export default function TextType({
  phrases = [],
  typingSpeed = 60,
  deletingSpeed = 35,
  pauseDuration = 2000,
  showCursor = true,
  cursorCharacter = '▌',
  cursorBlinkDuration = 0.5,
}) {
  const [displayed, setDisplayed] = useState('')
  const [phraseIdx, setPhraseIdx] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const timeoutRef = useRef(null)

  useEffect(() => {
    if (!phrases.length) return

    const current = phrases[phraseIdx]

    if (!isDeleting && displayed === current) {
      timeoutRef.current = setTimeout(() => setIsDeleting(true), pauseDuration)
      return () => clearTimeout(timeoutRef.current)
    }

    if (isDeleting && displayed === '') {
      setIsDeleting(false)
      setPhraseIdx((phraseIdx + 1) % phrases.length)
      return
    }

    const speed = isDeleting ? deletingSpeed : typingSpeed

    timeoutRef.current = setTimeout(() => {
      setDisplayed(
        isDeleting
          ? current.slice(0, displayed.length - 1)
          : current.slice(0, displayed.length + 1)
      )
    }, speed)

    return () => clearTimeout(timeoutRef.current)
  }, [displayed, isDeleting, phraseIdx, phrases, typingSpeed, deletingSpeed, pauseDuration])

  return (
    <span>
      {displayed}
      {showCursor && (
        <span
          style={{
            color: '#a855f7',
            animation: `texttype-blink ${cursorBlinkDuration}s step-end infinite`,
          }}
        >
          {cursorCharacter}
        </span>
      )}
      <style>{`
        @keyframes texttype-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </span>
  )
}
