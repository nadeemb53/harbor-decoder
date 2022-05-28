import { ethers } from 'ethers';
import { Path } from './interface/path.enum';

export class Classifier {
  async classify(tx: ethers.providers.TransactionResponse) {
    const value = tx.value.toString();
    if (value !== '0') {
      return Path.ETHER_VALUE;
    }
  }
}
