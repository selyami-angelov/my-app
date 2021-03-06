import styles from './HomeOverview.module.css'

const HomeOverview = () => {
  return (
    <section className={styles['home-overview-section']}>
      <h2>xlO</h2>
      <p>
        xlO e сайт за безплатни обяви в категории: Недвижими имоти, Автомобили и
        авточасти, Eлектроника, Мода, За бебето и детето, Дом и градина,
        Свободно време, Домашни любимци. Тук може да намериш интересни обяви и
        лесно да се свържеш с продавача. Ако искаш да купиш нещо - може да
        намериш атрактивни предложения на цени, по-ниски, отколкото в магазина.
        Ако искаш да продадеш нещо - можеш да добавиш обява бързо, лесно и
        безплатно и да пуснеш за продажба практически всичко, за което се сетиш.
        Купувай и продавай в xlO!
      </p>
    </section>
  )
}

export default HomeOverview
