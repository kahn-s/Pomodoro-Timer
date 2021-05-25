import React from "react";
import { minutesToDuration, secondsToDuration } from "./utils/duration";

function SessionStatus(props) {
  const { session, activeSession, isTimerRunning, percentage } = props;

  const displayTimerText = () => {
    if (isTimerRunning) {
      return `${session.label} for ${minutesToDuration(
        session.duration
      )} minutes`;
    }
  };
  const displayTimeRemaining = () => {
    if (isTimerRunning) {
      return ` ${secondsToDuration(session.timeRemaining)} remaining`;
    }
    if (!isTimerRunning && session.timeRemaining > 0) {
      return ` ${secondsToDuration(session.timeRemaining)} remaining`;
    } else {
      return `25:00 remaining`;
    }
  };

  if (activeSession) {
    return (
      <section id="session-status)">
        <div>
          <div className="row mb-2">
            <div className="col">
              <h2 data-testid="session-title">{displayTimerText()}</h2>
              <p className="lead" data-testid="session-sub-title">
                {displayTimeRemaining()}
              </p>
              {!isTimerRunning ? <h2>PAUSED</h2> : null}
            </div>
          </div>
          <div className="row mb-2">
            <div className="col">
              <div className="progress" style={{ height: "20px" }}>
                <div
                  className="progress-bar"
                  role="progressbar"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  aria-valuenow={percentage}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  } else {
    return null;
  }
}

export default SessionStatus;
