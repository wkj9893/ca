import mysql from "mysql";


export default (req, res) => {
    const number = req.body.number;
    // 连接数据库
    const db = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'ca',
    });
    db.query(
        'SELECT * FROM certificate WHERE serialNumber = ?',
        [number],
        (err, result) => {
            if (err) {
                res.send({
                    err: err
                });
            }
            if (result.length > 0) {
                res.json({
                    filename: `${number}.pem`,
                    pem: result[0].pem
                })
            } else {
                res.send({
                    message: 'Wrong username/password combination!'
                });
            }


        }
    );

}