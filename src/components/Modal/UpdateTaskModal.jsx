import Button from "@components/shared/Button"
import StatusDropdown from "@components/shared/StatusDropdown";
import { useBoards } from "@src/context";
import { useFormik } from "formik"
import { useState } from 'react';

const UpdateTaskModal = ({data, close}) => {
    const { updateTask } = useBoards();
    const [status, setStatus ] = useState(data.status);
    const [subtasks, setSubtasks] = useState(data.subtasks);

    const formik = useFormik({
        initialValues: {
            ...data,
            subtasks: subtasks
        },
        onSubmit: (values) => {
            values.status = status;
            updateTask(values)
            close();
        }
    })
    return (
        <form
        onSubmit={formik.handleSubmit}
        className="w-full mx-auto rounded-md p-6 bg-white dark:bg-darkGrey md:p-8">
            <h1 className="heading-lg mb-6">Edit Task</h1>

            <label className="body-md text-mediumGrey dark:text-white block">
                Title
                <input
                    id="title"
                    name="title"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.title}
                    placeholder="e.g. Take coffee break"
                    className="bg-white dark:bg-darkGrey body-lg w-full px-4 py-2 my-2 block rounded border text-black dark:text-white border-mediumGrey border-opacity-25 placeholder:opacity-25"
                />
            </label>

            <label className="body-md text-mediumGrey dark:text-white mt-6 block">
                Description
                <textarea
                    id="description"
                    name="description"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.description}
                    placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
                    className="bg-white dark:bg-darkGrey body-lg w-full h-28 px-4 py-2 my-2 block rounded text-black dark:text-white resize-none border border-mediumGrey border-opacity-25 placeholder:opacity-25"
                />
            </label>

            <label className="body-md text-mediumGrey dark:text-white mt-6 block">
                Subtask
                {
                    subtasks.map((subtask, index) => (
                        <div className="flex gap-4" key={index}>
                            <input
                            id={`subtasks[${index}].title`}
                            name={`subtasks[${index}].title`}
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.subtasks[index].title}
                            placeholder="e.g. Make coffee"
                            className="bg-white dark:bg-darkGrey body-lg w-full px-4 py-2 my-2 block rounded border text-black dark:text-white border-mediumGrey border-opacity-25 placeholder:opacity-25"
                            />
                            <button type="button" className="text-mediumGrey hover:text-mainPurple"
                            onClick={() => {
                                subtasks.splice(index, 1);
                                setSubtasks([...subtasks]);
                            }}
                            >
                                <svg width="15" height="15" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor" fillRule="evenodd"><path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z"/><path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z"/></g></svg>
                            </button>
                        </div>

                    ))
                }
            </label>

            <Button
                type="button"
                className="w-full bg-mainPurple bg-opacity-10 text-mainPurple bold rounded-full p-2 pt-3 transition duration-200 hover:bg-opacity-25 dark:bg-opacity-100 dark:bg-white"
                onClick={() => {
                    formik.values.subtasks = [...subtasks, { title: '', isCompleted: false }]
                    setSubtasks([...subtasks, { title: '', isCompleted: false }])}}
            >+ Add New Subtask</Button>

            <StatusDropdown data={data} status={status} setStatus={setStatus} />

            <Button type="submit" className="mt-6 w-full bg-mainPurple text-white text-base rounded-full p-2 transition duration-200 hover:bg-mainPurpleHover">Save Changes</Button>

        </form>
      )
}
export default UpdateTaskModal
