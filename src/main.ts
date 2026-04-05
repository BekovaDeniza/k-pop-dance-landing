import './style.css'
import { siteConfig } from './site.config'

/** Пути к файлам из `public/` с учётом `base` (GitHub Pages: /repo/). */
function publicUrl(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`
}

function formatRub(n: number): string {
  return `${new Intl.NumberFormat('ru-RU').format(n)} ₽`
}

function setText(id: string, text: string): void {
  const el = document.getElementById(id)
  if (el) el.textContent = text
}

function initPricing(): void {
  const { pricing } = siteConfig
  setText('price-subscription', formatRub(pricing.groupSubscriptionRub))
  setText('price-subscription-suffix', pricing.subscriptionSuffix)
  setText('price-subscription-note', pricing.subscriptionNote)
  setText('price-hour', formatRub(pricing.groupHourRub))
  setText('price-hour-note', pricing.groupHourNote)

  if (pricing.individualHourRub != null) {
    setText('price-individual', formatRub(pricing.individualHourRub))
    setText('price-individual-note', 'за 1 час')
  } else {
    setText('price-individual', 'По запросу')
    setText('price-individual-note', 'Стоимость и длительность — в сообщении, подстрою под задачу.')
  }
}

function initSchedule(): void {
  const s = siteConfig.schedule
  const locationFull = `${s.locationLine}, ${s.address}`
  setText('schedule-day-line', s.groupDay)
  setText('schedule-freq-line', s.groupFrequency)
  setText('schedule-duration-line', s.groupDuration)
  setText('schedule-location-line', locationFull)
  setText('strip-day', s.groupDay)
  setText('strip-freq', s.groupFrequency)
  setText('strip-duration', s.groupDuration)
  setText('strip-location', `м. Медведково · ${s.address}`)
  setText('individual-note', siteConfig.pricing.individualNote)
}

function initMeta(): void {
  document.title = siteConfig.meta.title
  const desc = document.querySelector('meta[name="description"]')
  desc?.setAttribute('content', siteConfig.meta.description)
}

function contactSvg(label: string): string {
  const icons: Record<string, string> = {
    Telegram: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/></svg>`,
    WhatsApp: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`,
    Телефон: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>`,
    ВКонтакте: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.678.863 2.05 2.303 3.845 2.896 3.845.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.744c.373 0 .508.203.508.643v4.426c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.254-1.406 2.151-3.574 2.151-3.574.17-.254.322-.373.78-.373h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.49-.085.744-.576.744z"/></svg>`,
    Instagram: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`,
    YouTube: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`,
  }
  return icons[label] ?? ''
}

function initContacts(): void {
  const root = document.getElementById('contact-links')
  const c = siteConfig.contacts
  const y = siteConfig.links.smashYoutube
  if (!root) return

  const items: { label: string; href: string; sub: string }[] = [
    { label: 'Telegram', href: c.telegram, sub: '@alyonaayona' },
    { label: 'WhatsApp', href: c.whatsapp, sub: c.phoneDisplay },
    { label: 'Телефон', href: `tel:${c.phoneTel}`, sub: c.phoneDisplay },
    { label: 'ВКонтакте', href: c.vk, sub: 'Написать в VK' },
    { label: 'Instagram', href: c.instagram, sub: '@addloveu' },
    { label: 'YouTube', href: y, sub: 'Кавер-команда SMASH' },
  ]

  root.innerHTML = items
    .map((item) => {
      const isPhone = item.href.startsWith('tel:')
      const targetAttr = isPhone ? '' : ' target="_blank" rel="noopener noreferrer"'
      return `
    <a href="${item.href}" class="contact-card"${targetAttr}>
      ${contactSvg(item.label)}
      <span>
        <span class="font-display block text-sm font-bold text-white">${item.label}</span>
        <span class="font-body mt-0.5 block text-xs text-white/55">${item.sub}</span>
      </span>
    </a>
  `
    })
    .join('')
}

function initNav(): void {
  const toggle = document.getElementById('nav-toggle')
  const menu = document.getElementById('nav-menu')
  if (!toggle || !menu) return

  const setOpen = (open: boolean): void => {
    menu.classList.toggle('is-open', open)
    toggle.setAttribute('aria-expanded', String(open))
    toggle.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню')
  }

  toggle.addEventListener('click', () => {
    setOpen(!menu.classList.contains('is-open'))
  })

  menu.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => setOpen(false))
  })

  window.addEventListener('resize', () => {
    if (window.matchMedia('(min-width: 768px)').matches) setOpen(false)
  })
}

function initReveal(): void {
  const nodes = document.querySelectorAll('[data-reveal]')
  if (!nodes.length) return

  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible')
          io.unobserve(e.target)
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  )

  nodes.forEach((n) => io.observe(n))
}

function initFooter(): void {
  setText('year', String(new Date().getFullYear()))
  setText('footer-instructor', siteConfig.instructor.nameShort)
}

function initHeroAndStudio(): void {
  const heroImg = document.getElementById('hero-photo') as HTMLImageElement | null
  if (heroImg) {
    heroImg.src = publicUrl(siteConfig.media.heroTeacher)
    heroImg.alt = `${siteConfig.instructor.nameShort} — преподаватель K-pop`
  }

  const studioImg = document.getElementById('studio-photo') as HTMLImageElement | null
  if (studioImg) {
    studioImg.src = publicUrl(siteConfig.media.studio)
    studioImg.alt = 'Зал для занятий: зеркала и свет у м. Медведково'
  }
}

function initVideo(): void {
  const video = document.getElementById('cover-video') as HTMLVideoElement | null
  if (!video) return
  video.poster = publicUrl(siteConfig.media.videoPoster)
  video.replaceChildren(
    ...siteConfig.media.videoSources.map((spec) => {
      const s = document.createElement('source')
      s.src = publicUrl(spec.src)
      s.type = spec.type
      return s
    }),
  )
  video.load()
}

function renderGalleryGrid(containerId: string, urls: readonly string[], altPrefix: string): void {
  const el = document.getElementById(containerId)
  if (!el) return
  el.innerHTML = urls
    .map((src, i) => {
      const href = publicUrl(src)
      return `
    <button type="button" class="gallery-item group relative h-full w-full overflow-hidden rounded-xl border border-white/10 bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-accent-2)]" data-gallery-src="${href}" data-gallery-alt="${altPrefix} — ${i + 1}">
      <img src="${href}" alt="" class="h-full w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" decoding="async" />
      <span class="sr-only">Открыть в полный размер</span>
    </button>
  `
    })
    .join('')
}

function bindGalleryCarousel(track: HTMLElement, prev: HTMLButtonElement, next: HTMLButtonElement): void {
  const gap = 12
  let rafId = 0

  function updateButtons(): void {
    const maxScroll = track.scrollWidth - track.clientWidth
    const tol = 2
    prev.disabled = track.scrollLeft <= tol
    next.disabled = track.scrollLeft >= maxScroll - tol
  }

  function getGalleryItems(): HTMLElement[] {
    return [...track.querySelectorAll<HTMLElement>('.gallery-item')]
  }

  /** Плавная прокрутка с easing (приятнее, чем только scroll-behavior: smooth) */
  function smoothScrollTo(targetLeft: number): void {
    if (rafId) cancelAnimationFrame(rafId)
    const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth)
    const clamped = Math.max(0, Math.min(maxScroll, targetLeft))
    const start = track.scrollLeft
    const change = clamped - start
    if (Math.abs(change) < 0.5) {
      updateButtons()
      return
    }

    const durationMs = Math.min(680, Math.max(380, Math.abs(change) * 0.55))
    const t0 = performance.now()

    function easeOutCubic(t: number): number {
      return 1 - (1 - t) ** 3
    }

    function step(now: number): void {
      const elapsed = now - t0
      const t = Math.min(1, elapsed / durationMs)
      track.scrollLeft = start + change * easeOutCubic(t)
      if (t < 1) {
        rafId = requestAnimationFrame(step)
      } else {
        rafId = 0
        track.scrollLeft = clamped
        updateButtons()
      }
    }

    rafId = requestAnimationFrame(step)
  }

  /** Индекс карточки у левого края видимой области */
  function activeIndex(items: HTMLElement[]): number {
    const x = track.scrollLeft + 2
    let idx = 0
    for (let i = 0; i < items.length; i++) {
      if (items[i].offsetLeft <= x) idx = i
      else break
    }
    return idx
  }

  function scrollByCards(cardDelta: number): void {
    const items = getGalleryItems()
    if (!items.length) return
    const nextIdx = Math.max(0, Math.min(items.length - 1, activeIndex(items) + cardDelta))
    smoothScrollTo(items[nextIdx].offsetLeft)
  }

  /** Листание «страницей» — примерно столько карточек, сколько помещается в ряд */
  function scrollPage(direction: 1 | -1): void {
    const items = getGalleryItems()
    if (!items.length) return
    const cardW = items[0].offsetWidth + gap
    const pageSize = Math.max(1, Math.round((track.clientWidth * 0.88) / cardW))
    scrollByCards(pageSize * direction)
  }

  prev.addEventListener('click', () => scrollPage(-1))
  next.addEventListener('click', () => scrollPage(1))

  track.addEventListener('scroll', updateButtons, { passive: true })
  window.addEventListener('resize', updateButtons)

  track.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      scrollByCards(-1)
    }
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      scrollByCards(1)
    }
  })

  track.querySelectorAll('img').forEach((img) => {
    img.addEventListener('load', updateButtons)
  })
  requestAnimationFrame(() => updateButtons())
}

function initGalleryCarousels(): void {
  const rows = document.querySelectorAll<HTMLElement>('.gallery-carousel')
  for (const row of rows) {
    const track = row.querySelector<HTMLElement>('.gallery-track')
    const prev = row.querySelector<HTMLButtonElement>('.gallery-carousel-btn--prev')
    const next = row.querySelector<HTMLButtonElement>('.gallery-carousel-btn--next')
    if (track && prev && next) bindGalleryCarousel(track, prev, next)
  }
}

function initGallery(): void {
  const m = siteConfig.media
  renderGalleryGrid('gallery-team', m.team, 'Команда')
  renderGalleryGrid('gallery-performance', m.performance, 'Выступление')
  renderGalleryGrid('gallery-teacher-dance', m.teacherDance, 'Съёмка кавера')
  initGalleryCarousels()

  const root = document.getElementById('gallery-root')
  if (!root) return

  const lightbox = document.getElementById('gallery-lightbox')
  const lightboxImg = document.getElementById('gallery-lightbox-img') as HTMLImageElement | null
  const lightboxClose = document.getElementById('gallery-lightbox-close')

  function openLightbox(src: string, alt: string): void {
    if (!lightbox || !lightboxImg) return
    lightboxImg.src = src
    lightboxImg.alt = alt
    lightbox.classList.remove('hidden')
    lightbox.classList.add('flex')
    document.body.classList.add('overflow-hidden')
  }

  function closeLightbox(): void {
    if (!lightbox || !lightboxImg) return
    lightbox.classList.add('hidden')
    lightbox.classList.remove('flex')
    lightboxImg.removeAttribute('src')
    document.body.classList.remove('overflow-hidden')
  }

  root.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('[data-gallery-src]')
    if (!btn) return
    openLightbox(btn.dataset.gallerySrc ?? '', btn.dataset.galleryAlt ?? '')
  })

  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox()
  })
  lightboxClose?.addEventListener('click', closeLightbox)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox()
  })
}

initMeta()
initPricing()
initSchedule()
initContacts()
initHeroAndStudio()
initVideo()
initGallery()
initNav()
initReveal()
initFooter()
