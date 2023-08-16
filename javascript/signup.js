const userdata = (e) => {
    e.preventDefault();

    let user = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    }
    var nameregex = /^[a-zA-Z ]{2,30}$/;
    const emailregex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    var passregex = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    let count = 0;
    if (!(nameregex.test(user.name))) {
        document.getElementById("n_err").innerHTML = "Not a Name"
    }
    else {
        document.getElementById("n_err").innerHTML = ""
    }
    if (!(emailregex.test(user.email))) {
        document.getElementById("e_err").innerHTML = "Invalid email address"
    }
    else {
        document.getElementById("e_err").innerHTML = ""
    }
    if (!(passregex.test(user.password))) {
        document.getElementById("p_err").innerHTML = "Password is not strong"
    }
    else {
        document.getElementById("p_err").innerHTML = ""

    }
    if ((nameregex.test(user.name)) && (emailregex.test(user.email)) && (passregex.test(user.password))) {
        fetch(`http://localhost:3000/user?email=${user.email}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.length > 0) {
                    alert("already exists")
                    setTimeout(() => {
                        window.location.href = "/pages/signin.html";
                    }, 1000)
                }
                else {
                    try {
                        fetch("http://localhost:3000/user", {

                            method: "POST",
                            headers: { "content-type": "application/json" },
                            body: JSON.stringify(user)

                        })
                        localStorage.setItem("loggedIn", true);
                    }
                    catch (error) {
                        alert("Error")
                    }
                }
            })

    }
}
document.querySelector("#form").addEventListener("submit", userdata)

//name
document.getElementById("name").addEventListener("keypress", () => {
    let name = document.getElementById("name").value
    var nameregex = /^[a-zA-Z ]{2,30}$/;
    if (!nameregex.test(name)) {
        document.getElementById("n_err").innerHTML = "Not a Name";
    } else {
        document.getElementById("n_err").innerHTML = "valid Name";
        document.getElementById("n_err").style.color = "green";
    }
});

    //email
    document.getElementById("email").addEventListener("keypress", () => {
        let email = document.getElementById("email").value;
        const emailregex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!emailregex.test(email)) {
            document.getElementById("e_err").innerHTML = "Invalid email address";
            document.getElementById("e_err").style.color = "red";
        } else {
            document.getElementById("e_err").innerHTML = "Valid email";
            document.getElementById("e_err").style.color = "green";
        }
    });


    //password
    document.getElementById("password").addEventListener("keyup", () => {
        let password = document.getElementById("password").value;
        var passregex = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
        if (!passregex.test(password)) {
            document.getElementById("p_err").innerHTML = "Password is not strong";
            document.getElementById("p_err").style.color = "red";
        } else {
            document.getElementById("p_err").innerHTML = "Creating a strong password";
            document.getElementById("p_err").style.color = "green";
        }
    });
