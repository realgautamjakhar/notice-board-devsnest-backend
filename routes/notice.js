const express = require("express");
const NoticeBoard = require("../Models/noticeBoardModel");
const router = express.Router();

// /api/notice GET
router.get("/", async (req, res) => {
  try {
    const notices = await NoticeBoard.findAll();

    return res.status(200).json({
      notices,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
});

// /api/v1/books/add
router.post("/add", async (req, res) => {
  try {
    const { author, message } = req.body;

    if (!author || !message) {
      return res.status(400).send();
    }

    const newNotice = {
      author,
      message,
    };

    const notice = await NoticeBoard.create(newNotice);

    return res.status(201).send(notice);
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
});

// /api/notice/:id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const notice = await NoticeBoard.findOne({
      where: {
        id: id,
      },
    });

    if (!notice) {
      return res.status(404).send();
    }

    return res.status(200).json(notice);
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
});

// //api/notice/:id/like PUT
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    //     -->> Searching in database
    const notice = await NoticeBoard.findOne({
      where: {
        id: id,
      },
    });

    if (!notice) {
      return res.status(404).send();
    }

    const updatedNotice = await NoticeBoard.increment("like", {
      by: 1,
      where: {
        id: id,
      },
    });

    return res.status(200).send();
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
});

module.exports = router;
