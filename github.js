const input = document.getElementById("input");
const button = document.getElementById("button");
const image =document.getElementById("image");
const nameUser = document.getElementById("name");
const userName = document.getElementById("username");
const dataNum = document.getElementById("data");
const about = document.getElementById("about");
const repos = document.getElementById("repo");
const followers = document.getElementById("followers");
const following = document.getElementById("following");
const moon =document.getElementById("moon");
const container = document.getElementById("container")
const darkMode = document.getElementById('icons');
const locations = document.getElementById("location");
const twitter = document.getElementById("twitter");
const website = document.getElementById("website");
const company = document.getElementById("company");
const par = document.querySelectorAll('p');
const h = document.querySelectorAll('h1');
const searchBar = document.getElementById('search-bar');
const secondDiv=document.getElementById("second-div");
const body = document.body;
const dark = document.getElementById("Dark");
const imageSun = document.getElementById("sun");
const imageDark = document.getElementById("moon");
const light = document.getElementById("Light");
const last_div_icons = document.querySelectorAll('.icons-four');

console.log(company);

//*dark and light mode 
darkMode.addEventListener("click",() =>{
        body.classList.toggle("very-dark");
        container.classList.toggle("dark-style-blue");
        searchBar.classList.toggle("dark-style-blue");
        input.classList.toggle("dark-style-blue");
        input.classList.toggle("placehold");
        secondDiv.classList.toggle("very-dark");


        par.forEach(e => e.classList.toggle("white"));
        h.forEach(e => e.classList.toggle("white"));
        last_div_icons.forEach(e => e.classList.toggle("icon-filter"));

        imageDark.classList.toggle("moon-dark");
        dark.classList.toggle("moon-dark");
        light.classList.toggle("sun-light")
        imageSun.classList.toggle("sun-light"); 
});

//search
button.addEventListener('click',(e) => {
    e.preventDefault();
    let search = input.value;
    let originalName = search.split(' ').join('')

    fetch("https://api.github.com/users/" + originalName)
    .then((response) => {
        if(!response.ok){
            throw new Error("faild to fetch data")
        }else{
            searchBar.style.border = "none";
        }
        return response.json()
        
    })
    .then((result) => { 
       
    console.log(result);
        nameUser.innerHTML = result.name || "Not Available"
        followers.innerHTML = result.followers || "0"
        following.innerHTML = result.following || "0"
        userName.innerHTML = `@${result.login}`
        repos.innerHTML = result.public_repos || "0"
        image.innerHTML = `<img class="image" src=${result.avatar_url}>`
        about.innerHTML = result.bio || "Not Available"
        locations.innerHTML = result.location || "Not Available";
        twitter.innerHTML = result.twitter_username || "Not Available";
        website.innerHTML = result.blog || "Not Available";
        company.innerHTML = result.company || "Not Available";

        checkRequest(result.following, following);
        checkRequest(result.followers, followers);
        checkRequest(result.public_repos, repos);
        checkRequest(result.location, locations);
        checkRequest(result.twitter_username, twitter);
        checkRequest(result.blog, website);
        checkRequest(result.company, company);
        
        function checkRequest(result, element){
            console.log(element);
            if(result){           
                element.parentNode.style.opacity = "1";      
            }else{
                element.parentNode.style.opacity = "0.5";
            }
        }
       
        dataNum.innerHTML = `Joined ${getFormattedDate(result.created_at)}` || "Not Available";
//date text changer
        function getFormattedDate(dateString) {
            const date = new Date(dateString);
            const day = date.getDate();
            const monthIndex = date.getMonth();
            const year = date.getFullYear();
            const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            const monthName = monthNames[monthIndex];
            return `${day} ${monthName} ${year}`;
        }

    })
    .catch(error => {
        searchBar.style.border = "1px solid red"
    }) 

   
 });