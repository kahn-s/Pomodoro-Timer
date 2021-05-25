import React, { useState } from "react";
import { secondsToDuration } from "../utils/duration";
import useInterval from "../utils/useInterval";
import AdjustDuration from "../AdjustDuration.js";
import SessionStatus from "../SessionStatus.js";
import Play from "../Play.js";
// These functions are defined outside of the component to insure they do not have access to state
// and are, therefore more likely to be pure.

/**
 * Update the session state with new state after each tick of the interval.
 * @param prevState
 *  the previous session state
 * @returns
 *  new session state with timing information updated.
 */
function nextTick(prevState) {
  const timeRemaining = Math.max(0, prevState.timeRemaining - 1);
  return {
    ...prevState,
    timeRemaining,
  };
}

/**
 * Higher order function that returns a function to update the session state with the next session type upon timeout.
 * @param focusDuration
 *    the current focus duration
 * @param breakDuration
 *    the current break duration
 * @returns
 *  function to update the session state.
 */
function nextSession(focusDuration, breakDuration) {
  /**
   * State function to transition the current session type to the next session. e.g. On Break -> Focusing or Focusing -> On Break
   */

  return (currentSession) => {
    if (currentSession.label === "Focusing") {
      return {
        label: "On Break",
        duration: breakDuration,
        timeRemaining: breakDuration * 60,
      };
    }
    return {
      label: "Focusing",
      duration: focusDuration,
      timeRemaining: focusDuration * 60,
    };
  };
}

function Pomodoro() {
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [session, setSession] = useState(null);
  const [activeSession, setActiveSession] = useState(false);
  const [focusDuration, setFocusDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  const [sessionRemainder, setSessionRemainder] = useState(25);
  const [percentage, setPercentage] = useState(0);

  const handleFocusDecrement = (event) => {
    event.preventDefault();
    if (focusDuration > 5 && !isTimerRunning) {
      const newFocusDuration = focusDuration - 5;
      setFocusDuration(newFocusDuration);
    }
  };
  const handleFocusIncrement = (event) => {
    event.preventDefault();
    if (focusDuration < 60 && !isTimerRunning) {
      const newFocusDuration = focusDuration + 5;
      setFocusDuration(newFocusDuration);
    }
  };
  const handleBreakDecrement = (event) => {
    event.preventDefault();
    if (breakDuration > 1 && !isTimerRunning) {
      const newBreakDuration = breakDuration - 1;
      setBreakDuration(newBreakDuration);
    }
  };
  const handleBreakIncrement = (event) => {
    event.preventDefault();
    if (breakDuration < 15 && !isTimerRunning) {
      const newBreakDuration = breakDuration + 1;
      setBreakDuration(newBreakDuration);
    }
  };

  useInterval(
    () => {
      if (session.timeRemaining === 0) {
        new Audio("https://bigsoundbank.com/UPLOAD/mp3/1482.mp3").play();
        return setSession(nextSession(focusDuration, breakDuration));
      }
      calculateProgress();

      setSessionRemainder(secondsToDuration(session.timeRemaining));

      return setSession(nextTick);
    },
    isTimerRunning ? 1000 : null
  );

  const playPause = () => {
    setIsTimerRunning((prevState) => {
      const nextState = !prevState;
      if (nextState) {
        setSession((prevStateSession) => {
          if (prevStateSession === null) {
            return {
              label: "Focusing",
              duration: focusDuration,
              timeRemaining: focusDuration * 60,
            };
          }
          return prevStateSession;
        });
      }
      return nextState;
    });
    setActiveSession(true);
  };

  function handleStopClick() {
    setIsTimerRunning(false);
    setFocusDuration(25);
    setBreakDuration(5);
    setSession(null);
    setSessionRemainder(null);
    setActiveSession(false);
    setPercentage(0);
  }

  const calculateProgress = () => {
    if (isTimerRunning && session.label === "Focusing") {
      const focusPercent = (session.timeRemaining / (focusDuration * 60)) * 100;
      setPercentage(100 - focusPercent);
    }
    if (isTimerRunning && session.label === "On Break") {
      const breakPercent = (session.timeRemaining / (breakDuration * 60)) * 100;
      setPercentage(100 - breakPercent);
    }
    return percentage;
  };

  return (
    <div className="pomodoro">
      <div className="row">
        <div className="col">
          <AdjustDuration
            focusDuration={focusDuration}
            breakDuration={breakDuration}
            onFocusDecrementClick={handleFocusDecrement}
            onFocusIncrementClick={handleFocusIncrement}
            onBreakDecrementClick={handleBreakDecrement}
            onBreakIncrementClick={handleBreakIncrement}
          />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Play
            playPause={playPause}
            isTimerRunning={isTimerRunning}
            handleStopClick={handleStopClick}
          />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <SessionStatus
            session={session}
            activeSession={activeSession}
            isTimerRunning={isTimerRunning}
            percentage={percentage}
          />
        </div>
      </div>
    </div>
  );
}

export default Pomodoro;
