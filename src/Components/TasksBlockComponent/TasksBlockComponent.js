import SearchComponent from "../SearchComponent/SearchComponent";
import InputComponent from "../InputComponent/InputComponent";
import ListComponent from "../ListComponent/ListComponent";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchTasks } from "../../RequestFunctions/TaskRequestFunctions";


import styles from './TaskBlockComponent.module.scss'

const TaskBlockComponent = () => {
    const [filter, setFilter] = useState("All");
    const [taskNameFilter, setTaskNameFilter] = useState("");
    const [isClicked, setIsClicked] = useState(false);

    const { data, isFetched, isFetching } = useQuery({
        queryKey: ["todos"],
        queryFn: () => fetchTasks("to-do's")
    })

    const shouldShowInputs = isFetched && (isClicked || data.length > 0);

    return (
        <div id="TaskBlock" className={`${styles.TaskBlock} ${shouldShowInputs ? styles.move : ""}`}>
            <div className={styles.TaskBlock__container}>
                {shouldShowInputs ? <>
                    <h1 className={styles.TaskBlock__title}>Your To-Do List</h1>
                    {data.length > 0 ? <SearchComponent filter={filter} setFilter={setFilter} taskNameFilter={taskNameFilter} setTaskNameFilter={setTaskNameFilter} /> : <></>}
                    <InputComponent />
                </> :
                    <>
                        <h1 className={styles.TaskBlock__title}>Your To-Do List</h1>
                        <button className={styles.button} type="button" onClick={() => setIsClicked(true)}>Add Task Now!</button>
                    </>
                }
            </div>
            <ListComponent filter={filter} taskName={taskNameFilter} data={data} isFetching={isFetching} />
        </div>
    );
}

export default TaskBlockComponent;