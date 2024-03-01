"use client";
import KanbanBoard from "./Component/KanbanBoard";
import { column } from "./data";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { useState } from "react";

interface Task {
  id: string;
  heading: string;
  description: string;
  upvote: number;
}

interface Column {
  id: number;
  name: string;
  taskIds: string[];
}

export default function Dashboard() {
  const [columns, setColumns] = useState<Column[]>(column);

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    if (type === "list" && columns) {
      const sourceColumnIndex = columns.findIndex(
        (col) => col.id.toString() === source.droppableId
      );
      const destinationColumnIndex = columns.findIndex(
        (col) => col.id.toString() === destination.droppableId
      );

      const updatedColumns = columns.map((col) => ({
        ...col,
        taskIds: [...col.taskIds],
      }));
      const movedTaskId = updatedColumns[sourceColumnIndex].taskIds.splice(
        source.index,
        1
      )[0];
      updatedColumns[destinationColumnIndex].taskIds.splice(
        destination.index,
        0,
        movedTaskId
      );

      setColumns(updatedColumns);
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <main className="flex flex-col items-center h-screen w-screen">
        <h1 className="font-bold text-xl mt-10 mb-24">Opinio</h1>
        <div className="flex gap-10">
          {columns?.map((item: Column) => (
            <KanbanBoard key={item.id} heading={item} />
          ))}
        </div>
      </main>
    </DragDropContext>
  );
}
