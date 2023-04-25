import { ChainNamespace } from '../entities/network'
import { checkValidAddress, validateAndParseAddress } from './validateAndParseAddress'

describe('#validateAndParseAddress', () => {
  it('returns same address if already checksummed', () => {
    expect(validateAndParseAddress(ChainNamespace.eip155, '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f')).toEqual(
      '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f'
    )
  })

  it('returns checksummed address if not checksummed', () => {
    expect(
      validateAndParseAddress(ChainNamespace.eip155, '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f'.toLowerCase())
    ).toEqual('0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f')
  })

  it('throws if not valid', () => {
    expect(() => validateAndParseAddress(ChainNamespace.eip155, '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6')).toThrow(
      '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6 is not a valid address.'
    )
  })

  it('check TRON address', () => {
    expect(validateAndParseAddress(ChainNamespace.tron, 'TNUC9Qb1rRpS5CbWLmNMxXBjyFoydXjWFR')).toEqual(
      'TNUC9Qb1rRpS5CbWLmNMxXBjyFoydXjWFR'
    )
  })
})

describe('#checkValidAddress', () => {
  it('returns same address if valid', () => {
    expect(checkValidAddress(ChainNamespace.eip155, '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f')).toEqual(
      '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f'
    )
  })

  it('check TRON address', () => {
    expect(checkValidAddress(ChainNamespace.tron, 'TNUC9Qb1rRpS5CbWLmNMxXBjyFoydXjWFR')).toEqual(
      'TNUC9Qb1rRpS5CbWLmNMxXBjyFoydXjWFR'
    )
  })

  it('throws if length < 42', () => {
    expect(() => checkValidAddress(ChainNamespace.eip155, '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6')).toThrow(
      '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6 is not a valid address.'
    )
  })

  it('throws if length > 42', () => {
    expect(() => checkValidAddress(ChainNamespace.eip155, '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6fA')).toThrow(
      '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6fA is not a valid address.'
    )
  })

  it('throws if it does not start with 0x', () => {
    expect(() => checkValidAddress(ChainNamespace.eip155, '5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f')).toThrow(
      '5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f is not a valid address.'
    )
  })

  it('throws if it is not a HEX string', () => {
    expect(() => checkValidAddress(ChainNamespace.eip155, '0x5C69bEe701ef814a2X6a3EDD4B1652CB9cc5aA6f')).toThrow(
      '0x5C69bEe701ef814a2X6a3EDD4B1652CB9cc5aA6f is not a valid address.'
    )
  })
})
