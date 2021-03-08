import { TextField, Button } from "@material-ui/core";
import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Head from "next/head";
import Copyright from "../components/Copyright";
import Link from "@material-ui/core/Link";

export default function signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function handleLogin(event) {
    event.preventDefault();
    const response = await axios.post("/api/signin", {
      username: username,
      password: password,
    });
    if (!response.data || response.data.message === "false") {
      alert("用户名或密码错误");
      return;
    }
    if (response.data.message === "success") {
      alert("登录成功");
      router.push("/dashboard/apply");
    }
  }

  return (
    <div>
      <Head>
        <title>登录</title>
      </Head>
      <form onSubmit={handleLogin} className="container" style={{ margin: "75px auto", width: "450px" }}>
        <TextField variant="outlined" label="username" type="text" margin="normal" fullWidth onChange={(event) => setUsername(event.target.value)}></TextField>
        <TextField label="password" variant="outlined" type="password" margin="normal" fullWidth onChange={(event) => setPassword(event.target.value)}></TextField>
        <Button style={{ margin: "20px", width: "80px" }} type="submit" variant="contained" color="primary">
          signin
        </Button>
        <Link variant="body2" href="/signup" style={{ margin: "50px" }}>
          {"Don't have an account? Sign Up"}
        </Link>{" "}
      </form>
      <Copyright />
    </div>
  );
}
