// Example data
const invoiceData = {
  items: [
    { quantity: 1, particulars: "Item A", unitPrice: 30, kshs: 0, cts: 0 },
    { quantity: 2, particulars: "Item B", unitPrice: 50, kshs: 0, cts: 0 },
    { quantity: 2, particulars: "Item C", unitPrice: 50, kshs: 0, cts: 0 },
    { quantity: 4, particulars: "Item D", unitPrice: 90, kshs: 0, cts: 0 },
    { quantity: 3, particulars: "Item E", unitPrice: 70, kshs: 0, cts: 0 },
  ],
  discountRate: 0.00, // Discount rate will be input by the user
};

function populateInvoice(data) {
  const itemTable = document.getElementById("itemTable");
  itemTable.innerHTML = ""; // Clear existing items

  let subtotal = 0;
  data.items.forEach((item, index) => {
    const itemTotal = item.quantity * item.unitPrice;
    subtotal += itemTotal;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td><input type="number" value="${item.quantity}" onchange="updateTotals()" /></td>
      <td><input type="text" value="${item.particulars}" onchange="updateTotals()" /></td>
      <td><input type="number" value="${item.unitPrice.toFixed(2)}" onchange="updateTotals()" /></td>
      <td><input type="number" value="${Math.floor(itemTotal)}" readonly /></td>
      <td><input type="number" value="${(itemTotal % 1).toFixed(2).split('.')[1]}" readonly /></td>
      <td class="no-print"><button onclick="removeItem(${index})">x</button></td>
    `;
    itemTable.appendChild(row);
  });

  // Get the discount rate from the user's input
  const discountRate = parseFloat(document.getElementById("discountInput").value) || 0;
  const discount = (discountRate / 100) * subtotal;
  const total = subtotal - discount;

  document.getElementById("subtotal").innerText = `${subtotal.toFixed(2)}`;
  document.getElementById("discount").innerText = `${discount.toFixed(2)}`;
  document.getElementById("total").innerText = `${total.toFixed(2)}`;
}

function addItem() {
  invoiceData.items.push({ quantity: 1, particulars: "", unitPrice: 0, kshs: 0, cts: 0 });
  populateInvoice(invoiceData);
}

function removeItem(index) {
  invoiceData.items.splice(index, 1);
  populateInvoice(invoiceData);
}

function updateTotals() {
  invoiceData.items = Array.from(document.querySelectorAll("#itemTable tr")).map((row) => {
    const inputs = row.querySelectorAll("input");
    return {
      quantity: parseFloat(inputs[0].value),
      particulars: inputs[1].value,
      unitPrice: parseFloat(inputs[2].value),
      kshs: 0, // This will be recalculated
      cts: 0, // This will be recalculated
    };
  });

  populateInvoice(invoiceData);
}

function printInvoice() {
  window.print();
}

// Populate the invoice with example data on load
populateInvoice(invoiceData);

// Set the current date
document.getElementById("invoiceDate").textContent = new Date().toLocaleDateString();
