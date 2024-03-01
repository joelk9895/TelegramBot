import React from "react";
import { Draggable } from "@hello-pangea/dnd";

interface KanbanProps {
  feedBacks: {
    id: string;
    heading: string;
    description: string;
    upvote: number;
  };
  index: number;
}

const Kanban: React.FC<KanbanProps> = ({ feedBacks, index }) => {
  return (
    <Draggable draggableId={feedBacks.id.toString()} index={index}>
      {(provided, snapshot) => (
        <div
          className={`kanban border-2 rounded-lg p-3 mt-2 mb-2 min-w-[300px] min-h-[200px] relative ${
            snapshot.isDragging ? "dragging" : ""
          }`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <h3 className="text-xl font-bold mb-7">{feedBacks.heading}</h3>
          <p>{feedBacks.description}</p>
          <p className="kanbanUp font-bold bg-black rounded-lg w-10 text-white text-center">
            {feedBacks.upvote}
          </p>
        </div>
      )}
    </Draggable>
  );
};

export default Kanban;
