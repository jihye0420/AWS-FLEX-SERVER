const express = require('express');
const router = express.Router();

const studyController = require('../controllers/study');

//스터디 구현물 목록 조회
router.get('/', studyController.getStudyList);
//스터디 구현물 상세 조회
router.get('/:idx', studyController.getStudy);
//스터디 구현물 생성
router.post('/', studyController.createStudy);
//스터디 구현물 수정
router.put('/:idx', studyController.updateStudy);
//스터디 구현물 삭제
router.delete('/:idx', studyController.deleteStudy);

module.exports = router;