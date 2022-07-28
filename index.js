let myLeads = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");
const ulEl = document.getElementById("ul-el");
let localStorageData = JSON.parse(localStorage.getItem("myLeads"));

if (localStorageData) {
  myLeads = localStorageData;
  render(myLeads);
}

tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
  });
});

function render(leads) {
  let lists = "";
  for (let i = 0; i < leads.length; i++) {
    lists += `<li class="lists-items">
      <a target='_blank' href='${leads[i]}'> ${leads[i]} </a> 
      <i class="fa fa-trash" id="deletebox"></i>
      </li>`;
  }
  ulEl.innerHTML = lists;
}

deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  myLeads = [];
  render(myLeads);
});

function checkInput() {
  if (inputEl.value.length >= 1) {
    myLeads.push("https://" + inputEl.value);
  }
}

inputBtn.addEventListener("click", function () {
  checkInput();
  inputEl.value = "";
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  render(myLeads);
});

inputEl.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    inputBtn.click();
  }
});
