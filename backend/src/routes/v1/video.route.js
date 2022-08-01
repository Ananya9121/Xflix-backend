const express = require("express");
const validate = require("../../middlewares/validate");
const videoValidation = require("../../validations/video.validation");
const videoController = require("../../controllers/video.controller");
const router = express.Router();

router.get("/", validate(videoValidation.getVideos) ,videoController.getVideosByQuery);

// router.get("/:videoid", validate(videoValidation.validVideoId), videoController.getVideoById);

// router.post("/", validate(videoValidation.uploadVideo) ,videoController.uploadVideo);

// router.patch("/:videoid/votes", validate(videoValidation.validVideoId), videoController.updateVote);

// router.patch("/:videoid/views", validate(videoValidation.validVideoId), videoController.updateViewCount);

module.exports = router;
