import express from 'express';
import { Decoder } from './decoder';
import { Classifier } from './classifier';
import { Beautifier } from './beautifier';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const classifier = new Classifier();
const beautifier = new Beautifier();
const decoder = new Decoder(
  'https://mainnet.infura.io/v3/cc568b58f6f44bb1a827f6d6de016654',
  classifier,
  beautifier,
);

app.get('/decoder/:txhash', async (req, res) => {
  const txHash = req.params.txhash;
  console.log('##########TX DECODING REQ RECEIVED############');
  // call decoder class here
  const tx = await decoder.decode(txHash);
  console.log('###########TX SUCCESSFULLY DECODED############');
  res.json({ signedTx: tx }).status(200);
});
app.listen(3030, () => console.log(`Listening on port 3030`));
