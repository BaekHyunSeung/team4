const shapeTextMap = {
  square: '□',
  circle: '○',
  triangle: '△',
  heart: '♡',
}

function ViewProblem(props) {
  if (props.CorrectMap == null) {
    return <div className="board-box">Loading...</div>
  }

  return (
    <div className="board-box">
      <div className="board-title">{`문제 보기`}</div>
      <div className="problem-grid">
        {props.CorrectMap.ColorList.map((color) => (
          <div
            key={color}
            className="cell color-cell"
            style={{ backgroundColor: color }}
          />
        ))}
        {props.CorrectMap.ShapeList.map((shape, index) => (
          <div key={shape + index} className="cell shape-cell">
            <span className={`shape-text shape-${shape}`}>
              {shapeTextMap[shape]}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ViewProblem
