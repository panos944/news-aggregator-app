import { Router } from "express";
import { getArticlesBySource, getLatestArticles, getArticlesByAllSources } from "../controllers/article.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Articles
 *   description: News articles management and retrieval
 */

/**
 * @swagger
 * /api/articles/latest:
 *   get:
 *     summary: Get latest articles from all sources
 *     tags: [Articles]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 50
 *         description: Number of articles to return
 *         example: 20
 *     responses:
 *       200:
 *         description: Latest articles retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: integer
 *                   description: Number of articles returned
 *                   example: 20
 *                 articles:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Article'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/latest", getLatestArticles);

/**
 * @swagger
 * /api/articles/by-sources:
 *   get:
 *     summary: Get articles grouped by source
 *     tags: [Articles]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 50
 *           default: 10
 *         description: Number of articles per source
 *         example: 10
 *     responses:
 *       200:
 *         description: Articles grouped by source retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 sources:
 *                   type: object
 *                   additionalProperties:
 *                     type: array
 *                     items:
 *                       $ref: '#/components/schemas/Article'
 *                   example:
 *                     "Real.gr":
 *                       - title: "Sample Article Title"
 *                         url: "https://real.gr/article/123"
 *                         source: "Real.gr"
 *                     "InStyle.gr":
 *                       - title: "Fashion News"
 *                         url: "https://instyle.gr/article/456"
 *                         source: "InStyle.gr"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/by-sources", getArticlesByAllSources);

/**
 * @swagger
 * /api/articles/{sourceName}:
 *   get:
 *     summary: Get articles from a specific source
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: sourceName
 *         required: true
 *         schema:
 *           type: string
 *           enum: ["Real.gr", "InStyle.gr", "Olo Ygeia", "The Cars", "Real Player"]
 *         description: Name of the news source
 *         example: "Real.gr"
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 50
 *         description: Number of articles to return
 *         example: 20
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number for pagination
 *         example: 1
 *     responses:
 *       200:
 *         description: Articles from specific source retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: integer
 *                   description: Number of articles returned
 *                   example: 20
 *                 source:
 *                   type: string
 *                   description: Source name
 *                   example: "Real.gr"
 *                 articles:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Article'
 *       404:
 *         description: Source not found or no articles available
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "No articles found for source: InvalidSource"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/:sourceName", getArticlesBySource);

export default router;