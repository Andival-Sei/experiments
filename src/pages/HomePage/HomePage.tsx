import { Helmet } from '@dr.pogodin/react-helmet'

import styles from './HomePage.module.scss'
import { cn } from '../../lib/cn'

const heroHighlights = [
  'React 19 + Vite + TypeScript',
  'Живые сторы на MobX',
  'Готово к деплою на Vercel',
]

const features = [
  {
    title: 'Модульная архитектура',
    description:
      'Чёткое разделение на сторы, UI-компоненты и сервисы сокращает время на поддержку и развитие.',
  },
  {
    title: 'Гибкие стили',
    description:
      'SCSS с дизайн-токенами позволяет быстро подстраивать тему и собирать адаптивные интерфейсы.',
  },
  {
    title: 'Проактивные тесты',
    description:
      'Vitest, Testing Library и Playwright обеспечивают контроль качества на всех уровнях.',
  },
]

const techStack = [
  {
    title: 'React 19 + Vite',
    description:
      'Самая свежая связка для клиентских приложений: быстрые сборки, современный DX и поддержка React Server Components.',
  },
  {
    title: 'MobX State Tree',
    description:
      'Прозрачное управление состоянием с реактивностью и минималистичным API, готовое к масштабированию.',
  },
  {
    title: 'Playwright + Vitest',
    description:
      'Юнит- и e2e-тесты из коробки, чтобы любая новая функция попадала в прод с уверенностью.',
  },
]

const pricing = [
  {
    title: 'Команда',
    price: 'Индивидуально',
    description: 'Настраиваем процесс под ваши задачи, подключаем CI/CD и автоматизируем проверки.',
    benefits: ['Общий дизайн-сет', 'CI-пайплайн', 'Покрытие тестами'],
  },
  {
    title: 'Стартап',
    price: 'Быстрый запуск',
    description:
      'Помогаем выкатить MVP за недели: адаптивный UI, базовые сценарии и рост вместе с продуктом.',
    benefits: ['Интерактивный прототип', 'Стартовая аналитика', 'Консультации по архитектуре'],
  },
]

const faqs = [
  {
    question: 'Можно подключить вашу заготовку к существующему бекенду?',
    answer:
      'Да. В проект уже добавлены механизмы изоляции API-клиентов и MobX-сторы, поэтому интеграция проходит безболезненно.',
  },
  {
    question: 'Как быстро можно запустить проект в прод?',
    answer:
      'Следуя гайду в README, деплой на Vercel занимает пару минут. Дальше вы настраиваете кастомный домен и мониторинг.',
  },
]

export function HomePage() {
  return (
    <>
      <Helmet prioritizeSeoTags>
        <title>Experiments — современный фронтенд-старт</title>
        <meta
          name="description"
          content="Готовая основа на React 19 и Vite для быстрого запуска интерфейсов с тестами и MobX."
        />
      </Helmet>

      <div className={styles.page}>
        <section className={cn(styles.section, styles.hero)} id="hero">
          <div className={styles.heroContent}>
            <div className={styles.heroEyebrow}>Фронтенд-стартер • 2025</div>
            <h1 className={styles.heroTitle}>
              Стартуйте продукт быстро,
              <span className={styles.heroTitleAccent}> не жертвуя качеством</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Мы собрали архитектуру, стили и инфраструктуру так, чтобы вы могли фокусироваться на
              логике, а не на настройке.
            </p>
            <ul className={styles.heroHighlightList}>
              {heroHighlights.map((item) => (
                <li key={item} className={styles.heroHighlightItem}>
                  {item}
                </li>
              ))}
            </ul>
            <div className={styles.heroActions}>
              <a className={cn(styles.button, styles.buttonPrimary)} href="#pricing">
                Узнать условия
              </a>
              <a className={cn(styles.button, styles.buttonGhost)} href="#technology">
                Посмотреть стек
              </a>
            </div>
          </div>
          <div className={styles.heroPreview}>
            <div className={styles.heroCard}>
              <span className={styles.heroCardLabel}>CI/CD</span>
              <h2 className={styles.heroCardTitle}>Каждый pull request проходит тесты</h2>
              <p className={styles.heroCardDescription}>
                Vitest, Playwright и линтеры уже готовы. Просто добавьте свой код, и пайплайн
                проверит его к продакшену.
              </p>
            </div>
            <div className={cn(styles.heroCard, styles.heroCardSecondary)}>
              <span className={styles.heroCardLabel}>Design Tokens</span>
              <h2 className={styles.heroCardTitle}>Единый визуальный язык</h2>
              <p className={styles.heroCardDescription}>
                Цвета, сетка и типографика задаются переменными, чтобы вы могли мгновенно
                адаптировать тему.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.section} id="features">
          <header className={styles.sectionHeading}>
            <p className={styles.sectionHeadingEyebrow}>Почему это работает</p>
            <h2 className={styles.sectionHeadingTitle}>В основе — зрелая архитектура</h2>
            <p className={styles.sectionHeadingDescription}>
              Комбинируем лучшие практики React-сообщества и опыт производства, чтобы ускорить ваш
              релиз.
            </p>
          </header>

          <div className={styles.featuresList}>
            {features.map((feature) => (
              <article key={feature.title} className={styles.featuresItem}>
                <h3 className={styles.featuresItemTitle}>{feature.title}</h3>
                <p className={styles.featuresItemDescription}>{feature.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section} id="technology">
          <header className={styles.sectionHeading}>
            <p className={styles.sectionHeadingEyebrow}>Технологии</p>
            <h2 className={styles.sectionHeadingTitle}>Стек, проверенный проектами</h2>
            <p className={styles.sectionHeadingDescription}>
              Делаем ставку на инструменты, которые обеспечивают скорость, стабильность и
              масштабируемость.
            </p>
          </header>

          <div className={styles.technologyGrid}>
            {techStack.map((item) => (
              <article key={item.title} className={styles.technologyItem}>
                <h3 className={styles.technologyItemTitle}>{item.title}</h3>
                <p className={styles.technologyItemDescription}>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section} id="pricing">
          <header className={styles.sectionHeading}>
            <p className={styles.sectionHeadingEyebrow}>Форматы работы</p>
            <h2 className={styles.sectionHeadingTitle}>Выбирайте комфортный темп сотрудничества</h2>
            <p className={styles.sectionHeadingDescription}>
              Мы адаптируем процесс под задачи вашей команды и сопровождаем запуск спринтов.
            </p>
          </header>

          <div className={styles.pricingCards}>
            {pricing.map((plan) => (
              <article key={plan.title} className={styles.pricingCard}>
                <h3 className={styles.pricingCardTitle}>{plan.title}</h3>
                <p className={styles.pricingCardPrice}>{plan.price}</p>
                <p className={styles.pricingCardDescription}>{plan.description}</p>
                <ul className={styles.pricingCardList}>
                  {plan.benefits.map((benefit) => (
                    <li key={benefit}>{benefit}</li>
                  ))}
                </ul>
                <a className={cn(styles.button, styles.buttonPrimary)} href="#contact">
                  Запросить консультацию
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className={cn(styles.section, styles.faq)} id="faq">
          <header className={styles.sectionHeading}>
            <p className={styles.sectionHeadingEyebrow}>FAQ</p>
            <h2 className={styles.sectionHeadingTitle}>Ответы на частые вопросы</h2>
          </header>

          <div className={styles.faqList}>
            {faqs.map((faq) => (
              <article key={faq.question} className={styles.faqItem}>
                <h3 className={styles.faqItemQuestion}>{faq.question}</h3>
                <p className={styles.faqItemAnswer}>{faq.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={cn(styles.section, styles.contact)} id="contact">
          <div className={styles.contactInner}>
            <h2 className={styles.contactTitle}>Готовы обсудить ваш продукт?</h2>
            <p className={styles.contactSubtitle}>
              Расскажите о задачах, и мы соберём план внедрения: от быстрых экспериментов до
              промышленного запуска.
            </p>
            <a className={cn(styles.button, styles.buttonPrimary)} href="mailto:hello@example.com">
              hello@example.com
            </a>
          </div>
        </section>
      </div>
    </>
  )
}

export default HomePage
