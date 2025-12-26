import { motion } from 'framer-motion'
import { useGame } from '../context/GameContext'

export const Dice = () => {
	const { diceValue, isRolling, rollDice } = useGame()

	return (
		<motion.div
			className='w-24 h-24 bg-white rounded-xl shadow-lg border-4 border-indigo-500 flex items-center justify-center cursor-pointer'
			onClick={rollDice}
			animate={isRolling ? { rotate: 360, scale: [1, 0.8, 1] } : { rotate: 0 }}
			transition={{ duration: 0.5 }}
			whileTap={{ scale: 0.9 }}
		>
			<span className='text-4xl font-bold text-indigo-600'>
				{isRolling ? '?' : diceValue}
			</span>
		</motion.div>
	)
}
