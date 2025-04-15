document.addEventListener('DOMContentLoaded' , () => {
    let checkout = document.querySelector('.checkout')
    let items = document.querySelector('.items')
    let NoItems = document.querySelector('.NoItems')
    let bill = document.querySelector('.bill')
    let addToCart = document.querySelectorAll('.addToCart')

    let finalBill = 0;

    addToCart.forEach((cart) => {
        cart.addEventListener('click', (e) => {
            e.target.style.display = "none"
            e.target.parentNode.querySelector('.remove').classList.remove('hidden')
            let removeBtn = e.target.parentNode.querySelector('.remove')
            let cartButton = e.target
            let productNo =  e.target.parentNode.querySelector('.product').innerHTML
            let price =  parseFloat(e.target.parentNode.querySelector('.price').innerHTML)
            renderitem(productNo, price, cartButton, removeBtn)
        })
    })

    function renderitem(productNo, price, cartButton, removeBtn){
        let div = document.createElement('div')
        div.setAttribute('class', 'item text-lg font-semibold pl-2 mb-1 ')
        div.innerHTML = `Product ${productNo}- $${price} x   
          <span class="count mr-5">1</span>
          <button class="plus bg-blue-600 rounded-md px-2 py-1 mr-2 hover:bg-blue-400 duration-100">+</button>
          <button class="minus bg-blue-600 rounded-md px-3 py-1 hover:bg-blue-400 duration-100">-</button>`
        
        items.appendChild(div)

        let plus=  div.querySelector('.plus') 
        let minus=  div.querySelector('.minus') 
        
        let count = 1
        plus.addEventListener('click', ()=> {
            count++
            div.querySelector('.count').innerHTML = count 
            finalBill += price 
            updateBill() 

        })
        
        minus.addEventListener('click', ()=> {
            if (count == 1) {
                div.remove()
                cartButton.style.display = "block"
                removeBtn.classList.add('hidden')
            }
            else{
                count--
                div.querySelector('.count').innerHTML = count
            }

            finalBill -= price 
            updateBill() 

        })

        removeBtn.addEventListener('click', (e) => {
            div.remove()
            finalBill -= price * count
            updateBill()
            cartButton.style.display = "block"
            removeBtn.classList.add('hidden')
        })



        finalBill += price 
        updateBill() 

    }

    function updateBill() {
        bill.innerHTML = finalBill.toFixed(2)
        if (items.querySelectorAll('.item').length === 0) {
            NoItems.classList.remove('hidden')
        }
        else {
            NoItems.classList.add('hidden')
        }
    }

    checkout.addEventListener('click', (e)=> {
        alert(`Your bill is: $${ finalBill.toFixed(2)}`)
        finalBill = 0
        
        let removeBtn = document.querySelectorAll('.remove')
        removeBtn.forEach((btn) => {
            btn.classList.add('hidden')
        })

        items.querySelectorAll('.item').forEach((item) => {
            item.remove()
        })
        addToCart.forEach((cart) => {
            cart.innerHTML = "Add To Cart"
            cart.style.display = 'block'
        })

        updateBill()
    })
})