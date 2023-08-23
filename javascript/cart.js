import nav from "../components/nav.js";

document.getElementById("navbar").innerHTML = nav()


let cart = JSON.parse(localStorage.getItem("cart")) || [];
let totalprice = 0;
cart.map((ele) => {
  totalprice += ele.price * ele.qty * 10;
});


let show = (cart) => {

  cart.map((ele, index) => {

    let maindiv = document.createElement("div");

    let imgdiv = document.createElement("div");
    let image = document.createElement("img");
    image.src = ele.image;

    let texts = document.createElement("div");

    let title = document.createElement("h3");
    title.innerHTML = ele.title;

    let minse = document.createElement("button");
    minse.innerHTML = "-";

    let price1 = document.createElement("p");
    price1.innerHTML = `${ele.price * 10}$`;

    let plusminse = document.createElement("div");

    let noq = document.createElement("button");
    noq.innerHTML = ele.qty;

    let plus = document.createElement("button");
    plus.innerHTML = "+";

    imgdiv.append(image);
    texts.append(title, price1);
    plusminse.append(minse, noq, plus);
    maindiv.append(imgdiv, texts, plusminse);
    document.getElementById("cartpage").append(maindiv);

    price1.setAttribute("class", "price1");
    maindiv.setAttribute("class", "maindiv");
    imgdiv.setAttribute("class", "imgdiv");
    texts.setAttribute("class", "texts");
    plusminse.setAttribute("class", "plusminse");

    minse.addEventListener("click", () => {
      console.log(ele);
      let qty = cart[index].qty;
      if (qty == 1) {
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));

        console.log(cart);
        window.location.reload();
      } else {
        cart[index].qty -= 1;
        localStorage.setItem("cart", JSON.stringify(cart));
        window.location.reload();
      }
    });
    plus.addEventListener("click", () => {
      console.log("test");
      cart[index].qty += 1;
      localStorage.setItem("cart", JSON.stringify(cart));
      window.location.reload();
    });
  });
};
show(cart);

let show2 = () => {
  let maindiv2 = document.createElement("div");

  let lable = document.createElement("label");
  lable.innerHTML = "PROMO CODE:";

  let lable2 = document.createElement("label");
  lable2.innerHTML = "TOTAL PRICE:";

  let promocode = document.createElement("input");

  promocode.placeholder = "enter your promo code";
  promocode.setAttribute("class", "promocode");

  let disprice = document.createElement("p")

  let apply = document.createElement("submit");
  apply.innerHTML = "Apply";
  apply.setAttribute("class", "apply");

  maindiv2.append(lable, promocode, apply);

  document.getElementById("other").append(maindiv2);

  document.getElementById("price").append(lable2, totalprice);

  maindiv2.setAttribute("class", "maindiv2");
  lable.setAttribute("class", "lable");
  promocode.addEventListener("keypress", (e) => {

    console.log(e.key);

    if (e.key == "Enter") {

      console.log(promocode.value);
      if (promocode.value == "kashish3019") {
        totalprice -= (totalprice / 100) * 20;
        console.log(totalprice);
        disprice.innerHTML = `Final price :${totalprice}`
        maindiv2.append(disprice)
        disprice.setAttribute("class", "disprice")
      }
    }
  });
};
show2();
