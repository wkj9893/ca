import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

export default function Copyright() {
  return (
    <Typography style={{ marginBottom: "0px" }} variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://github.com/wkj9893/ca">
        wkj9893
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
