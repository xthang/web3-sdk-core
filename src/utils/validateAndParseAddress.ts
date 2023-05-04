import { getAddress } from '@web3-x/web3.js'
import { XError, ChainNamespace } from '../entities'

/**
 * Validates an address and returns the parsed (checksummed) version of that address
 * @param address the unchecksummed hex address
 */
export function validateAndParseAddress(chainNamespace: ChainNamespace, address: string): string {
  try {
    return getAddress(address, chainNamespace)
  } catch (error) {
    if (error instanceof XError) throw error
    throw new Error(`${address} is not a valid address.`)
  }
}

// Checks a string starts with 0x, is 42 characters long and contains only hex characters after 0x
const startsWith0xLen42HexRegex = /^0x[0-9a-fA-F]{40}$/

/**
 * Checks if an address is valid by checking 0x prefix, length === 42 and hex encoding.
 * @param address the unchecksummed hex address
 */
export function checkValidAddress(chainNamespace: ChainNamespace, address: string): string {
  switch (chainNamespace) {
    case ChainNamespace.eip155: {
      if (startsWith0xLen42HexRegex.test(address)) {
        return address
      }
      throw new Error(`${address} is not a valid eip155 address.`)
    }
    default:
      return getAddress(address, chainNamespace)
  }
}
