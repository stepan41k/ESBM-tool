import { GameProvider, useGame } from './context/GameContext'
import { Dice } from './components/Dice'
import { PlayerCard } from './components/PlayerCard'

const GameBoard = () => {
	const { players, activePlayerIdx, nextTurn } = useGame()

	return (
		// Фон с градиентом
		<div className='min-h-screen w-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center p-6 relative overflow-hidden'>
			{/* Декоративные пятна на фоне */}
			<div className='absolute top-[-10%] left-[-10%] w-64 h-64 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob'></div>
			<div className='absolute top-[20%] right-[-10%] w-64 h-64 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000'></div>

			{/* Контент */}
			<div className='w-full max-w-md z-10 flex flex-col h-full min-h-[85vh] justify-between'>
				<header className='text-center mb-8'>
					<h1 className='text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-indigo-400 tracking-wider drop-shadow-sm'>
						DICE GAME
					</h1>
					<p className='text-slate-400 text-sm font-medium mt-1'>
						Мобильный помощник
					</p>
				</header>

				<div className='space-y-4'>
					{players.map((player, idx) => (
						<PlayerCard
							key={player.id}
							player={player}
							isActive={idx === activePlayerIdx}
						/>
					))}
				</div>

				<div className='flex-grow flex flex-col items-center justify-center py-10'>
					<Dice />
				</div>

				<button
					onClick={nextTurn}
					className='w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white py-5 rounded-2xl font-bold text-xl shadow-lg shadow-indigo-500/30 active:scale-95 transition-all duration-200 uppercase tracking-widest'
				>
					Завершить ход
				</button>
			</div>
		</div>
	)
}

function App() {
	return (
		<GameProvider>
			<GameBoard />
		</GameProvider>
	)
}

export default App
