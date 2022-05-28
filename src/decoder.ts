// first for eth value transfers
import { ethers } from 'ethers';
import { Classifier } from './classifier';

export class Decoder {
  private provider: ethers.providers.StaticJsonRpcProvider;
	private readonly classifier: Classifier;
  constructor(rpcUrl: string, classifier: Classifier) {
    this.provider = new ethers.providers.StaticJsonRpcProvider(rpcUrl);
		this.classifier = classifier;
  }

	async decode(txHash: string){
		//fetch transaction
		const tx = await this.fetchTransaction(txHash);
		return tx;
	}

	private async fetchTransaction (txHash: string) {
		return this.provider.getTransaction(txHash);
	}

}
