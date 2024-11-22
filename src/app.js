import express from 'express';
import productsRoute from './routes/products.route.js';

const app = express();

app.use(express.json());
app.use('/api/products', productsRoute);


app.listen(8080, () => {
	console.log('Server started on port: 8080' +` at ${new Date()}`);
});

export default app;



