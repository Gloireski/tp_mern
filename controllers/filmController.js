const { Film } = require("../models/films")

class filmController {
    /**
     * Route to get all films
     * @param {*} req 
     * @param {*} res 
     */

    static async getFilm (req, res) {
        const films = await Film.find()
        res.json(films)
    }
}

// module.export = filmController

const getFilm = async (req, res) => {
    const films = await Film.find()
    res.json(films)
}

const addFilm = async (req, res) => {
    const film = new Film(req.body)
    await film.save()
    res.json(film)
}

module.exports = getFilm 
module.exports = addFilm