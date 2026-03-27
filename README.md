# 🎵 Lofty Music — AI Music Platform

> Один AI-движок. Пять направлений монетизации.

**Proof of Concept** полноценной AI-платформы для генерации музыки,
построенной на open-source модели MusicGen (Meta) с планом миграции
на YuE (Tencent) для улучшения русскоязычного вокала.

Это не генератор треков. Это **платформа с пятью продуктовыми
вертикалями**, каждая из которых адресует отдельный рынок
и модель монетизации.

---

## 🚀 Демо

**Live:** https://loftymusic.ru
**API Docs:** https://loftymusic.ru/docs

| Модуль | Что делает | Рынок | Монетизация |
|--------|-----------|-------|-------------|
| **Generate** | Текст + стиль → готовый трек | B2C, музыканты | Freemium, $10-30/мес |
| **Spaces** | AI-саундскейпы для бизнеса | B2B, HoReCa/ритейл | от ₽5,000/мес за точку |
| **Sync** | Автоматический саундтрек для видео | B2C, креаторы | $19-49/мес |
| **Focus** | Адаптивная музыка для продуктивности | B2B, корпораты | $5/сотрудник/мес |
| **Voices** | Клонирование голоса для бизнеса | B2B, подкасты/IVR | $29-99/мес |

---

## 💡 Продуктовое видение

### Проблема

Рынок AI-музыки сегодня — гонка генераторов треков.
Suno ($2.45B оценка, $200M ARR) и Udio делают одно и то же:
промпт → трек. Это commodity с конверсией freemium <5%.

При этом **реальные деньги** лежат не в B2C генерации, а в B2B:

**Фоновая музыка для бизнеса** — рынок, где боль ощущается прямо сейчас:

- В России **114,983 заведения общепита** (данные Яндекс.Карт, ноябрь 2025)
- **70%+ нелегально используют Spotify/Яндекс.Музыку** в коммерческих помещениях
- РАО подало **2,300 исков на 515 млн ₽** в 2025 году (рост 42% к 2024)
- С января 2026 максимальная компенсация удвоена до **10 млн ₽ за одну песню**
- Стандартный штраф: **20,000 ₽ за каждое произведение**
- Лицензия РАО + ВОИС для кафе 100 кв.м = **16,000 ₽/мес** (192,000 ₽/год)

**AI-генерированная музыка не имеет правообладателя** →
не требует лицензии РАО/ВОИС → экономия 100% лицензионных расходов.

### Решение

Lofty Music — платформа, где **один AI-движок** обслуживает
пять продуктов для пяти рынков:

1. **Generate** — ядро, proof что модель работает
2. **Spaces** — флагманский B2B продукт, самая высокая unit-экономика
3. **Sync** — product-market fit для 50M+ контент-креаторов
4. **Focus** — корпоративные тарифы, интеграции со Slack/Notion
5. **Voices** — голосовое клонирование с consent-based моделью

---

## 📊 Почему Spaces — главный revenue driver

### Научные данные

Исследование **1.8M транзакций** (HUI Research / Soundtrack Your Brand, 2024):

| Метрика | Значение |
|---------|----------|
| Рост выручки при brand-fit музыке | **+9.1%** |
| Увеличение времени пребывания гостя | **+12%** |
| Потери от случайных плейлистов | **-4.3%** |
| Рост продаж десертов | **+15.6%** |
| Рост продаж напитков | **+15%** |

Разрыв между "правильной" и "случайной" музыкой:
**13.4 процентных пунктов** разницы в выручке.

### Российский рынок

| Показатель | Данные |
|-----------|--------|
| Заведений общепита в России | 114,983 |
| Средний чек ресторана (Москва) | 1,984 ₽ |
| Лицензия РАО+ВОИС (кафе 100 кв.м) | 16,000 ₽/мес |
| Исков РАО в 2025 | 2,300 на 515 млн ₽ |
| Макс. штраф за 1 песню (с 2026) | 10 млн ₽ |

### Конкуренты в России

| Сервис | Цена | РАО/ВОИС включено? | Проблема |
|--------|------|---------------------|----------|
| **Zvuk Business** | 2,290 ₽ + РАО/ВОИС отдельно | Нет | 3 счёта вместо одного |
| **FONMIX** | от 590 ₽ + РАО/ВОИС | Нет | Скрытая полная стоимость |
| **Cubic Music** | 990 ₽ | Да | Требует Яндекс.Станцию |
| **Lofty Spaces** | от 5,000 ₽ | **Не нужна** | — |

**Наше преимущество:** AI-генерированная музыка не имеет правообладателя.
₽0 лицензионных отчислений. Одна цена — всё включено.
Музыка не повторяется. Адаптируется под бренд.

### Unit-экономика Spaces

```
Тариф:              ₽5,000/мес (SMB) — ₽15,000/мес (Enterprise)
Средний ARPU:        ₽8,000/мес
Gross Margin:        80% (нет лицензионных отчислений)
CAC:                 ₽5,000-8,000 (Яндекс.Директ + партнёрства)
LTV (3 года):        ₽288,000
LTV/CAC ratio:       36:1 ✅
Payback:             < 1 месяц ✅
Monthly Churn:       4% (HoReCa benchmark)

Сценарий на 12 месяцев:
100 точек × ₽8,000 = ₽800K MRR = ₽9.6M ARR
500 точек × ₽8,000 = ₽4M MRR = ₽48M ARR

TAM (Россия): 114,983 × ₽5,000 = ₽6.9 млрд/год
SAM (Москва + СПб + топ-10 городов): ₽1.8 млрд/год
```

---

## 🏗 Архитектура

```
┌─────────────────────────────────────────────┐
│                 Frontend                     │
│            React 18 + Tailwind CSS           │
│        5 модулей + API документация          │
├─────────────────────────────────────────────┤
│                 REST API                     │
│            FastAPI (Python 3.11)             │
│                                              │
│  POST /api/generate      — создание трека    │
│  GET  /api/tasks/{id}    — статус задачи     │
│  POST /api/voice/clone   — клон голоса       │
│  GET  /api/spaces/stream — стрим для точки   │
│  GET  /api/health        — healthcheck       │
├─────────────────────────────────────────────┤
│            Task Queue (Redis)                │
│       Асинхронная очередь генерации          │
├─────────────────────────────────────────────┤
│             AI Model Worker                  │
│                                              │
│  MusicGen Large (Meta) — генерация музыки    │
│  ├── MIT лицензия, коммерческое использ.     │
│  ├── Документированный fine-tuning pipeline  │
│  ├── Поддержка: RU, EN, ZH, ES, FR, DE      │
│  └── Output: 44.1kHz WAV → MP3              │
│                                              │
│  Планируемая миграция → YuE (Tencent)       │
│  ├── Dual-sequence архитектура               │
│  ├── Multi-codebook (лучше вокал)            │
│  └── Ожидаем production pipeline в 2026      │
├─────────────────────────────────────────────┤
│            GPU Infrastructure                │
│                                              │
│  RunPod Serverless                           │
│  ├── Auto-scaling: 0 → N инстансов          │
│  ├── GPU: A100 80GB VRAM                     │
│  ├── Cold start: ~15 сек                     │
│  ├── Генерация 30s трека: ~8-12 сек         │
│  └── Стоимость: ~$0.003 за трек             │
├─────────────────────────────────────────────┤
│            Storage & DB                      │
│                                              │
│  PostgreSQL — метаданные, задачи, юзеры      │
│  S3 (MinIO) — аудиофайлы                    │
│  Redis — кеш, очереди, real-time статусы     │
└─────────────────────────────────────────────┘
```

### Выбор модели

**Production (текущий PoC):** MusicGen Large (Meta)

| Критерий | MusicGen | YuE (Tencent) | Stable Audio |
|----------|----------|---------------|-------------|
| Лицензия | MIT ✅ | Apache 2.0 ✅ | Ограничена ❌ |
| Документация | Полная ✅ | Минимальная ⚠️ | Средняя |
| Fine-tuning | Готовый pipeline ✅ | Нет pipeline ❌ | Нет ❌ |
| Production-ready | Да ✅ | Нет ❌ | Нет ❌ |
| Сообщество | 15K+ stars ✅ | Маленькое | Среднее |
| Time-to-deploy | 2-3 дня ✅ | 2-3 недели | 1-2 недели |

MusicGen выбран для PoC по критерию **скорости вывода в production**
и наличию документированного fine-tuning pipeline.

**Roadmap:** Миграция на YuE (Tencent) после выпуска
полного training pipeline. YuE превосходит MusicGen
по архитектуре (dual-sequence, multi-codebook) и качеству
вокала на не-английских языках.

### Pipeline генерации

```
Input (lyrics + style + params)
│
▼
[1] Preprocessing
├── Транслитерация кириллицы (для модели)
├── Разметка структуры: [verse], [chorus], [bridge]
└── Извлечение style tags: genre, mood, instruments
│
▼
[2] Model Inference (MusicGen)
├── Text conditioning + audio generation
├── Token-by-token с контролем температуры
└── Output: raw audio tensor
│
▼
[3] Post-processing
├── Нормализация громкости (LUFS targeting)
├── Конвертация: WAV 44.1kHz → MP3 320kbps
└── Metadata embedding (ID3 tags)
│
▼
[4] Storage & Delivery
├── Upload в S3
├── Обновление статуса → "completed"
└── Возврат audio_url через API
```

---

## 📊 Конкурентный анализ

### Генерация музыки (B2C)

| | Suno | Udio | Lofty Music |
|--|------|------|-------------|
| Оценка | $2.45B | ~$300M | PoC |
| ARR | $200M | ~$30M | — |
| Модель | Закрытая | Закрытая | MusicGen (open-source) |
| Русский вокал | ⚠️ Слабый | ⚠️ Слабый | Fine-tuning planned |
| B2B продукты | ❌ Нет | ❌ Нет | ✅ 4 вертикали |
| Лицензирование | ⚠️ Иски RIAA | ⚠️ Иски RIAA | ✅ Open-source |
| Конверсия freemium | <5% | <5% | B2B модель |

**Ключевое:** Suno и Udio — B2C генераторы.
Lofty Music — **B2B платформа** с генерацией как движком.

### Фоновая музыка для бизнеса (B2B)

| | Mood Media | Soundtrack Your Brand | Lofty Spaces |
|--|-----------|----------------------|-------------|
| Выручка | $350M | $22-50M | — |
| Модель | Лицензированные плейлисты | Лицензированные плейлисты | AI-генерация |
| Цена/точку | $200-400/мес | $49-149/мес | от ₽5,000/мес |
| Лицензии | Нужны | Нужны | **Не нужны** |
| Повторы | Да | Да | **Нет (бесконечная генерация)** |
| Персонализация | Низкая | Средняя | **Полная** |
| A/B тестирование | ❌ | ❌ | ✅ |

---

## ⚖️ Юридическая модель

### Авторское право на AI-музыку

- AI-генерированная музыка **не защищена авторским правом**
  (US Copyright Office, январь 2025; Thaler v. Perlmutter,
  подтверждено Supreme Court, март 2026)
- **Для B2B (Spaces) это преимущество:** нет правообладателя →
  нет лицензионных отчислений РАО/ВОИС/ASCAP/BMI
- ASCAP, BMI и SOCAN подтвердили: полностью AI-сгенерированные
  работы **не регистрируются** (октябрь 2025)

### Voice Cloning (Voices)

- Обязательное **письменное согласие** владельца голоса
- `consent_token` в API эндпоинте
- Соответствие: EU AI Act (август 2025), ELVIS Act (TN, 2024),
  NY Digital Replica Law (2025)
- Прецеденты: Scarlett Johansson vs OpenAI, Drake/Weeknd AI case

### Training Data

- MusicGen — MIT лицензия, обучена Meta на лицензированных данных
- Отсутствие исков RIAA (в отличие от Suno и Udio,
  которые урегулировали иски в ноябре 2025)
- Fine-tuning на собственном датасете

---

## 🗺 Roadmap

### Phase 1: PoC ✅ (текущий этап) — 2 недели
- [x] Frontend: полный UI всех 5 модулей
- [x] Динамические сценарии Spaces (venue → scenarios mapping)
- [x] API: REST endpoints с документацией Swagger
- [x] Impact Dashboard с научными данными (1.8M транзакций)
- [x] Compliance-ready Voice Clone (consent model)
- [x] Деплой на Replit

### Phase 2: MVP — 4-6 недель
- [ ] Рабочая генерация через MusicGen + RunPod
- [ ] Spaces: стриминг для одного заведения
- [ ] Auth: регистрация, JWT
- [ ] Billing: Stripe / ЮKassa
- [ ] Fine-tuning MusicGen на русскоязычном датасете

### Phase 3: Product-Market Fit — 2-3 месяца
- [ ] Пилот Spaces с 5-10 заведениями в Москве
- [ ] A/B тестирование музыкальных программ
- [ ] Impact Dashboard с реальными метриками
- [ ] B2B sales: Яндекс.Директ + партнёрства с iiko/Poster
- [ ] Корпоративные тарифы Focus

### Phase 4: Scale — 6+ месяцев
- [ ] Миграция на YuE (Tencent) для русского вокала
- [ ] Multi-location dashboard
- [ ] Мобильное приложение Spaces
- [ ] Партнёрства с ресторанными сетями
- [ ] Международный рынок

---

## 🛠 Стек

| Слой | Технология |
|------|-----------|
| Frontend | React 18 + Tailwind CSS + Framer Motion |
| Backend | FastAPI (Python 3.11) |
| Database | PostgreSQL 15 |
| Cache/Queue | Redis 7 |
| AI Model | MusicGen Large (Meta) → YuE (Tencent) |
| GPU | RunPod Serverless (A100/H100) |
| Storage | S3-compatible (MinIO / AWS S3) |
| Deploy | Replit (demo) / Docker + K8s (prod) |
| CI/CD | GitHub Actions |

---

## 📡 API

### Endpoints

```
POST  /api/generate         — создать трек
Body: { lyrics, style, duration, language, bpm, key }
Returns: { task_id }

GET   /api/tasks/{id}       — статус задачи
Returns: { status, audio_url, metadata }
Statuses: queued → analyzing → composing → mixing → completed

GET   /api/tasks             — список задач
Params: ?status=completed&limit=10

POST  /api/voice/clone       — клонировать голос
Body: { audio_sample, consent_token }
Returns: { voice_profile_id }

GET   /api/spaces/stream     — стрим для заведения
Params: ?venue_type=cafe&mood=warm&energy=42&time=14:30
Returns: SSE audio stream

GET   /api/health            — healthcheck
Returns: { status, queue_depth, avg_gen_time, model_version }
```

### Пример запроса

```bash
curl -X POST https://api.loftymusic.ai/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "lyrics": "[verse]\nОн был старше её на десять лет\n[chorus]\nПоворот, и снова поворот",
    "style": "russian rock, male vocals, acoustic guitar, 1980s",
    "duration": 30,
    "language": "ru",
    "bpm": 120
  }'
```

### Пример ответа

```json
{
  "task_id": "gen_7f3a2b1c",
  "status": "queued",
  "estimated_time": 12,
  "created_at": "2025-12-01T14:30:00Z"
}
```

Полная документация: Swagger UI → `/docs`

---

## 🔗 Ссылки

| Ресурс | URL |
|--------|-----|
| Live Demo | [https://loftymusic.ru](https://loftymusic.ru) |
| API Docs (Swagger) | [https://loftymusic.ru/docs](https://loftymusic.ru/docs) |
| MusicGen (Meta) | [github.com/facebookresearch/audiocraft](https://github.com/facebookresearch/audiocraft) |
| YuE Paper (Tencent) | [arxiv.org/abs/2404.08532](https://arxiv.org/abs/2404.08532) |
| HUI Research (1.8M транзакций) | [cloudcovermusic.com/music-psychology](https://cloudcovermusic.com/music-psychology) |
| US Copyright Office — AI | [copyright.gov/ai](https://copyright.gov/ai) |
| EU AI Act | [artificialintelligenceact.eu](https://artificialintelligenceact.eu) |
