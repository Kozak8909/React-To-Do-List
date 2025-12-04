import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTask, deleteTask } from "../../RequestFunctions/TaskRequestFunctions";

const ListItemComponent = ({ item }) => {
    const queryClient = useQueryClient();

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

    return (
        <li>{item.taskName} {item.taskDesc}
            <input name="task-checkbox" type="checkbox" checked={item.isDone} disabled={updateTaskMutation.isPending} onChange={(event) => onCheck(event, item.id)} />
            <button type="button" disabled={deleteTaskMutation.isPending} onClick={() => deleteTaskHandler(item.id)}>{deleteTaskMutation.isPending ? "Deleting" : "Delete"}</button>
        </li>
    );
}

export default ListItemComponent;