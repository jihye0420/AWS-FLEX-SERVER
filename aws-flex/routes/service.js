const express = require('express');
const router = express.Router();

const serviceController = require('../controllers/service');

//AWS 서비스 목록 조회
router.get('/', serviceController.getServiceList);
//AWS 서비스 상세 조회
router.get('/:idx', serviceController.getService);
//AWS 서비스 생성
router.post('/', serviceController.createService);
//AWS 서비스 수정
router.put('/:idx', serviceController.updateService);
//AWS 서비스 삭제
router.delete('/:idx', serviceController.deleteService);

module.exports = router;