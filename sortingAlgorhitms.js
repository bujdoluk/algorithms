
let container = document.getElementById("canvas");
let bubbleSortButton = document.getElementById("bubbleSort");
let generateButton = document.getElementById("generate");
let selectionSortButton = document.getElementById("selectionSort");

generateButton.addEventListener("click", generate);
bubbleSortButton.addEventListener("click", BubbleSort);
selectionSortButton.addEventListener("click", SelectionSort);

function generateRandomArray() {
    for (let i = 0; i < 20; i++) {
        let number = Math.ceil(Math.random() * 100);

        let element = document.createElement("div");

        element.classList.add("bar");

        element.style.height = `${number * 3}px`;
        element.style.transform = `translate(${i * 40}px)`;

        let element_label = document.createElement("label");
        element_label.classList.add("bar_label");
        element_label.innerText = number;

        element.appendChild(element_label);
        container.appendChild(element);
    }
}

function swap(element1, element2) {
    return new Promise((resolve) => {

        let temp = element1.style.transform;
        element1.style.transform = element2.style.transform;
        element2.style.transform = temp;

        window.requestAnimationFrame(function () {
            setTimeout(() => {
                container.insertBefore(element2, element1);
                resolve();
            }, 250)
        })
    })
}

async function BubbleSort(delay = 100) {
    var bars = document.querySelectorAll(".bar");

    for (let i = 0; i < bars.length; i++) {
        for (let j = 0; j < bars.length - 1 - i; j++) {
            bars[j].style.backgroundColor = "red";
            bars[j + 1].style.backgroundColor = "red";

            await new Promise((resolve) => {
                setTimeout(() => {
                    resolve();
                }, delay)
            });

            let number1 = Number(bars[j].childNodes[0].innerHTML);
            let number2 = Number(bars[j + 1].childNodes[0].innerHTML);

            if (number1 > number2) {
                await swap(bars[j], bars[j + 1]);
                bars = document.querySelectorAll(".bar");
            }

            bars[j].style.backgroundColor = "blue";
            bars[j + 1].style.backgroundColor = "blue";
        }

        bars[bars.length - 1 - i].style.backgroundColor = "rgb(49, 226, 13)";
    }
}

async function SelectionSort(delay = 100) {
    let bars = document.querySelectorAll(".bar");

    let min_index = 0;
    for (let i = 0; i < bars.length; i++) {
        min_index = i;

        bars[i].style.backgroundColor = "darkblue";
        for (let j = i + 1; j < bars.length; j++) {
            bars[j].style.backgroundColor = "red";

            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, 100)
            );


            let number1 = parseInt(bars[j].childNodes[0].innerHTML);
            let number2 = parseInt(bars[min_index].childNodes[0].innerHTML);

            if (number1 < number2) {
                if (min_index !== i) {
                    bars[min_index].style.backgroundColor = "rgb(24, 190, 255)";
                }
                min_index = j;
            } else {
                bars[j].style.backgroundColor = "rgb(24, 190, 255)";
            }
        }

        let temp1 = bars[min_index].style.height;
        let temp2 = bars[min_index].childNodes[0].innerText;
        bars[min_index].style.height = bars[i].style.height;
        bars[i].style.height = temp1;
        bars[min_index].childNodes[0].innerText = bars[i].childNodes[0].innerText;
        bars[i].childNodes[0].innerText = temp2;

        await new Promise((resolve) =>
            setTimeout(() => {
                resolve();
            }, 250)
        );

        bars[min_index].style.backgroundColor = "rgb(24, 190, 255)";
        bars[i].style.backgroundColor = "rgb(49, 226, 13)";


    }
}

function generate() {
    window.location.reload();
}

generateRandomArray();





