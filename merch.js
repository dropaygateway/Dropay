import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.0/firebase-app.js";
import { getAuth, onAuthStateChanged,signOut } from "https://www.gstatic.com/firebasejs/11.8.0/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc,serverTimestamp } from "https://www.gstatic.com/firebasejs/11.8.0/firebase-firestore.js";
import {wait,hash, tob64, encryptData, toPBK, firebaseErrorMap,alert,dismiss} from './utils.js';

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

  
  
  let dlays=document.getElementsByClassName('dlay');
  let btn1s=document.getElementsByClassName('btn1');

  const ctx = document.getElementById('transactionChart').getContext('2d');
  let chart;
  let loader=document.querySelector('#loader');
let loadback=document.querySelector('#loadback');
let loadtxt=document.querySelector('#loadtxt');

  const dataSets = {
    daily: [5, 7, 3, 6, 4, 8, 2],
    weekly: [30, 45, 20, 60, 50, 40, 70],
    monthly: [100, 120, 110, 90, 150, 170, 200]
  };



  function showPage(id, el) {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById(id).classList.add('active');

    // Handle active link style
    document.querySelectorAll('.sidebar-link').forEach(link => link.classList.remove('active'));
    el.classList.add('active');
  }

  // Optional: Activate the first sidebar link on page load
  document.addEventListener("DOMContentLoaded", () => {
    wait("Loading your dashboard, please wait...",true);
   const firstLink = document.querySelector('.sidebar-link');
    if (firstLink) firstLink.classList.add('active');
    for(let b=0;b<btn1s.length;b++)btn1s[b].addEventListener('click',() => swid(b));
    swid(0);
    defUser();
  });

  function swid(n){
    for(let i=0;i<dlays.length;i++){
      dlays[i].style.display="none";
      btn1s[i].classList.remove("active");
    }
    dlays[n].style.display="block";
    btn1s[n].classList.add("active");
  }

  function createChart(data) {
    if (chart) chart.destroy();
    chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        datasets: [{
          label: 'Transactions',
          data: data,
          fill: false,
          borderColor: '#00ffd1',
          tension: 0.3
        }]
      },
      options: {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true
    }
  }
}

    });
  }

  function changeTimeframe(val) {
    createChart(dataSets[val]);
  }

  window.onload = () => createChart(dataSets['monthly']);

  function generateQR() {
  const amount = document.getElementById("qr-amount").value;
  const purpose = document.getElementById("qr-purpose").value;

  const payload = `dropay://payment?amount=${amount}&purpose=${encodeURIComponent(purpose)}`;

  const qrContainer = document.getElementById("qr-display");
  qrContainer.innerHTML = ""; // clear previous

  QRCode.toCanvas(document.createElement("canvas"), payload, function (err, canvas) {
    if (err) return console.error(err);
    qrContainer.appendChild(canvas);
  });
}

const transactions = [
  { date: '2025-05-20', amount: 102, token: 'SUI', status: 'Pending' },
  { date: '2025-05-19', amount: 150, token: 'SUI', status: 'Success' },
  { date: '2025-05-15', amount: 2250, token: 'USDT', status: 'Success' },
  { date: '2025-05-15', amount: 129, token: 'SUI', status: 'Success' },
  { date: '2025-05-14', amount: 300, token: 'USDC', status: 'Success' },
  { date: '2025-05-13', amount: 75, token: 'SUI', status: 'Success' },
  { date: '2025-05-11', amount: 300, token: 'USDT', status: 'Failed' }
];

function renderTransactions(data) {
  const tbody = document.getElementById('transaction-body');
  tbody.innerHTML = '';
  data.forEach(tx => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${tx.date}</td>
      <td>${tx.amount}</td>
      <td>${tx.token}</td>
      <td class="status-${tx.status.toLowerCase()}">${tx.status}</td>
      <td><button onclick="openDisputeModal()">Dispute</button></td>
    `;
    tbody.appendChild(tr);
  });
}

function applyFilters() {
  const date = document.getElementById('filter-date').value;
  const amount = document.getElementById('filter-amount').value;
  const token = document.getElementById('filter-token').value;

  let filtered = [...transactions];
  if (date) filtered = filtered.filter(tx => tx.date === date);
  if (amount) filtered = filtered.filter(tx => tx.amount == amount);
  if (token) filtered = filtered.filter(tx => tx.token.toLowerCase() === token.toLowerCase());

  renderTransactions(filtered);
}

function exportToCSV() {
  alert("Exporting to CSV... (To be implemented)");
}

renderTransactions(transactions);


document.getElementById('wallet-balance').innerText = '$325.50';

const payouts = [
  { date: '2025-05-14', amount: 100, status: 'Paid' },
  { date: '2025-05-10', amount: 150, status: 'Pending' },
  { date: '2025-05-05', amount: 75.50, status: 'Failed' }
];

function renderPayouts() {
  const body = document.getElementById('payout-body');
  body.innerHTML = '';
  payouts.forEach(p => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${p.date}</td>
      <td>$${p.amount.toFixed(2)}</td>
      <td class="status-${p.status.toLowerCase()}">${p.status}</td>
    `;
    body.appendChild(tr);
  });
}

function initiateWithdrawal() {
  alert("Withdrawal flow will be built with modal + Firebase later 💸");
}

function editBank() {
  alert("Bank edit modal will come later 👀");
}

renderPayouts();


function copyKey(id) {
    const input = document.getElementById(id);
    input.type = 'text'; // temporarily reveal if hidden
    input.select();
    document.execCommand('copy');
    input.type = id === 'secretKey' ? 'password' : 'text';
    alert('Copied!');
  }

  function toggleKey(id, btn) {
    const input = document.getElementById(id);
    input.type = input.type === 'password' ? 'text' : 'password';
    btn.innerText = input.type === 'password' ? 'Show' : 'Hide';
  }

  const logoInput = document.getElementById('storeLogo');
const logoPreview = document.getElementById('logoPreview');

logoInput.addEventListener('change', () => {
  const file = logoInput.files[0];
  if (!file) {
    logoPreview.textContent = 'No logo selected';
    logoPreview.style.backgroundImage = '';
    return;
  }
  if (!file.type.startsWith('image/')) {
    logoPreview.textContent = 'Invalid file type';
    return;
  }
  
  const reader = new FileReader();
  reader.onload = e => {
    logoPreview.innerHTML = `<img src="${e.target.result}" alt="Logo Preview">`;
  };
  reader.readAsDataURL(file);
});


function runTestCall(){
wait("Sending request, please wait...",true);
setTimeout(()=>{
  wait("",false);
},5500);
}


async function defUser(){
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      const defData={
        email: user.email,
          name: user.displayName || "New Merchant",
          createdAt: serverTimestamp(),
          totalRevenue: 0,
          successfulPayments: 0,
          pendingPayments: 0,
          failedPayments: 0,
          transactionsToday: 0,
          transactionOverview: [
            { day: "Sun", total: 0 },
            { day: "Mon", total: 0 },
            { day: "Tue", total: 0 },
            { day: "Wed", total: 0 },
            { day: "Thu", total: 0 },
            { day: "Fri", total: 0 },
            { day: "Sat", total: 0 },
          ],
          notifications: [],
          qrCodes: [],
          settings: {
            apiKeys: [],
            storeSettings: {},
            payoutInfo: {},
            security: {}
          }
      };

      if (!userSnap.exists()) {
        await setDoc(userRef, defData);
        alert("Welcome to Dropay!","Let's start something shall we?");
      } else {
        alert("User data",JSON.stringify(userSnap.data()));
      }
    } else {
      // Redirect to login if no user
      window.location.href = "/login.html";
    }
    wait("",false);
  });
}
