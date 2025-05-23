import {wait,alert,dismiss} from './utils.js';
let wallet_address=document.getElementById("walladd");
let copybtn=document.getElementById("copy");
let qrcode=document.getElementById("qrcode");
let cpay=document.querySelector("#confirmpay");
let results=document.querySelector("#result");
let rs=document.querySelector("#rs");
let rstitle=document.querySelector("#rstitle");
let rsmsg=document.querySelector("#rsmsg");
let dbl=document.querySelector("#dbl");

const wallet="0xhjij9932u92300d0djdknsdhreh8rrhr88448y83283h9fjcnmcnxc292h4949h429h94h9424";
let oks={};



export function OnGen(){
    wait("Generating a wallet address",true);
    wallet_address.innerHTML=wallet;
    setTimeout(()=>{
        copybtn.classList.remove("btn-secondary");
        copybtn.classList.add("payable");},3500);
        const parentStyle = window.getComputedStyle(qrcode.parentElement);
        oks = {
            width: parseFloat(parentStyle.width),
            height: parseFloat(parentStyle.height)
        };
        genqr();
}

function copyW(){
    navigator.clipboard.writeText(wallet);
    alert("Wallet address copied!","You can paste it in your exchange or wallet app then pay");
}

function genqr(){
    var scn = new QRCode(qrcode, {
        text: wallet_address.innerHTML,
        width: oks.width*0.89,
        height: oks.height*0.89,
        colorDark : "#17303e",
        colorLight : "#fffdff",
        correctLevel : QRCode.CorrectLevel.H
    });
    copybtn.addEventListener("click",copyW);
    setTimeout(()=>{
        wait("",false);
        cpay.addEventListener("click",()=>confirmPay(true));
        dbl.addEventListener("click",()=>resultsS(false,"","",""));
    },3500);
    wait("",false);
}

function confirmPay(bool){
    let tiy=(bool)?"Success":"Error";
    let miy=(bool)?"Your payment has been confirmed":"Payment failed";
    let tyiy=(bool)?"success":"error";
 resultsS(true,tiy,miy,tyiy);
}

function resultsS(isShow,title,msg,type){
    if(isShow){
        rstitle.innerHTML=title;
        rsmsg.innerHTML=msg;
        let rsicon,goody;
        if(type==="success"){
            rs.classList.remove("error");
            rs.classList.add("good");
            rsicon="verified_user";
            goody="goody";
        }else{
            rs.classList.remove("good");
            rs.classList.add("error");
            rsicon="cancel";
            goody="goody2";
        }
        rs.innerHTML=`<div class="rs icon">${rsicon}</div>`;
        results.style.visibility="visible";
        rs.style.animation=`${goody} 2.5s .35s ease-in-out`;
    }else{
        results.style.visibility="hidden";
    }
}