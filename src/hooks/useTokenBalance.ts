import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { provider } from 'web3-core'
import cakeABI from 'config/abi/cake.json'
import masterchefABI from 'config/abi/masterchef.json'
import { getContract } from 'utils/web3'
import { getTokenBalance } from 'utils/erc20'
import { getCakeAddress, getMasterChefAddress } from 'utils/addressHelpers'
import { usePriceBnbBusd } from 'state/hooks'
import multicall from 'utils/multicall'
import erc20 from 'config/abi/erc20.json'
import useRefresh from './useRefresh'

const useTokenBalance = (tokenAddress: string, _account?: string, _provider?: any) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { account: useAccount, ethereum }: { account: string; ethereum: provider } = useWallet()
  const { fastRefresh } = useRefresh()
  const account = _account || useAccount;
  const currentProvider = _provider || ethereum;

  useEffect(() => {
    const fetchBalance = async () => {
      const res = await getTokenBalance(currentProvider, tokenAddress, account)
      setBalance(new BigNumber(res))
    }

    if (account && currentProvider) {
      fetchBalance()
    }
  }, [account, currentProvider, tokenAddress, fastRefresh])

  return balance
}

export const useTotalSupply = () => {
  const { slowRefresh } = useRefresh()
  const [totalSupply, setTotalSupply] = useState<BigNumber>()

  useEffect(() => {
    async function fetchTotalSupply() {
      const cakeContract = getContract(cakeABI, getCakeAddress())
      const supply = await cakeContract.methods.totalSupply().call()
      setTotalSupply(new BigNumber(supply))
    }

    fetchTotalSupply()
  }, [slowRefresh])

  return totalSupply
}

// by moonlight
export const useTransferTax = () => {
  const { slowRefresh } = useRefresh()
  const [transferTax, setTransferTax] = useState<BigNumber>()

  useEffect(() => {
    async function fetchTransferTax() {
      const cakeContract = getContract(cakeABI, getCakeAddress())
      const tax = await cakeContract.methods.transferTaxRate().call()
      setTransferTax(new BigNumber(tax))
    }

    fetchTransferTax()
  }, [slowRefresh])

  return transferTax
}
// by moonlight
export const useMaxTransferAmount = () => {
  const { slowRefresh } = useRefresh()
  const [maxTransfer, setMaxTransfer] = useState<BigNumber>()
  const bnbPrice = usePriceBnbBusd();

  useEffect(() => {
    async function fetchMaxTransfer() {
      const cakeContract = getContract(cakeABI, getCakeAddress())
      const max = await cakeContract.methods.maxTransferAmount().call()
      // max: Wei(10 ^ - 18) , bnb value = max / 10 ^ 18
      // const val = (new BigNumber(max / 1000000000000000000).times(bnbPrice));
      const val = new BigNumber(max / 100000000000000000);
      setMaxTransfer(val)
    }

    fetchMaxTransfer()
  }, [slowRefresh, bnbPrice])

  return maxTransfer
}

// by moonlight
export const useMaxTransferRate = () => {
  const { slowRefresh } = useRefresh()
  const [maxTransfer, setMaxTransfer] = useState<string>('')
  const bnbPrice = usePriceBnbBusd();

  useEffect(() => {
    async function fetchMaxTransfer() {
      const cakeContract = getContract(cakeABI, getCakeAddress())
      const max = await cakeContract.methods.maxTransferAmountRate().call()
      console.log('max ===========> ', max, typeof max)
      setMaxTransfer(max)
    }

    fetchMaxTransfer()
  }, [slowRefresh, bnbPrice])

  return maxTransfer
}

export const useTotalLockedUpRewards = () => {
  const { slowRefresh } = useRefresh()
  const [tluRewars, setTLURewards] = useState<number>(0)

  useEffect(() => {
    async function fetch() {
      const masterchefContract = getContract(masterchefABI, getMasterChefAddress())
      const val = await masterchefContract.methods.totalLockedUpRewards().call()
      console.log('val ===> ', val)
      setTLURewards(val);
    }

    fetch()
  }, [slowRefresh])

  return tluRewars
}
// end

export const useBurnedBalance = (tokenAddress: string) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { slowRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalance = async () => {
      const cakeContract = getContract(cakeABI, getCakeAddress())
      const bal = await cakeContract.methods.balanceOf('0x000000000000000000000000000000000000dEaD').call()
      setBalance(new BigNumber(bal))
    }

    fetchBalance()
  }, [tokenAddress, slowRefresh])

  return balance
}

export default useTokenBalance
