const pool = require('../modules/pool');
const table = 'service';

const Service = {
    getService: async (serviceIdx) => {
        const query = `SELECT * FROM ${table} WHERE serviceIdx = ${serviceIdx}`;
        try {
            const result = await pool.queryParam(query);
            return result;
        } catch (err) {
            if (err.errno == 1062) {
                console.log('getService ERROR : ', err.errno, err.code);
                return -1;
            }
            console.log('getService ERROR : ', err);
            throw err;
        }
    },

    getServiceList: async () => {
        const query = `SELECT * FROM ${table}`;
        try {
            const result = await pool.queryParam(query);
            return result;
        } catch (err) {
            // if (err.errno == 1062) {
            //     console.log('getServiceList ERROR : ', err.errno, err.code);
            //     return -1;
            // }
            console.log("왜 여기..?", result);
            console.log('getServiceList ERROR : ', err);
            throw err;
        }
    },

    createService: async (name, type, tags, layer) => {
        const fields = 'name, type, tags, layer';
        const questions = '?,?,?,?';
        const values = [name, type, tags, layer];
        const query = `INSERT INTO ${table}(${fields}) VALUES (${questions})`;
        try {
            const result = await pool.queryParamArr(query, values);
            return result;
        } catch (err) {
            if (err.errno == 1062) {
                console.log('createService ERROR : ', err.errno, err.code);
                return -1;
            }
            console.log('createService ERROR : ', err);
            throw err;
        }
    },


    // checkStudy: async (name, type, tags, layer) => {
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

    checkServiceIdx: async (idx) => {
        const query = `SELECT * FROM ${table} WHERE ServiceIdx = ${idx}`;
        try {
            const result = await pool.queryParam(query);
            if (result.length >= 1) {
                return true;
            } else {
                return false;
            }
        } catch (err) {
            if (err.errno == 1062) {
                console.log('checkServiceIdx ERROR : ', err.errno, err.code);
                return -1;
            }
            console.log('checkServiceIdx ERROR: ', err);
            throw err;
        }
    },

    updateService: async (updateService) => {
        const query = `UPDATE ${table}
       SET name = "${updateService.name}", type = "${updateService.type}",
       tags = "${updateService.tags}", layer = "${updateService.layer}"
       WHERE serviceIdx = ${updateService.serviceIdx}`;
        try {
            const result = await pool.queryParam(query);
            if (result.affectedRows > 0) return result;
            else return -1;
        } catch (err) {
            if (err.errno == 1062) {
                console.log('updateService ERROR : ', err.errno, err.code);
                return -1;
            }
            console.log('updateService ERROR: ', err);
            throw err;
        }
    },

    deleteService: async (ServiceIdx) => {
        const query = `DELETE FROM ${table} WHERE ServiceIdx = ${ServiceIdx} `;
        try {
            const result = await pool.queryParamArr(query);
            if (result.affectedRows > 0) return 1;
            else return 0;
        } catch (err) {
            if (err.errno == 1062) {
                console.log('deleteService ERROR : ', err.errno, err.code);
                return -1;
            }
            console.log('deleteService ERROR: ', err);
            throw err;
        }
    },
}

module.exports = Service;