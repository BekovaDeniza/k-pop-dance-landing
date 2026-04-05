/**
 * Контакты, цены, медиа — правьте здесь.
 * Файлы лежат в public/media/ (копия из папки media в корне проекта).
 */
export const siteConfig = {
  meta: {
    title: 'K-pop танцы в Москве | Алёна Башмакова',
    description:
      'Групповые занятия K-pop у м. Медведково (ориентир по возрасту от 12–13 лет): 2 месяца, фестиваль и съёмка dance public. Преподаватель Алёна Башмакова — шоу-балет, фестивали, кавер-команда SMASH.',
    ogImage: '/media/teacher.JPG',
    siteUrl: 'https://example.com',
  },

  brand: {
    shortName: 'K-pop Moscow',
    tagline: 'Танцы K-pop в Москве',
  },

  instructor: {
    name: 'Алёна Башмакова',
    nameShort: 'Алёна Башмакова',
  },

  links: {
    smashYoutube: 'https://www.youtube.com/@wearesmash',
  },

  contacts: {
    telegram: 'https://t.me/alyonaayona',
    whatsapp: 'https://wa.me/79048081084',
    phoneTel: '+79048081084',
    phoneDisplay: '+7 (904) 808-10-84',
    vk: 'https://vk.me/alyonastyles',
    instagram: 'https://www.instagram.com/addloveu?igsh=MTJxcjM3aTh6bXJndg==',
  },

  /** Пути от корня сайта (public/media) */
  media: {
    studio: '/media/dance%20hall.JPG',
    heroTeacher: '/media/teacher.JPG',
    videoPoster: '/media/team_dancing.JPG',
    /** Только MP4 в репозитории (MOV >100 MB не проходит лимит GitHub). MOV держите локально при необходимости. */
    videoSources: [{ src: '/media/video/team.mp4', type: 'video/mp4' }] as const,
    team: [
      '/media/team.JPG',
      '/media/team_image2.JPG',
      '/media/team_image3.JPG',
      '/media/team_image4.JPG',
      '/media/team_image5.JPG',
      '/media/team2.JPG',
    ],
    performance: [
      '/media/team_dancing.JPG',
      '/media/team_dancing2.JPG',
      '/media/team_dancing3.JPG',
    ],
    teacherDance: [
      '/media/teacher_dance.JPG',
      '/media/teacher_dance2.JPG',
      '/media/teacher_dance3.JPG',
      '/media/teacher_dance4.JPG',
    ],
  },

  pricing: {
    groupSubscriptionRub: 6500,
    subscriptionSuffix: 'в месяц',
    subscriptionNote: `Два месяца: каждое воскресенье по 2 часа в зале. В календарном месяце — 4 таких занятия, то есть 8 часов. Внос удобно разбить на две части: по 6 500 ₽ за каждый из двух месяцев.

За сезон группа собирает номер, выступает на фестивале и снимает уличный кавер с оператором — по ощущениям близко к любимым клипам (dance public).`,
    groupHourRub: 1000,
    groupHourNote: 'Если без абонемента — оплата почасово: 1000 ₽ за 1 час занятия в группе.',
    individualHourRub: null as number | null,
    individualNote:
      'Индивидуальный темп, разбор техники и образа, подготовка к выступлениям — всё под ваш запрос. Формат и стоимость обсуждаем отдельно.',
  },

  schedule: {
    groupDay: 'Воскресенье',
    groupFrequency: '1 раз в неделю',
    groupDuration: '2 часа',
    locationLine: 'Студия у м. Медведково',
    address: 'ул. Широкая, 30',
  },
} as const

export type SiteConfig = typeof siteConfig
