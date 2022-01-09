let defaulting_days = document.querySelector("#qtd_days");
let defaulting_month = document.querySelector("#qtd_month");

let btn_plus = document.querySelector("#btn_plus");
let btn_calc = document.querySelector("#btn_calc");

let tbody = document.querySelector("tbody");

let footer = document.querySelector("#footer");

footer.innerHTML = `©2021 - ${new Date().getFullYear()} MiniSoft | All Rights Reserved`;

function assessment(days) {
  return days * 7.5;
}

function daysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}

function taxesInMonth(defaulting) {
  let month, year, taxes;
  let penalty = 0;

  month = new Date().getMonth() == 0 ? new Date().getMonth() + 1 : 12;
  year = new Date().getFullYear();

  for (let i = 0; i < defaulting; i++) {
    if (month - i < 1) {
      month = 12;
      year = year - 1;
      taxes = parseFloat((daysInMonth(month, year) * 0.15).toFixed(2));
    } else {
      month = month > 1 ? month - 1 : 1;
      taxes = parseFloat((daysInMonth(month, year) * 0.15).toFixed(2));
    }

    penalty += taxes;
  }

  return parseFloat(penalty.toFixed(2));
}

function taxesInDays(defaulting) {
  return parseFloat((defaulting * 0.15).toFixed(2));
}

function maskCPF_CPNJ(register) {
  if (register.length == 11) {
    return register.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  } else if (register.length == 14) {
    return register.replace(
      /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
      "$1.$2.$3/$4-$5"
    );
  } else {
    return register;
  }
}

function createRow(id) {
  return `<tr>
            <th scope="row">${id}</th>
            <td><input type="number" placeholder="CPF" /></td>
            <td><input placeholder="Nome" /></td>
            <td><input type="number" placeholder="Qtd dias" value="${new Date().getDate()}" /></td>
            <td><input type="number" placeholder="Qtd Meses" value="0"/></td>
            <td>R$ 0,00</td>
          </tr>`;
}

btn_plus.addEventListener("click", (e) => {
  let nodeList = document.querySelectorAll("tbody tr");

  tbody.innerHTML += createRow(nodeList.length + 1);
});

btn_calc.addEventListener("click", (e) => {
  let nodeList = document.querySelectorAll("tbody tr");

  if (nodeList.length == 0) return console.log("empty");

  nodeList.forEach((list) => {
    let test = list.querySelectorAll("tbody tr td");
    let inputs = list.querySelectorAll("tbody tr td input");

    if (inputs.length != 0) {
      let inputCPF = inputs[0].value;
      let inputName = inputs[1].value;
      let inputDay = parseInt(inputs[2].value);
      let inputMonth = parseInt(inputs[3].value);
      let totalTaxes = list.querySelectorAll("tbody tr td")[4];

      test[0].innerHTML = maskCPF_CPNJ(inputCPF);
      test[1].innerHTML = inputName;
      test[2].innerHTML = inputDay;
      test[3].innerHTML = inputMonth;

      totalTaxes.innerHTML =
        "R$ " +
        (
          350 +
          taxesInDays(inputDay) +
          assessment(inputMonth) +
          taxesInMonth(inputMonth)
        ).toFixed(2);
    }
  });
});
