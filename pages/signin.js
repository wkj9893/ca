import React, { useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from 'next/router'
import axios from "axios"
import Head from 'next/head'
import styles from '../styles/Home.module.css'


function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
      </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    },
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundImage: 'url("/me.jpg")',
        backgroundColor: theme.palette.light,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    }
}));

export default function SignIn(event) {
    event.preventdefault;
    const classes = useStyles();
    const router = useRouter()
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const login = (event) => {
        event.preventDefault();
        const uPattern = /^[a-zA-Z0-9_-]{6,16}$/;
        if (!uPattern.test(username)) {
            alert("用户名必须为字母、数字、下划线、减号的组合，长度为6-16！");
            return;
        }
        const pPattern = /^(?=.*[a-zA-Z])(?=.*\d)[^]{6,20}$/;
        if (!pPattern.test(password)) {
            alert("密码长度至少为6位，至多20位！并且至少包括数字和字母！");
            return;
        }
        if (grecaptcha.getResponse() == "") {
            alert("reCaptcha未认证");
            return;
        }

        axios.post('/api/signin', {
            username: username,
            password: password,
        }).then((response) => {
            // if (response.data.message == "false") {
            //     console.log('qqqqqq')
            //     alert('用户名不存在或密码错误');
            //     return;
            // }
            if (response.data.message == "true") {
                const token = response.data.token;
                localStorage.setItem("token", token);
                router.push("/dashboard/apply");
            } else {
                alert('用户名不存在或密码错误');
                return;
            }
        }).catch((error) => {
            alert('用户名不存在或密码错误');
            return;
        })


    }

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://www.recaptcha.net/recaptcha/api.js";
        document.body.appendChild(script);
    }, []);

    return (

        <div className={classes.container}>

            <Head>

                <title>Certificate Authority </title>
            </Head>


            <main className={styles.main}>

                <CssBaseline />
                <Typography variant="h3" className={styles.card} >
                    HIT数字证书认证中心
            </Typography>



                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        登录
        </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="用户名"
                            name="username"
                            autoComplete="username"
                            onChange={(event) => setUsername(event.target.value)}
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="密码"
                            type="password"
                            id="password"
                            onChange={(event) => setPassword(event.target.value)}
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <div
                            className="g-recaptcha"
                            data-sitekey="6LcaFBYaAAAAAG3P_pGBAFaolh8C9sJpnsCjzsaL"
                            data-callback="onSubmit"
                        ></div>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={(event) => {
                                login(event);
                            }}
                        >
                            Sign In
          </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
              </Link>
                            </Grid>
                            <Grid item>
                                <Link
                                    href="#"
                                    variant="body2"
                                    onClick={() => {
                                        router.push('/signup')
                                            ;
                                    }}
                                >
                                    Don't have an account? Sign Up
              </Link>
                            </Grid>
                        </Grid>
                    </form>
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
    );
}
