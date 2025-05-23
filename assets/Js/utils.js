let loader=document.querySelector('#loader');
let loadback=document.querySelector('#loadback');
let loadtxt=document.querySelector('#loadtxt');

//
let alertbox=document.getElementById("alertbox");
let alert_title=document.getElementById("alert-title");
let alert_body=document.getElementById("alert-body");

//alert dialog
export function dismiss(){
    alertbox.style.visibility="hidden";
    }
    
export function alert(title,body){
      alert_title.innerHTML=title;
      alert_body.innerHTML=body;
      alertbox.style.visibility="visible";
    }
    
//wait function
export function wait(msg,bool){
  if(bool){
    loadtxt.innerHTML=msg;
    loadtxt.style.animation="bounceIn 5s 5s ease-out infinite";
    loader.style.animation="rota 1.25s .2s ease-in-out infinite";
  } else{
    loadtxt.innerHTML="";
    loadtxt.style.animation="none";
    loader.style.animation="none";
  }
  loadback.style.visibility=(bool)?"visible":"hidden";
}

export function hash(data,type){
    let shash="";
    switch(type){
        case "SHA-512":shash=CryptoJS.SHA512(data).toString();
        break;
        case "SHA-256":shash=CryptoJS.SHA256(data).toString();
        break;
    }
    return shash;
}

export function tob64(data,type){
    let fin;
    if(type==="encode")fin = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(data));
	else if(type==="decode")fin = CryptoJS.enc.Base64.parse(data).toString(CryptoJS.enc.Utf8);
	else{fin=null;}
	return fin;  
}

export function encryptData(data, key){
    const qq1= CryptoJS.AES.encrypt(data, key).toString();
    return qq1;
}

export function decryptData(ciphertext, key){
    let bytes = CryptoJS.AES.decrypt(ciphertext, key);
    const qq2= bytes.toString(CryptoJS.enc.Utf8);
    return qq2;
}
export function toPBK(data,salt,iterations=10000,keySize=512){
  const dataWA=CryptoJS.enc.Utf8.parse(data);
  const saltWA=CryptoJS.enc.Utf8.parse(salt);
  const inx=(typeof iterations!=="number"||iterations<10000)?10000:iterations;
  const ksz=(typeof keySize!=="number"||keySize<512)?512:keySize;
  const dkey=CryptoJS.PBKDF2(dataWA,saltWA,{
    keySize:ksz/32, iterations:inx
  });
  const fkey=dkey.toString(CryptoJS.enc.Hex);
  return fkey;
}

export const firebaseErrorMap = {
  "auth/invalid-email": "The email address is not valid.",
  "auth/user-disabled": "This account has been disabled.",
  "auth/user-not-found": "No account found with this email.",
  "auth/wrong-password": "Incorrect password.",
  "auth/email-already-in-use": "This email is already registered.",
  "auth/weak-password": "Password is too weak.",
  "auth/missing-password": "Password cannot be empty.",
  "auth/missing-email": "Email cannot be empty.",
  "auth/too-many-requests": "Too many login attempts. Please try later.",
  "auth/network-request-failed": "Check your internet connection."
};
