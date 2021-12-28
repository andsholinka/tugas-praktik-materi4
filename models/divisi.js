const db = require('../config/db')
const moment = require('moment');
const momentTz = require('moment-timezone')

class divisiModel {
    getDivisi() {
        const divisi = db.from('divisi').select('id_divisi', 'nama_divisi', 'kategori_divisi').where('deleted_at', null)
        return divisi;
    }

    getDivisiById(id) {
        const divisi = db.from('divisi').select('id_divisi', 'nama_divisi', 'kategori_divisi').where({
            deleted_at: null,
            id_divisi: id
        })
        return divisi;
    }

    createDivisi(dataDivisi) {
        const {
            nama_divisi,
            kategori_divisi
        } = dataDivisi

        var currentDate = momentTz().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss')

        const divisi = db('divisi').insert({
            'nama_divisi': nama_divisi,
            'kategori_divisi': kategori_divisi,
            'created_at': currentDate
        })
        return divisi;
    }

    updateDivisi(dataDivisi, id) {
        const {
            nama_divisi,
            kategori_divisi
        } = dataDivisi

        var currentDate = momentTz().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss')

        const divisi = db('divisi').where('id_divisi', id).update({
            'nama_divisi': nama_divisi,
            'kategori_divisi': kategori_divisi,
            'updated_at': currentDate
        })
        return divisi;
    }

    deleteDivisiById(id) {

        var currentDate = momentTz().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss')

        const divisi = db('divisi').where('id_divisi', id).update({
            'deleted_at': currentDate
        })
        return divisi;
    }

}

module.exports = new divisiModel()