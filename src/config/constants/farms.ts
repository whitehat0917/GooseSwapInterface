import contracts from './contracts'
import { FarmConfig, QuoteToken } from './types'

const farms: FarmConfig[] = [
  // {
  //   pid: 0,
  //   risk: 5,
  //   lpSymbol: 'DBALL-BUSD LP',
  //   lpAddresses: {
  //     97: '',
  //     56: '0x55d06D963CDc4405E204FB1585b45b5E8e353719',
  //   },
  //   tokenSymbol: 'DBALL',
  //   tokenAddresses: {
  //     97: '',
  //     56: '0xceB2f5e9C7F2D3BCd12A7560D73c56f3396af3F9',
  //   },
  //   quoteTokenSymbol: QuoteToken.BUSD,
  //   quoteTokenAdresses: contracts.busd,
  // },
  // {
  //   pid: 3,
  //   risk: 3,
  //   lpSymbol: 'BNB-BUSD LP',
  //   lpAddresses: {
  //     97: '',
  //     56: '0x1b96b92314c44b159149f7e0303511fb2fc4774f',
  //   },
  //   tokenSymbol: 'BNB',
  //   tokenAddresses: {
  //     97: '',
  //     56: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
  //   },
  //   quoteTokenSymbol: QuoteToken.BUSD,
  //   quoteTokenAdresses: contracts.busd,
  // },
  {
    pid: 0,
    risk: 1,
    lpSymbol: 'DOGEMA-USDC LP',
    lpAddresses: {
      97: '',
      137: '0x211e837dbd4250b89fdd1b445a7848add733bff7',
    },
    tokenSymbol: 'DOGEMA',
    tokenAddresses: {
      97: '',
      137: '0xAfE66Ea9818441489E60262437C2c6DDCdB66168',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
    multiplier: '50X'
  },
  {
    pid: 1,
    risk: 1,
    lpSymbol: 'DOGEMA-MATIC LP',
    lpAddresses: {
      97: '',
      // 137: '0x5f9172ae006c45611171452b0e2a69567138ada2',
      137: '0xbB60D1f9cbAeFA6845bf635db23Ea25a27A11E83',
    },
    tokenSymbol: 'DOGEMA',
    tokenAddresses: {
      97: '',
      137: '0xAfE66Ea9818441489E60262437C2c6DDCdB66168',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    multiplier: '40X'
  },
  {
    pid: 2,
    risk: 1,
    lpSymbol: 'MATIC-USDC LP',
    lpAddresses: {
      97: '',
      137: '0x6e7a5fafcec6bb1e78bae2a1f0b612012bf14827',
    },
    tokenSymbol: 'MATIC',
    tokenAddresses: {
      97: '',
      137: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
    multiplier: '5X'
  },

  {
    pid: 3,
    risk: 1,
    isTokenOnly: true,
    lpSymbol: 'DOGEMA',
    lpAddresses: {
      97: '',
      137: '0x211e837dbd4250b89fdd1b445a7848add733bff7', // DOGEMA LP
    },
    tokenSymbol: 'DOGEMA',
    tokenAddresses: {
      97: '',
      137: '0xAfE66Ea9818441489E60262437C2c6DDCdB66168',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 4,
    risk: 1,
    isTokenOnly: true,
    lpSymbol: 'MATIC',
    lpAddresses: {
      97: '',
      137: '0x6e7a5fafcec6bb1e78bae2a1f0b612012bf14827', // MATIC LP
    },
    tokenSymbol: 'MATIC',
    tokenAddresses: {
      97: '',
      137: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  // {
  //   pid: 5,
  //   risk: 1,
  //   isTokenOnly: true,
  //   lpSymbol: 'USDC',
  //   lpAddresses: {
  //     97: '',
  //     137: '0xDD9185DB084f5C4fFf3b4f70E7bA62123b812226', // DOGEMA-USDC LP
  //   },
  //   tokenSymbol: 'DOGEMA',
  //   tokenAddresses: {
  //     97: '',
  //     137: '0xDD9185DB084f5C4fFf3b4f70E7bA62123b812226',
  //   },
  //   quoteTokenSymbol: QuoteToken.USDC,
  //   quoteTokenAdresses: contracts.usdc,
  // },
]

export default farms
