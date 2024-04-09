let inp = document.querySelector("input");
let ul = document.querySelector("ul");
let btn = document.querySelector("button");
let todo = document.querySelector(".todo");
let h3 = document.querySelector("h3");



btn.addEventListener("click", function () {

    if (inp.value.trim() !== "") {

        var allwords = inp.value.trim().split("");
        var clt = allwords.join("");
        var wordLimit = 15;
        var words = inp.value.trim().split("", wordLimit);
        let str;
        if (allwords.length > wordLimit) {
            str = words.join("") + "...";
        } else {
            str = words.join("");
        }
        let item = document.createElement("li");
        item.textContent = str;

        let p = document.createElement("p");
        p.innerText = "More";

        let div = document.createElement("div");
        div.classList.add("detail");
        item.insertAdjacentElement('beforeend', div);

        let h4 = document.createElement("h4");
        h4.style.color = "black";
        h4.innerText = clt;
        div.appendChild(h4);

        let date = document.createElement("input");
        date.type = "datetime-local";
        date.setAttribute("id", "date");

        let lblDate = document.createElement("label");
        lblDate.for = "date";
        lblDate.innerText = "Set Date & Time : ";

        let tsk = document.createElement("div");
        tsk.innerText = "Click me to save the timing.";
        tsk.setAttribute("id", "tsk");

        click(tsk, date, tsk);

        div.appendChild(lblDate);
        div.appendChild(date);
        div.appendChild(tsk);

        let delbtn = document.createElement("span");
        delbtn.innerHTML = "\u00d7";
        delbtn.classList.add("delete");

        item.appendChild(delbtn);
        item.appendChild(p);
        ul.appendChild(item);
        inp.value = "";
        savedata();
    }

});
function click(btn, date, res) {
    btn.addEventListener("click", function () {
        res.innerText = `The task will start at : ${date.value}`;
        savedata();
    });
}
inp.addEventListener("keydown", function (event) {
    if (event.keyCode === 13) {
        if (inp.value.trim() !== "") {
            var allwords = inp.value.trim().split("");
            var clt = allwords.join("");
            var wordLimit = 15;
            var words = inp.value.trim().split("", wordLimit);
            let str;
            if (allwords.length > wordLimit) {
                str = words.join("") + "...";
            } else {
                str = words.join("");
            }
            let item = document.createElement("li");
            item.textContent = str;

            let p = document.createElement("p");
            p.innerText = "More";

            let div = document.createElement("div");
            div.classList.add("detail");
            item.insertAdjacentElement('beforeend', div);

            let h4 = document.createElement("h4");
            h4.style.color = "black";
            h4.style.textDecoration="underline"
            h4.innerText = clt;
            div.appendChild(h4);

            let date = document.createElement("input");
            date.type = "datetime-local";
            date.setAttribute("id", "date");

            let lblDate = document.createElement("label");
            lblDate.for = "date";
            lblDate.innerText = "Set Date & Time : ";

            let tsk = document.createElement("div");
            tsk.innerText = "Click me to save the timing.";
            tsk.setAttribute("id", "tsk");

            click(tsk, date, tsk);

            div.appendChild(lblDate);
            div.appendChild(date);
            div.appendChild(tsk);

            let delbtn = document.createElement("span");
            delbtn.innerHTML = "\u00d7";
            delbtn.classList.add("delete");

            item.appendChild(delbtn);
            item.appendChild(p);
            ul.appendChild(item);
            inp.value = "";
            savedata();
        }

    }
});

ul.addEventListener("click", function (event) {
    event.preventDefault();
    //let div = event.target.children[0];
    if (event.target.nodeName === "SPAN") {
        let listItem = event.target.parentElement;
        listItem.remove();
        savedata();
    }
    else if (event.target.nodeName === "LI") {
        event.target.classList.toggle("checked");
        savedata();
    }
    else if (event.target.nodeName === "P") {
        event.target.classList.toggle("more");
        let div = event.target.parentElement.children[0];
        if (event.target.classList.contains("more")) {
            div.classList.remove("none");
            div.classList.add("block");
        } else {
            div.classList.remove("block");
            div.classList.add("none");
        }
        savedata();
    }

}, false);

todo.addEventListener("click",function(event){
    if(event.target.nodeName=="A"){
       ul.innerHTML="";
       savedata(); 
    }
});

if ("Notification" in window) {
    // Request permission from the user to display notifications
    Notification.requestPermission().then(function (result) {
        if (result === "granted") {
            // If permission is granted, create and display the notification
            var notification = new Notification("lets add your task . it is helpful to remmeber you about your work.", {
                body: "This is a notification from TODO-LIST website.// developed by Tarush (instagram : @t_rush0r )",
                icon: "https://example.com/notification-icon.png" // URL to the notification icon
            });
        }
    });
} else {
    // Browser does not support the Notifications API
    console.log("This browser does not support notifications.");
}

function updateIndiaTime() {
    // Create a new Date object
    var currentDate = new Date();

    // Get the local time in India
    var options = { timeZone: 'Asia/Kolkata' };
    var indiaTime = currentDate.toLocaleString('en-US', options);

    // Display the India time on the webpage
    h3.textContent = indiaTime;
}

// Call the function initially to display the time immediately
updateIndiaTime();

// Update the time every second
setInterval(updateIndiaTime, 1000);

// function addWord() {
//     // Get the input value
//     var wordInput = document.getElementById("wordInput").value.trim();

//     // Check if the input is not empty
//     if (wordInput !== "") {
//         // Define the word limit
//         var wordLimit = 5; // Change this value to set the word limit

//         // Split the input into words
//         var words = wordInput.split(" ");

//         // Iterate through the words and add them to the list if they don't exceed the word limit
//         for (var i = 0; i < words.length; i++) {
//             if (words[i].length <= wordLimit) {
//                 // Create a new list item and append it to the list
//                 var listItem = document.createElement("li");
//                 listItem.textContent = words[i];
//                 document.getElementById("wordList").appendChild(listItem);
//             } else {
//                 alert("Word \"" + words[i] + "\" exceeds the word limit of " + wordLimit + " characters.");
//             }
//         }

//     }
// }

function savedata() {
    localStorage.setItem("data", ul.innerHTML);
}
function showdata() {
    ul.innerHTML = localStorage.getItem("data");
}
showdata();