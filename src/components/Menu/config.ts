import { MenuEntry } from '@pancakeswap-libs/uikit'
// import { MenuEntry } from 'mountaindefi-uikit'

const config: MenuEntry[] = [
  {
    label: 'Home',
    icon: 'HomeIcon',
    href: '/',
  },
  {
    label: 'Trade',
    icon: 'TradeIcon',
    items: [
      {
        label: 'Exchange',
        href: 'http://exchange.dragonballfinance.org/',
      },
      {
        label: 'Liquidity',
        href: 'http://exchange.dragonballfinance.org/#/pool',
      },
    ],
  },
  {
    label: 'Farms',
    icon: 'FarmIcon',
    href: '/farms',
  },
  {
    label: 'Pools',
    icon: 'PoolIcon',
    href: '/pools',
  },
  {
    label: "Referral",
    icon: "GroupsIcon",
    href: "/referral",
  },
  /* {
    label: 'Layered Farming - Layer 1',
    icon: 'LayerIcon',
    href: '/Layered',
  },
  {
    label: 'Nft',
    icon: 'NftIcon',
    href: '/Nft',
  }, */
  {
    label: 'Lottery',
    icon: 'HomeIcon',
    href: '/Lottery',
  },
  /* {
    label: 'Gaming App',
    icon: 'NftIcon',
    href: '/Gaming',
  }, */
  {
    label: 'Token Info',
    icon: 'InfoIcon',
    items: [
      {
        label: 'BSC Scan',
        href: 'https://bscscan.com/token/0xceB2f5e9C7F2D3BCd12A7560D73c56f3396af3F9',
      },
      {
        label: 'Price Graph',
        href: 'https://dex.guru/token/0xceB2f5e9C7F2D3BCd12A7560D73c56f3396af3F9-bsc',
      },
      {
        label: 'DApp Radar',
        href: 'https://dappradar.com/binance-smart-chain/defi/dragonball-finance',
      },
    ],
  },
  {
    label: 'More',
    icon: 'MoreIcon',
    items: [
      {
        label: "Github",
        href: "https://github.com/DragonBallFinance",
      },
      {
        label: "Docs",
        href: "https://docs.dragonballfinance.org/",
      },
      {
        label: "Blog",
        href: "https://dragonballfinance.medium.com/",
      },
      {
        label: "Whitepaper",
        href: "https://dragonballfinance.org/Whitepaper.pdf",
      },
    ],
  },
  {
    label: 'Roadmap',
    icon: 'RoadmapIcon',
    href: 'https://dragonballfinance.org/Roadmap',
  },
  {
    label: 'Audit',
    icon: 'AuditIcon',
    href: 'https://dragonballfinance.org/Audit.pdf',
  },
]

export default config
