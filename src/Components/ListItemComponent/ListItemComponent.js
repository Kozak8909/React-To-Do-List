import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTask, deleteTask } from "../../RequestFunctions/TaskRequestFunctions";
import { useNavigate } from "react-router-dom";

import styles from "./ListItemComponent.module.scss";

const ListItemComponent = ({ item }) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const updateTaskMutation = useMutation({
        mutationFn: ({ id, payload }) => updateTask(`to-do's/${id}`, payload),
        onSuccess: () => queryClient.invalidateQueries(["todos"])
    })

    const deleteTaskMutation = useMutation({
        mutationFn: (id) => deleteTask(`to-do's/${id}`),
        onSuccess: () => queryClient.invalidateQueries(["todos"])
    })

    const onCheck = async (event, id) => {
        const value = event.target.checked;
        try {
            await updateTaskStatus(id, { isDone: value });
        } catch (error) {

        }
    }

    const updateTaskStatus = async (id, payload) => {
        await updateTaskMutation.mutateAsync({ id, payload });
    }

    const deleteTaskHandler = async (id) => {
        try {
            await deleteTaskMutation.mutateAsync(id);
        } catch (error) {

        }
    }

    const detailsOnClickHandler = (id) => {
        navigate(`/to-do/${id}`)
    }

    return (
        <li className={styles.ListItem}>
            <div className={styles.ListItem__task_container}>
                <h2 className={styles.ListItem__title}>{item.taskName}</h2>
                <div>
                    <label className={styles.label} htmlFor="task-checkbox">Status: </label>
                    <input className={styles.input} id="task-checkbox" name="task-checkbox" type="checkbox" checked={item.isDone} disabled={updateTaskMutation.isPending} onChange={(event) => onCheck(event, item.id)} />
                </div>
            </div>
            <div className={styles.ListItem__button_container}>
                <button className={styles.button} type="button" onClick={() => detailsOnClickHandler(item.id)}>Details</button>
                <button className={`${styles.button} ${styles.delete}`} type="button" disabled={deleteTaskMutation.isPending} onClick={() => deleteTaskHandler(item.id)}>{deleteTaskMutation.isPending ? "Deleting" : "Delete"}</button>
            </div>
        </li>
    );
}

export default ListItemComponent;