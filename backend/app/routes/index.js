const express = require("express");
const router = express.Router();
const logger = require("../logger");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

/* GET tasks page. */
router.get("/", async (req, res, next) => {
  logger.info("tasks start");
  const tasks = await prisma.task.findMany({
    include: {
      categories: true,
    },
  });
  res.status(200).json({ tasks });
  logger.info("tasks get ok");
});

// task put
router.put("/:id", async (req, res, next) => {
  logger.info("put start");
  const id = req.params.id;
  const { title, content, status, categoryId } = req.body;
  try {
    const taskPut = await prisma.task.update({
      where: {
        id: Number(id),
      },
      data: {
        title,
        content,
        status: JSON.parse(status),
        categoryId: Number(categoryId),
      },
    });
    res.status(200).json({ taskPut });
  } catch (e) {
    logger.warn("put warn");
    next(e);
  }
  logger.info(`put ${id} ok`);
});

// task delete
router.delete("/:id", async (req, res, next) => {
  logger.info("delete start");
  const id = req.params.id;
  const del = await prisma.task.delete({
    where: {
      id: Number(id),
    },
  });
  res.status(200).json({ del });
  logger.info(`del ${id} ok`);
});

// 詳細
router.get("/to/:id", async (req, res, next) => {
  logger.info("taskPage start");
  const id = req.params.id;
  const task = await prisma.task.findMany({
    where: {
      id: Number(id),
    },
    include: {
      categories: true,
    },
  });
  res.status(200).send(task);
  logger.info(`get ${id} ok`);
});

module.exports = router;
