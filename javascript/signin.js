import nav from "../components/nav.js"

document.getElementById("navbar").innerHTML=nav()
const login=(e)=>{
    e.preventDefault();
    let email=document.getElementById('email').value;
    let password=document.getElementById('password').value;

    fetch(`http://localhost:3000/user?email=${email}`)
    .then((res) => res.json())
    .then((data) => {
        if(data.length > 0)
        {
            if(data[0].password === password)
            {
                alert('login successfully')
                localStorage.setItem("loggedIn", true);
                window.location.href = "index.html";
            }
            else
            {
                alert("password incorrect")
            }
        }
        else
        {
            alert("user are not found");
            window.location.href = "/pages/signup.html";
        }
    })
}
document.getElementById("log-form").addEventListener("submit",login);