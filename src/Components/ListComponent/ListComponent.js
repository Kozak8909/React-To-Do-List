import { ThreeDots } from "react-loader-spinner";
import ListItemComponent from "../ListItemComponent/ListItemComponent";

import styles from "./ListComponent.module.scss";

const ListComponent = ({ filter, taskName, data, isFetching }) => {
    const getFilteredList = (filter, name) => {
        const filteredData = filterByName(name);
        switch (filter) {
            case "Done":
                return filteredData.filter(item => item.isDone === true);
            case "In progress":
                return filteredData.filter(item => item.isDone === false);
            default:
                return filteredData;
        }
    }

    const filterByName = (name) => {
        if (name !== "") {
            return data.filter(item => item.taskName.toLowerCase().includes(name.toLowerCase()));
        }
        return data;
    }

    const listRender = () => {
        const filteredData = getFilteredList(filter, taskName);
        return filteredData.map(item => (< ListItemComponent key={item.id} item={item} />));
    }

    return (
        <div className={styles.ListComponent}>
            {isFetching ? <ThreeDots color="gray" /> :
                <ul id="List" className={styles.ListComponent__list}>
                    {listRender()}
                </ul>
            }
        </div>
    );
}

export default ListComponent;