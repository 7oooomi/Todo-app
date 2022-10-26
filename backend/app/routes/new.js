const { PrismaClient } = require("@prisma/client");
var express = require("express");
const logger = require("../logger");
var router = express.Router();

const prisma = new PrismaClient();

/* GET new task page */
router.get("/", async (req, res, next) => {
  const category = await prisma.category.findMany();
  res.status(200).json(category);
  logger.info("newPage ok");
});

// post
router.post("/", async (req, res, next) => {
  logger.info("newPost start");
  const { title, content, status, categoryId } = req.body;
  try {
    const createTask = await prisma.task.create({
      data: {
        title,
        content,
        status: JSON.parse(status),
        categoryId: Number(categoryId),
      },
    });
    res.status(201).send({ createTask });
  } catch (e) {
    logger.warn("post error");
    next(e);
  }
  logger.info("newPost ok");
});

module.exports = router;
