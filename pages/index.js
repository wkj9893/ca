import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Certificate Authority</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="http://172.20.118.125:3000/signin">HIT数字证书认证中心</a>
        </h1>


        <div className={styles.grid}>
          <a href="http://172.20.118.125:3000/signin" className={styles.card}>
            <h3>登录 &rarr;</h3>
            <p>登录已有账号</p>
          </a>

          <a href="http://172.20.118.125:3000/signup" className={styles.card}>
            <h3>注册 &rarr;</h3>
            <p>注册新账号</p>
          </a>

          <a
            href="http://172.20.118.125:3000/verify"
            className={styles.card}
          >
            <h3>验证证书 &rarr;</h3>
            <p>上传证书并进行验证</p>
          </a>

          <a
            href="http://172.20.118.125:3000/dashboard/info"
            className={styles.card}
          >
            <h3>个人页面 &rarr;</h3>
            <p>
              登录后直接进入个人页面
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
