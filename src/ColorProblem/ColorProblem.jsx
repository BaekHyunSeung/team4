import { useEffect, useState } from 'react'
import ViewProblem from './ViewProblem.jsx'
import Problem from './Problem.jsx'
import Timer from './Timer.jsx'
import StartButton from './StartButton.jsx'
import CheckButton from './CheckButton.jsx'
import './ColorProblem.css'

const SHAPE_LIST = ['square', 'circle', 'triangle', 'heart']
const COLOR_LIST = ['#fefd48', '#ff6168', '#6660d8', '#9a9a9a']
const LIMIT_TIME = 20
const CORRECT_MAP = {
  ColorList: COLOR_LIST,
  ShapeList: SHAPE_LIST,
}

function shuffleColorList(colorList) {
  const nextList = [...colorList]

  for (let i = nextList.length - 1; i > 0; i -= 1) {
    const randomIndex = Math.floor(Math.random() * (i + 1))
    const temp = nextList[i]
    nextList[i] = nextList[randomIndex]
    nextList[randomIndex] = temp
  }

  return nextList
}

function getNextShape(currentShape) {
  if (currentShape == null) {
    return SHAPE_LIST[0]
  }

  const currentIndex = SHAPE_LIST.indexOf(currentShape)

  if (currentIndex === SHAPE_LIST.length - 1) {
    return SHAPE_LIST[0]
  }

  return SHAPE_LIST[currentIndex + 1]
}

function isSameAnswer(userSelect, correctSelect) {
  for (let i = 0; i < userSelect.length; i += 1) {
    if (userSelect[i] !== correctSelect[i]) {
      return false
    }
  }

  return true
}

function ColorProblem() {
  const [CorrectMap] = useState(CORRECT_MAP)
  const [ColorShuffled, setColorShuffled] = useState([])
  const [UserSelect, setUserSelect] = useState([null, null, null, null])
  const [TimeLeft, setTimeLeft] = useState(LIMIT_TIME)
  const [IsPlaying, setIsPlaying] = useState(false)
  const [ResultMessage, setResultMessage] = useState('')
  const IsTimeOver = TimeLeft === 0
  const CanTimerRun = IsPlaying && TimeLeft > 0
  const CanSelect = IsPlaying

  useEffect(() => {
    if (!CanTimerRun) {
      return
    }

    const timerId = setTimeout(() => {
      setTimeLeft((prevTime) => prevTime - 1)
    }, 1000)

    return () => {
      clearTimeout(timerId)
    }
  }, [CanTimerRun, TimeLeft])

  const startGame = () => {
    if (CorrectMap == null) {
      return
    }

    setColorShuffled(shuffleColorList(CorrectMap.ColorList))
    setUserSelect([null, null, null, null])
    setTimeLeft(LIMIT_TIME)
    setIsPlaying(true)
    setResultMessage('')
  }

  const ChangeSelect = (index) => {
    if (!CanSelect) {
      return
    }

    const nextSelect = [...UserSelect]
    nextSelect[index] = getNextShape(nextSelect[index])
    setUserSelect(nextSelect)
  }

  const checkAnswer = () => {
    const selectedCount = UserSelect.filter((shape) => shape != null).length

    if (selectedCount !== 4) {
      setResultMessage('도형 4개를 모두 선택해주세요')
      return
    }

    if (ColorShuffled.length !== 4) {
      setResultMessage('')
      return
    }

    const correctSelect = []

    for (let i = 0; i < ColorShuffled.length; i += 1) {
      const color = ColorShuffled[i]
      const colorIndex = CorrectMap.ColorList.indexOf(color)
      correctSelect.push(CorrectMap.ShapeList[colorIndex])
    }

    if (isSameAnswer(UserSelect, correctSelect)) {
      setIsPlaying(false)
      if (IsTimeOver) {
        setResultMessage('시간 초과 정답')
      } else {
        setResultMessage('정답')
      }
    } else {
      setResultMessage('정답이 아닙니다. 다시 시도해주세요.')
    }
  }

  return (
    <div className="color-problem">
      <div className="title-row">
        <div className="page-title">
          아래의 보기를 보고 <br />
          색깔에 해당하는 모양을 <br />
          아래의 빈칸에 넣어보세요
        </div>
        <div className="top-controls">
          <Timer TimeLeft={TimeLeft} />
          <StartButton startGame={startGame} />
        </div>
      </div>

      <p className="result-text">{ResultMessage}</p>

      <ViewProblem CorrectMap={CorrectMap} />
      <Problem
        ColorShuffled={ColorShuffled}
        UserSelect={UserSelect}
        ChangeSelect={ChangeSelect}
        IsPlaying={CanSelect}
      />
      <CheckButton checkAnswer={checkAnswer} />
    </div>
  )
}

export default ColorProblem
