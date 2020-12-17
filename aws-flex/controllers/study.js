const util = require('../modules/util')
const statusCode = require('../modules/statusCode');
const resMessage = require('../modules/responseMessage');
const studyModel = require('../models/study');

const study = {
    getStudyList: async (req, res) => {
        const getStudyList = await studyModel.getStudyList();
        if (getStudyList < 0) {
            return res.status(statusCode.INTERNAL_SERVER_ERROR)
                .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, resMessage.DB_ERROR));
        }

        return res.status(statusCode.OK)
            .send(util.success(statusCode.OK, resMessage.STUDY_SUCCESS,
                getStudyList
            ));
    },

    getStudy: async (req, res) => {
        const studyIdx = req.params.idx;
        const getStudy = await studyModel.getStudy(studyIdx);
        if (getStudy < 0) {
            return res.status(statusCode.INTERNAL_SERVER_ERROR)
                .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, resMessage.DB_ERROR));
        }
        return res.status(statusCode.OK)
            .send(util.success(statusCode.OK, resMessage.READ_STUDY_SUCCESS, getStudy[0]));
    },

    createStudy: async (req, res) => {
        const {
            name,
            type,
            tags,
            status
        } = req.body;
        // if (name === undefined || type === undefined || tags === undefined || status === undefined) {
            
        //     return res.status(statusCode.BAD_REQUEST)
        //         .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
        // }
        // if (await studyModel.checkStudy(name, type, tags, status)) {
        //     return res.status(statusCode.BAD_REQUEST)
        //         .send(util.fail(statusCode.BAD_REQUEST, resMessage.CREATE_STUDY_FAIL));
        // } 
        
            const study = await studyModel.createStudy(name, type, tags, status);
            if (study < 0) {
                return res.status(statusCode.INTERNAL_SERVER_ERROR)
                    .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, resMessage.DB_ERROR));
            }
            return res.status(statusCode.CREATED)
                .send(util.success(statusCode.CREATED, resMessage.CREATE_STUDY_SUCCESS));
        
    },

    updateStudy: async (req, res) => {
        const studyIdx = req.params.idx;
        const {
            name,
            type,
            tags,
            status
        } = req.body;

        if (name === undefined || type === undefined || tags === undefined || status === undefined) {
            return res.status(statusCode.BAD_REQUEST)
                .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
        }

        const updateStudy = {
            studyIdx,
            name,
            type,
            tags,
            status
        };

        const study = await studyModel.updateStudy(updateStudy);
        if (study < 0) {
            return res.status(statusCode.INTERNAL_SERVER_ERROR)
                .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, resMessage.DB_ERROR));
        }
        return res.status(statusCode.CREATED)
            .send(util.success(statusCode.CREATED, resMessage.UPDATE_STUDY_SUCCESS));

    },

    deleteStudy: async (req, res) => {
        const studyIdx = req.params.idx;

        if (studyIdx === undefined) {
            return res.status(statusCode.BAD_REQUEST)
                .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
        }
        if (!await studyModel.checkStudyIdx(studyIdx)) {
            return res.status(statusCode.BAD_REQUEST)
                .send(util.fail(statusCode.BAD_REQUEST, resMessage.DELETE_STUDY_FAIL));
        }
        const study = await studyModel.deleteStudy(studyIdx);
        if (study < 0) {
            return res.status(statusCode.INTERNAL_SERVER_ERROR)
                .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, resMessage.DELETE_STUDY_FAIL));
        }
        return res.status(statusCode.OK)
            .send(util.success(statusCode.OK, resMessage.DELETE_STUDY_SUCCESS));
    },
}

module.exports = study;
