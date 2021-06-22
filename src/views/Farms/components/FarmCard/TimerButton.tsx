import React from 'react'
import BigNumber from 'bignumber.js'
import { CalculateIcon, IconButton, Image, useModal } from '@pancakeswap-libs/uikit'
import { Address } from 'config/constants/types'
import { Farm } from 'state/types'
import TimerModal from './TimerModal'

export interface FarmWithStakedValue extends Farm {
  apy?: BigNumber
}

export interface TimerButtonProps {
  account?: string,
  farm?: Farm,
  havestLockup?: string,
  nextHarvestUntil?: string
}

const TimerButton: React.FC<TimerButtonProps> = ({
  account,
  farm,
  havestLockup,
  nextHarvestUntil
}) => {
  const [onPresentApyModal] = useModal(
    <TimerModal
      account={account}
      farm={farm}
      havestLockup={havestLockup}
      nextHarvestUntil={nextHarvestUntil}
    />,
  )

  return (
    <IconButton onClick={onPresentApyModal} variant="text" size="sm" ml="4px">
      <Image src="/images/farms/timer.png" alt="timer" width={20} height={20} />
    </IconButton>
  )
}

export default TimerButton
