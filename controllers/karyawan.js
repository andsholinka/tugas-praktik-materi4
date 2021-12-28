const karyawanModel = require('../models/karyawan');
const managerModel = require('../models/manager');

class karyawanController {
    async getKaryawan(req, res) {
        try {
            const karyawan = await karyawanModel.getKaryawan();
            res.status(200).send({
                status: res.statusCode,
                message: 'Successfully get All Karyawan',
                data: karyawan
            })
        } catch (e) {
            console.log(e);
            res.status(400).send({
                status: res.statusCode,
                message: e.message
            })
        }
    }

    async getKaryawanById(req, res) {
        try {
            const karyawan = await karyawanModel.getKaryawanById(req.params.id);

            if (karyawan.length == 0) throw new Error('Id Karyawan Tidak Tersedia');

            res.status(200).send({
                status: res.statusCode,
                message: 'Successfully get Karyawan',
                data: karyawan
            })
        } catch (e) {
            console.log(e);
            res.status(400).send({
                status: res.statusCode,
                message: e.message
            })
        }
    }

    async createKaryawan(req, res) {
        try {
            const checkManager = await managerModel.getManagerById(req.body.id_manager);

            if (checkManager.length == 0) throw new Error('Id Manager Tidak Tersedia');

            await karyawanModel.createKaryawan(req.body);
            console.log("success create new Karyawan");
            res.status(201).send({
                status: res.statusCode,
                message: 'Successfully create new Karyawan',
            })
        } catch (e) {
            console.log(e);
            res.status(400).send({
                status: res.statusCode,
                message: e.message
            })
        }
    }

    async updateKaryawan(req, res) {
        try {
            const checkKaryawan = await karyawanModel.getKaryawanById(req.params.id);
            if (checkKaryawan.length == 0) throw new Error('Id Karyawan Tidak Tersedia');

            const checkManager = await managerModel.getManagerById(req.body.id_manager);
            if (checkManager.length == 0) throw new Error('Id Manager Tidak Tersedia');

            await karyawanModel.updateKaryawan(req.body, req.params.id);
            console.log("success update data Karyawan");
            res.status(201).send({
                status: res.statusCode,
                message: 'Successfully update data Karyawan',
            })
        } catch (e) {
            console.log(e);
            res.status(400).send({
                status: res.statusCode,
                message: e.message
            })
        }
    }

    async deleteKaryawanById(req, res) {
        try {
            const checkKaryawan = await karyawanModel.getKaryawanById(req.params.id);

            if (checkKaryawan.length == 0) throw new Error('Id karyawan Tidak Tersedia');

            await karyawanModel.deleteKaryawanById(req.params.id);
            res.status(200).send({
                status: res.statusCode,
                message: 'Successfully delete Karyawan',
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

module.exports = new karyawanController()