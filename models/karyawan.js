const db = require('../config/db')
const moment = require('moment');
const momentTz = require('moment-timezone')

class karyawanModel {
    getKaryawan() {
        const karyawan = db.from('karyawan').select('id_karyawan', 'nama', 'tahun_bekerja', 'lama_bekerja', 'jenis_kelamin', 'id_manager').where('deleted_at', null)
        return karyawan;
    }

    getKaryawanById(id) {
        const karyawan = db.from('karyawan').select('id_karyawan', 'nama', 'tahun_bekerja', 'lama_bekerja', 'jenis_kelamin', 'id_manager').where({
            deleted_at: null,
            id_karyawan: id
        })
        return karyawan;
    }

    createKaryawan(dataKaryawan) {
        const {
            nik,
            nama,
            tahun_bekerja,
            lama_bekerja,
            jenis_kelamin,
            id_manager
        } = dataKaryawan

        var currentDate = momentTz().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss')

        const karyawan = db('karyawan').insert({
            'nik': nik,
            'nama': nama,
            'tahun_bekerja': tahun_bekerja,
            'lama_bekerja': lama_bekerja,
            'jenis_kelamin': jenis_kelamin,
            'id_manager': id_manager,
            'created_at': currentDate
        })
        return karyawan;
    }

    updateKaryawan(dataKaryawan, id) {
        const {
            nik,
            nama,
            tahun_bekerja,
            lama_bekerja,
            jenis_kelamin,
            id_manager
        } = dataKaryawan

        var currentDate = momentTz().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss')

        const karyawan = db('karyawan').where('id_karyawan', id).update({
            'nik': nik,
            'nama': nama,
            'tahun_bekerja': tahun_bekerja,
            'lama_bekerja': lama_bekerja,
            'jenis_kelamin': jenis_kelamin,
            'id_manager': id_manager,
            'updated_at': currentDate
        })
        return karyawan;
    }

    deleteKaryawanById(id) {

        var currentDate = momentTz().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss')

        const karyawan = db('karyawan').where('id_karyawan', id).update({
            'deleted_at': currentDate
        })
        return karyawan;
    }

}

module.exports = new karyawanModel()