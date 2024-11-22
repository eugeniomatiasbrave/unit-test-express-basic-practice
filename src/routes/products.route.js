import { Router } from "express";

const router = Router();

router.get('/', (req, res) => {
	res.json( [] );
});

router.post('/', (req, res) => {
	const { title, description } = req.body;

	if (!title || !description) return res.sendStatus(400);

	res.json({
			id: Math.floor(Math.random() * 100, 10),
			title,
			description
	});
});

router.get('/:pid', (req, res) => {
	res.send('Product detail');
});

router.delete('/:pid', (req, res) => {
		res.send('Product deleted');
	});

router.put('/:pid', (req, res) => {
		res.send('Product updated');
	});

export default router;