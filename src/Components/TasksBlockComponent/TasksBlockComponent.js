import SearchComponent from "../SearchComponent/SearchComponent";
import InputComponent from "../InputComponent/InputComponent";
import ListComponent from "../ListComponent/ListComponent";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchTask } from "../../RequestFunctions/TaskRequestFunctions";


import styles from './TaskBlockComponent.module.scss'

const TaskBlockComponent = () => {
    const [filter, setFilter] = useState("All");
    const [taskNameFilter, setTaskNameFilter] = useState("");
    const [isClicked, setIsClicked] = useState(false);

    const { data, isFetched, isFetching } = useQuery({
        queryKey: ["todos"],
        queryFn: () => fetchTask("to-do's")
    })

    const shouldShowInputs = isFetched && (isClicked || data.length > 0);

    return (
        <>
            {shouldShowInputs ? <div className={styles.container}>
                <h1 className={styles.container__title}>Your To-Do List</h1>
                {data.length > 0 ? <SearchComponent filter={filter} setFilter={setFilter} taskNameFilter={taskNameFilter} setTaskNameFilter={setTaskNameFilter} /> : <></>}
                <InputComponent />
            </div> :
                <div className={styles.container}>
                    <h1 className={styles.container__title}>Your To-Do List</h1>
                    <button className={styles.container__button} type="button" onClick={() => setIsClicked(true)}>Add Task Now!</button>
                </div>
            }
            <ListComponent filter={filter} taskName={taskNameFilter} data={data} isFetching={isFetching} />
        </>
    );
}

export default TaskBlockComponent;