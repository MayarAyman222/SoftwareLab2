


let items = [], categories = [], transactions = [], customFields = {};

function addItem(name, category, quantity, price, unit, customFields = {}) {
    let item = { name, category, quantity, price, unit, added: new Date(), customFields };
    items.push(item);
    if (!categories.includes(category)) categories.push(category);
    transactions.push({ type: "add", item });
    displayDashboard();
}

function sellItem(name, quantity) {
    for (let item of items) {
        if (item.name === name && item.quantity >= quantity) {
            item.quantity -= quantity;
            transactions.push({ type: "sale", item, quantitySold: quantity, date: new Date() });
            console.log(`Sold ${quantity} ${item.unit} of ${item.name}`);
            return;
        }
    }
    console.log("Sale failed: Item not found or insufficient stock.");
}

function viewInventory() {
    console.log("=== Inventory ===", items);
}

function displayDashboard() {
    console.log(
        `=== Dashboard ===\n` +
        `Items: ${items.length}\n` +
        `Total: $${items.reduce((total, item) => total + item.quantity * item.price, 0).toFixed(2)}\n` +
        `Categories: ${categories.join(", ")}`
    );
}

function handleItemOperations(action, parameters) {
    if (action === "add") {
        let item = {
            name: parameters[0],
            category: parameters[1],
            quantity: parameters[2],
            price: parameters[3],
            unit: parameters[4],
            added: new Date(),
            customFields: parameters[5] || {}
        };
        items.push(item);
        if (!categories.includes(parameters[1])) categories.push(parameters[1]);
        transactions.push({ type: "add", item });
    } else if (action === "edit" && items[parameters[0]]) {
        transactions.push({ type: "edit", old: items[parameters[0]], new: parameters.slice(1) });
        items[parameters[0]] = { ...items[parameters[0]], ...mapEditParameters(parameters) };
    } else if (action === "removeItem" && items[parameters[0]]) {
        transactions.push({ type: "delete", item: items[parameters[0]] });
        items.splice(parameters[0], 1);
    }
    displayDashboard();
}

function mapEditParameters(parameters) {
    return {
        name: parameters[1],
        category: parameters[2],
        quantity: parameters[3],
        price: parameters[4],
        unit: parameters[5],
        customFields: parameters[6] || {}
    };
}

function handleStockOperations(action, parameters) {
    for (let item of items) {
        if (item.name === parameters[0]) {
            if (action === "Sale" && item.quantity >= parameters[1]) {
                item.quantity -= parameters[1];
                transactions.push({ type: "sale", item, quantitySold: parameters[1], date: new Date() });
                console.log(`Sold ${parameters[1]} ${item.unit} of ${item.name}`);
            } else if (action === "restock") {
                item.quantity += parameters[1];
                transactions.push({ type: "restock", item, quantityRestocked: parameters[1], date: new Date() });
                console.log(`Restocked ${parameters[1]} ${item.unit} of ${item.name}`);
            }
            break;
        }
    }
}

function searchItems(parameters) {
    console.log(items.filter(item => [item.name, item.category, item.price]
        .some(value => value.toString().toLowerCase().includes(parameters[0].toLowerCase()))));
}

function viewInventory() {
    console.log("=== Inventory ===", items);
}

function viewAllTransactions() {
    console.log("Transactions:", transactions);
}

function importItems(parameters) {
    parameters[0].forEach(item => doStuff("add", [item.name, item.category, item.quantity, item.price, item.unit]));
}

function addCustomField(parameters) {
    if (!customFields[parameters[0]]) customFields[parameters[0]] = null;
}

function displayDashboard() {
    console.log(
        `=== Dashboard ===\n` +
        `Items: ${items.length}\n` +
        `Total: $${items.reduce((total, item) => total + item.quantity * item.price, 0).toFixed(2)}\n` +
        `Categories: ${categories.join(", ")}`
    );
}

function displayItemAge() {
    console.log(items.map(item => 
        `${item.name}: ${Math.floor((new Date() - new Date(item.added)) / (1000 * 60 * 60 * 24))} days`
    ).join('\n'));
}

function exportToCSV() {
    console.log("CSV:\n" + [
        "Name,Category,Quantity,Price,Unit,AddedAt",
        ...items.map(item => Object.values(item).join(','))
    ].join('\n'));
}

function updateCustomField(parameters) {
    let item = items.find(item => item.name === parameters[0]);
    if (item) item.customFields[parameters[1]] = parameters[2];
}

addItem(laptop,electronics,qty=1,price=10,unit)
sellItem(laptop,7)
viewInventory()