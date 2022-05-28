import { ethers } from 'ethers';
import { Path } from './interface/path.enum';
import erc20 from './abi/erc20.json';

export class Classifier {
  async classify(
    tx: ethers.providers.TransactionResponse,
    txReceipt: ethers.providers.TransactionReceipt,
  ) {
    const value = tx.value.toString();
    if (value !== '0' && tx.data === '0x') {
      return Path.ETHER_VALUE;
    }
    try {
      const iface = new ethers.utils.Interface(erc20);
      const txInfo = iface.parseTransaction({ data: tx.data });
      if (txInfo.name === ('transfer' || 'transferFrom')) {
        return Path.ERC20_TRANSFER;
      }
    } catch (err) {
      console.log(err);
      console.log(
        'This is either a complex transaction or an erc20 contract transfer with nonstandard method name',
      );
    }
  }
}
