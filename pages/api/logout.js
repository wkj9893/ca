import cookie from "cookie";

export default async (req, res) => {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("auth", "", {
      httpOnly: true,
      sameSite: "strict",
      maxAge: -1,
      path: "/",
      secure: process.env.NODE_ENV === "production",
    })
  );
  res.status(200).end();
};
