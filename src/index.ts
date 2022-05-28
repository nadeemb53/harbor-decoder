import express from 'express';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get('/decoder/:txhash', async (req, res) => {
	const signedTx = req.params.txhash;
	console.log('##########TX DECODING REQ RECEIVED############');
	// call decoder class here
	console.log('###########TX SUCCESSFULLY DECODED############');
	res.json({signedTx: signedTx}).status(200);
});
app.listen(3030, () => console.log(`Listening on port 3030`));