import mysql from "mysql";
import bcrypt from 'bcryptjs';

export default (req, res) => {
    const { number, username, password } = req.body;
    console.log(number);
    console.log(username);
    // 连接数据库
    const db = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'ca',
    });
    db.query('SELECT * FROM user WHERE username = ?',
        [username], (err, result) => {
            if (err) {
                console.log(err);
            };
            //比较用户登录密码是否与数据库密码相同(Hash)
            bcrypt.compare(password, result[0].password, function (error, response) {
                if (error) {
                    console.log(error);
                }
                //如果相同，撤销证书
                if (response) {
                    db.query('DELETE FROM certificate WHERE serialNumber = ?', [number],
                        (err) => {
                            if (err) {
                                res.send({
                                    message: err
                                });
                            }
                            else {
                                res.send({
                                    message: 'true'
                                });
                            }
                        })
                } else {
                    res.json({
                        message: "false"
                    })
                }

            });
        })


}