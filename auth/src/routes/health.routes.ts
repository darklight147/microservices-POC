import { Router } from "express";

const router = Router();

router.get('/', (req, res) => {
    res.status(200).send();
});

export {
    router as healthRrouter
}