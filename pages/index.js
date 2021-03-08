import Head from "next/head";
import Copyright from "../components/Copyright";
import { useRouter } from "next/router";
import Typography from "@material-ui/core/Typography";
import styles from "../styles/Home.module.css";

export default function Home() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <Head>
        <title>CA认证中心</title>
      </Head>

      <main className={styles.main}>
        <Typography className={styles.title} variant="h3" align="center" gutterBottom>
          Certificate Authority
        </Typography>

        <div className={styles.grid}>
          <a href="/signin" className={styles.card}>
            <h3>登录 &rarr;</h3>
            <p>登录已有账号</p>
          </a>

          <a href="/signup" className={styles.card}>
            <h3>注册 &rarr;</h3>
            <p>注册新账号</p>
          </a>

          <a href="/dashboard/apply" className={styles.card}>
            <h3>申请证书 &rarr;</h3>
            <p>为网站申请证书</p>
          </a>

          <a href="/dashboard/info" className={styles.card}>
            <h3>个人页面 &rarr;</h3>
            <p>登录后直接进入个人页面</p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <Copyright />
      </footer>
    </div>
  );
}
