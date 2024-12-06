const form = document.getElementById("transaction-form");
const inputName = document.getElementById("transaction-name");
const inputAmount = document.getElementById("transaction-amount");
const listContainer = document.getElementById("transaction-list");
const balanceDisplay = document.getElementById("total-balance");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function addTransaction(event) {
  event.preventDefault();
  const name = inputName.value.trim();
  const amount = parseInt(inputAmount.value.trim());

  if (!name || isNaN(amount)) {
    alert("이름 혹은 수량을 잘못 입력했습니다.");
    return;
  }

  const transaction = {
    id: Date.now(),
    name,
    amount,
  };
  transactions.push(transaction);
  updateUI();

  form.reset();
}

function updateUI() {
  listContainer.innerHTML = "";
  let total = 0;

  transactions.forEach((v) => {
    const listItem = document.createElement("li");
    listItem.classList.add(v.amount > 0 ? "income" : "expense");
    listItem.innerHTML = `
        ${v.name}
        <span>${v.amount > 0 ? "+" : ""}${v.amount.toLocaleString("ko-KR", {
      style: "currency",
      currency: "KRW",
    })}원</span>
        <button class="delete-btn" data-id="${v.id}">X</button>
    `;
    listContainer.appendChild(listItem);

    total += v.amount;
  });

  balanceDisplay.textContent = total.toLocaleString("ko-KR", {
    style: "currency",
    currency: "KRW",
  });

  document.querySelectorAll(".delete-btn").forEach((v) => {
    v.addEventListener("click", () => deleteTransaction(v.dataset.id));
  });

  localStorage.setItem("transactions", JSON.stringify(transactions));
}

function deleteTransaction(id) {
  transactions = transactions.filter((v) => v.id != id);
  updateUI();
}

form.addEventListener("submit", addTransaction);
updateUI();
