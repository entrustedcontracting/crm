import { useState } from "react";
import { Draggable } from "react-beautiful-dnd";

import Modal from "@components/Modal";
import TaskDetailModal from "@components/Modal/TaskDetailModal";
import UpdateTaskModal from "@components/Modal/UpdateTaskModal";
import DeleteTaskModal from "@components/Modal/DeleteTaskModal";
import { useBoards } from "@src/context";

const Task = ({ data, index }) => {
  const [openTaskModal, setOpenTaskModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const { deleteTask } = useBoards();

  //number of completed subtasks
  //const completedSubtasks = data.subtasks.reduce((acc, subtask) => subtask.isCompleted ? acc + 1 : acc, 0);
  return (
    <Draggable draggableId={data.slug} index={index} >
        {(provided) => (
        <>
            <div index={index}>
                <li className="group select-none shadow-main px-4 py-6 rounded-lg cursor-pointer bg-white text-black dark:bg-darkGrey dark:text-white"
                {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}
                onClick={() => setOpenTaskModal(true)}>
                    <h4 className="heading-md mb-2 group-hover:text-mainPurple">{new Date().getFullYear() % 100}-{Math.floor(Math.random()*90000) + 10000}-{data.customer.replace(/\s/g, '').toLowerCase()}-{data.branch.toLowerCase()}</h4>
                    <p className="body-md text-mediumGrey">{data.etaRequested} at {data.streetAddress}</p>
                </li>
                <Modal show={openTaskModal} onClose={() => setOpenTaskModal(false)}>
                    <TaskDetailModal
                    data={data}
                    // completedSubtasks={completedSubtasks}
                    close={() => setOpenTaskModal(false)}
                    switchToUpdate={() => {
                        setOpenTaskModal(false);
                        setUpdateModal(true);
                    }}
                    switchToDelete={() => {
                        setOpenTaskModal(false);
                        setDeleteModal(true);
                    }} />
                </Modal>
                <Modal show={updateModal} onClose={() => setUpdateModal(!updateModal)}>
                    <UpdateTaskModal data={data} close={() => setUpdateModal(false)}/>
                </Modal>
                <Modal show={deleteModal} onClose={() => setDeleteModal(!deleteModal)}>
                    <DeleteTaskModal
                    title={data.customer}
                    onClose={() => {
                        setDeleteModal(false);
                        setOpenTaskModal(true);
                    }}
                    onConfirm={() => {
                        deleteTask(data.id)
                        setDeleteModal(false);
                    }}/>
                </Modal>
            </div>
             </>
         )}
    </Draggable>
  );
};
export default Task
