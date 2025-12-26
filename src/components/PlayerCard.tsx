import { useGame } from '../context/GameContext'
import type { Player, PlayerStats } from '../context/GameContext' // <--- Добавили "type"
import { StatCounter } from './StatCounter'
import {
	Heart,
	Skull,
	ZapOff,
	Ghost,
	Gem,
	Trophy,
	Sparkles,
	Frown,
} from 'lucide-react' // Добавили Frown (грустный смайл)
import { motion } from 'framer-motion'

export const PlayerCard = ({ player }: { player: Player }) => {
	const { updateStat, toggleEpicResurrection, toggleLoser } = useGame()

	const handleUpdate = (stat: keyof PlayerStats, delta: number) => {
		updateStat(player.id, stat, delta)
	}

	// Вычисляем, какой текст показывать над жизнями
	const maxHpLabel = player.isLoser ? 'MAX 15' : 'MAX 25'

	return (
		<div
			className={`w-full rounded-3xl p-4 border shadow-xl mb-6 last:mb-24 transition-colors duration-500 ${
				player.isLoser
					
					? 'bg-slate-800/50 border-white/10'
					: 'bg-slate-800/50 border-white/10'
			}`}
		>
			<div className='mb-4 px-2 border-b border-white/10 pb-2 flex justify-between items-center'>
				<h3 className='text-2xl font-black text-white tracking-wide'>
					{player.name}
				</h3>
				{player.isLoser && (
					<span className='text-xs font-bold bg-green-700 px-2 py-1 rounded text-white animate-pulse'>
						LOSER
					</span>
				)}
			</div>

			<div className='grid grid-cols-2 gap-3'>
				{/* Жизни */}
				<div className='col-span-2 space-y-2 mb-2'>
					<StatCounter
						label={`Здоровье (${maxHpLabel})`}
						value={player.hp}
						icon={
							<Heart size={18} fill={player.hp > 0 ? 'currentColor' : 'none'} />
						}
						colorClass={player.isLoser ? 'text-green-700' : 'text-red-500'}
						onIncrement={() => handleUpdate('hp', 1)}
						onDecrement={() => handleUpdate('hp', -1)}
						isMain={true}
					/>

					<div className='flex gap-2'>
						{/* 1. Переключатель Воскрешения */}
						<div
							onClick={() => toggleEpicResurrection(player.id)}
							className='flex-1 flex flex-col items-center justify-center gap-1 py-2 px-1 rounded-xl bg-black/20 cursor-pointer border border-white/5 hover:bg-black/30 transition-colors'
						>
							<div className='flex items-center gap-2'>
								<div
									className={`w-8 h-5 rounded-full p-1 flex items-center transition-colors duration-300 ${
										player.hasEpicResurrection
											? 'bg-yellow-500'
											: 'bg-slate-700'
									}`}
								>
									<motion.div
										className='w-3 h-3 bg-white rounded-full shadow-md'
										layout
										transition={{ type: 'spring', stiffness: 700, damping: 30 }}
										style={{
											marginLeft: player.hasEpicResurrection ? 'auto' : '0',
										}}
									/>
								</div>
								{player.hasEpicResurrection && (
									<Sparkles size={12} className='text-yellow-400' />
								)}
							</div>
							<div
								className={`text-[10px] font-bold uppercase text-center leading-tight ${
									player.hasEpicResurrection
										? 'text-yellow-400'
										: 'text-slate-500'
								}`}
							>
								Воскрес. 25
							</div>
						</div>

						{/* 2. Переключатель ЛОШАРЫ */}
						<div
							onClick={() => toggleLoser(player.id)}
							className='flex-1 flex flex-col items-center justify-center gap-1 py-2 px-1 rounded-xl bg-black/20 cursor-pointer border border-white/5 hover:bg-black/30 transition-colors'
						>
							<div className='flex items-center gap-2'>
								<div
									className={`w-8 h-5 rounded-full p-1 flex items-center transition-colors duration-300 ${
										player.isLoser ? 'bg-green-700' : 'bg-slate-700'
									}`}
								>
									<motion.div
										className='w-3 h-3 bg-white rounded-full shadow-md'
										layout
										transition={{ type: 'spring', stiffness: 700, damping: 30 }}
										style={{ marginLeft: player.isLoser ? 'auto' : '0' }}
									/>
								</div>
								{player.isLoser && (
									<Frown size={12} className='text-green-700' />
								)}
							</div>
							<div
								className={`text-[10px] font-bold uppercase text-center leading-tight ${
									player.isLoser ? 'text-green-700' : 'text-slate-500'
								}`}
							>
								Лошара (15)
							</div>
						</div>
					</div>
				</div>

				{/* Остальные счетчики */}
				<StatCounter
					label='Дохлый колдун'
					value={player.deadWizards}
					icon={<Skull size={16} />}
					colorClass='text-slate-400'
					onIncrement={() => handleUpdate('deadWizards', 1)}
					onDecrement={() => handleUpdate('deadWizards', -1)}
				/>
				<StatCounter
					label='Вялые палочки'
					value={player.limpWands}
					icon={<ZapOff size={16} />}
					colorClass='text-pink-400'
					onIncrement={() => handleUpdate('limpWands', 1)}
					onDecrement={() => handleUpdate('limpWands', -1)}
				/>
				<StatCounter
					label='Твари'
					value={player.creatures}
					icon={<Ghost size={16} />}
					colorClass='text-red-600'
					onIncrement={() => handleUpdate('creatures', 1)}
					onDecrement={() => handleUpdate('creatures', -1)}
				/>
				<StatCounter
					label='Сокровища'
					value={player.treasures}
					icon={<Gem size={16} />}
					colorClass='text-blue-400'
					onIncrement={() => handleUpdate('treasures', 1)}
					onDecrement={() => handleUpdate('treasures', -1)}
				/>
				<StatCounter
					label='Легенды'
					value={player.legends}
					icon={<Trophy size={16} />}
					colorClass='text-yellow-400'
					onIncrement={() => handleUpdate('legends', 1)}
					onDecrement={() => handleUpdate('legends', -1)}
				/>
			</div>
		</div>
	)
}