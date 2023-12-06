const username = recupererCookie("UserChat");
function sendMessage() {
  const messageInput = document.getElementById("message-input");

  const message = messageInput.value;

  if (message.trim() !== "" && username.trim() !== "") {
    db.collection("messages").add({
      text: message,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    //usernameInput.value = "";
    messageInput.value = "";
  }
}

const chatBox = document.getElementById("chat-box");
const messagesRef = db.collection("messages");

messagesRef.orderBy("timestamp").onSnapshot((snapshot) => {
  chatBox.innerHTML = "";

  snapshot.forEach((doc) => {
    const message = doc.data();
    const messageElement = document.createElement("div");
    if (message.username == recupererCookie("UserChat")) {
      messageElement.classList.add("divMessageYou");
    } else {
      messageElement.classList.add("divMessage");
    }

    const elementsData = [`de : ${message.username}`, message.text];
    const messageClass = ["message1", "message2"];
    const div = document.createElement("p");

    for (let i = 0; i < elementsData.length; i++) {
      const paragraph = document.createElement("p");
      paragraph.textContent = elementsData[i];
      paragraph.classList.add("message");

      div.appendChild(paragraph);
      messageElement.appendChild(div);
    }

    // Ajoutez boîte du message à boîte principale chat
    chatBox.appendChild(messageElement);
  });
});

// Fonction pour formater la date et l'heure
function formatDate(timestamp) {
  if (timestamp && timestamp.seconds) {
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleString();
  } else {
    return "Date non disponible";
  }
}
