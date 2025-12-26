import { useGame } from '../context/GameContext'
import type { Player, PlayerStats } from '../context/GameContext' // <--- Добавили "type"
import { StatCounter } from './StatCounter'
import { Heart, Skull, ZapOff, Ghost, Gem, Trophy, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

export const PlayerCard = ({ player }: { player: Player }) => {
	const { updateStat, toggleEpicResurrection } = useGame()

	const handleUpdate = (stat: keyof PlayerStats, delta: number) => {
		updateStat(player.id, stat, delta)
	}

	return (
		<div className='w-full bg-slate-800/50 rounded-3xl p-4 border border-white/10 shadow-xl mb-6 last:mb-24'>
			{/* Заголовок с именем */}
			<div className='mb-4 px-2 border-b border-white/10 pb-2'>
				<h3 className='text-2xl font-black text-white tracking-wide'>
					{player.name}
				</h3>
			</div>

			{/* Сетка счетчиков */}
			<div className='grid grid-cols-2 gap-3'>
				{/* Жизни (HP) - Главный блок */}
				<div className='col-span-2 mb-2'>
					<StatCounter
						label='Здоровье (MAX 25)'
						value={player.hp}
						icon={
							<Heart size={18} fill={player.hp > 0 ? 'currentColor' : 'none'} />
						}
						colorClass='text-red-500'
						onIncrement={() => handleUpdate('hp', 1)}
						onDecrement={() => handleUpdate('hp', -1)}
						isMain={true}
					/>

					{/* --- ПЕРЕКЛЮЧАТЕЛЬ ВОСКРЕШЕНИЯ --- */}
					<div
						onClick={() => toggleEpicResurrection(player.id)}
						className='flex items-center justify-center gap-3 py-2 px-3 rounded-xl bg-black/20 cursor-pointer border border-white/5 hover:bg-black/30 transition-colors'
					>
						<div
							className={`text-xs font-bold uppercase transition-colors ${
								player.hasEpicResurrection
									? 'text-yellow-400'
									: 'text-slate-500'
							}`}
						>
							Воскрешение до 25
						</div>

						{/* Сам свитч */}
						<div
							className={`w-10 h-6 rounded-full p-1 transition-colors duration-300 flex ${
								player.hasEpicResurrection ? 'bg-yellow-500' : 'bg-slate-700'
							}`}
						>
							<motion.div
								className='w-4 h-4 bg-white rounded-full shadow-md'
								layout
								transition={{ type: 'spring', stiffness: 700, damping: 30 }}
								style={{
									marginLeft: player.hasEpicResurrection ? 'auto' : '0',
								}}
							/>
						</div>

						{player.hasEpicResurrection && (
							<Sparkles size={14} className='text-yellow-400 animate-pulse' />
						)}
					</div>
					{/* -------------------------------- */}
				</div>

				{/* Жетоны дохлого колдуна */}
				<StatCounter
					label='Дохлый колдун'
					value={player.deadWizards}
					icon={<Skull size={16} />}
					colorClass='text-slate-600'
					onIncrement={() => handleUpdate('deadWizards', 1)}
					onDecrement={() => handleUpdate('deadWizards', -1)}
				/>

				{/* Вялые палочки */}
				<StatCounter
					label='Вялые палочки'
					value={player.limpWands}
					icon={<ZapOff size={16} />}
					colorClass='text-green-500'
					onIncrement={() => handleUpdate('limpWands', 1)}
					onDecrement={() => handleUpdate('limpWands', -1)}
				/>

				{/* Твари */}
				<StatCounter
					label='Твари'
					value={player.creatures}
					icon={<Ghost size={16} />}
					colorClass='text-red-500'
					onIncrement={() => handleUpdate('creatures', 1)}
					onDecrement={() => handleUpdate('creatures', -1)}
				/>

				{/* Сокровища */}
				<StatCounter
					label='Сокровища'
					value={player.treasures}
					icon={<Gem size={16} />}
					colorClass='text-slate-400'
					onIncrement={() => handleUpdate('treasures', 1)}
					onDecrement={() => handleUpdate('treasures', -1)}
				/>

				{/* Легенды */}
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
