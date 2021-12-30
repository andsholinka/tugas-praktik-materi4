const db = require('../config/db')
const moment = require('moment');
const momentTz = require('moment-timezone')

class ManagerModel {
    getManager() {
        // const manager = db.from('manager').select('id_manager', 'nama', 'tahun_bekerja', 'lama_bekerja', 'jenis_kelamin', 'id_divisi').where('deleted_at', null)
        const manager = db.from('manager').select('id_manager', 'nama').where('deleted_at', null)
        return manager;
    }

    getManagerById(id) {

        const manager = db.select('manager.id_manager', 'manager.nik', 'manager.nama', 'manager.tahun_bekerja', 'manager.lama_bekerja', 'divisi.nama_divisi').from('manager').where({
            'manager.deleted_at': null,
            'manager.id_manager': id
        }).join('divisi', function () {
            this.on('manager.id_divisi', '=', 'divisi.id_divisi')
        })

        return manager;
    }

    getKaryawanByIdManager(id) {

        const karyawan = db.from('karyawan').select('id_karyawan', 'nama', 'tahun_bekerja', 'lama_bekerja', 'jenis_kelamin').where({
            deleted_at: null,
            id_manager: id
        })

        return karyawan;
    }

    createManager(dataManager) {
        const {
            nik,
            nama,
            tahun_bekerja,
            lama_bekerja,
            jenis_kelamin,
            id_divisi
        } = dataManager

        var currentDate = momentTz().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss')

        const manager = db('manager').insert({
            'nik': nik,
            'nama': nama,
            'tahun_bekerja': tahun_bekerja,
            'lama_bekerja': lama_bekerja,
            'jenis_kelamin': jenis_kelamin,
            'id_divisi': id_divisi,
            'created_at': currentDate
        })
        return manager;
    }

    updateManager(dataManager, id) {
        const {
            nik,
            nama,
            tahun_bekerja,
            lama_bekerja,
            jenis_kelamin,
            id_divisi
        } = dataManager

        var currentDate = momentTz().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss')

        const manager = db('manager').where('id_manager', id).update({
            'nik': nik,
            'nama': nama,
            'tahun_bekerja': tahun_bekerja,
            'lama_bekerja': lama_bekerja,
            'jenis_kelamin': jenis_kelamin,
            'id_divisi': id_divisi,
            'updated_at': currentDate
        })
        return manager;
    }

    deleteManagerById(id) {

        var currentDate = momentTz().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss')

        const manager = db('manager').where('id_manager', id).update({
            'deleted_at': currentDate
        })
        return manager;
    }

    checkDuplicateManager(id_divisi, id_manager) {
        const manager = db.from('manager').select('id_manager', 'id_divisi').where({
            deleted_at: null,
            id_divisi: id_divisi
        }).whereNot('id_manager', id_manager)
        return manager;
    }
}

module.exports = new ManagerModel()