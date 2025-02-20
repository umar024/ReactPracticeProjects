

export default function GameBoard({ onSelectSquare, board }) {

    
    /*     const [gameBoard, setGameBoard] = useState(initialGameBoard);
    
        function handleSelectSquare(rowIndex, colIndex){
            
            setGameBoard((prevGameBoard) => {
                console.log('clicked'+rowIndex+colIndex);
                console.log(prevGameBoard);
                const updatedBoard = [...prevGameBoard.map(innerArray => [...innerArray])];
                updatedBoard[rowIndex][colIndex] = active;
                return updatedBoard;
            });
    
            onSelectSquare();
        } */

    return <ol id="game-board">
        {board.map((row, rowIndex) => <li key={rowIndex}>
            <ol>
                {row.map((playerSymbol, colIndex) => (
                    <li key={colIndex}>
                        <button onClick={() => onSelectSquare(rowIndex, colIndex)} disabled={playerSymbol!==null}>
                            {playerSymbol}
                        </button>
                    </li>
                ))}
            </ol>
        </li>)}
    </ol>;
}