import nav from "../components/nav.js";
document.getElementById("navbar").innerHTML = nav();

const display = (data) => {
  const box2 = document.getElementById("box2");
  box2.innerHTML = ""; // Clear the existing content

  data.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("product-box");

    const image = document.createElement("img");
    image.src = item.image;

    const title = document.createElement("h3");
    title.textContent = item.title;

    const price = document.createElement("h3");
    price.textContent = `${item.price}$`;

    const category = document.createElement("h3");
    category.textContent = item.category;

    const rating = document.createElement("h4");
    rating.textContent = "* ".repeat(item.rating.rate);

    if(item.rating.rate>4)
        {
            rating.innerHTML="* * * * *"
            rating.style.color="green"
        }
        else if(item.rating.rate<=4 && item.rating.rate>=3)
        {
            rating.innerHTML="* * * *"
            rating.style.color="chocolate"   
        }
        else{
            rating.innerHTML="* *"
            rating.style.color="red" 
        }
    const btn1 = document.createElement("button");
    btn1.textContent = "Add to Cart";
    btn1.classList.add("btn1");

    div.append(image, title, price, category, rating, btn1);
    box2.appendChild(div);

    btn1.addEventListener("click", () => {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      let exists = false;

      cart.forEach((cartItem, index) => {
        if (cartItem.id === item.id) {
          cart[index].qty += 1;
          exists = true;
        }
      });

      if (!exists) {
        cart.push({ ...item, qty: 1 });
        alert("Added to cart");
      }

      localStorage.setItem("cart", JSON.stringify(cart));
    });
  });
};

let products = [];

document.getElementById("lth").addEventListener("click", () => {
  products.sort((a, b) => a.price - b.price);
  display(products);
});

document.getElementById("htl").addEventListener("click", () => {
  products.sort((a, b) => b.price - a.price);
  display(products);
});

document.getElementById("man").addEventListener("click", () => {
  const temp = products.filter((val) => val.category === "men's clothing");
  display(temp);
});

document.getElementById("woman").addEventListener("click", () => {
  const temp = products.filter((val) => val.category === "women's clothing");
  display(temp);
});

document.getElementById("electronics").addEventListener("click", () => {
  const temp = products.filter((val) => val.category === "electronics");
  display(temp);
});

fetch("http://localhost:3000/products")
  .then((response) => response.json())
  .then((data) => {
    products = data;
    display(data);
  });

// Function to fetch and display products initially
const getProducts = () => {
  fetch("http://localhost:3000/products")
    .then((response) => response.json())
    .then((data) => {
      products = data;
      display(data);
    });
};

getProducts();
