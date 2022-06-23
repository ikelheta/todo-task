import { Button } from "@material-ui/core";
import Axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useNavigate } from "react-router-dom";
import uuid from "uuid/v4";

let itemsFromBackend = [
  { id: uuid(), title: "First task" },
  { id: uuid(), title: "Second task" },
  { id: uuid(), title: "Third task" },
  { id: uuid(), title: "Fourth task" },
  { id: uuid(), title: "Fifth task" }
];
const columnsFromBackend = {
  todo: {
    name: "To do",
    items: []
  },
  inProgress: {
    name: "In Progress",
    items: []
  },
  underReview: {
    name: "Under Review",
    items: []
  },
  rework: {
    name: "Rework",
    items: []
  },
  completed: {
    name: "Completed",
    items: []
  }
};

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems
      }
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems
      }
    });
  }
};

function App() {
  const [columns, setColumns] = useState(columnsFromBackend);

  const btnstyle = { marginRight: '50px', width: 300 };

  const [newItems, setNewItems] = useState([])
  useEffect(() => {
    Axios.get('https://bluedevolopment-task.herokuapp.com:5000/task/findall').then((res) => {

      console.log(itemsFromBackend);

    })
  }, [])

  const navigate = useNavigate()


  //========================================================================================================================================================================
  //========================================================================================================================================================================

  const handleSave = (e) => {
    e.preventDefault();
    console.log(columns)
  }
  //========================================================================================================================================================================
  const handleViewAll = (e) => {
    e.preventDefault();
    navigate('all')

  }
  //========================================================================================================================================================================


  return (
    <>
      <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
        <DragDropContext
          onDragEnd={result => onDragEnd(result, columns, setColumns)}
        >
          {Object.entries(columns).map(([columnId, column], index) => {
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center"
                }}
                key={columnId}
              >
                <h2>{column.name}</h2>
                <div style={{ margin: 8 }}>
                  <Droppable droppableId={columnId} key={columnId}>
                    {(provided, snapshot) => {
                      return (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            background: snapshot.isDraggingOver
                              ? "lightblue"
                              : "lightgrey",
                            padding: 4,
                            width: 250,
                            minHeight: 500
                          }}
                        >
                          {column.items.map((item, index) => {
                            console.log(item)
                            return (
                              <>
                                <div style={{ display: "flex", width: '100%' }} key={index}>
                                  <Draggable
                                    key={item._id}
                                    draggableId={item._id}
                                    index={index}
                                  >
                                    {(provided, snapshot) => {
                                      return (
                                        <div

                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                          style={{
                                            width: '95%',
                                            userSelect: "none",
                                            padding: 8,
                                            margin: "0 0 8px 0",
                                            minHeight: "50px",
                                            backgroundColor: snapshot.isDragging
                                              ? "#263B4A"
                                              : "#456C86",
                                            color: "white",
                                            ...provided.draggableProps.style
                                          }}
                                        >
                                          {item.title}
                                        </div>
                                      );
                                    }}

                                  </Draggable>


                                </div>


                              </>
                            );
                          })}
                          {provided.placeholder}
                        </div>
                      );
                    }}
                  </Droppable>
                </div>
              </div>
            );
          })}
        </DragDropContext>

      </div>
      <div style={{ justifyContent: "center", margin: '10px 20%', display: "flex" }}>
        <Button type="submit"
          color="primary"
          variant="contained"
          style={btnstyle}
          onClick={handleSave}
        > Save</Button>
        <Button type="submit"
          color="primary"
          variant="contained"
          style={btnstyle}
          onClick={handleViewAll}
        > View Details</Button>
      </div>

    </>
  );
}

export default App;
