
let JWT = null;

const regButton = document.getElementById("regBtn");
regButton.addEventListener("click", () => {
  fetch("https://cab230.hackhouse.sh/register", {
    method: "POST",
    body: 'email=email=alexanderflyn%40gmail.com&password=Artem1s12',
    headers: {
      "Content-type": "application/x-www-form-urlencoded"
    }
  })
    .then(function(response) {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Network response was not ok");
    })
    .then(function(result) {
      let appDiv = document.getElementById("app");
      appDiv.innerHTML = JSON.stringify(result);
      regButton.disabled = true;
    })
    .catch(function(error) {
      console.log("There has been a problem with your fetch operation: ",error.message);
    });
});

const logButton = document.getElementById("logBtn");
logButton.addEventListener("click", () => {
    fetch("https://cab230.hackhouse.sh/login", {
        method: "POST",
        body: 'email=email=alexanderflyon%40gmail.com&password=Artem1s12',
        headers: {
            "Content-type": "application/x-www-form-urlencoded"
        }
    })
        .then(function(response) {
            if (response.ok) {
                return response.json();
            }
            throw new Error("Network response was not ok.");
        })
        .then(function(result) {
            let appDiv = document.getElementById("app");
            appDiv.innerHTML = JSON.stringify(result);
            JWT = result.token;
        })
        .catch(function(error) {
            console.log("There has been a problem with your fetch operation: ",error.message);
        });
});

const offButton = document.getElementById("offBtn");
offButton.addEventListener("click", () => {
    fetch("https://cab230.hackhouse.sh/offences")
        .then(function(response) {
            if (response.ok) {
                return response.json();
            }
            throw new Error("Network response was not ok.");
        })
        .then(function(result) {
            let appDiv = document.getElementById("app");
            appDiv.innerHTML = JSON.stringify(result);
        })
        .catch(function(error) {
            console.log("There has been a problem with your fetch operation: ",error.message);
        });
});

const searchButton = document.getElementById("serBtn");
searchButton.addEventListener("click", () => {

    //The parameters of the call
    let getParam = { method: "GET" };
    let head = { Authorization: `Bearer ${JWT}` };
    getParam.headers = head;

    //The URL
    const baseUrl = "https://cab230.hackhouse.sh/search?";
    const query = 'offence=Armed Robbery';
    const url = baseUrl + query;

    fetch(encodeURI(url),getParam)
        .then(function(response) {
            if (response.ok) {
                return response.json();
            }
            throw new Error("Network response was not ok.");
        })
        .then(function(result) {
            let appDiv = document.getElementById("app");
            appDiv.innerHTML = JSON.stringify(result);
        })
        .catch(function(error) {
                console.log("There has been a problem with your fetch operation: ",error.message);
        });
});

const filterDiv= document.getElementById("filter");
filterDiv.addEventListener("click", (event) => {
    const param = event.target.innerHTML; 
    let filter = ""; 

    //Example filter strings
    if (param === "area") {
        filter = "area=Moreton Bay Regional Council";
    } else if (param === "age") {
        filter = "age=Juvenile"
    } else if (param === "year") { 
        filter = "year=2006,2007,2008";
    }  
    
    //The parameters of the call
    let getParam = { method: "GET" };
    let head = { Authorization: `Bearer ${JWT}` };
    getParam.headers = head;

    //The URL
    const baseUrl = "https://cab230.hackhouse.sh/search?";
    const query = 'offence=Armed Robbery';

    const url = baseUrl + query + "&" + filter;
    console.log(url)
    fetch(encodeURI(url),getParam)
        .then(function(response) {
            if (response.ok) {
                return response.json();
            }
            throw new Error("Network response was not ok.");
        })
        .then(function(result) {
            let appDiv = document.getElementById("app");
            appDiv.innerHTML = JSON.stringify(result);
        })
        .catch(function(error) {
                console.log("There has been a problem with your fetch operation: ",error.message);
        }); 
}); 


