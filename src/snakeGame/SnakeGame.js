import React, { useEffect, useState } from 'react';
import Point from './Point';
import Snake from './Snake';

import './style.css';

export default function SnakeGame() {

  useEffect(() => {
    getRandomPoint();
  }, [])

  const getRandomPoint = () => {
    let x = Math.floor(Math.random() * 100 / 2 ) * 2;
    let y = Math.floor(Math.random() * 100 / 2 ) * 2;
    return [x, y];
  }

  
  const [snakeDots, setSnakeDots] = useState([[0,0],[2,0]]);
  const [point, setPoint] = useState(getRandomPoint());
  const [speed, setSpeed] = useState(300);
  const [direction, setDirection] = useState('RIGHT');


  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onKeyDown = () => {
    window.addEventListener("keydown", (event) => {
      
      switch (event.key) {
        case "ArrowLeft":
          if (direction !== 'RIGHT'){
            setDirection('LEFT');
          } else {
            setDirection('RIGHT');
          }
          break;
        case "ArrowRight":
          if (direction !== 'LEFT'){
            setDirection('RIGHT');
          } else {
            setDirection('LEFT');
          }
            break;
        case "ArrowUp":
          if (direction !== 'DOWN'){
            setDirection('UP');
          } else {
            setDirection('DOWN');
          }
            break;
        case "ArrowDown":
          if (direction !== 'UP'){
            setDirection('DOWN');
          } else {
            setDirection('UP');
          }
            break;
          default:
            //nothing
    }
    })
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const moveSnake = () => {
    let dots = [...snakeDots];
    let head = dots[dots.length - 1];

    switch (direction) {
      case 'RIGHT':
        head = [head[0] + 2, head[1]];
        break;
      case 'LEFT':
        head = [head[0] - 2, head[1]];
        break;
      case 'UP':
        head = [head[0], head[1] - 2];
        break;
      case 'DOWN':
        head = [head[0], head[1] + 2];
        break;
        default:
    }
    dots.push(head);
    dots.shift();
    setSnakeDots(dots);
  }

  useEffect(() => {
    const interval = setInterval(moveSnake, speed);
    document.onkeydown = onKeyDown();

    return () => clearInterval(interval);
  }, [moveSnake, onKeyDown, snakeDots, speed]);

  useEffect(() => {
    checkOutOfBorders();
    checkCollapsed();
    checkEat();
  });


  const checkOutOfBorders = () => {
    let head = snakeDots[snakeDots.length - 1]
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      onGameOver()
    }
  }

  const checkCollapsed = () => {
    let dots = [...snakeDots];
    let head = dots[dots.length - 1];

    dots.pop();
    dots.forEach(dot => {
      if (head[0] === dot[0] && head[1] === dot[1])
      onGameOver();
    })
  }

  const checkEat = () => {
    let dots = [...snakeDots];
    let head = dots[dots.length - 1];

    if (head[0] === point[0] && head[1] === point[1]) {
      setPoint(getRandomPoint());
      enlargeSnake();
      increaseSpeed();
    }
  }

  const enlargeSnake = () => {
    let newSnake = [...snakeDots];
    newSnake.unshift([])
    setSnakeDots(newSnake);
  }

  const increaseSpeed = () => {
    if (speed > 10) {
      setSpeed(speed - 10);
    }
  }

  const onGameOver = () => {
    alert(`GAME OVER!\n You got ${snakeDots.length - 2} scores.`);
    setSnakeDots([[0,0],[2,0]]);
    setDirection('RIGHT');
    setSpeed(500);
    getRandomPoint();
  }



  return (
    <div className='box'>
        <Snake snakeDots={snakeDots} />
        <Point point={point} />
    </div>
  )
}

