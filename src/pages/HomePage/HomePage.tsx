import { Helmet } from '@dr.pogodin/react-helmet'

import styles from './HomePage.module.scss'
import { cn } from '../../lib/cn'

const heroHighlights = [
  'React 19 + TypeScript + Vite',
  'MobX для управления состоянием',
  'Sass + CSS Modules для стилей',
  'Playwright + Vitest для тестирования',
]

const frontendTech = [
  {
    title: 'React 19',
    description:
      'Самая актуальная версия React с поддержкой новых возможностей и улучшенной производительности.',
    features: ['Server Components', 'Concurrent Features', 'Новые хуки'],
  },
  {
    title: 'TypeScript',
    description: 'Строгая типизация для предотвращения ошибок и улучшения разработки в команде.',
    features: ['Type Safety', 'IntelliSense', 'Рефакторинг'],
  },
  {
    title: 'Vite',
    description: 'Быстрый и современный инструмент сборки с горячей перезагрузкой и оптимизацией.',
    features: ['HMR', 'Tree Shaking', 'Code Splitting'],
  },
]

const stateManagement = [
  {
    title: 'MobX',
    description: 'Простое и мощное управление состоянием через реактивное программирование.',
    features: ['Автоматические обновления', 'Минимум кода', 'Отличная производительность'],
  },
]

const styling = [
  {
    title: 'Sass + CSS Modules',
    description: 'Мощный препроцессор CSS с модульной изоляцией стилей для каждого компонента.',
    features: ['Переменные', 'Миксины', 'Изоляция стилей'],
  },
]

const testing = [
  {
    title: 'Vitest',
    description:
      'Быстрый юнит-тестинг с нативной поддержкой TypeScript и современных возможностей.',
    features: ['Быстрая сборка', 'Watch mode', 'Coverage отчеты'],
  },
  {
    title: 'Testing Library',
    description: 'Тестирование компонентов с фокусом на пользовательский опыт и доступность.',
    features: ['User-centric тесты', 'Accessibility checks', 'Простой API'],
  },
  {
    title: 'Playwright',
    description: 'E2E тестирование для проверки полных пользовательских сценариев в браузере.',
    features: ['Кроссбраузерность', 'Auto-waiting', 'Визуальные тесты'],
  },
]

const development = [
  {
    title: 'ESLint + Prettier',
    description: 'Автоматическое форматирование и проверка качества кода для консистентного стиля.',
    features: ['Код-стайл', 'Автофикс', 'Интеграция с IDE'],
  },
  {
    title: 'Husky + Lint-staged',
    description: 'Git хуки для автоматической проверки кода перед коммитом и пушем.',
    features: ['Pre-commit хуки', 'Качество кода', 'Автоматизация'],
  },
]

export function HomePage() {
  return (
    <>
      <Helmet prioritizeSeoTags>
        <title>Experiments — современный фронтенд-стек</title>
        <meta
          name="description"
          content="Передовой технологический стек: React 19, TypeScript, Vite, MobX, Sass, Vitest, Playwright. Готов к продакшену."
        />
      </Helmet>

      <div className={styles.page}>
        <section className={cn(styles.section, styles.hero)} id="hero">
          <div className={styles.heroContent}>
            <div className={styles.heroEyebrow}>Современный фронтенд-стек • 2025</div>
            <h1 className={styles.heroTitle}>
              Проект на передовых технологиях,
              <span className={styles.heroTitleAccent}> готовый к продакшену</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Собрали лучшие инструменты в единый стек для быстрой разработки качественных
              веб-приложений с полным покрытием тестами и современным DevX.
            </p>
            <ul className={styles.heroHighlightList}>
              {heroHighlights.map((item) => (
                <li key={item} className={styles.heroHighlightItem}>
                  {item}
                </li>
              ))}
            </ul>
            <div className={styles.heroActions}>
              <a className={cn(styles.button, styles.buttonPrimary)} href="#frontend">
                Изучить стек
              </a>
              <a className={cn(styles.button, styles.buttonGhost)} href="#testing">
                Тестирование
              </a>
            </div>
          </div>
          <div className={styles.heroPreview}>
            <div className={styles.heroCard}>
              <span className={styles.heroCardLabel}>TypeScript</span>
              <h2 className={styles.heroCardTitle}>Типобезопасность на всех уровнях</h2>
              <p className={styles.heroCardDescription}>
                Строгая типизация предотвращает ошибки еще на этапе разработки и обеспечивает
                отличную поддержку в IDE с автодополнением и рефакторингом.
              </p>
            </div>
            <div className={cn(styles.heroCard, styles.heroCardSecondary)}>
              <span className={styles.heroCardLabel}>Автоматизация</span>
              <h2 className={styles.heroCardTitle}>Качество кода из коробки</h2>
              <p className={styles.heroCardDescription}>
                ESLint, Prettier, Husky и pre-commit хуки автоматически поддерживают консистентный
                стиль кода и проверяют качество при каждом коммите.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.section} id="frontend">
          <header className={styles.sectionHeading}>
            <p className={styles.sectionHeadingEyebrow}>Фронтенд технологии</p>
            <h2 className={styles.sectionHeadingTitle}>React 19 + TypeScript + Vite</h2>
            <p className={styles.sectionHeadingDescription}>
              Передовая связка технологий для создания быстрых, типобезопасных и масштабируемых
              веб-приложений с отличным опытом разработки.
            </p>
          </header>

          <div className={styles.featuresList}>
            {frontendTech.map((tech) => (
              <article key={tech.title} className={styles.featuresItem}>
                <h3 className={styles.featuresItemTitle}>{tech.title}</h3>
                <p className={styles.featuresItemDescription}>{tech.description}</p>
                <ul style={{ marginTop: '8px', fontSize: '0.875rem', opacity: 0.8 }}>
                  {tech.features.map((feature) => (
                    <li key={feature}>• {feature}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section} id="state">
          <header className={styles.sectionHeading}>
            <p className={styles.sectionHeadingEyebrow}>Управление состоянием</p>
            <h2 className={styles.sectionHeadingTitle}>MobX для реактивного состояния</h2>
            <p className={styles.sectionHeadingDescription}>
              Простая и мощная библиотека для управления состоянием с автоматическими обновлениями и
              минимальным количеством кода.
            </p>
          </header>

          <div className={styles.technologyGrid}>
            {stateManagement.map((item) => (
              <article key={item.title} className={styles.technologyItem}>
                <h3 className={styles.technologyItemTitle}>{item.title}</h3>
                <p className={styles.technologyItemDescription}>{item.description}</p>
                <ul style={{ marginTop: '12px', fontSize: '0.875rem', opacity: 0.8 }}>
                  {item.features.map((feature) => (
                    <li key={feature}>• {feature}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section} id="styling">
          <header className={styles.sectionHeading}>
            <p className={styles.sectionHeadingEyebrow}>Стилизация</p>
            <h2 className={styles.sectionHeadingTitle}>Sass + CSS Modules</h2>
            <p className={styles.sectionHeadingDescription}>
              Мощный препроцессор CSS с модульной архитектурой для изолированных и переиспользуемых
              стилей компонентов.
            </p>
          </header>

          <div className={styles.pricingCards}>
            {styling.map((style) => (
              <article key={style.title} className={styles.pricingCard}>
                <h3 className={styles.pricingCardTitle}>{style.title}</h3>
                <p className={styles.pricingCardDescription}>{style.description}</p>
                <ul className={styles.pricingCardList}>
                  {style.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className={cn(styles.section, styles.faq)} id="testing">
          <header className={styles.sectionHeading}>
            <p className={styles.sectionHeadingEyebrow}>Тестирование</p>
            <h2 className={styles.sectionHeadingTitle}>Полное покрытие тестами</h2>
            <p className={styles.sectionHeadingDescription}>
              Комплексное тестирование на всех уровнях: от юнитов до полных пользовательских
              сценариев в браузере.
            </p>
          </header>

          <div className={styles.faqList}>
            {testing.map((test) => (
              <article key={test.title} className={styles.faqItem}>
                <h3 className={styles.faqItemQuestion}>{test.title}</h3>
                <p className={styles.faqItemAnswer}>{test.description}</p>
                <ul style={{ marginTop: '8px', fontSize: '0.875rem', opacity: 0.8 }}>
                  {test.features.map((feature) => (
                    <li key={feature}>• {feature}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section} id="development">
          <header className={styles.sectionHeading}>
            <p className={styles.sectionHeadingEyebrow}>Инструменты разработки</p>
            <h2 className={styles.sectionHeadingTitle}>Автоматизация и качество кода</h2>
            <p className={styles.sectionHeadingDescription}>
              Настроенные инструменты для поддержания качества кода и автоматизации рутинных
              процессов разработки.
            </p>
          </header>

          <div className={styles.technologyGrid}>
            {development.map((tool) => (
              <article key={tool.title} className={styles.technologyItem}>
                <h3 className={styles.technologyItemTitle}>{tool.title}</h3>
                <p className={styles.technologyItemDescription}>{tool.description}</p>
                <ul style={{ marginTop: '12px', fontSize: '0.875rem', opacity: 0.8 }}>
                  {tool.features.map((feature) => (
                    <li key={feature}>• {feature}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className={cn(styles.section, styles.contact)} id="contact">
          <div className={styles.contactInner}>
            <h2 className={styles.contactTitle}>Готовы начать разработку?</h2>
            <p className={styles.contactSubtitle}>
              Клонируйте репозиторий и запустите проект за несколько минут. Все инструменты уже
              настроены и готовы к работе.
            </p>
            <a className={cn(styles.button, styles.buttonPrimary)} href="/contacts">
              Связаться с нами
            </a>
          </div>
        </section>
      </div>
    </>
  )
}

export default HomePage
