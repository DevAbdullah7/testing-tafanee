// Scrolling Top Arrow
window.addEventListener('scroll', () => {
    if (document.querySelector('body .main .topArrow')) {
        if (400 < window.scrollY) {
            document.querySelector('body .main .topArrow').classList.add('active')
        } else {
            document.querySelector('body .main .topArrow').classList.remove('active')
        }
    }
})

// Buttons
// Taps Buttons
function tabsButtonHandling(btn) {
    const buttons = btn.parentNode.children
    const Type = btn.attributes.type.value
    for(let i=0; i < buttons.length; i++) {
        buttons[i].classList.remove('active')
    }
    btn.classList.add('active')
    btn.parentNode.setAttribute('Type', Type)
}

// Toggles
function togglesHandelling(toggle) {
    if (toggle.parentNode.classList.contains('active')) {
        toggle.parentNode.classList.remove('active')
    } else {
        toggle.parentNode.classList.add('active')
    }
}

// CheckBoxes
function checkBoxesHandelling(checkBox) {
    if (checkBox.parentNode.classList.contains('active')) {
        checkBox.parentNode.classList.remove('active')
    } else {
        checkBox.parentNode.classList.add('active')
    }
}

// Radios
function radiosHandelling(radio) {
    if (radio.parentNode.classList.contains('active')) {
        radio.parentNode.classList.remove('active')
    } else {
        radio.parentNode.classList.add('active')
    }
}

// Pagination
function paginationNumbersHandelling(number) {
    const numbers = number.parentNode.children
    for (const num of numbers) {
        num.classList.remove('active')
    }
    number.classList.add('active')
}

// Search
function searchInputHandlling(input) {
    if (input.value.length > 0) {
        input.parentNode.classList.add('has-text');
    } else {
        input.parentNode.classList.remove('has-text');
    }
}

// Taps 
function tapsHandlling(tap) {
    if (tap.parentNode.classList.contains('active')) {
        tap.parentNode.classList.remove('active')
    } else {
        tap.parentNode.classList.add('active')
    }
}

// Password Handlling
function passwordInpHandlling(passToggle) {
    const passwordInput = passToggle.parentNode.parentNode.firstElementChild;

    // Showen Password
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);

    // Changing password hiding icon
    if (type == 'password') {
        passToggle.setAttribute('name', 'eye-outline')
    } else if (type == 'text') {
        passToggle.setAttribute('name', 'eye-off-outline')
    }
}

// Inputs Handlling
function inputHandlling(input) {
    if (input.value.length > 0) {
        input.classList.add('has-text');
    } else {
        input.classList.remove('has-text');
    }
}

// Calendars
function updateCalendar(calendar) {
    const monthYearElement = calendar.querySelector('.header .monthYear')
    const datesElement = calendar.querySelector('.dates')
    
    // Calendar Time Handling, this should be discussing with the team.
    let currentDate = ''
    if (calendar.attributes.calTime.value <= 0) {
        currentDate = new Date()
    } else {
        currentDate = new Date(calendar.attributes.calTime.value)
    }

    // set the date input default value by today date as default value
    if (calendar.parentNode.classList.contains('input')) {
        const dateInput = calendar.parentNode.querySelector('input[type=date]')
        if (dateInput.value == "") {
            const theDay = String(currentDate.getDate()).length < 2 ? `0${currentDate.getDate()}` : String(currentDate.getDate())
            const theMonth = String(currentDate.getMonth()+1).length < 2 ? `0${currentDate.getMonth()+1}` : String(currentDate.getMonth()+1)
            const theYear = String(currentDate.getFullYear());
            const inputValue = theDay + "-" + theMonth + "-" + theYear;
            const parts = inputValue.split('-');
            const formattedValue = `${parts[2]}-${parts[1]}-${parts[0]}`;
            dateInput.value = formattedValue
        }
    }
    

    const currentYear = currentDate.getFullYear()
    const currentMonth = currentDate.getMonth()
    const fristDay = new Date(currentYear, currentMonth, 0)
    const lastDay = new Date(currentYear, currentMonth + 1, 0)
    const totalDayes = lastDay.getDate()
    const fristDayIndex = fristDay.getDay()
    const lastDayIndex = lastDay.getDay()

    const monthYearString = currentDate.toLocaleString('default', {month: 'long', year: 'numeric'})
    monthYearElement.textContent = monthYearString

    let datesHTML = ''

    for(let i = fristDayIndex; i > 0; i--) {
        const prevDate = new Date(currentYear, currentMonth, 0 - i + 1)
        datesHTML += `<div class="date inactive" onclick="
        if (this.parentNode.parentNode.parentNode.classList.contains('input')) {
            if (String(${currentMonth}).length < 2) {
                if (String(${prevDate.getDate()}).length < 2) {
                    this.parentNode.parentNode.parentNode.children[1].children[0].value = String(${currentYear}) + '-' + 0 + String(${currentMonth}) + '-' + 0 + String(${prevDate.getDate()})
                } else {
                    this.parentNode.parentNode.parentNode.children[1].children[0].value = String(${currentYear}) + '-' + 0 + String(${currentMonth}) + '-' + String(${prevDate.getDate()})
                }
            } else {
                if (String(${prevDate.getDate()}).length < 2) {
                    this.parentNode.parentNode.parentNode.children[1].children[0].value = String(${currentYear}) + '-' + String(${currentMonth}) + '-' + 0 + String(${prevDate.getDate()})
                } else {
                    this.parentNode.parentNode.parentNode.children[1].children[0].value = String(${currentYear}) + '-' + String(${currentMonth}) + '-' + String(${prevDate.getDate()})
                }
            }
            this.parentNode.parentNode.classList.remove('active')
        } else {
            
        }
        ">${prevDate.getDate()}</div>`
    }

    for(let i = 1; i <= totalDayes; i++) {
        const date = new Date(currentYear, currentMonth, i)
        const activeClass = date.toDateString() === new Date().toDateString() ? 'active' : ''

        datesHTML += `<div class="date ${activeClass}" onclick="
        if (this.parentNode.parentNode.parentNode.classList.contains('input')) {
            if (String(${currentMonth + 1}).length < 2) {
                if (String(${i}).length < 2) {
                    this.parentNode.parentNode.parentNode.children[1].children[0].value = String(${currentYear}) + '-' + 0 + String(${currentMonth + 1}) + '-' + 0 + String(${i})
                } else {
                    this.parentNode.parentNode.parentNode.children[1].children[0].value = String(${currentYear}) + '-' + 0 + String(${currentMonth + 1}) + '-' + String(${i})
                }
            } else {
                if (String(${i}).length < 2) {
                    this.parentNode.parentNode.parentNode.children[1].children[0].value = String(${currentYear}) + '-' + String(${currentMonth + 1}) + '-' + 0 + String(${i})
                } else {
                    this.parentNode.parentNode.parentNode.children[1].children[0].value = String(${currentYear}) + '-' + String(${currentMonth + 1}) + '-' + String(${i})
                }
            }
            this.parentNode.parentNode.classList.remove('active')
        } else {
            
        }
        ">${i}</div>`
    }

    for(let i = 1; i <= 7 - lastDayIndex; i++) {
        const nextDate = new Date(currentYear, currentMonth + 1, i)

        datesHTML += `<div class="date inactive" onclick="
        if (this.parentNode.parentNode.parentNode.classList.contains('input')) {
            if (String(${currentMonth + 2}).length < 2) {
                if (String(${nextDate.getDate()}).length < 2) {
                    this.parentNode.parentNode.parentNode.children[1].children[0].value = String(${currentYear}) + '-' + 0 + String(${currentMonth + 2}) + '-' + 0 + String(${nextDate.getDate()})
                } else {
                    this.parentNode.parentNode.parentNode.children[1].children[0].value = String(${currentYear}) + '-' + 0 + String(${currentMonth + 2}) + '-' + String(${nextDate.getDate()})
                }
            } else {
                if (String(${nextDate.getDate()}).length < 2) {
                    this.parentNode.parentNode.parentNode.children[1].children[0].value = String(${currentYear}) + '-' + String(${currentMonth + 2}) + '-' + 0 + String(${nextDate.getDate()})
                } else {
                    this.parentNode.parentNode.parentNode.children[1].children[0].value = String(${currentYear}) + '-' + String(${currentMonth + 2}) + '-' + String(${nextDate.getDate()})
                }
            }
            this.parentNode.parentNode.classList.remove('active')
        } else {
            
        }
        ">${nextDate.getDate()}</div>`
    }

    datesElement.innerHTML = datesHTML
    calendar.setAttribute('calTime', currentDate)
}
// Run Calenders
window.addEventListener('load', () => {
    const Calendars = document.querySelectorAll('.calendar')
    for (const calendar of Calendars) {
        updateCalendar(calendar)
    }
})

// Copy Elements Functionality
function copyElement(ele) {
    const code = ele.parentNode.querySelector('pre')
    const range = document.createRange();
    range.selectNodeContents(code);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    navigator.clipboard.writeText(selection);
    ele.classList.add('copied')
    ele.innerHTML = `<ion-icon name="checkmark-outline"></ion-icon>`
    setTimeout(() => {
        ele.classList.remove('copied')
        ele.innerHTML = `<ion-icon name="duplicate-outline"></ion-icon>`
        selection.removeRange(range);
    }, 750);
}

// Side Panel Links Handlling
function sidePanelLinksHandlling(link) {
    const links = document.querySelectorAll('.sidePanel .item')
    for (const link of links) {
        link.classList.remove('active')
    }
    link.classList.add('active')
    document.querySelector('.sidePanel').classList.remove('active')
}
