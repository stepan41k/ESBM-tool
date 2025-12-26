import { motion } from 'framer-motion'
import { useGame } from '../context/GameContext'

export const Dice = () => {
	const { diceValue, isRolling, rollDice } = useGame()

	return (
		<div className='relative group'>
			{/* Светящаяся подложка */}
			<div className='absolute inset-0 bg-indigo-500 rounded-3xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-500'></div>

			<motion.button
				className='relative w-40 h-40 bg-gradient-to-br from-white to-slate-200 rounded-3xl shadow-2xl flex items-center justify-center border-4 border-white/50 z-10'
				onClick={rollDice}
				disabled={isRolling}
				animate={
					isRolling
						? {
								rotate: [0, 90, 180, 270, 360],
								scale: [1, 0.9, 1.1, 0.95, 1],
								borderRadius: ['24px', '50%', '24px'],
						  }
						: { rotate: 0 }
				}
				transition={{ duration: 0.6, ease: 'easeInOut' }}
				whileTap={{ scale: 0.9 }}
			>
				<span className='text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-indigo-600 to-purple-600 select-none'>
					{isRolling ? '...' : diceValue}
				</span>
			</motion.button>

			<p className='text-center text-slate-400 mt-6 text-sm font-medium animate-pulse'>
				{isRolling ? 'Бросаем...' : 'Нажми, чтобы бросить'}
			</p>
		</div>
	)
}
