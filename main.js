let numbers = [];

function insertNumbers() {
    const input = document.getElementById('txtNum');
    const value = input.value.trim();
    const number = Number(value);

    if (value === '' || Number.isNaN(number) || number < 0 || !Number.isInteger(number)) {
        alert('Please enter a positive whole number.');
        return;
    }

    numbers.push(number);
    input.value = '';
    input.focus();
    renderList();
    clearSummary();
}

function clearEntity() {
    const input = document.getElementById('txtNum');
    input.value = '';
    input.focus();
}

function clearItems() {
    numbers = [];
    document.getElementById('sortOrder').value = '';
    renderList();
    clearSummary();
}

function renderList() {
    const table = document.getElementById('numberList');
    if (numbers.length === 0) {
        table.innerHTML = '';
        return;
    }

    let html = `
        <tr>
            <th>Number</th>
            <th>Type</th>
            <th>Actions</th>
        </tr>
    `;

    numbers.forEach((num, index) => {
        const type = num % 2 === 0 ? 'Even' : 'Odd';
        const color = num % 2 === 0 ? 'green' : 'blue';
        html += `
            <tr>
                <td>${num}</td>
                <td style="color:${color}; font-weight:bold;">${type}</td>
                <td>
                    <button onclick="editItem(${index})">Edit</button>
                    <button onclick="removeItem(${index})">Remove</button>
                </td>
            </tr>
        `;
    });

    table.innerHTML = html;
}

function editItem(index) {
    alert('Edit number: ' + numbers[index]);
}

function removeItem(index) {
    numbers.splice(index, 1);
    renderList();
    clearSummary();
}

function getTotal() {
    if (numbers.length === 0) {
        alert('No numbers to calculate.');
        return;
    }

    const total = numbers.reduce((sum, n) => sum + n, 0);
    const highest = Math.max(...numbers);
    const lowest = Math.min(...numbers);

    const results = document.getElementById('results');
    results.innerHTML = `
        <p>Total: ${total}</p>
        <p>Highest: ${highest}</p>
        <p>Lowest: ${lowest}</p>
    `;
}

function sortNumbers(order) {
    if (order === 'ascending') {
        numbers.sort((a, b) => a - b);
    } else if (order === 'descending') {
        numbers.sort((a, b) => b - a);
    } else {
        return;
    }

    renderList();
    clearSummary();
}

function clearSummary() {
    document.getElementById('results').innerHTML = '';
}