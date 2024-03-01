import React from "react";
import Kanban from "./Kanban";
import { task } from "../data";
import { Droppable } from "@hello-pangea/dnd";

interface KanbanBoardProps {
  heading: {
    id: number;
    name: string;
    taskIds: string[];
  };
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ heading }) => {
  return (
    <Droppable droppableId={heading.id.toString()} type="list">
      {(provided) => (
        <section
          className="flex min-w-[300px] flex-col items-center border-10 border-black h-[80vh]"
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          <h1 className="font-bold text-xl text-center">{heading.name}</h1>
          <div className="flex flex-col gap-3 mt-5">
            {heading.taskIds.map((taskId, index) => {
              const foundTask = task.find((item) => item.id === taskId);
              return foundTask ? (
                <Kanban
                  key={taskId}
                  feedBacks={foundTask}
                  index={index} // Pass the correct index based on the order of taskIds
                />
              ) : null;
            })}
            {provided.placeholder}
          </div>
        </section>
      )}
    </Droppable>
  );
};

export default KanbanBoard;
