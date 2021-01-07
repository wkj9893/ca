//@ts-check
import React, { } from "react";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { DropzoneArea } from 'material-ui-dropzone';
import FolderIcon from '@material-ui/icons/Folder';
import axios from "axios"
import Button from "@material-ui/core/Button";



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
        alignItems: "center"
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

}));





export default function Verify() {
    const classes = useStyles();
    const [files, setFiles] = React.useState([]);


    const verify = (file) => {
        const formData = new FormData();

        formData.append("cert", file);


        axios.post('/api/verify', formData,
            { headers: { "Content-Type": "multipart/form-data" } })
            .then((res) => {
                if (res.data.msg === 'true') {
                    alert('证书正确')

                } else {
                    alert('警告：证书不正确！')
                }

            })
            .catch((error) => {
                alert('警告：证书不正确！')
                console.log(error);
            })


    }


    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <FolderIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    请选择要鉴定的证书
        </Typography>
                <DropzoneArea

                    onChange={(files) => setFiles(files)}
                />

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={() => {
                        verify(files[0]);

                    }}
                >提交</Button>

            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>

    )
}














