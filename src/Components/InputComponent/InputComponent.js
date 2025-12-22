import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTask } from "../../RequestFunctions/TaskRequestFunctions";

import styles from "./InputComponent.module.scss";

const InputComponent = () => {
    const queryClient = useQueryClient();

    const [taskName, setTaskName] = useState("");
    const [taskDesc, setTaskDesc] = useState("");
    const [checked, setChecked] = useState(false);

    const addNewTaskMutation = useMutation({
        mutationFn: (payload) => addTask("to-do's", payload),
        onSuccess: () => queryClient.invalidateQueries(["todos"])
    })

    const onChangeNameHandler = (event) => {
        const value = event.target.value;
        setTaskName(value);
    }

    const onChangeDescHandler = (event) => {
        const value = event.target.value;
        setTaskDesc(value);
    }

    const onChangeStatusHandler = (event) => {
        const value = event.target.checked;
        setChecked(value);
    }

    const addNewTask = async (event, payload) => {
        event.preventDefault();
        try {
            await addNewTaskMutation.mutateAsync(payload);
        } catch (error) {

        } finally {
            setTaskName("");
            setTaskDesc("");
            setChecked(false);
        }
    }

    return (
        <form className={styles.Input__form} onSubmit={(event) => addNewTask(event, { taskName: taskName, taskDesc: taskDesc, isDone: checked })}>
            <input className={styles.input} name="task-input-name" type="text" value={taskName} placeholder="Task name" onChange={onChangeNameHandler} />
            <input className={styles.input} name="task-input-description" type="text" value={taskDesc} placeholder="This is my task" onChange={onChangeDescHandler} />
            <div>
                <label className={styles.label} htmlFor="task-input-status"> Done: </label>
                <input className={styles.input} name="task-input-status" id="task-input-status" type="checkbox" checked={checked} placeholder="Task Description" onChange={onChangeStatusHandler} />
            </div>
            <button className={styles.button} type="submit" disabled={addNewTaskMutation.isPending}>{addNewTaskMutation.isPending ? "Adding" : "Add a Task"}</button>
        </form>
    );
}

export default InputComponent;