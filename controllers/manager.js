const managerModel = require('../models/manager');
const divisiModel = require('../models/divisi');

class ManagerController {
    async getManager(req, res) {
        try {
            const manager = await managerModel.getManager();
            res.status(200).send({
                status: res.statusCode,
                message: 'Successfully get All Manager',
                data: manager
            })
        } catch (e) {
            console.log(e);
            res.status(400).send({
                status: res.statusCode,
                message: e.message
            })
        }
    }

    async getManagerById(req, res) {
        try {
            const manager = await managerModel.getManagerById(req.params.id);

            if (manager.length == 0) throw new Error('Id Manager Tidak Tersedia');

            const karyawan = await managerModel.getKaryawanByIdManager(req.params.id);
            manager[0].karyawan = karyawan

            res.status(200).send({
                status: res.statusCode,
                message: 'Successfully get Manager',
                data: manager
            })
        } catch (e) {
            console.log(e);
            res.status(400).send({
                status: res.statusCode,
                message: e.message
            })
        }
    }

    async createManager(req, res) {
        try {
            const checkDivisi = await divisiModel.getDivisiById(req.body.id_divisi);
            if (checkDivisi.length == 0) throw new Error('Id Divisi Tidak Tersedia');

            const checkDuplicate = await managerModel.getManagerByIdDivisi(req.body.id_divisi);

            if (checkDuplicate.length >= 1) {

                const namaDivisi = await divisiModel.getDivisiById(req.body.id_divisi);
                console.log(`Divisi ${namaDivisi[0].nama_divisi} Sudah Memiliki Manager`);
                res.status(400).send({
                    status: res.statusCode,
                    message: `Divisi ${namaDivisi[0].nama_divisi} Sudah Memiliki Manager`
                })
            } else {
                await managerModel.createManager(req.body);
                console.log("success create new Manager");
                res.status(201).send({
                    status: res.statusCode,
                    message: 'Successfully create new Manager',
                })
            }
        } catch (e) {
            console.log(e);
            res.status(400).send({
                status: res.statusCode,
                message: e.message
            })
        }
    }

    async updateManager(req, res) {
        try {
            const checkManager = await managerModel.getManagerById(req.params.id);
            if (checkManager.length == 0) throw new Error('Id Manager Tidak Tersedia');

            const checkDivisi = await divisiModel.getDivisiById(req.body.id_divisi);
            if (checkDivisi.length == 0) throw new Error('Id Divisi Tidak Tersedia');

            const checkDuplicate = await managerModel.checkDuplicateManager(req.body.id_divisi, req.params.id);

            if (checkDuplicate.length >= 1) {

                const namaDivisi = await divisiModel.getDivisiById(req.body.id_divisi);
                console.log(`Divisi ${namaDivisi[0].nama_divisi} Sudah Memiliki Manager`);
                res.status(400).send({
                    status: res.statusCode,
                    message: `Divisi ${namaDivisi[0].nama_divisi} Sudah Memiliki Manager`
                })
            } else {
                await managerModel.updateManager(req.body, req.params.id);
                console.log("success update data Manager");
                res.status(201).send({
                    status: res.statusCode,
                    message: 'Successfully update data Manager',
                })
            }
        } catch (e) {
            console.log(e);
            res.status(400).send({
                status: res.statusCode,
                message: e.message
            })
        }
    }

    async deleteManagerById(req, res) {
        try {

            const checkManager = await managerModel.getManagerById(req.params.id);

            if (checkManager.length == 0) throw new Error('Id Manager Tidak Tersedia');

            await managerModel.deleteManagerById(req.params.id);
            res.status(200).send({
                status: res.statusCode,
                message: 'Successfully delete Manager',
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

module.exports = new ManagerController()