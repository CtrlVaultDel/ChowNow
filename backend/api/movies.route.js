import express from "express";

// Get access to express router
const router = express.Router();

router.route('/').get((req, res) => res.send("hello world"));

export default router;