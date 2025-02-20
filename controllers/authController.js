class authController {

    static async login(req, res){
        res.send('login')
    }

    static async logout(req, res){
        res.send('logout')
    }
}

module.exports = authController