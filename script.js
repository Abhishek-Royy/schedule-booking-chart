const yearShow = document.querySelector(".year");
const dates = document.querySelector(".allDates");
const btn = document.querySelectorAll(".prev,.next");

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let date = new Date();
let month = date.getMonth();
let year = date.getFullYear();
let today = date.getDate();

const renderCalendarData = () => {
  const start = new Date(year, month, 1).getDay();
  const endDate = new Date(year, month + 1, 0).getDate();
  const end = new Date(year, month, endDate).getDay();
  const endDatePrev = new Date(year, month, 0).getDate();

  let dateHtml = "";

  // Previous month dates
  for (let i = start; i > 0; i--) {
    dateHtml += `<li class="inactive">${endDatePrev - i + 1}</li>`;
  }

  // Current month dates
  for (let i = 1; i <= endDate; i++) {
    let className = "";
    if (
      i === today &&
      month === date.getMonth() &&
      year === date.getFullYear()
    ) {
      className = "today";
    }
    dateHtml += `<li class="${className}">${i}</li>`;
  }

  // Next month dates
  for (let i = 1; i < 7 - end; i++) {
    dateHtml += `<li class="inactive">${i}</li>`;
  }

  dates.innerHTML = dateHtml;
  yearShow.textContent = `${months[month]} ${year}`;
};

renderCalendarData();

// *****************************
btn.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (e.target.classList.contains("prev")) {
      month--;
      if (month < 0) {
        month = 11;
        year--;
      }
    } else {
      month++;
      if (month > 11) {
        month = 0;
        year++;
      }
    }
    renderCalendarData();
  });
});

// *********MAIN PROBLEM*************
document.addEventListener("DOMContentLoaded", function () {
  let listItems = document.querySelectorAll(".schedule .sec-2 ul li");

  listItems.forEach(function (item) {
    item.addEventListener("click", function () {
      if (item.textContent.trim() === "AVAILABLE") {
        item.style.backgroundColor = "#ffa500";
        item.textContent = "BOOKED";

        // Get date and timing from clicked slot
        const date = document.querySelector(".year").textContent.trim();
        const time = item.previousElementSibling.textContent.trim();

        // Update booking information in wrap-1 div
        const bookingInfo = document.querySelector(".wrap-1 .date");
        bookingInfo.textContent = `Date: ${date}, Time: ${time}`;
      } else if (item.textContent.trim() === "BOOKED") {
        item.style.backgroundColor = "";
        item.textContent = "AVAILABLE";

        // Clear booking information in wrap-1 div when slot is unbooked
        const bookingInfo = document.querySelector(".wrap-1 .date");
        bookingInfo.textContent = "";
      }
    });
  });
});
