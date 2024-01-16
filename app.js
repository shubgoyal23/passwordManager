const formAddPassword = document.querySelector("#add-password");
const passwordTable = document.querySelector("#table");
const website = document.querySelector("#website");
const userName = document.querySelector("#username");
const userPassword = document.querySelector("#password");
const Linksvg = `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="10px" height="10px" viewBox="0 0 24 24">
<path d="M 5 3 C 3.9069372 3 3 3.9069372 3 5 L 3 19 C 3 20.093063 3.9069372 21 5 21 L 19 21 C 20.093063 21 21 20.093063 21 19 L 21 12 L 19 12 L 19 19 L 5 19 L 5 5 L 12 5 L 12 3 L 5 3 z M 14 3 L 14 5 L 17.585938 5 L 8.2929688 14.292969 L 9.7070312 15.707031 L 19 6.4140625 L 19 10 L 21 10 L 21 3 L 14 3 z"></path>
</svg>`;

window.addEventListener("DOMContentLoaded", () => {
    let pass = getLocalPasswords();
    if (pass.length > 0) {
        pass.forEach((item) => {
            addUserNamePasswordToTable(
                item.website,
                item.username,
                item.password
            );
        });
    }
});

function passwordAddHandler(event) {
    event.preventDefault();
    console.log(event.currentTarget);
    const websiteItems = website.value;
    const userNameItems = userName.value;
    const userPasswordItems = userPassword.value;

    if (checkwebsite(websiteItems)) {
        alert("site already exists");
        return;
    }
    website.value = "";
    userName.value = "";
    userPassword.value = "";

    let pass = getLocalPasswords();
    pass.push({
        website: websiteItems,
        username: userNameItems,
        password: userPasswordItems,
    });
    localStorage.setItem("passwords", JSON.stringify(pass));
    addUserNamePasswordToTable(websiteItems, userNameItems, userPasswordItems);
}

function checkwebsite(website) {
    if (website === "") {
        return true;
    }
    const pass = getLocalPasswords();
    for (const iterator of pass) {
        if (iterator.website === website) {
            return true;
        }
    }
    return false;
}

function addUserNamePasswordToTable(website, username, password) {
    if (username.length > 20) {
        username = username.slice(0, 17) + "***";
    }
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${website}<span><a href="http://${website}" target="_blank">${Linksvg}</a></span></td>
    <td>${username}<span><img src="copy.svg" alt="copy"></span></td>
    <td>*********<span><img src="copy.svg" alt="copy"></span></td>
    <td><button>X</button></td>`;

    tr.querySelector("button").addEventListener("click", removeItem);
    tr.querySelectorAll("img").forEach((e) =>
        e.addEventListener("click", copyToClickBoard)
    );
    passwordTable.appendChild(tr);
}

function removeItem(e) {
    let pass = getLocalPasswords();
    let updatedPss = pass.filter((item) => {
        return (
            item.website !=
            e.target.parentElement.parentElement.firstChild.innerText
        );
    });
    localStorage.setItem("passwords", JSON.stringify(updatedPss));
    e.target.parentElement.parentElement.remove();
}
const copiedTxt = document.querySelector(".copied");
function copyToClickBoard(event) {
    let website =
        event.target.parentElement.parentElement.parentElement.firstChild
            .innerText;
    let pass = getLocalPasswords();
    pass.map((items) => {
        if (items.website === website) {
            if (
                event.target.parentElement.parentElement.innerText ===
                "*********"
            ) {
                navigator.clipboard.writeText(items.password);
            } else {
                navigator.clipboard.writeText(items.username);
            }
        }
    });

    
    copiedTxt.classList.remove("hidden");
    copiedTxt.style.top = `${event.target.y}px`;
    copiedTxt.style.left = `${event.target.x + 15}px`;

    setTimeout(() => {
        copiedTxt.classList.add("hidden");
    }, 500);
}

function getLocalPasswords() {
    return localStorage.getItem("passwords")
        ? JSON.parse(localStorage.getItem("passwords"))
        : [];
}

formAddPassword.addEventListener("submit", passwordAddHandler);

// password maker
let passLength = 16;
let passSpecialChar = 1;
let passMinNumber = 1;
let passSmallAlpha = 1;
let passCapitalAlpha = 1;
let passwordGenerated = "";
let checkCount = 4

const specialCharactersArray = ["!", "@", "#", "$", "%", "^", "&", "*"];
const numbersArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const alphabetArray = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
];
const capitalAlphabetArray = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
];

const passwordDiv = document.querySelector(".password-maker");
const passwordOutput = document.querySelector(".password-output");

document
    .querySelector(".generate-password button")
    .addEventListener("click", () => {
        passwordDiv.classList.remove("hidden");
    });
document.querySelector("#close").addEventListener("click", () => {
    passwordDiv.classList.add("hidden");
});
const passLengthInput = document.querySelector("#Password-length");
passLengthInput.addEventListener("input", passwordLengthCalculate);

function passwordLengthCalculate(e) {
    passwordDiv.querySelector("label").innerHTML = `Length: ${e.target.value}`;
    passLength = e.target.value;
}


function generatePassword() {
    passwordOutput.innerHTML = "";
    passwordGenerated = "";
    passLength = passLengthInput.value;
    while (passLength > 0) {
        if(checkCount <= 0){
            passwordGenerated = `Chose At Least One Option`
            break
        }
        const indexValue = Math.floor(Math.random() * 4);
        switch (indexValue) {
            case 0:
                if (passSpecialChar === 1) {
                    let word = choseRandomWord(specialCharactersArray);
                    passwordGenerated += `<span class="password-special">${word}</span>`;
                    break;
                }
            case 1:
                if (passMinNumber === 1) {
                    let word = choseRandomWord(numbersArray);
                    passwordGenerated += `<span class="password-number">${word}</span>`;
                    break;
                }
            case 2:
                if (passSmallAlpha === 1) {
                    let word = choseRandomWord(alphabetArray);
                    passwordGenerated += `<span class="password-letter">${word}</span>`;
                    break;
                }
            case 3:
                if (passCapitalAlpha === 1) {
                    let word = choseRandomWord(capitalAlphabetArray);
                    passwordGenerated += `<span class="password-letter-capital">${word}</span>`;
                    break;
                }
        }
        
    }
    passwordOutput.innerHTML = passwordGenerated;
    const pass = localpasswordHistory()
    pass.map((item)=>{
        if(item === passwordOutput.innerText){
            generatePassword()
        }
    })
    pass.push(`${passwordOutput.innerText.replace(/(\r\n|\n|\r)/gm, "")}`)
    localStorage.setItem("passHistory", JSON.stringify(pass))
}
function choseRandomWord(arr) {
    let index = Math.floor(Math.random() * arr.length);
    passLength--;
    return arr[index];
}
generatePassword();

checkOptions = document.querySelectorAll(".div-options input");

checkOptions.forEach((item) => {
    item.addEventListener("input", (e) => {
        if (e.target.checked) {
            if (e.target.id == `small-alpha-check`) {
                passSmallAlpha = 1;
                checkCount += 1
            }
            if (e.target.id == `capital-alpha-check`) {
                passCapitalAlpha = 1;
                checkCount += 1
            }
            if (e.target.id == `number-check`) {
                passMinNumber = 1;
                checkCount += 1
            }
            if (e.target.id == `special-check`) {
                passSpecialChar = 1;
                checkCount += 1
            }
        } else {
            if (e.target.id == `small-alpha-check`) {
                passSmallAlpha = 0;
                checkCount -= 1
            }
            if (e.target.id == `capital-alpha-check`) {
                passCapitalAlpha = 0;
                checkCount -= 1
            }
            if (e.target.id == `number-check`) {
                passMinNumber = 0;
                checkCount -= 1
            }
            if (e.target.id == `special-check`) {
                passSpecialChar = 0;
                checkCount -= 1
            }
        }
        generatePassword();
    });
});

document.getElementById("pass-new").addEventListener("click", ()=>{
    generatePassword()
})
const passCopiedFeild = document.querySelector(".pass-codied-sucess")
document.getElementById("pass-copy").addEventListener("click", ()=>{
    navigator.clipboard.writeText(passwordOutput.innerText.replace(/(\r\n|\n|\r)/gm, ""))
    passCopiedFeild.classList.remove("hidden")
    setTimeout(()=>{passCopiedFeild.classList.add("hidden")}, 1000)
})
document.getElementById("pass-insert").addEventListener("click", ()=>{
    passwordDiv.classList.add("hidden")
    password.value = passwordOutput.innerText
})


function localpasswordHistory(){
    let p = localStorage.getItem("passHistory")? JSON.parse(localStorage.getItem("passHistory")): []
    if(p.length > 500){
        return []
    }
    return p
}

const passHistory = document.querySelector(".password-history")
const passHistorylist = document.querySelector(".password-history-list-div")
const passHistorybtn = document.querySelector("#pass-history-btn")
const passHistorybtnClose = document.querySelector("#pass-history-close")
passHistorybtnClose.addEventListener("click", ()=>{
    passHistory.classList.add("hidden")
})
passHistorybtn.addEventListener("click", ()=>{
    passHistory.classList.remove("hidden")
    passHistorylist.innerHTML = ""
    listPasswords()
})

function listPasswords(){
    let passList = localpasswordHistory()
    passList.forEach((password)=>{
        const listItem = document.createElement("div")
        listItem.classList.add("strong-password-history")
        listItem.innerHTML = `<div class="password-history-feild">
        <span class="password-letter">${password}</span>
        </div>
        <div>
        <img src="copy.svg" alt="copy" class="pass-history-copy-btn">
        </div>`
        passHistorylist.appendChild(listItem)
        listItem.querySelector(".pass-history-copy-btn").addEventListener("click", (e)=>{
            navigator.clipboard.writeText(password)
            copiedTxt.classList.remove("hidden");
        copiedTxt.style.top = `${e.target.y}px`;
        copiedTxt.style.left = `${e.target.x - 200}px`;
        console.log(e.target.x)

    setTimeout(() => {
        copiedTxt.classList.add("hidden");
    }, 500);
        })
    })
}
document.getElementById("clear-password-history").addEventListener("click", ()=>{
    localStorage.setItem("passHistory", JSON.stringify([]))
    passHistorylist.innerHTML = ""
})