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
    db.query('SELECT * FROM certificate WHERE serialNumber = ?',
        [number], (err, result) => {
            if (err) {
                console.log(err);
            }
            res.json({
                serialNumber: result[0].serialNumber,
                start_time: result[0].start_time,
                end_time: result[0].end_time,
                pem: result[0].pem,
            })

        })

}