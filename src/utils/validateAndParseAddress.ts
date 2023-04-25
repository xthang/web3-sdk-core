import { getAddress } from '@ethersproject/address'
import TronWeb from 'tronweb'
import { XError, ChainNamespace } from '../entities'

/**
 * Validates an address and returns the parsed (checksummed) version of that address
 * @param address the unchecksummed hex address
 */
export function validateAndParseAddress(type: ChainNamespace, address: string): string {
  try {
    if (type === ChainNamespace.eip155) return getAddress(address)
    else if (type === ChainNamespace.solana) {
      if (TronWeb.isAddress(address)) return address
      else throw new Error()
    } else if (type === ChainNamespace.tron) {
      if (TronWeb.isAddress(address)) return address
      else throw new Error()
    }

    throw new XError('NETWORK_STANDARD_NOT_SUPPORTED', `${type} is not supported`)
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
export function checkValidAddress(type: ChainNamespace, address: string): string {
  if (type === ChainNamespace.eip155) {
    if (startsWith0xLen42HexRegex.test(address)) {
      return address
    }
    throw new Error(`${address} is not a valid eip155 address.`)
  } else if (type === ChainNamespace.solana) {
    if (TronWeb.isAddress(address)) {
      return address
    }
    throw new Error(`${address} is not a Solana address.`)
  } else if (type === ChainNamespace.tron) {
    if (TronWeb.isAddress(address)) {
      return address
    }
    throw new Error(`${address} is not a valid Tron address.`)
  }

  throw new Error(`${type} is not supported`)
}
