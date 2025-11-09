// Farmer Registration
const farmerForm = document.getElementById('farmerForm');
if (farmerForm) {
  const list = document.getElementById('farmerList');
  const farmers = JSON.parse(localStorage.getItem('farmers') || '[]');
  farmers.forEach(f => addFarmerToList(f));

  farmerForm.addEventListener('submit', e => {
    e.preventDefault();
    const farmer = {
      name: name.value,
      village: village.value,
      crop: crop.value
    };
    farmers.push(farmer);
    localStorage.setItem('farmers', JSON.stringify(farmers));
    addFarmerToList(farmer);
    farmerForm.reset();
  });

  function addFarmerToList(farmer) {
    const li = document.createElement('li');
    li.textContent = `${farmer.name} (${farmer.village}) - ${farmer.crop}`;
    list.appendChild(li);
  }
}

// Market Prices
const priceForm = document.getElementById('priceForm');
if (priceForm) {
  const tableBody = document.querySelector('#priceTable tbody');
  const prices = JSON.parse(localStorage.getItem('prices') || '[]');
  prices.forEach(p => addPriceRow(p));

  priceForm.addEventListener('submit', e => {
    e.preventDefault();
    const data = { crop: cropName.value, price: price.value };
    prices.push(data);
    localStorage.setItem('prices', JSON.stringify(prices));
    addPriceRow(data);
    priceForm.reset();
  });

  function addPriceRow(p) {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${p.crop}</td><td>₹${p.price}</td>`;
    tableBody.appendChild(row);
  }
}

// Issues Reporting
const issueForm = document.getElementById('issueForm');
if (issueForm) {
  const issueList = document.getElementById('issueList');
  const issues = JSON.parse(localStorage.getItem('issues') || '[]');
  issues.forEach(i => addIssue(i));

  issueForm.addEventListener('submit', e => {
    e.preventDefault();
    const issue = {
      title: title.value,
      description: description.value
    };
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));
    addIssue(issue);
    issueForm.reset();
  });

  function addIssue(issue) {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${issue.title}</strong>: ${issue.description}`;
    issueList.appendChild(li);
  }
}

// Crop Advisory
const advisoryForm = document.getElementById('advisoryForm');
if (advisoryForm) {
  advisoryForm.addEventListener('submit', e => {
    e.preventDefault();
    const season = document.getElementById('season').value;
    const soil = document.getElementById('soil').value;
    const result = document.getElementById('adviceResult');
    const crop = getCropAdvice(season, soil);

    result.innerHTML = `
      <h3>🌾 Recommended Crop:</h3>
      <p><strong>${crop.name}</strong></p>
      <p>${crop.tip}</p>
    `;
  });

  function getCropAdvice(season, soil) {
    const data = {
      summer: {
        clay: { name: "Rice", tip: "Water-loving crop suitable for heavy clay soils." },
        sandy: { name: "Groundnut", tip: "Thrives in well-drained sandy soil." },
        loamy: { name: "Cotton", tip: "Prefers warm climate and loamy soil." },
        black: { name: "Soybean", tip: "Best for deep, black soil with good drainage." }
      },
      monsoon: {
        clay: { name: "Sugarcane", tip: "Requires abundant moisture, ideal for clay soil." },
        sandy: { name: "Millets", tip: "Perfect for dry, sandy soil during rains." },
        loamy: { name: "Maize", tip: "Performs well in fertile, loamy soil." },
        black: { name: "Pulses", tip: "Good nitrogen-fixing crop for black soil." }
      },
      winter: {
        clay: { name: "Wheat", tip: "Thrives in cool weather and clay soil." },
        sandy: { name: "Mustard", tip: "Prefers sandy loam with good sunlight." },
        loamy: { name: "Barley", tip: "Excellent for loamy soils in winter." },
        black: { name: "Chickpea", tip: "Strong winter legume for black soil." }
      }
    };
    return data[season][soil] || { name: "N/A", tip: "No data available for this combination." };
  }
}

// Responsive Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    mainNav.classList.toggle('show');
  });
}

// ---------- Farmer Motivation Quotes ----------
const quotes = [
  "A farmer is a magician who produces money from the mud.",
  "To forget how to dig the earth is to forget ourselves.",
  "Farming is not just a job, it's a way of life.",
  "The future of our nation lies in the hands of our farmers.",
  "Wherever the soil is rich, the people flourish."
];

let index = 0;
setInterval(() => {
  const quoteText = document.getElementById('quoteText');
  if (quoteText) {
    index = (index + 1) % quotes.length;
    quoteText.textContent = `"${quotes[index]}"`;
  }
}, 5000);

const tips = [
  "Water crops early morning to reduce evaporation.",
  "Rotate crops yearly to maintain soil fertility.",
  "Use organic compost instead of chemical fertilizers.",
  "Clean irrigation pipes regularly to prevent clogging.",
  "Check weather before spraying pesticides."
];

const randomTip = tips[Math.floor(Math.random() * tips.length)];
const tipText = document.getElementById('tipText');
if (tipText) tipText.textContent = randomTip;

// Fade-in sections on scroll
const fadeSections = document.querySelectorAll('.section-fade');
window.addEventListener('scroll', () => {
  fadeSections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if(rect.top < window.innerHeight - 100){
      section.classList.add('visible');
    }
  });
});

// Animated Counters
function animateCounter(id, target) {
  let count = 0;
  const step = Math.ceil(target / 100);
  const interval = setInterval(() => {
    count += step;
    if(count >= target){
      count = target;
      clearInterval(interval);
    }
    document.getElementById(id).textContent = count;
  }, 20);
}

animateCounter('farmersCount', 1250);
animateCounter('schemesCount', 35);
animateCounter('storiesCount', 280);

const chatWidget = document.getElementById('chatWidget');
const openChatBtn = document.getElementById('openChatBtn');
const closeChat = document.getElementById('closeChat');
const chatBoxWidget = document.getElementById('chatBoxWidget');
const userInputWidget = document.getElementById('userInputWidget');
const sendBtnWidget = document.getElementById('sendBtnWidget');
const suggestionBtnsWidget = chatWidget.querySelectorAll('.suggestion-btn');

// Predefined responses
const responses = [
  { keywords: ["hello","hi"], reply: "Hello! How can I assist you with farming today?" },
  { keywords: ["crop","planting","sowing"], reply: "Different crops have different seasons. Wheat: Nov-Dec in India." },
  { keywords: ["irrigation","water","watering"], reply: "Water crops early morning or late evening to reduce evaporation." },
  { keywords: ["weather","temperature","rain"], reply: "Check the current weather in the Weather section." },
  { keywords: ["scheme","government","subsidy"], reply: "Check the Schemes page for government programs and subsidies." },
  { keywords: ["disease","pest"], reply: "Inspect crops regularly and use proper pest management." },
  { keywords: ["thanks","thank you"], reply: "You’re welcome! Happy farming 🌱" },
  { keywords: ["default"], reply: "Sorry, I didn’t understand. Try asking about crops, irrigation, weather, or schemes." }
];

// Functions
function appendMessageWidget(sender, text){
  const div = document.createElement('div');
  div.className = sender === "user" ? "user-message" : "bot-message";
  div.textContent = text;
  chatBoxWidget.appendChild(div);
  chatBoxWidget.scrollTop = chatBoxWidget.scrollHeight;
}

function getBotReplyWidget(message){
  message = message.toLowerCase();
  for(const resp of responses){
    if(resp.keywords.some(k => message.includes(k))) return resp.reply;
  }
  return responses.find(r => r.keywords.includes("default")).reply;
}

function sendMessageWidget(message){
  if(!message) return;
  appendMessageWidget("user", message);
  setTimeout(()=> appendMessageWidget("bot", getBotReplyWidget(message)), 300);
}

// Event Listeners
openChatBtn.addEventListener('click', () => { chatWidget.style.display = 'flex'; openChatBtn.style.display = 'none'; });
closeChat.addEventListener('click', () => { chatWidget.style.display = 'none'; openChatBtn.style.display = 'block'; });
sendBtnWidget.addEventListener('click', () => { sendMessageWidget(userInputWidget.value.trim()); userInputWidget.value=''; });
userInputWidget.addEventListener('keypress', e => { if(e.key === 'Enter') sendBtnWidget.click(); });

// Quick suggestions
suggestionBtnsWidget.forEach(btn => btn.addEventListener('click', () => sendMessageWidget(btn.textContent)));
