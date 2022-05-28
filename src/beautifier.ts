import { ethers } from 'ethers';
import { Path } from './interface/path.enum';
import { ApiResponse } from './interface/response.interface';

export class Beautifier {
  beautify(
    tx: ethers.providers.TransactionResponse,
    path: Path,
  ): ApiResponse | null {
    if (path === Path.ETHER_VALUE) {
      const value = tx.value.toString();
      const value2 = ethers.utils.formatEther(value);
      const sourceAddress = tx.from;
      const destinationAddress = tx.to;
      if (!destinationAddress) {
        return null;
      }
      const readableString = `You transferred ${value2} ETH from ${sourceAddress
        .toString()
        .slice(0,7)} to ${destinationAddress.toString().slice(0,7)}`;
      return { readableString: readableString, type: 'eth transaction' };
    }
    return null;
  }
}
