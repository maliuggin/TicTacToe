import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import MyButton from '../UI/button/MyButton';
import styles from "./TicTacToe.module.css"
const TicTacToe = () => {
  const [playerNumber, setPlayerNumber] = useState("first");
  const [area, setArea] = useState(["","","","","","","","",""]);
  const [isVisibleModalWin, setIsVisibleModalWin] = useState(false)
  const [isVisibleModalDraw, setIsVisibleModalDraw] = useState(false)

  function makeAMove(index) {
    if (area[index] === "" && playerNumber === "first") {
      setArea(area.map((item, i) => i === index ? "X" : item))
      setPlayerNumber("second")
    } else if (area[index] === "" && playerNumber === "second") {
      setArea(area.map((item, i) => i === index ? "O" : item))
      setPlayerNumber("first")
    }


  }

  function closeModal() {
    setIsVisibleModalWin(false)
    setIsVisibleModalDraw(false)
    setPlayerNumber("first")
    setArea(["","","","","","","","",""])
  }

  useEffect(() => {
    if(((area[0] === area[1] && area[1] === area[2]) && (area[0] && area[1] && area[2])) ||
       ((area[3] === area[4] && area[4] === area[5]) && (area[3] && area[4] && area[5])) ||
       ((area[6] === area[7] && area[7] === area[8]) && (area[6] && area[7] && area[8])) ||
       ((area[0] === area[3] && area[3] === area[6]) && (area[0] && area[3] && area[6])) ||
       ((area[1] === area[4] && area[4] === area[7]) && (area[1] && area[4] && area[7])) ||
       ((area[2] === area[5] && area[5] === area[8]) && (area[2] && area[5] && area[8])) ||
       ((area[0] === area[4] && area[4] === area[8]) && (area[0] && area[4] && area[8])) ||
       ((area[2] === area[4] && area[4] === area[6]) && (area[2] && area[4] && area[6]))) {
        setIsVisibleModalWin(true)
        setPlayerNumber(playerNumber === 'first' ? "second" : "first")
    } else if(!isVisibleModalWin && !area.filter(item => item === "").length) {
      setIsVisibleModalDraw(true)
    }
  }, [area])


  return ( <div>
      {isVisibleModalWin ? <div className={styles.modal} onClick={closeModal}><p>{playerNumber} WIN!!!</p></div> : null}
      {isVisibleModalDraw ? <div className={styles.modal} style={{backgroundColor: "rgba(24, 105, 180, 0.575)"}} onClick={closeModal}><p>Draw</p></div> : null}
      <h1 style={{textAlign: "center"}}>Now it's the {playerNumber} player's turn</h1>
      <div style={{display: "grid", gridTemplateColumns: "repeat(3, 1fr)", justifyContent: "start", maxWidth: "750px", margin: "0 auto"}}>
        {area.map((item, i) => <MyButton key={i} onClick={() => makeAMove(i)}>{item}</MyButton>)}
      </div>
  </div> );
}
 
export default TicTacToe;