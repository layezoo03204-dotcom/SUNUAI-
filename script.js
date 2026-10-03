const input = document.getElementById("prompt");
const userBubble = document.getElementById("demoUser");
const answerBubble = document.getElementById("demoAnswer");

function fillPrompt(text) {
  input.value = text;
  input.focus();
}

async function demoChat(e) {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;

  userBubble.textContent = text;
  userBubble.hidden = false;
  answerBubble.textContent = "SunuAI réfléchit…";
  answerBubble.hidden = false;
  input.value = "";

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({message: text})
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Erreur serveur");
    answerBubble.textContent = data.reply;
  } catch (err) {
    answerBubble.textContent =
      "Le serveur IA n'est pas encore configuré. Ajoutez OPENAI_API_KEY dans le fichier .env puis redémarrez le serveur.";
  }
}