import { TextField, Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Head from "next/head";
import Copyright from "../components/Copyright";
import Link from "@material-ui/core/Link";

export default function signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const router = useRouter();

  async function handleSignup(event) {
    event.preventDefault();
    try {
      const response = await axios.post("/api/signup", {
        username: username,
        password: password,
      });
      if (response.data.message === "success") {
        alert("注册成功");
        router.push("/signin");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Head>
        <title>注册</title>
      </Head>
      <form onSubmit={handleSignup} className="container" style={{ margin: "75px auto", width: "450px" }}>
        <TextField variant="outlined" type="text" label="username" margin="normal" fullWidth onChange={(event) => setUsername(event.target.value)} />
        <TextField label="password" type="password" variant="outlined" margin="normal" fullWidth onChange={(event) => setPassword(event.target.value)} />
        <Button style={{ margin: "20px", width: "80px" }} type="submit" variant="contained" color="primary" onClick={handleSignup}>
          signup
        </Button>
        <Link variant="body2" href="/signin" style={{ margin: "50px" }}>
          {" Already have an account? Sign in"}
        </Link>{" "}
      </form>
      <Copyright />
    </div>
  );
}
