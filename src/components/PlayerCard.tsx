import clsx from 'clsx'
import { motion } from 'framer-motion'

interface Player {
	id: number
	name: string
	score: number
}

interface PlayerCardProps {
	player: Player
	isActive: boolean
}

export const PlayerCard = ({ player, isActive }: PlayerCardProps) => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			className={clsx(
				'relative p-5 rounded-2xl flex justify-between items-center transition-all duration-300 border backdrop-blur-md',
				isActive
					? 'bg-white/10 border-pink-500/50 shadow-[0_0_15px_rgba(236,72,153,0.3)] translate-x-2'
					: 'bg-black/20 border-white/5 opacity-70'
			)}
		>
			{/* Индикатор активного игрока */}
			{isActive && (
				<div className='absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-12 bg-pink-500 rounded-full shadow-[0_0_10px_#ec4899]' />
			)}

			<div className='flex flex-col'>
				<span
					className={clsx(
						'text-xs font-bold uppercase tracking-wider mb-1',
						isActive ? 'text-pink-400' : 'text-slate-500'
					)}
				>
					{isActive ? 'Ваш ход' : 'Ожидание'}
				</span>
				<h3 className='font-bold text-xl text-white tracking-wide'>
					{player.name}
				</h3>
			</div>

			<div className='flex flex-col items-end'>
				<span className='text-xs text-slate-400 mb-1'>Очки</span>
				<span className='text-3xl font-black text-white tabular-nums leading-none'>
					{player.score}
				</span>
			</div>
		</motion.div>
	)
}
