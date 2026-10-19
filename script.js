
let transactions = [];
let invoices = [];

const moneyForm = document.getElementById("moneyForm");
const transactionList = document.getElementById("transactionList");
const emptyTransactions = document.getElementById("emptyTransactions");
const formError = document.getElementById("formError");

const invoiceForm = document.getElementById("invoiceForm");
const invoiceList = document.getElementById("invoiceList");
const emptyInvoices = document.getElementById("emptyInvoices");
const invoiceError = document.getElementById("invoiceError");

function simpanData() {
    localStorage.setItem("transactions", JSON.stringify(transactions));
    localStorage.setItem("invoices", JSON.stringify(invoices));
}

function muatData() {
    const dataTersimpan = localStorage.getItem("transactions");
    const invoiceTersimpan = localStorage.getItem("invoices");

    if (dataTersimpan) {
        transactions = JSON.parse(dataTersimpan).map(function (transaction, index) {
            return {
                id: transaction.id || Date.now() + index,
                tanggal: transaction.tanggal || transaction.date || "",
                jenis: transaction.jenis || (
                    String(transaction.type || "").toLowerCase() === "pemasukan"
                    || String(transaction.type || "").toLowerCase() === "income"
                        ? "pemasukan"
                        : "pengeluaran"
                ),
                kategori: transaction.kategori || transaction.category || "Lainnya",
                nominal: Number(transaction.nominal ?? transaction.amount ?? 0),
                catatan: transaction.catatan ?? transaction.description ?? ""
            };
        });
    }

    if (invoiceTersimpan) {
        invoices = JSON.parse(invoiceTersimpan).map(function (invoice, index) {
            return {
                id: invoice.id || Date.now() + index,
                client: invoice.client || "",
                project: invoice.project || "",
                nominal: Number(invoice.nominal ?? invoice.amount ?? 0),
                tanggal: invoice.tanggal || invoice.date || "",
                jatuhTempo: invoice.jatuhTempo || invoice.dueDate || "",
                status: invoice.status || "belum dibayar"
            };
        });
    }

    simpanData();
}

moneyForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const date = document.getElementById("date").value;
    const description = document.getElementById("description").value.trim();
    const amountInput = document.getElementById("amount").value;
    const amount = Number(amountInput);
    const type = document.getElementById("type").value;
    const category = document.getElementById("category").value;

    if (!date || !type || !category || !amountInput ||
        !Number.isFinite(amount) || amount <= 0) {
        formError.textContent =
            "Lengkapi field wajib dan masukkan nominal lebih dari 0.";
        return;
    }

    const transaction = {
        id: Date.now(),
        tanggal: date,
        jenis: type === "income" ? "pemasukan" : "pengeluaran",
        kategori: category,
        nominal: amount,
        catatan: description
    };

    transactions.push(transaction);

    transactions.sort(function (a, b) {
        return b.id - a.id;
    });

    simpanData();

    formError.textContent = "";
    moneyForm.reset();

    renderTransactions();
    renderSummary();
});

function renderTransactions() {
    transactionList.replaceChildren();

    emptyTransactions.style.display =
        transactions.length === 0 ? "block" : "none";

    transactions.forEach(function (transaction) {
        const row = document.createElement("tr");

        const date = document.createElement("td");
        const category = document.createElement("td");
        const type = document.createElement("td");
        const amount = document.createElement("td");
        const description = document.createElement("td");
        const action = document.createElement("td");
        const deleteButton = document.createElement("button");

        date.textContent = transaction.tanggal;
        category.textContent = transaction.kategori;
        type.textContent = transaction.jenis;
        amount.textContent = transaction.nominal;
        description.textContent = transaction.catatan || "-";

        deleteButton.textContent = "Hapus";
        deleteButton.type = "button";

        deleteButton.addEventListener("click", function () {
            const confirmed = confirm(
                "Yakin ingin menghapus transaksi ini?"
            );

            if (confirmed) {
                deleteTransaction(transaction.id);
            }
        });

        action.appendChild(deleteButton);
        row.append(date, category, type, amount, description, action);
        transactionList.appendChild(row);
    });
}

function deleteTransaction(id) {
    transactions = transactions.filter(function (transaction) {
        return transaction.id !== id;
    });

    simpanData();
    renderTransactions();
    renderSummary();
}

invoiceForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const client = document.getElementById("client").value.trim();
    const project = document.getElementById("project").value.trim();
    const amountInput = document.getElementById("invoiceAmount").value;
    const amount = Number(amountInput);
    const date = document.getElementById("invoiceDate").value;
    const dueDate = document.getElementById("dueDate").value;

    if (!client || !project || !amountInput || !date || !dueDate ||
        !Number.isFinite(amount) || amount <= 0) {
        invoiceError.textContent =
            "Lengkapi field wajib dan masukkan nominal lebih dari 0.";
        return;
    }

    if (dueDate < date) {
        invoiceError.textContent =
            "Tanggal jatuh tempo tidak boleh sebelum tanggal invoice.";
        return;
    }

    const invoice = {
        id: Date.now(),
        client: client,
        project: project,
        nominal: amount,
        tanggal: date,
        jatuhTempo: dueDate,
        status: "belum dibayar"
    };

    invoices.push(invoice);

    simpanData();

    invoiceError.textContent = "";
    invoiceForm.reset();

    renderInvoices();
    renderSummary();
});

function renderInvoices() {
    invoiceList.replaceChildren();

    emptyInvoices.style.display =
        invoices.length === 0 ? "block" : "none";

    invoices.forEach(function (invoice) {
        const row = document.createElement("tr");

        const client = document.createElement("td");
        const project = document.createElement("td");
        const amount = document.createElement("td");
        const date = document.createElement("td");
        const dueDate = document.createElement("td");
        const status = document.createElement("td");
        const action = document.createElement("td");

        client.textContent = invoice.client;
        project.textContent = invoice.project;
        amount.textContent = invoice.nominal;
        date.textContent = invoice.tanggal;
        dueDate.textContent = invoice.jatuhTempo;
        status.textContent = invoice.status;

        if (invoice.status === "belum dibayar") {
            const paidButton = document.createElement("button");

            paidButton.textContent = "Tandai Lunas";
            paidButton.type = "button";

            paidButton.addEventListener("click", function () {
                const confirmed = confirm(
                    "Tandai invoice ini sebagai lunas?"
                );

                if (confirmed) {
                    payInvoice(invoice.id);
                }
            });

            action.appendChild(paidButton);
        }

        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Hapus";
        deleteButton.type = "button";

        deleteButton.addEventListener("click", function () {
            const confirmed = confirm(
                "Yakin ingin menghapus invoice ini?"
            );

            if (confirmed) {
                deleteInvoice(invoice.id);
            }
        });

        action.appendChild(deleteButton);
        row.append(client, project, amount, date, dueDate, status, action);
        invoiceList.appendChild(row);
    });
}

function payInvoice(id) {
    const invoice = invoices.find(function (invoice) {
        return invoice.id === id;
    });

    if (!invoice || invoice.status === "lunas") {
        return;
    }

    invoice.status = "lunas";

    const transaction = {
        id: Date.now(),
        tanggal: invoice.tanggal,
        jenis: "pemasukan",
        kategori: "Pembayaran Invoice",
        nominal: Number(invoice.nominal) || 0,
        catatan: invoice.client + " - " + invoice.project
    };

    transactions.push(transaction);

    transactions.sort(function (a, b) {
        return b.id - a.id;
    });

    simpanData();

    renderInvoices();
    renderTransactions();
    renderSummary();
}

function deleteInvoice(id) {
    invoices = invoices.filter(function (invoice) {
        return invoice.id !== id;
    });

    simpanData();
    renderInvoices();
    renderSummary();
}

function renderSummary() {
    let income = 0;
    let expense = 0;
    let receivables = 0;

    transactions.forEach(function (transaction) {
        const nominal = Number(transaction.nominal) || 0;

        if (transaction.jenis === "pemasukan") {
            income += nominal;
        } else if (transaction.jenis === "pengeluaran") {
            expense += nominal;
        }
    });

    invoices.forEach(function (invoice) {
        if (invoice.status === "belum dibayar") {
            receivables += Number(invoice.nominal) || 0;
        }
    });

    document.getElementById("income").textContent = income;
    document.getElementById("expense").textContent = expense;
    document.getElementById("balance").textContent = income - expense;
    document.getElementById("receivables").textContent = receivables;
}

muatData();
renderTransactions();
renderInvoices();
renderSummary();
