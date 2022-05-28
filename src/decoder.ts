// first for eth value transfers
import { ethers } from 'ethers';
import { Beautifier } from './beautifier';
import { Classifier } from './classifier';

export class Decoder {
  private provider: ethers.providers.StaticJsonRpcProvider;
	private readonly classifier: Classifier;
	private readonly beautifier: Beautifier;

  constructor(rpcUrl: string, classifier: Classifier, beautifier: Beautifier) {
    this.provider = new ethers.providers.StaticJsonRpcProvider(rpcUrl);
		this.classifier = classifier;
		this.beautifier = beautifier;
  }

	async decode(txHash: string){
		//fetch transaction
		const tx = await this.fetchTransaction(txHash);
		const txReceipt = await this.fetchTransactionReceipt(txHash);
		//let classifier decide the path
		// console.log(tx);
		const path = await this.classifier.classify(tx, txReceipt);
		if(!path) {
			return 'Err[1]: Could not identify transaction';
		}
		const readableString = this.beautifier.beautify(tx, path, this.provider);
		if(!readableString) {
			return 'Err[2]: Could not identify transaction';
		}
		return readableString;
	}

	private async fetchTransaction (txHash: string) {
		return this.provider.getTransaction(txHash);
	}

	private async fetchTransactionReceipt(txHash: string) {
		return this.provider.getTransactionReceipt(txHash);
	}

}
