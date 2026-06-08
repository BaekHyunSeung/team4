import Header from "./Header";
import TitleBox from "./TitleBox";
import "./Question1.css";
import CircleItem from "./CircleItem";
import { useState } from "react";

function Question1() {

    const [userAnswer, setUserAnswer] = useState([]);
    const [result, setResult] = useState("");

    const correctAnswer = [
        "ㄱ",
        "ㄴ",
        "5",
        "2",
        "4",
        "1"
    ];

    const handleClick = (value) => {

        // 이미 선택한 것은 다시 선택 못하게
        if (userAnswer.includes(value)) {
            return;
        }

        const newAnswer = [...userAnswer, value];

        setUserAnswer(newAnswer);

        if (newAnswer.length === correctAnswer.length) {

            if (
                JSON.stringify(newAnswer) ===
                JSON.stringify(correctAnswer)
            ) {
                setResult("정답입니다!");
            }
            else {
                setResult("오답입니다!");
            }

        }

    };

    const resetAnswer = () => {
        setUserAnswer([]);
        setResult("");
    };

    return (

        <div className="page">

            <Header />

            <TitleBox />

            <CircleItem
                text="ㄱ"
                top="280px"
                left="120px"
                onClick={() => handleClick("ㄱ")}
                selected={userAnswer.includes("ㄱ")}
            />

            <CircleItem
                text="2"
                top="380px"
                left="350px"
                onClick={() => handleClick("2")}
                selected={userAnswer.includes("2")}
            />

            <CircleItem
                text="4"
                top="470px"
                left="720px"
                onClick={() => handleClick("4")}
                selected={userAnswer.includes("4")}
            />

            <CircleItem
                text="ㄴ"
                top="650px"
                left="520px"
                onClick={() => handleClick("ㄴ")}
                selected={userAnswer.includes("ㄴ")}
            />

            <CircleItem
                text="5"
                top="930px"
                left="140px"
                onClick={() => handleClick("5")}
                selected={userAnswer.includes("5")}
            />

            <CircleItem
                text="1"
                top="1150px"
                left="720px"
                onClick={() => handleClick("1")}
                selected={userAnswer.includes("1")}
            />

            <div
                style={{
                    position: "fixed",
                    right: "20px",
                    bottom: "20px",
                    backgroundColor: "white",
                    padding: "10px",
                    border: "1px solid black"
                }}
            >

                <p>
                    선택 : {userAnswer.join(" → ")}
                </p>

                <h3>{result}</h3>

                <button onClick={resetAnswer}>
                    다시하기
                </button>

            </div>

        </div>

    );

}

export default Question1;