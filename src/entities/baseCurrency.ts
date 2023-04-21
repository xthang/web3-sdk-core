import assert from 'assert'
import { NetworkStandard } from './network'
import { Token } from './token'

/**
 * A currency is any fungible financial instrument, including Ether, all ERC20 tokens, and other chain-native currencies
 */
export abstract class BaseCurrency {
  public readonly type: NetworkStandard
  /**
   * The chain ID on which this currency resides
   */
  public readonly chainId: string
  public readonly chainId_: number | string

  /**
   * Returns whether the currency is native to the chain and must be wrapped (e.g. Ether)
   */
  public abstract readonly isNative: boolean
  /**
   * Returns whether the currency is a token that is usable without wrapping
   */
  public abstract readonly isToken: boolean

  /**
   * The decimals used in representing currency amounts
   */
  public readonly decimals: number
  /**
   * The symbol of the currency, i.e. a short textual non-unique identifier
   */
  public readonly symbol?: string
  /**
   * The name of the currency, i.e. a descriptive textual non-unique identifier
   */
  public readonly name?: string

  /**
   * Constructs an instance of the base class `BaseCurrency`.
   * @param chainId the chain ID on which this currency resides
   * @param decimals decimals of the currency
   * @param symbol symbol of the currency
   * @param name of the currency
   */
  protected constructor(chainId: string, decimals: number, symbol?: string, name?: string) {
    assert(typeof chainId === 'string' || Number.isSafeInteger(chainId), 'CHAIN_ID')
    assert(decimals >= 0 && decimals < 255 && Number.isInteger(decimals), 'DECIMALS')

    this.chainId = chainId
    this.decimals = decimals
    this.symbol = symbol
    this.name = name

    const [networkStandard, chainId_] = chainId.split(':')
    assert(networkStandard in NetworkStandard, 'INVALID_NETWORK_STANDARD')
    this.type = NetworkStandard[networkStandard as NetworkStandard]
    this.chainId_ = this.type === NetworkStandard.eip155 ? parseInt(chainId_):chainId_
  }

  /**
   * Returns whether this currency is functionally equivalent to the other currency
   * @param other the other currency
   */
  public abstract equals(other: BaseCurrency): boolean

  /**
   * Return the wrapped version of this currency that can be used with the Uniswap contracts. Currencies must
   * implement this to be used in Uniswap
   */
  public abstract get wrapped(): Token
}
