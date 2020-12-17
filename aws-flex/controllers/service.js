const util = require('../modules/util')
const statusCode = require('../modules/statusCode');
const resMessage = require('../modules/responseMessage');
const serviceModel = require('../models/service');

const service = {
    getServiceList: async (req, res) => {
        const getServiceList = await serviceModel.getServiceList();
        if (getServiceList < 0) {
            return res.status(statusCode.INTERNAL_SERVER_ERROR)
                .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, resMessage.DB_ERROR));
        }

        return res.status(statusCode.OK)
            .send(util.success(statusCode.OK, resMessage.SERVICE_SUCCESS,
                getServiceList
            ));
    },

    getService: async (req, res) => {
        const serviceIdx = req.params.idx;
        const getService = await serviceModel.getService(serviceIdx);
        if (getService < 0) {
            return res.status(statusCode.INTERNAL_SERVER_ERROR)
                .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, resMessage.DB_ERROR));
        }
        return res.status(statusCode.OK)
            .send(util.success(statusCode.OK, resMessage.READ_SERVICE_SUCCESS, getService[0]));
    },

    createService: async (req, res) => {
        const {
            name,
            type,
            tags,
            layer
        } = req.body;
        // if (name === undefined || type === undefined || tags === undefined || layer === undefined) {

        //     return res.status(statusCode.BAD_REQUEST)
        //         .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
        // }
        // if (await studyModel.checkStudy(name, type, tags, status)) {
        //     return res.status(statusCode.BAD_REQUEST)
        //         .send(util.fail(statusCode.BAD_REQUEST, resMessage.CREATE_STUDY_FAIL));
        // } 

        const service = await serviceModel.createService(name, type, tags, layer);
        if (service < 0) {
            return res.status(statusCode.INTERNAL_SERVER_ERROR)
                .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, resMessage.DB_ERROR));
        }
        return res.status(statusCode.CREATED)
            .send(util.success(statusCode.CREATED, resMessage.CREATE_SERVICE_SUCCESS));

    },

    updateService: async (req, res) => {
        const serviceIdx = req.params.idx;
        const {
            name,
            type,
            tags,
            layer
        } = req.body;

        if (name === undefined || type === undefined || tags === undefined || layer === undefined) {
            return res.status(statusCode.BAD_REQUEST)
                .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
        }

        const updateService = {
            serviceIdx,
            name,
            type,
            tags,
            layer
        };

        const service = await serviceModel.updateService(updateService);
        if (service < 0) {
            return res.status(statusCode.INTERNAL_SERVER_ERROR)
                .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, resMessage.DB_ERROR));
        }
        return res.status(statusCode.CREATED)
            .send(util.success(statusCode.CREATED, resMessage.UPDATE_SERVICE_SUCCESS));

    },

    deleteService: async (req, res) => {
        const serviceIdx = req.params.idx;

        if (serviceIdx === undefined) {
            return res.status(statusCode.BAD_REQUEST)
                .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
        }
        if (!await serviceModel.checkServiceIdx(serviceIdx)) {
            return res.status(statusCode.BAD_REQUEST)
                .send(util.fail(statusCode.BAD_REQUEST, resMessage.DELETE_SERVICE_FAIL));
        }
        const service = await serviceModel.deleteService(serviceIdx);
        if (service < 0) {
            return res.status(statusCode.INTERNAL_SERVER_ERROR)
                .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, resMessage.DELETE_SERVICE_FAIL));
        }
        return res.status(statusCode.OK)
            .send(util.success(statusCode.OK, resMessage.DELETE_SERVICE_SUCCESS));
    },
}

module.exports = service;
