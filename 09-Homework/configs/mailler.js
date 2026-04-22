const nodemailer=require('nodemailer')

const transpoter = nodemailer.createTransport({
    host:'localhost',
    service: 'gmail',
    auth:{
        user:'brostk962@gmail.com',
        pass:'eojzwipomzxsmtpp'
    }
});

module.exports= transpoter;