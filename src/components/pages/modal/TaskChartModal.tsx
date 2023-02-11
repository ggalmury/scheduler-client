import { Fragment } from "react";
import { TaskChartProp } from "../../../common/interfaces/props";

const TaskChartModal = ({ idx, pos }: TaskChartProp) => {
  return (
    <Fragment>
      <div id={`task-${idx}-${pos}`} className="task-modal"></div>
    </Fragment>
  );
};

export default TaskChartModal;
