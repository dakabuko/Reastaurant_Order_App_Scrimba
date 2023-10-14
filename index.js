import { menuArray } from "./data.js";

let orderArr = []
let totalPrice = 0


const orderItems = document.getElementById('order-items')
const paymentModal = document.getElementById('payment-modal')
const nameInput = document.getElementById('name')
const cardDetailSubmitBtn = document.getElementById('card-detail-submit-btn')
const processSection = document.getElementById('process-section')
const mainSection = document.getElementById('main-section')

document.addEventListener('click',(event) =>{
  if(event.target.dataset.additem){
    getOrderItems(event.target.dataset.additem)
  }else if(event.target.dataset.removeitem){
    getUpdatedItems(event.target.dataset.removeitem)
  }else if(event.target.id == "complete-btn"){
    displayPaymenyModal()
  }else if(event.target.id == "card-detail-submit-btn"){
    event.preventDefault()
    processPayment()
  }
})

function processPayment(){
  paymentModal.style.display = "none"
  mainSection.style.display = "none"

  const userInput = nameInput.value
  processSection.innerHTML = `
    <div class="process-area">
      <h2>Thank you ${userInput}. Your order is on your way..</h2>
    </div>
  `
}

function displayPaymenyModal(){
  paymentModal.style.display = "block"
}



function getUpdatedItems(itemId) {
  itemId = Number(itemId)
  let itemObj = menuArray.find(item => item.id == itemId);
  console.log(itemObj)
  if(orderArr.includes(itemObj)){
    const index = orderArr.indexOf(itemObj)
    orderArr.splice(index, 1)
    totalPrice -= itemObj.price
    console.log('Total Price is ' + totalPrice)
    renderOrderSection()
    renderOrderItems()
  }
}

function getOrderItems(itemId) {
  const itemObj = menuArray.find(item => item.id == itemId);
  if (!orderArr.includes(itemObj)) {
    orderArr.push(itemObj);
    totalPrice += itemObj.price
    console.log('Total Price is ' + totalPrice)
    renderOrderSection()
    renderOrderItems()
  }
}


function getOrderItemsDisplayed() {
    let orderHtml = ''
    orderArr.forEach(item => {
          orderHtml += `
            <div class="orderItem-container">
              <h2 class="orderItem-name">${item.name}</h2>
              <h2 class="orderItem-price">${item.price}</h2>
              <button class="btn remove-btn" data-removeItem=${item.id}>Remove</button> 
            </div> `          
    }) 
    return orderHtml 
    
}

function getOrderSectionHtml() {
  return `
    <div class="order-section">
      <div class="order-section-header">
        Your Order
      </div>
      <div id="order-section" class="order-section">
      
      </div>
      <div class="total-container">
        <div class="total-price">
          <p>Total Price: </p>
        </div>
        <div class="total-price-figure">
          <p>$${totalPrice}</P>
        </div>
      </div>
      <div class="btn-container">
        <button class="btn complete-order-btn" id="complete-btn">
        Complete Order</button>
      </div>
    </div>
  
  `
}

function renderOrderItems(){
  document.getElementById('order-section').innerHTML = getOrderItemsDisplayed()
}

function renderOrderSection(){
  orderItems.innerHTML = getOrderSectionHtml()
  
}




function getMenuItems() {
  const menuContainer = document.getElementById('menu-items')
  menuArray.map(item => {
    menuContainer.innerHTML += `
      <div class="item-container">
        <div class="item-area">
           <h1 class="item-img">${item.emoji}</h1>
           <div class="item-detail">
             <h2>${item.name}</h2>
             <h2>${item.price}</h2>
             <p>${item.ingredients}</p>
           </div>
        </div>
        <div class="item-info">
          <button 
            class='btn add-btn' 
            id='add-btn' 
            data-addItem=${item.id} 
            data-addPrice=${item.price} 
            data-addName=${item.name}
            >
              +
          </button>
        </div>
      </div>
    `
  })
}

getMenuItems()