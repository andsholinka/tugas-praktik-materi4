const divisiModel = require('../models/divisi');

class divisiController {
    async getDivisi(req, res) {
        try {
            const divisi = await divisiModel.getDivisi();
            res.status(200).send({
                status: res.statusCode,
                message: 'Successfully get All Divisi',
                data: divisi
            })
        } catch (e) {
            console.log(e);
            res.status(400).send({
                status: res.statusCode,
                message: e.message
            })
        }
    }

    async getDivisiById(req, res) {
        try {
            const divisi = await divisiModel.getDivisiById(req.params.id);

            if (divisi.length == 0) throw new Error('Id Divisi Tidak Tersedia');

            res.status(200).send({
                status: res.statusCode,
                message: 'Successfully get Divisi',
                data: divisi
            })
        } catch (e) {
            console.log(e);
            res.status(400).send({
                status: res.statusCode,
                message: e.message
            })
        }
    }

    async createDivisi(req, res) {
        try {
            await divisiModel.createDivisi(req.body);
            console.log("success create new Divisi");
            res.status(201).send({
                status: res.statusCode,
                message: 'Successfully create new Divisi',
            })
        } catch (e) {
            console.log(e);
            res.status(400).send({
                status: res.statusCode,
                message: e.message
            })
        }
    }

    async updateDivisi(req, res) {
        try {
            const checkDivisi = await divisiModel.getDivisiById(req.params.id);

            if (checkDivisi.length == 0) throw new Error('Id Divisi Tidak Tersedia');

            await divisiModel.updateDivisi(req.body, req.params.id);
            console.log("success update data Divisi");
            res.status(201).send({
                status: res.statusCode,
                message: 'Successfully update data Divisi',
            })
        } catch (e) {
            console.log(e);
            res.status(400).send({
                status: res.statusCode,
                message: e.message
            })
        }
    }

    async deleteDivisiById(req, res) {
        try {
            const checkDivisi = await divisiModel.getDivisiById(req.params.id);

            if (checkDivisi.length == 0) throw new Error('Id Divisi Tidak Tersedia');

            await divisiModel.deleteDivisiById(req.params.id);
            res.status(200).send({
                status: res.statusCode,
                message: 'Successfully delete Divisi',
            })
        } catch (e) {
            console.log(e);
            res.status(400).send({
                status: res.statusCode,
                message: e.message
            })
        }
    }

}

module.exports = new divisiController()