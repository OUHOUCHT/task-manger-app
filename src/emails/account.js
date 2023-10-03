

const  sendGrid =   require("@sendgrid/mail")


sendGrid.setApiKey(process.env.APIKEY)


const sendEmailToUser =  (email,name) => {

    sendGrid.send({
        to :  email,
        from :"psycho.mohammed@gmail.com",
        subject : 'Thanks for join in' ,
        text : `Welcom to the app ,  ${name} let me know to you get along from app` ,
    }).then(() => {
        console.log('FROM SENDGRID :  Email sent')
    })
    .catch((error) => {
        console.error("FROM SENDGRID : " + error)
    })

}





const sendCancelationEmailUser =  (email,name) => {

    sendGrid.send({
        to :  email,
        from :"psycho.mohammed@gmail.com",
        subject : 'sorry to see you goo !' ,
        text : `GoodBye ${name} , I hope to see you back sometimes soon ` ,
    }).then(() => {
        console.log('Email sent')
    })
    .catch((error) => {
        console.error(error)
    })

}

module.exports = { sendEmailToUser ,sendCancelationEmailUser}


