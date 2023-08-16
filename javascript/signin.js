console.log("signin.js loaded");

document.getElementById("log-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    let useremail = document.getElementById("username").value;
    let userpass = document.getElementById("password").value;

    let emailcheck = /^[A-Za-z0-9]{3,}@[A-Za-z]{3,}[.]{1}[A-Za-z.]{2,6}$/;
    let passwordcheck = /^(?=.*[A-Z]{1})(?=.*[0-9])(?=.*[!@#$%^&*=-])[a-zA-Z0-9!@#$%^&*=-]{8,16}$/;

    // Conditions
    if (!emailcheck.test(useremail)) {
        document.getElementById("useremailalert").innerHTML = "Invalid Email!!";
        return;
    } else {
        document.getElementById("useremailalert").innerHTML = "";
    }

    if (!passwordcheck.test(userpass)) {
        document.getElementById("userpassalert").innerHTML = "Invalid Password!!";
        return;
    } else {
        document.getElementById("userpassalert").innerHTML = "";
    }

    try {
        let response = await fetch(`http://localhost:3000/singup?email=${useremail}`);
        let fetchedData = await response.json();

        let userFound = false;

        for (let i = 0; i < fetchedData.length; i++) {
            if (fetchedData[i].email === useremail) {
                userFound = true;

                if (fetchedData[i].password === userpass) {
                    alert("Successfully logged in");
                    window.location.href = "index.html"; // Redirect to home page
                } else {
                    document.getElementById("userpassalert").innerHTML = "Invalid Password";
                }

                break;
            }
        }

        if (!userFound) {
            document.getElementById("useremailalert").innerHTML = "User Not Exist";
        } else {
            document.getElementById("useremailalert").innerHTML = "";
        }

    } catch (error) {
        console.error("Error:", error);
        document.getElementById("useremailalert").innerHTML = "Error logging in";
    }
});
