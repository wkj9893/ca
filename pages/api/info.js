import mysql from "mysql";
import { decrypt } from "../../crypto/aes";


export default (req, res) => {
    const { username, passphrase } = req.body;
    // 连接数据库
    const db = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'ca',
    });
    db.query('SELECT * FROM certificate WHERE username = ?',
        [username], (err, result) => {
            if (err) {
                console.log(err);
            };
            if (!result[0].private_key) {
                console.log("不存在该用户");
            }
            try {
                const private_key = decrypt(result[0].private_key, passphrase);

                console.log(private_key)
                if (private_key) {
                    return res.json({
                        username: username,
                        private_key: private_key
                    })
                }
            } catch (err) {
                return res.json({
                    msg: 'false',
                })
                console.log(err)
            }

        })

}