export enum ChainNamespace {
  eip155 = 'eip155',
  solana = 'solana',
  polkadot = 'polkadot',
  cosmos = 'cosmos',
  cardano = 'cardano',
  elrond = 'elrond',
  multiversx = 'multiversx',
  tron = 'tron'
}

export type ChainName = `${string}:${string}`

export enum NetworkLayer {
  L1,
  L2,
}
