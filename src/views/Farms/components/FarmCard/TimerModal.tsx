import React, { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { Modal, Text, LinkExternal, Flex } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
import { calculateCakeEarnedPerThousandDollars, apyModalRoi } from 'utils/compoundApyHelpers'
import { Address } from 'config/constants/types'
import { Farm } from 'state/types'
import { getWeb3 } from 'utils/web3'

interface TimerModalProps {
  onDismiss?: () => void
  account?: string,
  farm?: Farm,
  havestLockup?: string,
  nextHarvestUntil?: string
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(4, auto);
  margin-bottom: 24px;
`

const GridItem = styled.div`
  margin-bottom: '10px';
`

const Description = styled(Text)`
  max-width: 320px;
  margin-bottom: 28px;
`

const TimerModal: React.FC<TimerModalProps> = ({
  onDismiss,
  account,
  farm,
  havestLockup,
  nextHarvestUntil
}) => {
  const TranslateString = useI18n()
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const interval = setInterval(async () => {
      const web3 = getWeb3()
      const blockNumber = await web3.eth.getBlockNumber()
      // const timestamp = await (await web3.eth.getBlock(blockNumber)).timestamp
      // console.log('blockNumber ===> ', blockNumber, timestamp, typeof timestamp)
      const startDate = new Date('January 1, 1970');
      const currentTime = Date.now();
      const final = (parseInt(nextHarvestUntil) - currentTime) + startDate.getTime();
      const finalDate = new Date(final);
      // if (typeof timestamp === 'number') {
        // console.log('nextHarvestUntil ==> ', new Date(parseInt(nextHarvestUntil) * 1000), new Date((timestamp) * 1000), startDate.getTime(), currentTime / 1000)
        // setTimeLeft(Math.abs((parseInt(nextHarvestUntil) - timestamp)))
      // }
      setTimeLeft(Math.abs((parseInt(nextHarvestUntil) - Math.floor(currentTime / 1000))))
    }, 500)
    return (): void => clearInterval(interval);
  }, [farm, nextHarvestUntil, timeLeft ])


  return (
    <Modal title="Harvest In" onDismiss={onDismiss}>
      <Flex justifyContent="center">
        <Text fontSize="36px" bold color="text" textTransform="uppercase" mb="20px">
          {`${Math.floor(timeLeft / 3600)} : ${Math.floor((timeLeft % 3600) / 60)} : ${(timeLeft % 3600) % 60}`}
        </Text>
      </Flex>
      <Flex justifyContent="center">
        <Description fontSize="12px" color="textSubtle">
          Pool: DOGEMA
        </Description>
      </Flex>
      <Flex justifyContent="center">
        <Description fontSize="12px" color="textSubtle">
          {`Havest Lockup: ${havestLockup}`}
        </Description>
      </Flex>
    </Modal>
  )
}

export default TimerModal
