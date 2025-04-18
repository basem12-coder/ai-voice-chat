let mediaRecorder;
let audioChunks = [];

document.getElementById('recordBtn').onclick = async () => {
  if (!mediaRecorder || mediaRecorder.state === 'inactive') {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.ondataavailable = e => audioChunks.push(e.data);
    mediaRecorder.onstop = async () => {
      const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
      const formData = new FormData();
      formData.append('audio', audioBlob, 'user_audio.webm');

      const res = await fetch('vt714ww94mhkdao4tjrgak4t4278k8cd@hook.eu2.make.com', {
        method: 'POST',
        body: formData
      });

      const data = await res.json();
      document.getElementById('responseAudio').src = data.audio_url;
    };

    audioChunks = [];
    mediaRecorder.start();
    setTimeout(() => mediaRecorder.stop(), 5000);
  }
};
