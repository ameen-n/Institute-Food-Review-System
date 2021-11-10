const express = require("express");
const router = express.Router();

const announcement_control = require("../controllers/announcementController");


router.get("/announcement", announcement_control.fetchAnnouncementDefault);

router.get("/announcement/:id", announcement_control.fetchAnnouncementDefaultPer);

//router.get("/announcement/announcement/:id", announcement_control.fetchAnnouncementByUserID);

router.post("/announcement", announcement_control.newAnnouncement);

router.put('/announcement/:id', announcement_control.updateAnnouncement)

router.delete('/announcement/:id', announcement_control.deleteAnnouncement)

module.exports = router;