import { ethers } from 'ethers';
import { Path } from './interface/path.enum';
import { ApiResponse } from './interface/response.interface';
import erc20 from './abi/erc20.json';

export class Beautifier {
  async beautify(
    tx: ethers.providers.TransactionResponse,
    path: Path,
    provider: ethers.providers.StaticJsonRpcProvider,
  ): Promise<ApiResponse | null> {
    if (path === Path.ETHER_VALUE) {
      const value = ethers.utils.formatEther(tx.value.toString());
      const sourceAddress = tx.from;
      const destinationAddress = tx.to;
      if (!destinationAddress) {
        return null;
      }
      const readableString = `You transferred ${value} ETH from ${sourceAddress
        .toString()
        .slice(0, 7)} to ${destinationAddress.toString().slice(0, 7)}`;
      return { readableString: readableString, type: 'eth transaction' };
    } else if (path === Path.ERC20_TRANSFER) {
      if (!tx.to) return null;
      const tokenContract = new ethers.Contract(tx.to, erc20, provider);
      const tokenSymbol = await tokenContract.symbol();
      const tokenDecimals = await tokenContract.decimals();
      const iface = new ethers.utils.Interface(erc20);
      const txInfo = iface.parseTransaction({ data: tx.data });
      const to = txInfo.args._to as string;
      const value = txInfo.args._value as ethers.BigNumber;
      const preciseValue = value.div(Math.pow(10, tokenDecimals));
      const readableString = `You transferred ${preciseValue} ${tokenSymbol} from ${tx.from.slice(
        0,
        7,
      )} to ${to.slice(0, 7)}`;
      return {
        readableString: readableString,
        type: 'erc20 token transfer transaction',
      };
    }
    return null;
  }
}
