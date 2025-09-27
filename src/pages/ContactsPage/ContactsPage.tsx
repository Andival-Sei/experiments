import { Helmet } from '@dr.pogodin/react-helmet'
import { useState, type FormEvent } from 'react'

import styles from './ContactsPage.module.scss'
import { cn } from '../../lib/cn'

const communicationChannels = [
  {
    title: 'Email',
    description: 'Основной канал для деловой переписки и подробных обсуждений проектов.',
    value: 'contact@experiments.dev',
    actionLabel: 'Написать письмо',
    href: 'mailto:contact@experiments.dev',
  },
  {
    title: 'Telegram',
    description: 'Быстрая связь для оперативных вопросов и обсуждения технических деталей.',
    value: '@experiments_dev',
    actionLabel: 'Открыть чат',
    href: 'https://t.me/experiments_dev',
  },
  {
    title: 'VK',
    description: 'Официальная страница проекта с новостями и обновлениями разработки.',
    value: '@experiments_dev',
    actionLabel: 'Перейти в VK',
    href: 'https://vk.com/experiments_dev',
  },
  {
    title: 'Discord',
    description: 'Сообщество разработчиков для общения, вопросов и обмена опытом.',
    value: 'Experiments Community',
    actionLabel: 'Присоединиться',
    href: 'https://discord.gg/experiments-dev',
  },
]

const faqs = [
  {
    question: 'Это открытый проект?',
    answer:
      'Да, проект полностью открытый и доступен на GitHub. Вы можете изучить код, предложить улучшения или использовать как основу для своих проектов.',
  },
  {
    question: 'Можно ли использовать стек в коммерческих проектах?',
    answer:
      'Конечно! Все технологии имеют подходящие лицензии для коммерческого использования. Проект создан именно для того, чтобы ускорить разработку продуктовых решений.',
  },
  {
    question: 'Планируется ли развитие проекта?',
    answer:
      'Да, проект активно развивается. Мы следим за новыми версиями используемых технологий и добавляем полезные инструменты для улучшения опыта разработки.',
  },
]

export function ContactsPage() {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setFormStatus('submitting')

    window.setTimeout(() => {
      setFormStatus('success')
    }, 900)
  }

  return (
    <>
      <Helmet prioritizeSeoTags>
        <title>Связаться с командой Experiments</title>
        <meta
          name="description"
          content="Свяжитесь с командой Experiments через email, Telegram, VK или Discord. Открытый проект с активным сообществом разработчиков."
        />
      </Helmet>

      <div className={styles.page}>
        <section className={cn(styles.section, styles.hero)}>
          <div className={styles.heroContent}>
            <p className={styles.heroEyebrow}>Контакты</p>
            <h1 className={styles.heroTitle}>Связаться с командой Experiments</h1>
            <p className={styles.heroSubtitle}>
              Выберите удобный способ связи для вопросов о проекте, технической поддержки или
              предложений по развитию платформы.
            </p>
            <div className={styles.heroHighlights}>
              <span>Открытый исходный код</span>
              <span>Активное сообщество</span>
              <span>Техническая поддержка</span>
            </div>
          </div>
          <div className={styles.heroCard}>
            <h2>Присоединяйтесь к сообществу</h2>
            <p>
              Станьте частью растущего сообщества разработчиков, использующих современные технологии
              для создания качественных веб-приложений.
            </p>
            <a className={styles.heroCta} href="https://github.com/experiments-dev">
              GitHub проекта
            </a>
          </div>
        </section>

        <section className={styles.section}>
          <header className={styles.sectionHeading}>
            <p className={styles.sectionHeadingEyebrow}>Как связаться</p>
            <h2 className={styles.sectionHeadingTitle}>Выберите удобный канал</h2>
            <p className={styles.sectionHeadingDescription}>
              Мы подстроимся под ваш привычный мессенджер, e-mail или проведём видеозвонок.
            </p>
          </header>

          <div className={styles.channels}>
            {communicationChannels.map((channel) => (
              <article key={channel.title} className={styles.channelCard}>
                <div>
                  <h3 className={styles.channelCardTitle}>{channel.title}</h3>
                  <p className={styles.channelCardDescription}>{channel.description}</p>
                </div>
                <div className={styles.channelCardFooter}>
                  <span className={styles.channelCardValue}>{channel.value}</span>
                  <a className={styles.channelCardAction} href={channel.href}>
                    {channel.actionLabel}
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={cn(styles.section, styles.formSection)} id="contact-form">
          <div className={styles.formSectionContent}>
            <h2>Остались вопросы?</h2>
            <p>
              Напишите нам через форму обратной связи — мы ответим на все вопросы о проекте,
              технологиях и возможностях их использования.
            </p>
            {formStatus === 'success' ? (
              <p className={styles.formSuccess}>Спасибо за вопрос! Мы ответим в ближайшее время.</p>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit}>
                <label className={styles.formLabel}>
                  Имя
                  <input
                    className={styles.formInput}
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                  />
                </label>
                <label className={styles.formLabel}>
                  Email
                  <input
                    className={styles.formInput}
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                  />
                </label>
                <label className={styles.formLabel}>
                  Вопрос или предложение
                  <textarea
                    className={cn(styles.formInput, styles.formTextarea)}
                    name="message"
                    rows={4}
                    required
                  />
                </label>
                <button
                  className={styles.formSubmit}
                  type="submit"
                  disabled={formStatus === 'submitting'}
                >
                  {formStatus === 'submitting' ? 'Отправляем…' : 'Отправить'}
                </button>
              </form>
            )}
          </div>
          <aside className={styles.formAside}>
            <h3>О проекте Experiments</h3>
            <ul>
              <li>Полностью открытый исходный код под MIT лицензией.</li>
              <li>Активная поддержка и регулярные обновления.</li>
              <li>Готовые решения для быстрого старта проектов.</li>
            </ul>
          </aside>
        </section>

        <section className={cn(styles.section, styles.faqSection)}>
          <header className={styles.sectionHeading}>
            <p className={styles.sectionHeadingEyebrow}>FAQ</p>
            <h2 className={styles.sectionHeadingTitle}>Частые вопросы о проекте</h2>
          </header>
          <div className={styles.faqList}>
            {faqs.map((item) => (
              <article key={item.question} className={styles.faqItem}>
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}

export default ContactsPage
