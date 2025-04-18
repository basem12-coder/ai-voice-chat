const startBtn = document.getElementById('start-btn');
const output = document.getElementById('output-text');

const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'ar-SA';
recognition.interimResults = false;

startBtn.addEventListener('click', () => {
  output.textContent = 'استمع إليك...';
  recognition.start();
});

recognition.onresult = (event) => {
  const transcript = event.results[0][0].transcript;
  output.textContent = `قلت: ${transcript}`;
  respondToVoice(transcript);
};

recognition.onerror = (event) => {
  output.textContent = 'حدث خطأ: ' + event.error;
};

function respondToVoice(text) {
  const synth = window.speechSynthesis;
  let response = '';

  if (text.includes('الطقس')) {
    response = 'الطقس جميل اليوم!';
  } else if (text.includes('الوقت')) {
    const now = new Date();
    response = `الساعة الآن ${now.getHours()} و ${now.getMinutes()} دقيقة.`;
  } else {
    response = 'لم أفهم، هل يمكنك التكرار؟';
  }

  const utter = new SpeechSynthesisUtterance(response);
  utter.lang = 'ar-SA';
  synth.speak(utter);
}
