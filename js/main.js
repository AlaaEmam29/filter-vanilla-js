"use strict"
import { products } from './products.js';
const productContainer =document.querySelector(".product-container")


window.addEventListener("DOMContentLoaded",function()
{
    displayMenuItems();
    displayAllItem(products)
})
function displayMenuItems()
{
    const allItems = ["all",...new Set(products.map(product => product.company))];

   const companyName = allItems.map(item=>`<li><a id=${item} href="#${item}">${item}</a></li>`).join(" ");
     document.querySelector(".menuItems").innerHTML = companyName
const btns = document.querySelectorAll("li a")
btns.forEach((btn)=>{
    btn.addEventListener("click",function(e) {
        e.preventDefault();
        const company = e.currentTarget.hash.split("#")[1];
   
        const productsCategories = products.filter((product)=>{
            if(product.company === company)
            {
                return product
            }
            if(company === allItems[0])
            {
                return product
            }
        })
        displayAllItem(productsCategories)
    })
})
}

function displayAllItem(products)
{
    if(products.length < 1)
    {
        const notFound = `
        <div class="not-found">
        <h3>Sorry, no products matched your search</h3>
        </div>
        `
        productContainer.innerHTML = notFound
        return;
    }
    let productItem = products.map((product) =>
    {
        const {title,image,price} = product
        return `
        <div class="col-lg-6 col-xl-4 pe-2">
                        <article class="product">
                            <img
            src="${image}"
            class="product-img img"
            alt="${title}"
          />
          <footer class="pt-2 pb-4">
            <h5 class="product-name">${title}</h5>
            <span class="product-price">$${price}</span>
          </footer>
                        </article>
                    </div>
        `
    }).join(" ")
    productContainer.innerHTML = productItem;
}

const searchInput = document.querySelector("#search")
searchInput.addEventListener("input",function(e) {
    searchFilter(e.currentTarget.value)

})
function searchFilter(inputValue) {
const filterProduct = products.filter((product)=> product.title.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase()))
displayAllItem(filterProduct);
}
