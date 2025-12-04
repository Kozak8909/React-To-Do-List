import ListItemComponent from "../ListItemComponent/ListItemComponent";

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
        <>
            {isFetching ? <p>Loading...</p> :
                <ul>
                    {listRender()}
                </ul>
            }
        </>
    );
}

export default ListComponent;