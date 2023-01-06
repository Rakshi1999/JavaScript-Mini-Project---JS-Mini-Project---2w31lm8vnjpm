const temp = document.getElementById("template");
const cartShow = document.getElementById("mycart");
const cartHeader = document.getElementById("cart-header");
const cartClose = document.getElementById("cart-close");
const profileLogin = document.getElementById("profile-header");
const productContainer = document.getElementsByClassName("product-container");
const closePopUpBtn = document.getElementById("popup-close");
const modal = document.querySelector(".modal");
const cartValue = document.getElementById("total-cart-value");
const register_popup = document.getElementById("register-popup");
const signUp = document.getElementById("signUp");
const logout = document.getElementById("logout");
const signupuserName = document.getElementById("name");
const signupuserEmail = document.getElementById("email");
const signupuserPassword = document.getElementById("register-password");
let userLoggedIn = false;
let confirmUserPassword = false;
let storeData = [];
let cart=[];
// let search = document.getElementById("search-bar");
fetch("https://fakestoreapi.com/products")
.then(res=> res.json())
.then((data)=>{
    // console.log(data);
    storeData=data.map((obj,index)=>{
        const temp = `
        <div class="product-container" id=${index}>
        <div class="product-image"><img src=${obj.image} /></div>
        <div class="product-title">${obj.title}</div>
        <div class="product-price"><h3>${obj.price} $</h3></div>
        <div class="product-rating">${(obj.rating.rate)}/5</div>
        <div class="add-to-cart" onclick="handleCart(${index})">Add to cart <i class="fa-solid fa-cart-plus"></i></div>
        </div>`;
        document.getElementById("list").insertAdjacentHTML("beforeend",temp);
        return obj;
    })
    // console.log(storeData);
}).catch((error)=>{console.log("Error Fetching Data",error)})

function showCart(){
    cartShow.classList.toggle("show");
}
cartHeader.addEventListener("click",showCart);
cartClose.addEventListener("click",showCart);
closePopUpBtn.addEventListener("click",()=>{modal.close()});
profileLogin.addEventListener("click",()=>{
    console.log(userLoggedIn);
    if(userLoggedIn){
        logout.focus();
    }else{
        document.getElementById("useremail").value = "";
        document.getElementById("password").value = "";
        modal.showModal();
    }
});

logout.onclick = () =>{
    userLoggedIn=false;
    document.getElementById("profileName").innerText="";
    logout.classList.add("hide");
}


const cart_list = document.getElementById("cart-list");

function cartProductContainer(obj){
    let product =`
           <div class="cart-outter">
             <div class="cart-container">
              <div class="cart-image"><img src=${obj.image} /></div>
              <div class="cart-title">${obj.title}</div>
             </div>
             <div>${obj.price} $</div>
             <div class="qty">Qty: <span id="cart-qty">${obj.qty}</span>
              <button class="cart-btn" onclick="cartQtyIncrement(${obj.id})" id="cart-plus">+</button>
              <button class="cart-btn" onclick="cartQtyDecrement(${obj.id})" id="cart-minus">-</button>
              <button class="cart-btn" id="remove" onclick="removeFromCart(${obj.id})"><i class="fa-solid fa-trash"></i></button>
             </div>
            </div>
        `;
    return product;
}

function addToCart(i){
        let obj = storeData[i];
        obj["qty"] = 1;
        cart.push(obj);
        let product = cartProductContainer(obj);
        // console.log(product);
        cart_list.insertAdjacentHTML("beforeend",product);
}

function  calculateCartValue(){
    let total = 0;
    cart.forEach((obj)=>{
        total+=(obj.price*obj.qty);
    })
    console.log(total.toFixed(2));
    cartValue.innerText = total.toFixed(2);
}

function handleCart(i){
    if(cart.length!=0){
        if(cart.includes(storeData[i])){
         alert("Product is already in cart")
         showCart();
        }else{
            addToCart(i);
            calculateCartValue();
            showCart();
            let timeId = setTimeout(()=>{
            showCart();
            },1000)
        }
    }else{
        addToCart(i);
        calculateCartValue();
        showCart();
        let timeId = setTimeout(()=>{
            showCart();
        },1000)
    }
}
function refreshCart(){
    if(cart.length!=0){
      cart.forEach((obj)=>{
            let product = cartProductContainer(obj);
            cart_list.insertAdjacentHTML("beforeend",product);
            // console.log(obj.qty);
        })
    }else{
        cart_list.innerText=null;
    }
}
function removeFromCart(id){
    cart_list.innerText=null;
    console.log(cart,id);
    cart = cart.filter((obj)=>{
        if(obj.id!==id){
            console.log("inside");
            return obj;
        }
    })
    console.log(cart);
    refreshCart();
    calculateCartValue();
}
function cartQtyIncrement(id){
    // console.log(id);
    cart.forEach((obj)=>{
        if(obj.id===id){
            obj["qty"] = obj.qty+1;   
        }
    })
    console.log(cart);
    cart_list.innerText=null;
    refreshCart();
    calculateCartValue();
}
function cartQtyDecrement(id){
    // console.log(id);
    cart.forEach((obj)=>{
        if(obj.id===id){
            if(obj["qty"]>1){
              obj["qty"] = obj.qty-1;
            }else{
                alert("Quantity must be minimum of one")
            }
        }
    })
    // console.log(cart);
    cart_list.innerText=null;
    refreshCart();
    calculateCartValue();
}


const toggle = document.getElementsByClassName("toggle-button");
const navbar = document.getElementById("nav-class");
// console.log(navbar);
toggle[0].addEventListener("click",()=>{navbar.classList.toggle("hide")});

let loader = document.getElementById("preloader");
setTimeout(()=>{
    loader.style.display="none";
},4000)

const obj={
    userName:"",
    userEmail:"",
    password:"",
} 
function registerHandle(event){
    event.preventDefault();
    if(!confirmUserPassword){
        return alert("confirm password did't match");
    }
    const data = JSON.parse(localStorage.getItem("userData"));
    if(data){
        data.push(obj);
        localStorage.setItem("userData",JSON.stringify(data));
    }else{
        userData = [];
        userData.push(obj);
        localStorage.setItem("userData", JSON.stringify(userData));
    }
    register_popup.close();
}

function onChangeHandler(){
    obj.userName = signupuserName.value;
    obj.userEmail = signupuserEmail.value;
    obj.password = signupuserPassword.value;
}

function confirmPassword(){
    const temp = document.getElementById("confirmpassword").value;
    
    if(obj.password!==temp){
        document.getElementById("confirmpassword").style.border="2px solid red";
    }

    if(obj.password===temp){
        document.getElementById("confirmpassword").style.border="2px solid green";
        confirmUserPassword=true;
    }
}

signUp.onclick=()=>{
    signupuserName.value="";
    signupuserEmail.value="";
    signupuserPassword.value="";
    document.getElementById("confirmpassword").value="";
    document.getElementById("confirmpassword").style.border="1px solid black";
    register_popup.showModal();
}

function checkLogin(event){
    event.preventDefault();
    let Email = document.getElementById("useremail").value;
    let password = document.getElementById("password").value;
    userDataInLocal =JSON.parse(localStorage.getItem("userData"));
    console.log(userDataInLocal);
    if(userDataInLocal===null){
        return(alert("User does not exists, Sign up first"));
    }
    userDataInLocal.forEach((obj)=>{
        if(obj.userEmail===Email){
            if(obj.password===password){
                document.getElementById("profileName").innerText = obj.userName;
                modal.close();
                userLoggedIn = true;
                logout.classList.remove("hide");
            }else{
                alert("Password does not match");
            }
        }else{
            alert("User does't exists");
        }
    })
}