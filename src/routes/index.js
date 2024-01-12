import express from "express";
const router = express.Router();

import {ctrl} from "../services/service.js";
// import {ctrl} from "./controller.js";

// http://localhost:8090/api로 들어온 경우의 함수 생성
router.get('/api', ctrl.SCENARIO_PAGE_REAL_TIME);

// http://localhost:8090/meta로 들어온 경우의 함수 생성
router.get('/meta', ctrl.META_DATE);

export default router;