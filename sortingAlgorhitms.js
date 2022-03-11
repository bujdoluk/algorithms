
let container = document.getElementById("canvas");
let bubbleSortButton = document.getElementById("bubbleSort");
let generateButton = document.getElementById("generate");
let binarySearchButton = document.getElementById("binarySearch");

function generateRandomArray() {
    for (let i = 0; i < 20; i++) {
        let number = Math.ceil(Math.random() * 100);

        let element = document.createElement("div");

        element.classList.add("block");

        element.style.height = `${number * 3}px`;
        element.style.transform = `translate(${i * 40}px)`;

        let element_label = document.createElement("label");
        element_label.classList.add("block_label");
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
            }, 100)
        })
    })
}

async function BubbleSort(delay = 100) {
    var blocks = document.querySelectorAll(".block");

    for (i = 0; i < blocks.length; i++) {
        for (j = 0; j < blocks.length - 1 - i; j++) {
            blocks[j].style.backgroundColor = "red";
            blocks[j + 1].style.backgroundColor = "red";

            await new Promise((resolve) => {
                setTimeout(() => {
                    resolve();
                }, delay)
            });

            let number1 = Number(blocks[j].childNodes[0].innerHTML);
            let number2 = Number(blocks[j + 1].childNodes[0].innerHTML);

            if (number1 > number2) {
                await swap(blocks[j], blocks[j + 1]);
                blocks = document.querySelectorAll(".block");
            }

            blocks[j].style.backgroundColor = "blue";
            blocks[j + 1].style.backgroundColor = "blue";
        }

        blocks[blocks.length - 1 - i].style.backgroundColor = "green";
    }
}

function binarySearch() {


}

generateButton.addEventListener("click", generateRandomArray);
bubbleSortButton.addEventListener("click", BubbleSort);
binarySearchButton.addEventListener("click", binarySearch);



