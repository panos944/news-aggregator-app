import { Router, Request, Response } from "express";
import { realPlayerService } from "../services/realPlayer.service";
import { body, param, query, validationResult } from "express-validator";

const router = Router();

/**
 * @swagger
 * /api/realplayer/programs:
 *   get:
 *     summary: Get all Real Player programs
 *     tags: [Real Player]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *     responses:
 *       200:
 *         description: List of programs
 */
router.get("/programs", async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    
    const result = await realPlayerService.getAllPrograms(page, limit);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch programs" });
  }
});

/**
 * @swagger
 * /api/realplayer/current:
 *   get:
 *     summary: Get current Real Player program
 *     tags: [Real Player]
 *     responses:
 *       200:
 *         description: Current program
 */
router.get("/current", async (req, res) => {
  try {
    const currentProgram = await realPlayerService.getCurrentProgram();
    res.json(currentProgram);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch current program" });
  }
});

/**
 * @swagger
 * /api/realplayer/today:
 *   get:
 *     summary: Get today's Real Player programs
 *     tags: [Real Player]
 *     responses:
 *       200:
 *         description: Today's programs
 */
router.get("/today", async (req, res) => {
  try {
    const todaysPrograms = await realPlayerService.getTodaysPrograms();
    res.json(todaysPrograms);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch today's programs" });
  }
});

/**
 * @swagger
 * /api/realplayer/programs:
 *   post:
 *     summary: Create a new Real Player program
 *     tags: [Real Player]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - startTime
 *               - endTime
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               startTime:
 *                 type: string
 *                 format: date-time
 *               endTime:
 *                 type: string
 *                 format: date-time
 *               imageUrl:
 *                 type: string
 *               url:
 *                 type: string
 *     responses:
 *       201:
 *         description: Program created successfully
 */
router.post("/programs", [
  body("title").notEmpty().withMessage("Title is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("startTime").isISO8601().withMessage("Valid start time is required"),
  body("endTime").isISO8601().withMessage("Valid end time is required"),
], async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    const program = await realPlayerService.createProgram(req.body);
    res.status(201).json(program);
  } catch (error) {
    res.status(500).json({ error: "Failed to create program" });
  }
});

/**
 * @swagger
 * /api/realplayer/programs/{id}:
 *   put:
 *     summary: Update a Real Player program
 *     tags: [Real Player]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               startTime:
 *                 type: string
 *                 format: date-time
 *               endTime:
 *                 type: string
 *                 format: date-time
 *               imageUrl:
 *                 type: string
 *               url:
 *                 type: string
 *               isActive:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Program updated successfully
 */
router.put("/programs/:id", [
  param("id").isMongoId().withMessage("Valid program ID is required"),
], async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    const program = await realPlayerService.updateProgram(req.params.id, req.body);
    if (!program) {
      res.status(404).json({ error: "Program not found" });
      return;
    }
    res.json(program);
  } catch (error) {
    res.status(500).json({ error: "Failed to update program" });
  }
});

/**
 * @swagger
 * /api/realplayer/programs/{id}:
 *   delete:
 *     summary: Delete a Real Player program
 *     tags: [Real Player]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Program deleted successfully
 */
router.delete("/programs/:id", [
  param("id").isMongoId().withMessage("Valid program ID is required"),
], async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    const deleted = await realPlayerService.deleteProgram(req.params.id);
    if (!deleted) {
      res.status(404).json({ error: "Program not found" });
      return;
    }
    res.json({ message: "Program deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete program" });
  }
});

export default router; 