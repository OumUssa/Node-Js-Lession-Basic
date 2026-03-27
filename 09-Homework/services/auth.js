const Register= async function name(body) {

    if(!body.name || !body.email || !body.password){
        throw new Error('info is not require !!')
    }
    return body;
    
}


module.exports = {
    Register
}