"use client";

import { DndContext, useDraggable } from "@dnd-kit/core";
import { Button } from "~/components/ui/button";

const Draggable = () => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: "unique-id",
  });

  const style = {
    transform: `translate3d(${transform?.x ?? 0}px, ${transform?.y ?? 0}px, 0)`,
  };

  return (
    <Button ref={setNodeRef} style={style} {...attributes} {...listeners}>
      Drag me
    </Button>
  );
};

export default function Page() {
  return (
    <DndContext>
      <Draggable />
    </DndContext>
  );
}
