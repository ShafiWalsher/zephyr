'use client'

import { useEffect, useState } from 'react'
import classes from './index.module.scss'
import Image from 'next/image'
import { Button } from '../Button'

const Promotion = () => {
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  const [targetDate, setTargetDate] = useState(() => {
    const initialTargetDate = new Date()
    initialTargetDate.setDate(initialTargetDate.getDate() + 7)
    return initialTargetDate
  })

  useEffect(() => {
    const timerInterval = setInterval(() => {
      const currentTime = new Date()
      const timeDifference = Math.max(Number(targetDate) - Number(currentTime), 0)

      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000)

      setTime({ days, hours, minutes, seconds })

      if (timeDifference === 0) {
        clearInterval(timerInterval)
        const newTargetDate = new Date()
        newTargetDate.setDate(newTargetDate.getDate() + 3)
        setTargetDate(newTargetDate)
      }
    }, 1000)

    return () => {
      clearInterval(timerInterval) // Cleanup the interval when the component unmounts.
    }
  }, [targetDate])

  return (
    <section className={classes.promotion}>
      <div className={classes.textBox}>
        <h3 className={classes.title}>Deals of the Month</h3>
        <p>
          Fuel your shopping passion with our Epic Deals Extravaganza of the Month! Brace yourself
          for exclusive perks and mind-blowing offers with every purchase, turning this month into a
          carnival of savvy choices and unbeatable deals. Hurry, the shopping spree of a lifetime is
          calling your name! 🚀🛍️ #DontMissOut
        </p>

        <ul className={classes.stats}>
          <StatBox label="Days" value={time.days} />
          <StatBox label="Hours" value={time.hours} />
          <StatBox label="Minutes" value={time.minutes} />
          <StatBox label="Seconds" value={time.seconds} />
        </ul>
        <Button
          type="button"
          appearance="primary"
          label="View Product&nbsp;&nbsp;&nbsp;&nbsp;🡪"
          className={classes.dealBtn}
          el="link"
          href={`/products`}
        />
      </div>
      <div className={classes.mediaWrappper}>
        <Image
          src="/assets/images/image-4.png"
          alt="promotion-image"
          height={650}
          width={650}
          className={classes.media}
        />
      </div>
    </section>
  )
}

const StatBox = ({ label, value }: { label: string; value: number }) => (
  <li className={classes.statBox}>
    <h4>{value}</h4>
    <p>{label}</p>
  </li>
)

export default Promotion
