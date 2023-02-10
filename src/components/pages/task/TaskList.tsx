import { useState } from "react";
import { getDate } from "../../../common/utils/dateUtil";
import { CalendarType, DateFormat } from "../../../common/utils/enums";
import Calendar from "../../shared/Calendar";

const TaskList = () => {
  const [hourCount, setHourCount] = useState<number[]>(new Array(24).fill(0));

  const test = () => {
    const tester: HTMLElement | null = document.getElementById("task-2");
    if (tester) {
      const tester2: HTMLElement | null = document.getElementById("task-2-2");
      if (tester2) {
        tester2.style.display = "block";
        tester2.style.height = "300px";
      }
    }
  };

  const taskBox = () => {
    return hourCount.map((value, idx) => {
      return (
        <div id={`task-${idx}`} key={idx}>
          <div className="task-box">
            <div className="task-box-timestamp">
              {idx} : 00 {idx < 12 ? "AM" : "PM"}
            </div>
            <div className="task-box-data">
              <div id={`task-${idx}-${idx}`} className="task-modal">
                asdf
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div id="task-content">
      <div id="task-detail">
        <div id="task-detail-header">
          <div id="task-detail-header-left">
            <div id="task-month">{getDate(DateFormat.MONTH_4)}</div>
            <div id="task-today">Today is {getDate("dddd, MM Do, YYYY")}</div>
          </div>
          <div id="task-detail-header-right">
            <button className="btn-create" onClick={test}>
              + Create task
            </button>
          </div>
        </div>
        <div id="task-detail-body">{taskBox()}</div>
      </div>
      <div id="task-stat">
        <Calendar size={CalendarType.SMALL_CALENDAR}></Calendar>
      </div>
    </div>
  );
};

export default TaskList;
