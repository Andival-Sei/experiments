import { Helmet } from '@dr.pogodin/react-helmet'
import { useState, type FormEvent } from 'react'

import styles from './ContactsPage.module.scss'
import { cn } from '../../lib/cn'

const communicationChannels = [
  {
    title: 'Email',
    description: 'Отвечаем в течение рабочего дня и присылаем подробные ответы с материалами.',
    value: 'hello@example.com',
    actionLabel: 'Написать письмо',
    href: 'mailto:hello@example.com',
  },
  {
    title: 'Telegram',
    description: 'Живой чат для быстрых вопросов, обсуждения задач и синка по статусу.',
    value: '@experiments_team',
    actionLabel: 'Открыть чат',
    href: 'https://t.me/experiments_team',
  },
  {
    title: 'Zoom/Meet',
    description: 'Назначим видеозвонок, чтобы пройтись по требованиям и показать демо.',
    value: 'Slots: вт/чт 12:00–18:00 (MSK)',
    actionLabel: 'Запросить слот',
    href: 'mailto:hello@example.com?subject=Запрос%20на%20встречу',
  },
]

const faqs = [
  {
    question: 'Как быстро вы отвечаете?',
    answer:
      'В рабочие часы — в течение 2–3 часов. Вечером и на выходных можем задержаться до следующего дня, но всегда подтверждаем получение обращения.',
  },
  {
    question: 'Можно ли подписать NDA до начала обсуждения?',
    answer:
      'Да, NDA можно подписать до передачи материалов. Пришлите ваш шаблон или запросите наш.',
  },
  {
    question: 'Работаете ли вы с зарубежными командами?',
    answer:
      'Да, у нас есть опыт распределённых команд. Согласуем график созвонов и каналы связи под вашу зону.',
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
        <title>Связаться с Experiments</title>
        <meta
          name="description"
          content="Расскажите о задачах продукта, запросите демо и согласуйте стартовую встречу."
        />
      </Helmet>

      <div className={styles.page}>
        <section className={cn(styles.section, styles.hero)}>
          <div className={styles.heroContent}>
            <p className={styles.heroEyebrow}>Контакты</p>
            <h1 className={styles.heroTitle}>Всегда открыты к разговору о продукте</h1>
            <p className={styles.heroSubtitle}>
              Опишите контекст, цели и сроки — подготовим план внедрения и согласуем первые шаги.
            </p>
            <div className={styles.heroHighlights}>
              <span>Ответ в течение рабочего дня</span>
              <span>Бесплатная стартовая сессия</span>
              <span>Поддержка NDA</span>
            </div>
          </div>
          <div className={styles.heroCard}>
            <h2>Текущее окно для стартов</h2>
            <p>
              В октябре берём 1–2 новых продукта. Готовы подключиться к MVP или помочь с
              перезапуском существующего интерфейса.
            </p>
            <a className={styles.heroCta} href="mailto:hello@example.com">
              Назначить разговор
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
            <h2>Предпочитаете короткую форму?</h2>
            <p>
              Оставьте контакт и пару фраз о продукте — вернёмся с конкретными вопросами и
              предложениями.
            </p>
            {formStatus === 'success' ? (
              <p className={styles.formSuccess}>
                Спасибо! Мы свяжемся с вами в течение рабочего дня.
              </p>
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
                  Описание запроса
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
            <h3>Организационные детали</h3>
            <ul>
              <li>Работаем по договору с оплатой по спринтам.</li>
              <li>На старте проводим product discovery воркшоп.</li>
              <li>Все артефакты и репозитории остаются на вашей стороне.</li>
            </ul>
          </aside>
        </section>

        <section className={cn(styles.section, styles.faqSection)}>
          <header className={styles.sectionHeading}>
            <p className={styles.sectionHeadingEyebrow}>FAQ</p>
            <h2 className={styles.sectionHeadingTitle}>Частые вопросы про сотрудничество</h2>
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
