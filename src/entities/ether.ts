import assert from 'assert'
import { Currency } from './currency'
import { NativeCurrency } from './nativeCurrency'
import { ChainName } from './network'
import { Token } from './token'
import { WETH9 } from './weth9'

/**
 * Ether is the main usage of a 'native' currency, i.e. for Ethereum mainnet and all testnets
 */
export class Ether extends NativeCurrency {
  protected constructor(chainId: ChainName | number) {
    super(typeof chainId === 'string' ? chainId : `eip155:${chainId}`, 18, 'ETH', 'Ether')
  }

  public get wrapped(): Token {
    const weth9 = WETH9[this.chainId]
    assert(weth9, 'WRAPPED')
    return weth9
  }

  private static _etherCache: { [chainId: string]: Ether } = {}

  public static onChain(chainId: ChainName | number): Ether {
    const chainId_: ChainName = typeof chainId === 'string' ? chainId : `eip155:${chainId}`
    return this._etherCache[chainId_] ?? (this._etherCache[chainId_] = new Ether(chainId_))
  }

  public equals(other: Currency): boolean {
    return other.isNative && other.chainId === this.chainId
  }
}
