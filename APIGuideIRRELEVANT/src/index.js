
let JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiOTMiLCJlbWFpbCI6ImFsZXhhbmRlcmZseW9uQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJEFoMGh0WUxIbDFLT0RXMnQ2TWhldmVjbDh4WlNvaXQzSUNGUDdLNzhrZ01EeVFGWll6aC5XIn0sImlhdCI6MTU1OTMxMjMzOSwiZXhwIjoxNTU5Mzk4NzM5fQ.y9iNymJXxI_2a4vhwShOdsvTcQacraYDWMn2CzMZQf4';
// let JWT = 'undefined'

const regButton = document.getElementById("regBtn");
regButton.addEventListener("click", () => {
  fetch("http://localhost:3000/register", {
    method: "POST",
    body: 'email=2lexanderflyon%40gmail.com&password=Artem1s12',
    headers: {
      "Content-type": "application/x-www-form-urlencoded"
    }
  })

  .then((res) => {
      if (res.status === 201) {
         res.json().then(post => console.log(post))
         return
      } else if (res.status === 400) {
         res.json().then(post => console.log(post))
         return
      }
      throw new Error("Error when registering...try refreshing");     
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
    fetch("http://localhost:3000/login", {
        method: "POST",
        body: 'email=alexanderflyon%40gmail.com&password=Artem1s12',
        headers: {
            "Content-type": "application/x-www-form-urlencoded"
        }
    })
    .then((res) => {
      res.json().then(post => console.log(post))
      // if (res.status === 200) {
      //    res.json().then(post => console.log(post.message))
      //    return
      // } else if (res.status === 401) {
      //    res.json().then(post => console.log(post.message))
      //    return
      // }
      // throw new Error("Error when registering...try refreshing");     
   })  

        .then(function(result) {
           console.log(result)
            let appDiv = document.getElementById("app");
            appDiv.innerHTML = JSON.stringify(result);
            JWT = result.token;
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
    const baseUrl = "http://localhost:3000/search?";
    const query = 'offence=Armed Robbery&gender=male&area=aurukun shire council';
    const url = baseUrl + query;

    fetch(encodeURI(url),getParam)
        .then(function(res) {
         if (res.status === 401) {
            res.json().then(post => console.log(post))
            return
         } else {
            return res.json()
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


