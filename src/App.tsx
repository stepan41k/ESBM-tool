import { GameProvider, useGame } from './context/GameContext'
import { PlayerCard } from './components/PlayerCard'
import { RefreshCw } from 'lucide-react'

const GameBoard = () => {
	const { players, resetGame } = useGame()

	return (
		<div className='min-h-screen w-full bg-slate-900 pb-10'>
			{/* Фиксированная шапка */}
			<header className='sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-white/10 px-6 py-4 flex justify-between items-center shadow-lg'>

				<button
					onClick={() => {
						if (confirm('Сбросить игру? Все счетчики вернутся к началу.'))
							resetGame()
					}}
					className='p-2 bg-white/5 rounded-full text-slate-400 hover:text-white hover:bg-red-500/20 transition-all'
				>
					<RefreshCw size={20} />
				</button>
			</header>

			{/* Основной контент */}
			<main className='p-4 max-w-lg mx-auto space-y-6'>
				{players.map(player => (
					<PlayerCard key={player.id} player={player} />
				))}
			</main>

			{/* Нижняя надпись */}
			<footer className='text-center text-slate-600 text-xs py-4'>
				Эпичные битвы боевых магов
			</footer>
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
