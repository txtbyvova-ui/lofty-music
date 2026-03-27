import MagicRings from './MagicRings'
import StarBorder from './StarBorder'
import TextType from './TextType'

export default function Hero() {
  return (
    <div className="hero">
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <MagicRings
          color="#d829db"
          colorTwo="#8816d4"
          ringCount={5}
          speed={1}
          attenuation={10}
          lineThickness={2.5}
          baseRadius={0.29}
          radiusStep={0.1}
          scaleRate={0.1}
          opacity={1}
          blur={0}
          noiseAmount={0.1}
          rotation={0}
          ringGap={1.5}
          fadeIn={0.7}
          fadeOut={0.5}
          followMouse={false}
          mouseInfluence={0.2}
          hoverScale={1.2}
          parallax={0.05}
          clickBurst={false}
        />
      </div>
      <div className="hero-inner">
        <img
          src="/logo.png"
          alt="Lofty Music"
          className="w-full max-w-[520px] md:max-w-[520px] max-w-[320px] mx-auto mb-6 brightness-0 invert"
        />
        <h2 className="gr" style={{ fontSize: 'clamp(1.2rem,3vw,1.8rem)', fontWeight: 300, marginBottom: '16px', marginTop: '-20px' }}>Один AI-движок. Пять направлений:</h2>
        <div style={{ minHeight: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '16px', fontSize: 'clamp(1rem,2.5vw,1.3rem)', fontWeight: 500 }}>
          <span style={{ color: '#a855f7' }}>→</span>
          <TextType
            phrases={[
              'Генерация треков за секунды',
              'Саундскейпы для ресторанов и кафе',
              'Саундтреки для видео контента',
              'Адаптивная музыка для продуктивности',
              'Голосовое клонирование для бизнеса',
            ]}
            typingSpeed={60}
            deletingSpeed={35}
            pauseDuration={2000}
            showCursor
            cursorCharacter="▌"
            cursorBlinkDuration={0.5}
          />
        </div>
        <p>От генерации треков до музыкального оформления бизнеса — платформа, готовая к масштабированию.</p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <StarBorder
            as="a"
            href="#generator"
            className="cta"
            color="white"
            speed="5s"
          >
            Explore Platform ↓
          </StarBorder>
          <StarBorder
            as="a"
            href="#api"
            className="cta"
            color="white"
            speed="5s"
          >
            API Docs
          </StarBorder>
        </div>
      </div>
    </div>
  )
}
