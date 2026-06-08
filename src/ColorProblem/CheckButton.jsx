function CheckButton(props) {
  return (
    <button className="check-button" onClick={props.checkAnswer}>
      정답 확인
    </button>
  )
}

export default CheckButton
