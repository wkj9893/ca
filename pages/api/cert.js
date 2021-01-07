import verify from "../../crypto/Verify"

export default (req, res) => {
    const pem = req.body.file;
    console.log(pem);
    if (verify(pem)) {
        console.log('true')
        return res.json({ msg: 'true' })

    } else {
        return res.json({ msg: 'false' })
    }


}