import React from "react";
import { minutesToDuration } from "./utils/duration";

function AdjustDuration({
  focusDuration,
  breakDuration,
  onFocusIncrementClick,
  onFocusDecrementClick,
  onBreakIncrementClick,
  onBreakDecrementClick,
}) {
  const focusMinutesDuration = minutesToDuration(focusDuration);
  const breakMinutesDuration = minutesToDuration(breakDuration);

  return (
    <section id="timers">
      <div className="input-group input-group-lg mb-2">
        <span className="input-group-text" data-testid="duration-focus">
          {/* TODO: Update this text to display the current focus session duration */}
          Focus Duration: {focusMinutesDuration}
        </span>
        <div className="input-group-append">
          {/* TODO: Implement decreasing focus duration and disable during a focus or break session */}
          <button
            type="button"
            className="btn btn-secondary"
            data-testid="decrease-focus"
            onClick={onFocusDecrementClick}
          >
            <span className="oi oi-minus" />
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            data-testid="increase-focus"
            onClick={onFocusIncrementClick}
          >
            <span className="oi oi-plus" />
          </button>
        </div>
      </div>
      <div className="float-right">
        <div className="input-group input-group-lg mb-2">
          <span className="input-group-text" data-testid="duration-break">
            Break Duration: {breakMinutesDuration}
          </span>
          <div className="input-group-append">
            <button
              type="button"
              className="btn btn-secondary"
              data-testid="decrease-break"
              onClick={onBreakDecrementClick}
            >
              <span className="oi oi-minus" />
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              data-testid="increase-break"
              onClick={onBreakIncrementClick}
            >
              <span className="oi oi-plus" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
export default AdjustDuration;
