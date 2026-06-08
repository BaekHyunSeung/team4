const shapeTextMap = {
  null: '?',
  square: '□',
  circle: '○',
  triangle: '△',
  heart: '♡',
}

function Problem(props) {
  const colorList =
    props.ColorShuffled.length === 4
      ? props.ColorShuffled
      : ['#ffffff', '#ffffff', '#ffffff', '#ffffff']

  return (
    <div className="board-box">
      <div className="board-title">{`문제 풀기`}</div>
      <div className="problem-grid">
        {colorList.map((color, index) => (
          <div
            key={color + index}
            className="cell color-cell"
            style={{ backgroundColor: color }}
          />
        ))}
        {props.UserSelect.map((shape, index) => (
          <button
            key={index}
            className="cell select-cell"
            onClick={() => {
              props.ChangeSelect(index)
            }}
            disabled={!props.IsPlaying}
          >
            <span className={`shape-text shape-${shape ?? 'empty'}`}>
              {shapeTextMap[shape]}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default Problem
