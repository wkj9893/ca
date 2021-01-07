import handler from "../../crypto/ClientRequestHandler";
import fs from 'fs';
import forge from 'node-forge';
import mysql from "mysql";
import { encrypt } from "../../crypto/aes";



export default (req, res) => {
    const username = req.body.username;
    const commonName = req.body.commonName;
    const country = req.body.country;
    const state = req.body.state;
    const locality = req.body.locality;
    const organization = req.body.organization;
    const ou = req.body.ou;
    const year = req.body.year;
    const passphrase = req.body.passphrase;

    const cert = handler(commonName, country, state, locality, organization, ou, year);
    const start_time = cert.validity.notBefore;
    const end_time = cert.validity.notAfter;
    const public_key = forge.pki.publicKeyToPem(cert.publicKey);
    const private_key = encrypt(forge.pki.privateKeyToPem(cert.privateKey), passphrase);
    const number = cert.serialNumber;
    const pem = forge.pki.certificateToPem(cert);

    console.log(private_key);


    // 连接数据库
    const db = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'ca',
    });

    db.query(
        'INSERT INTO certificate(serialNumber,start_time,end_time,pem,public_key,private_key,username) VALUES (?,?,?,?,?,?,?)',
        [number, start_time, end_time, pem, public_key, private_key, username],
        (err) => {
            console.log(err);
        }
    );

    fs.writeFile(`C:/cert/${number}.pem`, pem, function (err) {
        if (err) throw err;
    });

    return res.json({
        filename: `${number}.pem`,
        pem: pem
    });
}
