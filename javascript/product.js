import nav from "../components/nav.js";
document.getElementById("navbar").innerHTML=nav()

const display=(data)=>{
    data.map((item)=>{
        let image=document.createElement("img")
        image.src=item.image

        let title=document.createElement("h3");
        title.innerHTML=item.title

        let price=document.createElement("h3");
        price.innerHTML=item.price

        let category=document.createElement("h3");
        category.innerHTML=item.category

        let rating=document.createElement("h4");

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

        let btn=document.createElement("button")
        btn.innerHTML="Buy Now"

        let btn2=document.createElement("button")
        btn2.innerHTML="Add to cart"

        let div=document.createElement("div")
        div.append(image,title,price,category,rating,btn,btn2)
        document.getElementById("box2").append(div)
    })
}

const get=()=>{
    fetch("http://localhost:3000/products")
    .then((response)=>response.json())
    .then((response)=>{
        display(response)
    })
};
get()