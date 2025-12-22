import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { fetchTask, updateTask } from "../../RequestFunctions/TaskRequestFunctions"
import { useParams } from "react-router-dom"
import { useState } from "react"
import { ThreeDots } from "react-loader-spinner"
import pencil from "../../img/pencil.svg";

import styles from "./TaskPage.module.scss";

const TaskPage = () => {
    const { id: taskId } = useParams()
    const queryClient = useQueryClient();

    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingDesc, setIsEditingDesc] = useState(false);
    const [taskName, setTaskName] = useState("");
    const [taskDesc, setTaskDesc] = useState("");

    const { data: task, isFetched } = useQuery({
        queryKey: ["task", taskId],
        queryFn: () => fetchTask(`/to-do's/${taskId}`)
    })

    const updateTaskMutation = useMutation({
        mutationFn: (payload) => updateTask(`/to-do's/${taskId}`, payload),
        onSuccess: () => queryClient.invalidateQueries(["task", taskId])
    })

    const onNameChange = (event) => {
        setTaskName(event.target.value);
    }

    const onDescChange = (event) => {
        setTaskDesc(event.target.value);
    }

    const editTaskHandler = async (event, payload) => {
        event.preventDefault();
        try {
            await updateTaskMutation.mutateAsync(payload)
        } catch (error) {
            return <p>Oops! Something went wrong: {error.message}</p>
        } finally {
            setIsEditingName(false);
            setIsEditingDesc(false);
        }
    }

    return (
        <div className={styles.TaskPage}>
            {isFetched ?
                <div className={styles.TaskPage__container}>
                    {isEditingName ?
                        <form onSubmit={(event) => editTaskHandler(event, { taskName: taskName })}>
                            <input onChange={onNameChange} type="text" value={taskName} placeholder="New Task Name" />
                            <button className={styles.button} type="submit">Save</button>
                        </form> :
                        <div className={styles.TaskPage__info_container}>
                            <h1 className={styles.TaskPage__title}>{task.taskName}</h1>
                            <button className={styles.TaskPage__button} onClick={() => setIsEditingName(true)} type="button">
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                                    <path d="M27 0c2.761 0 5 2.239 5 5 0 1.126-0.372 2.164-1 3l-2 2-7-7 2-2c0.836-0.628 1.874-1 3-1zM2 23l-2 9 9-2 18.5-18.5-7-7-18.5 18.5zM22.362 11.362l-14 14-1.724-1.724 14-14 1.724 1.724z"></path>
                                </svg>
                            </button>
                        </div>
                    }
                    {isEditingDesc ?
                        <form onSubmit={(event) => editTaskHandler(event, { taskDesc: taskDesc })}>
                            <textarea onChange={onDescChange} value={taskDesc} placeholder="New Task Description" />
                            <button className={styles.button} type="submit">Save</button>
                        </form> :
                        <div className={styles.TaskPage__info_container}>
                            <p>{task.taskDesc}</p>
                            <button className={styles.TaskPage__button} onClick={() => setIsEditingDesc(true)} type="button">
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                                    <path d="M27 0c2.761 0 5 2.239 5 5 0 1.126-0.372 2.164-1 3l-2 2-7-7 2-2c0.836-0.628 1.874-1 3-1zM2 23l-2 9 9-2 18.5-18.5-7-7-18.5 18.5zM22.362 11.362l-14 14-1.724-1.724 14-14 1.724 1.724z"></path>
                                </svg>
                            </button>
                        </div>
                    }

                </div> : <ThreeDots color="gray" />
            }
        </div>
    );
}

export default TaskPage;