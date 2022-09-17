import nodemailer from "nodemailer"

export const sendEmail = (userData, genToken, res) => {

    const transporter = nodemailer.createTransport({
        port: 465,
        host: "smtp.gmail.com",
        auth: {
            user: process.env.FROM_EMAIL,
            pass: process.env.EMAIL_PASS
        },
        secure: true
    })

    const emailData = {
        from: process.env.FROM_EMAIL,
        to: userData.email,
        subject: `¡¡ Felicidades !!`,
        text: `Se ha convertido en el ganador del sorteo`,
        html: `<p>Estimado(a) Señor(a) <b>${userData.primer_nombre} ${userData.primer_apellido}</b>,</p>
        <br>
        <p>Usted ha sido seleccionado como el ganador de <i>500 millones de pesos !!!!</i>.</p>
        <br>
        <p>Para poder reclamar su dinero por favor realice una consignacion de 200 mil pesos a la siguiente cuenta:</p>
        <br>
        <b>0053391221290</b>
        <p>Le recordamos que este dinero sera utilizado para el proceso de tramite y papeleo para la consignacion a su cuenta asignada.</p>
        <br>
        <p>Muchas gracias por su atencion, y esperamos que pueda disfrutar su premio al maximo.</p>
        `
    }

    transporter.sendMail(emailData, (err, info) => {
        if (err) {
            res.status(201).send({ token: genToken, emailStatus: `Failed to send email: + ${err}` })
        }
        res.status(201).send({ token: genToken, emailStatus: `An email has sent successfully !!!`})
    })
}