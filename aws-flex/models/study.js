const pool = require('../modules/pool');
const table = 'study';

const study = {
    getStudy: async (studyIdx) => {
        const query = `SELECT * FROM ${table} WHERE studyIdx = ${studyIdx}`;
        try {
            const result = await pool.queryParam(query);
            return result;
        } catch (err) {
            if (err.errno == 1062) {
                console.log('getStudy ERROR : ', err.errno, err.code);
                return -1;
            }
            console.log('getStudy ERROR : ', err);
            throw err;
        }
    },

    getStudyList: async () => {
        const query = `SELECT * FROM ${table}`;
        try {
            const result = await pool.queryParam(query);
            return result;
        } catch (err) {
            // if (err.errno == 1062) {
            //     console.log('getStudyList ERROR : ', err.errno, err.code);
            //     return -1;
            // }
            console.log("왜 여기..?", result);
            console.log('getStudyList ERROR : ', err);
            throw err;
        }
    },

    createStudy: async (name, type, tags, status) => {
        const fields = 'name, type, tags, status';
        const questions = '?,?,?,?';
        const values = [name, type, tags, status];
        const query = `INSERT INTO ${table}(${fields}) VALUES (${questions})`;
        try {
            const result = await pool.queryParamArr(query, values);
            return result;
        } catch (err) {
            if (err.errno == 1062) {
                console.log('createStudy ERROR : ', err.errno, err.code);
                return -1;
            }
            console.log('createStudy ERROR : ', err);
            throw err;
        }
    },


    // checkStudy: async (name, type, tags, status) => {
    //     const query = `SELECT * FROM ${table} WHERE name = ${name} 
    //     AND type = ${type} AND semester="${semester}"`;

    //     try {
    //         const result = await pool.queryParam(query);
    //         if (result.length === 0) {
    //             return false;
    //         } else {
    //             return true;
    //         }
    //     } catch (err) {
    //         if (err.errno == 1062) {
    //             console.log('checkCart ERROR : ', err.errno, err.code);
    //             return -1;
    //         }
    //         console.log('checkCart ERROR: ', err);
    //         throw err;
    //     }
    // },

    checkStudyIdx: async (idx) => {
        const query = `SELECT * FROM ${table} WHERE studyIdx = ${idx}`;
        try {
            const result = await pool.queryParam(query);
            if (result.length >= 1) {
                return true;
            } else {
                return false;
            }
        } catch (err) {
            if (err.errno == 1062) {
                console.log('checkStudyIdx ERROR : ', err.errno, err.code);
                return -1;
            }
            console.log('checkStudyIdx ERROR: ', err);
            throw err;
        }
    },

    updateStudy: async (updateStudy) => {
        const query = `UPDATE ${table}
       SET name = "${updateStudy.name}", type = "${updateStudy.type}",
       tags = "${updateStudy.tags}", status = "${updateStudy.status}"s
       WHERE studyIdx = ${updateStudy.studyIdx}`;
        try {
            const result = await pool.queryParam(query);
            if (result.affectedRows > 0) return result;
            else return -1;
        } catch (err) {
            if (err.errno == 1062) {
                console.log('updateStudy ERROR : ', err.errno, err.code);
                return -1;
            }
            console.log('updateStudy ERROR: ', err);
            throw err;
        }
    },

    deleteStudy: async (studyIdx) => {
        const query = `DELETE FROM ${table} WHERE studyIdx = ${studyIdx} `;
        try {
            const result = await pool.queryParamArr(query);
            if (result.affectedRows > 0) return 1;
            else return 0;
        } catch (err) {
            if (err.errno == 1062) {
                console.log('deleteStudy ERROR : ', err.errno, err.code);
                return -1;
            }
            console.log('deleteStudy ERROR: ', err);
            throw err;
        }
    },
}

module.exports = study;