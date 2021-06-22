import React, { useCallback, useMemo, useState } from 'react'
import BigNumber from 'bignumber.js'
import styled, { keyframes } from 'styled-components'
import { Flex, Text, Skeleton } from '@pancakeswap-libs/uikit'
import { communityFarms } from 'config/constants'
import { Farm } from 'state/types'
import { provider } from 'web3-core'
import useI18n from 'hooks/useI18n'
import ExpandableSectionButton from 'components/ExpandableSectionButton'
import { QuoteToken } from 'config/constants/types'
import { getContract } from 'utils/web3'
import DetailsSection from './DetailsSection'
import CardHeading from './CardHeading'
import CardActionsContainer from './CardActionsContainer'
import ApyButton from './ApyButton'
import MasterchefAbi from '../../../../config/abi/masterchef.json'
import contracts from '../../../../config/constants/contracts';

export interface FarmWithStakedValue extends Farm {
  apy?: BigNumber
}

const RainbowLight = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`

const StyledCardAccent = styled.div`
  background: linear-gradient(45deg,
  rgba(255, 0, 0, 1) 0%,
  rgba(255, 154, 0, 1) 10%,
  rgba(208, 222, 33, 1) 20%,
  rgba(79, 220, 74, 1) 30%,
  rgba(63, 218, 216, 1) 40%,
  rgba(47, 201, 226, 1) 50%,
  rgba(28, 127, 238, 1) 60%,
  rgba(95, 21, 242, 1) 70%,
  rgba(186, 12, 248, 1) 80%,
  rgba(251, 7, 217, 1) 90%,
  rgba(255, 0, 0, 1) 100%);
  background-size: 300% 300%;
  animation: ${RainbowLight} 2s linear infinite;
  border-radius: 16px;
  filter: blur(6px);
  position: absolute;
  top: -2px;
  right: -2px;
  bottom: -2px;
  left: -2px;
  z-index: -1;
`

const FCard = styled.div`
  align-self: baseline;
  background: ${(props) => props.theme.card.background};
  border-radius: 32px;
  box-shadow: 0px 2px 12px -8px rgba(25, 19, 38, 0.1), 0px 1px 1px rgba(25, 19, 38, 0.05);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 24px;
  position: relative;
  text-align: center;
`

const Divider = styled.div`
  background-color: ${({ theme }) => theme.colors.borderColor};
  height: 1px;
  margin: 28px auto;
  width: 100%;
`

const ExpandingWrapper = styled.div<{ expanded: boolean }>`
  height: ${(props) => (props.expanded ? '100%' : '0px')};
  overflow: hidden;
`

interface FarmCardProps {
  farm: FarmWithStakedValue
  removed: boolean
  cakePrice?: BigNumber
  bnbPrice?: BigNumber
  ethereum?: provider
  account?: string
}

const FarmCard: React.FC<FarmCardProps> = ({ farm, removed, cakePrice, bnbPrice, ethereum, account }) => {
  const TranslateString = useI18n()

  const [showExpandableSection, setShowExpandableSection] = useState(false)
  const [harvest, setHarvest] = useState(null)
  const [nextHarvestUntil, setNextHarvestUntil] = useState(null)
  const [canHavest, setCanHavest] = useState(false)

  const harvestvalue= useCallback(async()=>{
    const MasterChef = getContract(MasterchefAbi, contracts.masterChef[process.env.REACT_APP_CHAIN_ID]);
    const response3 = await MasterChef.methods.poolInfo(farm.pid).call();
    const response = await MasterChef.methods.userInfo(farm.pid, account || '0xfca290620e035ed11531CE7d7EfB76c592Bb04cB').call();
    const canharvest = await MasterChef.methods.canHarvest(farm.pid, account || '0xfca290620e035ed11531CE7d7EfB76c592Bb04cB').call();
    // console.log('userInfo', farm.pid, account, response)
    const nextHarvestUntilVal = response.nextHarvestUntil;
    const harvestval = response3.harvestInterval
    return { harvestval, nextHarvestUntilVal, canharvest }
  },[farm.pid, account])

  // by me
  // console.log(farm.depositFeeBP);
  const fun = async () => {
    const { harvestval, nextHarvestUntilVal, canharvest } = await harvestvalue()
    setHarvest(harvestval)
    setNextHarvestUntil(nextHarvestUntilVal)
    setCanHavest(canharvest);
  }
  fun()

  // const isCommunityFarm = communityFarms.includes(farm.tokenSymbol)
  // We assume the token name is coin pair + lp e.g. CAKE-BNB LP, LINK-BNB LP,
  // NAR-CAKE LP. The images should be cake-bnb.svg, link-bnb.svg, nar-cake.svg
  // const farmImage = farm.lpSymbol.split(' ')[0].toLocaleLowerCase()
  const farmImage = farm.isTokenOnly ? farm.tokenSymbol.toLowerCase() : `${farm.tokenSymbol.toLowerCase()}-${farm.quoteTokenSymbol.toLowerCase()}`

  const totalValue: BigNumber = useMemo(() => {
    // console.log('=========================> ', farm.quoteTokenSymbol)
    if (!farm.lpTotalInQuoteToken) {
      return null
    }
    if (farm.quoteTokenSymbol === QuoteToken.BNB) {
      return bnbPrice.times(farm.lpTotalInQuoteToken)
    }
    if (farm.quoteTokenSymbol === QuoteToken.CAKE) {
      return cakePrice.times(farm.lpTotalInQuoteToken)
    }
    return farm.lpTotalInQuoteToken
  }, [bnbPrice, cakePrice, farm.lpTotalInQuoteToken, farm.quoteTokenSymbol])

  const totalValueFormated = totalValue
    ? `$${Number(totalValue).toLocaleString(undefined, { maximumFractionDigits: 0 })}`
    : '-'

  const lpLabel = farm.lpSymbol
  // const earnLabel = 'DBALL'
  const earnLabel = 'DOGEMA'
  const farmAPY = farm.apy && farm.apy.times(new BigNumber(100)).toNumber().toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  const { quoteTokenAdresses, quoteTokenSymbol, tokenAddresses, risk } = farm

  // console.log('===========> ', farm)

  return (
    <FCard>
      {farm.tokenSymbol === 'DOGEMA' && <StyledCardAccent />}
      <CardHeading
        lpLabel={lpLabel}
        multiplier={farm.multiplier}
        risk={risk}
        depositFee={farm.depositFeeBP}
        unstakingFee={farm.unstakingFeeBP}
        farmImage={farmImage}
        tokenSymbol={farm.tokenSymbol}
      />
      {!removed && (
        <Flex justifyContent='space-between' alignItems='center'>
          <Text>{TranslateString(352, 'APR')}:</Text>
          <Text bold style={{ display: 'flex', alignItems: 'center' }}>
            {farm.apy ? (
              <>
                <ApyButton
                  lpLabel={lpLabel}
                  quoteTokenAdresses={quoteTokenAdresses}
                  quoteTokenSymbol={quoteTokenSymbol}
                  tokenAddresses={tokenAddresses}
                  cakePrice={cakePrice}
                  apy={farm.apy}
                />
                {farmAPY}%
              </>
            ) : (
              <Skeleton height={24} width={80} />
              // <div>asdf</div>
            )}
          </Text>
        </Flex>
      )}
      <Flex justifyContent='space-between'>
        <Text>{TranslateString(318, 'Earn')}:</Text>
        <Text bold>{earnLabel}</Text>
      </Flex>
      <Flex justifyContent='space-between'>
        <Text style={{ fontSize: '24px' }}>{TranslateString(10001, 'Deposit Fee')}:</Text>
        <Text bold style={{ fontSize: '24px' }}>{(farm.depositFeeBP / 100)}%</Text>
      </Flex>

      <Flex justifyContent='space-between'>
        <Text >{TranslateString(10004, 'Harvest Lockup')}:</Text>
        <Text>{(harvest / 3600)}Hrs</Text>
      </Flex>

      <CardActionsContainer farm={farm} ethereum={ethereum} account={account} havestLockup={`${(harvest / 3600)}Hrs`} nextHarvestUntil={nextHarvestUntil} canHavest={canHavest}/>
      <Divider />
      <ExpandableSectionButton
        onClick={() => setShowExpandableSection(!showExpandableSection)}
        expanded={showExpandableSection}
      />
      <ExpandingWrapper expanded={showExpandableSection}>
        <DetailsSection
          removed={removed}
          isTokenOnly={farm.isTokenOnly}
          // bscScanAddress={
          //   farm.isTokenOnly ?
          //     `https://bscscan.com/token/${farm.tokenAddresses[process.env.REACT_APP_CHAIN_ID]}`
          //     :
          //     `https://bscscan.com/token/${farm.lpAddresses[process.env.REACT_APP_CHAIN_ID]}`
          // }
          bscScanAddress={
            farm.isTokenOnly ?
              `https://polygonscan.com/address/${farm.tokenAddresses[process.env.REACT_APP_CHAIN_ID]}`
              :
              `https://polygonscan.com/address/${farm.lpAddresses[process.env.REACT_APP_CHAIN_ID]}`
          }
          totalValueFormated={totalValueFormated}
          lpLabel={lpLabel}
          quoteTokenAdresses={quoteTokenAdresses}
          quoteTokenSymbol={quoteTokenSymbol}
          tokenAddresses={tokenAddresses}
        />
      </ExpandingWrapper>
    </FCard>
  )
}

export default FarmCard
