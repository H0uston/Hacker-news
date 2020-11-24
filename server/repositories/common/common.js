const checkFulfilledItems = (items) => {
    let checkedItems = [];
    for (let item of items) {
        if (item.status === "fulfilled") {
            checkedItems.push(item.value);
        }
    }

    return checkedItems;
};

exports.fetchPromises = async (promises) => {
    let newsItems = await Promise.allSettled(promises);
    return checkFulfilledItems(newsItems);
};