

        let zIndex = 10;


       
        const apps = {

            Files: `

                <div class="file-item">
                     Welcome to astraOS
                </div>

                <div class="file-item">
                    working..
                </div>

                <div class="file-item">
                    there is nothing here,so u can exit..
                </div>

            `,
            Calendar: `
    <div class="calendar-app">
        <div class="calendar-top">
            <button id="calendar-prev">‹</button>
            <h2 id="calendar-month"></h2>
            <button id="calendar-next">›</button>
        </div>

        <div class="calendar-weekdays">
            <span>Sun</span>
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
        </div>

        <div id="calendar-days"></div>
    </div>
`,


            Notes: `

                <textarea
                    class="notes-area"
                    placeholder="Start typing..."
                ></textarea>

            `,


            Settings: `

                <div class="setting-row">

                    <span>
                    Dark Mode
                    </span>

                    <span>
                        ON
                    </span>

                </div>


                <div class="setting-row">

                    <span>
                         status:online
                    </span>

                    <span>
                        ON
                    </span>

                </div>


                <div class="setting-row">

                    <span>
                         Version
                    </span>

                    <span>
                        1.5
                    </span>

                </div>

            `,
            

        

        /*calculator*/
Calculator: `
    <div class="calculator-app">

        <div
            class="calculator-display"
            id="calc-display"
        >
            0
        </div>

        <div class="calculator-grid">

            <button class="clear" data-action="clear">
                AC
            </button>

            <button data-action="delete">
                ⌫
            </button>

            <button class="operator" data-value="%">
                %
            </button>

            <button class="operator" data-value="/">
                ÷
            </button>


            <button data-value="7">7</button>
            <button data-value="8">8</button>
            <button data-value="9">9</button>

            <button
                class="operator"
                data-value="*"
            >
                ×
            </button>


            <button data-value="4">4</button>
            <button data-value="5">5</button>
            <button data-value="6">6</button>

            <button
                class="operator"
                data-value="-"
            >
                −
            </button>


            <button data-value="1">1</button>
            <button data-value="2">2</button>
            <button data-value="3">3</button>

            <button
                class="operator"
                data-value="+"
            >
                +
            </button>


            <button data-value="0">0</button>
            <button data-value=".">.</button>

            <button
                class="equals"
                data-action="equals"
                style="grid-column: span 2;"
            >
                =
            </button>

        </div>

    </div>
`,
        };
        
        document
            .querySelectorAll(".desktop-icon")
            .forEach(icon => {

                icon.addEventListener(
                    "click",
                    () => {

                        const appName =
                            icon
                            .querySelector(
                                "span:last-child"
                            )
                            .textContent
                            .trim();


                        
                        if (
                            document.querySelector(
                                `[data-app="${appName}"]`
                            )
                        ) {

                            return;

                        }


                        createWindow(appName);

                    }
                );

            });
document .getElementById("calculator-button")
.addEventListener("click",() => {
    if (
        !document.querySelector('[data-app="Calculator"]'

        ) 
    ){
        createWindow("Calculator");
    }
    
}
);

       function setupCalculator(win) {

    const display =
        win.querySelector("#calc-display");

    const buttons =
        win.querySelectorAll(".calculator-grid button");

    let firstNumber = null;
    let operator = null;
    let waitingForSecond = false;

    function calculate(a, b, op) {

        if (op === "+") return a + b;
        if (op === "-") return a - b;
        if (op === "*") return a * b;

        if (op === "/") {
            if (b === 0) return "Error";
            return a / b;
        }

        if (op === "%") return a % b;
    }

    function inputNumber(value) {

        if (display.textContent === "Error") {
            display.textContent = "0";
        }

        if (waitingForSecond) {
            display.textContent =
                value === "." ? "0." : value;

            waitingForSecond = false;
            return;
        }

        if (
            value === "." &&
            display.textContent.includes(".")
        ) {
            return;
        }

        if (
            display.textContent === "0" &&
            value !== "."
        ) {
            display.textContent = value;
        } else {
            display.textContent += value;
        }
    }

    function chooseOperator(op) {

        firstNumber =
            Number(display.textContent);

        operator = op;
        waitingForSecond = true;
    }

    function equals() {

        if (
            firstNumber === null ||
            operator === null
        ) {
            return;
        }

        const secondNumber =
            Number(display.textContent);

        const result =
            calculate(
                firstNumber,
                secondNumber,
                operator
            );

        display.textContent =
            String(result);

        firstNumber = null;
        operator = null;
        waitingForSecond = true;
    }

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            const value =
                button.dataset.value;

            const action =
                button.dataset.action;

            if (value !== undefined) {

                if (
                    ["+", "-", "*", "/", "%"]
                    .includes(value)
                ) {
                    chooseOperator(value);
                } else {
                    inputNumber(value);
                }

            }

            if (action === "clear") {
                display.textContent = "0";
                firstNumber = null;
                operator = null;
                waitingForSecond = false;
            }

            if (action === "delete") {

                if (
                    display.textContent.length > 1
                ) {
                    display.textContent =
                        display.textContent.slice(0, -1);
                } else {
                    display.textContent = "0";
                }

            }

            if (action === "equals") {
                equals();
            }

        });

    });
}

        function createWindow(appName) {

            const win =
                document.createElement("div");


            win.className = "window";


            win.dataset.app =
                appName;


            win.style.left =
                "180px";


            win.style.top =
                "100px";


            win.style.zIndex =
                ++zIndex;


            win.innerHTML = `

                <div class="titlebar">

                    <div class="title">

                        ${appName}

                    </div>


                    <div class="controls">

                        <div
                            class="control minimize">
                        </div>


                        <div
                            class="control maximize">
                        </div>


                        <div
                            class="control close">
                        </div>

                    </div>

                </div>


                <div class="window-content">

                    ${apps[appName]}

                </div>

            `;


            document
                .getElementById("desktop")
                .appendChild(win);


            

            win.addEventListener(
                "mousedown",
                () => {

                    win.style.zIndex =
                        ++zIndex;

                }
            );


    

            win
                .querySelector(".close")
                .addEventListener(
                    "click",
                    () => {

                        win.remove();

                    }
                );


            
            win
                .querySelector(".minimize")
                .addEventListener(
                    "click",
                    () => {

                        win.style.display =
                            "none";

                    }
                );


           

            win
                .querySelector(".maximize")
                .addEventListener(
                    "click",
                    () => {

                        if (
                            win.dataset.maximized
                            === "true"
                        ) {

                            win.style.width =
                                "430px";

                            win.style.height =
                                "300px";

                            win.style.left =
                                "180px";

                            win.style.top =
                                "100px";

                            win.dataset.maximized =
                                "false";

                        }

                        else {

                            win.style.left =
                                "0";

                            win.style.top =
                                "50px";

                            win.style.width =
                                "100%";

                            win.style.height =
                                "calc(100% - 50px)";

                            win.dataset.maximized =
                                "true";

                        }

                    }
                );


            
            makeDraggable(win);
if (appName === "Calculator") {
    setupCalculator(win);
}
if (appName === "Calendar"){
    setupCalendar(win);
}
        }



       
        function makeDraggable(win) {

            const bar =
                win.querySelector(
                    ".titlebar"
                );


            let dragging = false;

            let offsetX = 0;

            let offsetY = 0;


            bar.addEventListener(
                "mousedown",
                e => {

                    dragging = true;


                    offsetX =
                        e.clientX -
                        win.offsetLeft;


                    offsetY =
                        e.clientY -
                        win.offsetTop;


                    win.style.zIndex =
                        ++zIndex;

                }
            );


            document.addEventListener(
                "mousemove",
                e => {

                    if (!dragging) {
                        return;
                    }


                    win.style.left =
                        (
                            e.clientX -
                            offsetX
                        ) + "px";


                    win.style.top =
                        (
                            e.clientY -
                            offsetY
                        ) + "px";

                }
            );


            document.addEventListener(
                "mouseup",
                () => {

                    dragging = false;

                }
            );

            }
     document.getElementById("widgets-button").addEventListener("click", () => {
    document.getElementById("widget-panel").classList.toggle("show");
});

document.getElementById("widget-close").addEventListener("click", () => {
    document.getElementById("widget-panel").classList.remove("show");
});

            document
    .getElementById("files-button")
    .addEventListener("click", () => {

        if (!document.querySelector('[data-app="Files"]')) {
            createWindow("Files");
        }

    });

document
    .getElementById("notes-button")
    .addEventListener("click", () => {

        if (!document.querySelector('[data-app="Notes"]')) {
            createWindow("Notes");
        }

    });

document
    .getElementById("calculator-button")
    .addEventListener("click", () => {

        if (!document.querySelector('[data-app="Calculator"]')) {
            createWindow("Calculator");
        }

    });

document
    .getElementById("settings-button")
    .addEventListener("click", () => {

        if (!document.querySelector('[data-app="Settings"]')) {
            createWindow("Settings");
        }

    });
   function setupCalculator(win) {

    const display =
        win.querySelector("#calc-display");

    const buttons =
        win.querySelectorAll(".calculator-grid button");

    let firstNumber = null;
    let operator = null;
    let waitingForSecond = false;

    function calculate(a, b, op) {

        if (op === "+") return a + b;
        if (op === "-") return a - b;
        if (op === "*") return a * b;

        if (op === "/") {
            if (b === 0) return "Error";
            return a / b;
        }

        if (op === "%") return a % b;
    }

    function inputNumber(value) {

        if (display.textContent === "Error") {
            display.textContent = "0";
        }

        if (waitingForSecond) {
            display.textContent =
                value === "."
                ? "0."
                : value;

            waitingForSecond = false;
            return;
        }

        if (
            value === "." &&
            display.textContent.includes(".")
        ) {
            return;
        }

        if (
            display.textContent === "0" &&
            value !== "."
        ) {
            display.textContent = value;
        } else {
            display.textContent += value;
        }
    }

    function chooseOperator(op) {

        firstNumber =
            Number(display.textContent);

        operator = op;
        waitingForSecond = true;
    }

    function equals() {

        if (
            firstNumber === null ||
            operator === null
        ) {
            return;
        }

        const secondNumber =
            Number(display.textContent);

        const result =
            calculate(
                firstNumber,
                secondNumber,
                operator
            );

        display.textContent =
            String(result);

        firstNumber = null;
        operator = null;
        waitingForSecond = true;
    }

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            const value =
                button.dataset.value;

            const action =
                button.dataset.action;

            if (value !== undefined) {
                if (
                    ["+", "-", "*", "/", "%"]
                    .includes(value)
                ) {
                    chooseOperator(value);
                } else {
                    inputNumber(value);
                }
            }

            if (action === "clear") {
                display.textContent = "0";
                firstNumber = null;
                operator = null;
                waitingForSecond = false;
            }

            if (action === "delete") {

                if (
                    display.textContent.length > 1
                ) {
                    display.textContent =
                        display.textContent.slice(0, -1);
                } else {
                    display.textContent = "0";
                }
            }

            if (action === "equals") {
                equals();
            }

        });

    });
}
function setupCalendar(win) {
    const monthTitle = win.querySelector("#calendar-month");
    const daysContainer = win.querySelector("#calendar-days");

    const today = new Date();

    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();

    function showCalendar() {
        daysContainer.innerHTML = "";

        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = new Date(
            currentYear,
            currentMonth + 1,
            0
        ).getDate();

        monthTitle.textContent = new Date(
            currentYear,
            currentMonth
        ).toLocaleDateString([], {
            month: "long",
            year: "numeric"
        });

        
        for (let i = 0; i < firstDay; i++) {
            const empty = document.createElement("div");
            empty.className = "calendar-empty";
            daysContainer.appendChild(empty);
        }

        // Days
        for (let day = 1; day <= daysInMonth; day++) {
            const dayButton = document.createElement("button");

            dayButton.textContent = day;

            if (
                day === today.getDate() &&
                currentMonth === today.getMonth() &&
                currentYear === today.getFullYear()
            ) {
                dayButton.classList.add("today");
            }

            daysContainer.appendChild(dayButton);
        }
    }

    win.querySelector("#calendar-prev").addEventListener("click", () => {
        currentMonth--;

        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }

        showCalendar();
    });

    win.querySelector("#calendar-next").addEventListener("click", () => {
        currentMonth++;

        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }

        showCalendar();
    });

    showCalendar();
}
   const startButton =
   document.querySelector(".start-button");
   const startMenu=
   document.querySelector("#start-menu");
   startButton.addEventListener("click",()=>{
    startMenu.classList.toggle("show");
   });
document.getElementById("start-files").addEventListener("click", () => {
    document.getElementById("files-button").click();
    startMenu.classList.remove("show");
});

document.getElementById("start-notes").addEventListener("click", () => {
    document.getElementById("notes-button").click();
    startMenu.classList.remove("show");
});

document.getElementById("start-calculator").addEventListener("click", () => {
    document.getElementById("calculator-button").click();
    startMenu.classList.remove("show");
});

document.getElementById("start-settings").addEventListener("click", () => {
    document.getElementById("settings-button").click();
    startMenu.classList.remove("show");
});
function updateDateTime() {
    const now = new Date();

    const time = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });

    const date = now.toLocaleDateString([], {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });

    document.getElementById("time").textContent = time;
    document.getElementById("date").textContent = date;
    showCalendar();
}

updateDateTime();
setInterval(updateDateTime, 1000);