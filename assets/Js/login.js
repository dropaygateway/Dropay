// Import only what you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, sendPasswordResetEmail,sendEmailVerification} from "https://www.gstatic.com/firebasejs/11.8.0/firebase-auth.js";
import {wait,hash, tob64, encryptData, toPBK, firebaseErrorMap,alert,dismiss} from './utils.js';
//DECLARE ELEMENTS

let title3 = document.getElementById("title3");
let dbl=document.getElementById("dbl");
let jb=0;
let jb2=0;
// Login form elements
let login_form = document.getElementById("login");
let login_email = document.getElementById("login_email");
let login_password = document.getElementById("login_password");
let lvis = document.getElementById("lvis");
let forgot = document.getElementById("forgot");
let login_btn = document.getElementById("login_btn");
let signin_option = document.getElementById("signin_option");
// Sign-in form elements
let signin_form = document.getElementById("signin");
let signin_email = document.getElementById("signin_email");
let signin_password = document.getElementById("signin_password");
let svis = document.getElementById("svis");
let phone = document.getElementById("phone");
let signin_btn = document.getElementById("signin_btn");
let login_option = document.getElementById("login_option");

//verification
let verifyform=document.getElementById("verify");
let vUser=document.getElementById("vUser");
let rUser=document.getElementById("rUser");

//reset password
let fg_form=document.getElementById("fgp");
let fg_email=document.getElementById("fg_email");
let fg_msg=document.getElementById("fg_msg");
let fg_reset=document.getElementById("fg_reset");
let hig=document.getElementById("hig");
let fg_send=document.getElementById("fg_send");
let fg_l=document.getElementById("fg-l");

//
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

let glory=document.querySelector('#glory');
let crd=document.querySelector('#crd');
let bxd=document.querySelector('#bxd');
let logcard=document.querySelector('#logcarda');
let cancelBtn=document.querySelector('#cancel');
let ind;

function swap(mode) { ind="home";
    if (mode === "login") {
      verifyform.style.display="none";
        fg_form.style.display = "none";
        signin_form.style.display = "none";
        login_form.style.display = "block";
        title3.innerHTML = `Welcome back!`;
        login_email.value = "";
        login_password.value = "";
    } else if(mode==="signin"){
      verifyform.style.display="none";
        fg_form.style.display="none";
        login_form.style.display = "none";
        signin_form.style.display = "block";
        title3.innerHTML = `Create an account with us`;
        devalue();
    }	
    else if(mode==="reset"){ ind="reset";
	dbl.innerHTML="arrow_back";
	title3.innerHTML = `Forgot password?`;
      login_form.style.display = "none";
      signin_form.style.display = "none";
      fg_form.style.display = "block";
      hig.style.display="none";
      verifyform.style.display="none";
      devalue();
    }
    else{
      ind="verify";
	dbl.innerHTML="arrow_back";
	title3.innerHTML = `Account verification`;
      login_form.style.display = "none";
      signin_form.style.display = "none";
      fg_form.style.display = "none";
      hig.style.display="none";
      verifyform.style.display="block";
    }
}
let relog=()=>swap("signin");
function loadD(){
  setTimeout(()=>{
        crd.classList.add("viz");
        setTimeout(()=>{
            glory.style.display="none";
            logcard.style.display="flex";
            OnBegin();
        },2000);
    },5000);
}
document.addEventListener("DOMContentLoaded",loadD);
function OnBegin(){wait("Loading, please wait...",true);
    relog();
    dbl.innerHTML="exit_to_app";
    lvis.addEventListener('click',(event)=>hidepas(event,"l"));
    svis.addEventListener('click',(event)=>hidepas(event,"s"));
    login_option.addEventListener('click', () => swap("login"));
    signin_option.addEventListener('click', () => swap("signin"));
    dbl.addEventListener('click',onback);
	forgot.addEventListener('click', () => swap("reset"));
  login_btn.addEventListener('click',(ev)=>login_account(ev));
  signin_btn.addEventListener('click',(ev)=>create_account(ev));
  cancelBtn.onclick=dismiss;
  rUser.onclick=verifyUser;
  vUser.onclick=tryAgain;
  fg_l.onclick=relog;
  wait("",false);
}


function hidepas(ev,type){ let jby=(type==="l")? ++jb: ++jb2;
  ev.target.innerHTML=(jby%2==1)?"visibility_off":"visibility";
  if(type==="l"){
    login_password.type=(jby%2==1)?"text":"password";
  }else{
    signin_password.type=(jby%2==1)?"text":"password";
  }
}

    function onback(){
        switch(ind){
          case "home":
            alert("You're leaving Dropay","Exiting in 4 seconds...");
            setTimeout(()=>{history.go(-1);},4000);
            break;
            case "reset":swap("login");
            dbl.innerHTML="exit_to_app";
            break;
            case "verify":swap(tind);
              break;
        }
      }
      function devalue(){
        signin_email.value = "";
        signin_password.value = "";
        fg_email.value="";
        }

//FIREBASE IS NEXT

  const firebaseConfig = {
    apiKey: "AIzaSyAFr_kCHkw8FxET55XuY8ajbxzCkyfcq-8",
    authDomain: "dropay-ng.firebaseapp.com",
    projectId: "dropay-ng",
    storageBucket: "dropay-ng.firebasestorage.app",
    messagingSenderId: "165147590683",
    appId: "1:165147590683:web:169d7e2a4b063e74dfb8be"
  };
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);


  //create account for users (merchants)
 function create_account(ev){
  ev.preventDefault();
  wait("Creating your account, sit back and relax...",true);

  //check user inputs
   const email=login_email.value.trim();
  const pass=login_password.value.trim();
if (!email || !emailRegex.test(email) || !pass || pass.trim().length < 6) {
  let issues = [];
  if (!email || !emailRegex.test(email)) {
    issues.push("<li>Enter a valid email address (e.g. example@gmail.com)</li>");
  }
  if (!pass || pass.trim().length < 6) {
    issues.push("<li>Your password must be at least 6 characters long</li>");
  }
  alert("Oops! Check your inputs:",`<ul>${issues.join("")}</ul>`);
  wait("",false);
  return;
}
  
createUserWithEmailAndPassword(auth, email, pass)
    .then(
      (userCredential) => {
      const user = userCredential.user;
      wait("Account created successfully",true);
      setTimeout(()=>{
        verifyEmail(user);
      },1500);
    },
    (error)=>{
      alert("Sorry, an error occured!",getErrorMsg(error.code));
    })
    .finally(() => {
      wait("",false);
    });
}


 function login_account(ev){
  ev.preventDefault();
  wait("Just chill, we're logging you in...",true);

  //check user inputs
   const email=login_email.value.trim();
  const pass=login_password.value.trim();
if (!email || !emailRegex.test(email) || !pass || pass.trim().length < 6) {
  let issues = [];
  if (!email || !emailRegex.test(email)) {
    issues.push("<li>Enter a valid email address (e.g. example@gmail.com)</li>");
  }
  if (!pass || pass.trim().length < 6) {
    issues.push("<li>Your password must be at least 6 characters long</li>");
  }
  alert("Oops! Check your inputs:",`<ul>${issues.join("")}</ul>`);
  wait("",false);
  return;
}

  
signInWithEmailAndPassword(auth, email, pass)
    .then(
      (userCredential) => {
      const user = userCredential.user;
      if (!user.emailVerified) {
    signOut(auth);
    verifyEmail(user);
    return;
  }
      wait("Login successful, welcome",true);
      window.location.href="merchant.html";
    },
    (error)=>{
      alert("Sorry, an error occured!",getErrorMsg(error.code));
    })
    .finally(() => {
      wait("",false);
    });
}

function getErrorMsg(code) {
  return firebaseErrorMap[code] || "An unexpected error occurred.";
}

function verifyEmail(user){
  wait("",false);
  sendEmailVerification(user)
  .then(() => {
    swap("verify"); // show the verification screen
    alert("Verification sent!", "We've sent a verification link to your email.");
  })
  .catch((error) => {
    alert("Oops, Couldn't send verification email. Please try again.",getErrorMsg(error.code));
  });
}

function verifyUser(){
  const user = auth.currentUser;
  if (user && user.emailVerified) {
    window.location.href="merchant.html";
  }
  else{
    alert("Sorry","We could not verify you, please try again");
  }
}

function tryAgain(){
const user = auth.currentUser;
  if (user && !user.emailVerified) {
    verifyEmail(user);
  }
  else{
    alert("Sorry","It seems you are already verified or logged in");
  }
}

function forgot_Password(){
  wait("Checking your email",true);
    //check user inputs
   const email=fg_email.value.trim();
   const user = auth.currentUser;
if (!email || !emailRegex.test(email)||!user) {
  let issues = [];
  if (!email || !emailRegex.test(email)) {
    issues.push("<li>Enter a valid email address (e.g. example@gmail.com)</li>");
  }
  if(!user)issues.push("<li>You may have to refresh this page</li>");
  alert("Oops! Check your inputs:",`<ul>${issues.join("")}</ul>`);
  wait("",false);
  return;
}

sendPasswordResetEmail(user)
.then(()=>{
  alert("Password reset","A link to reset your password has been sent");
  hig.style.display="block";
  fg_reset.onclick=()=>{
    hig.style.display="none";
    forgot_Password();
  }
},
(error)=>{
  alert("Sorry, an error occured!",getErrorMsg(error.code));
}).finally(()=>{
  wait("",false);
})

}