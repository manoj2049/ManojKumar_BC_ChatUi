$(function () {

  const aiResponses = [
    "That's interesting! Let me simplify it.",
    "Here’s a quick explanation for you.",
    "Let’s break it step by step.",
    "Good question! Here's the idea.",
    "Nice thinking! Here's the answer."
  ];

  function addMessage(text, sender) {
    const msgClass = sender === 'user' ? 'user-msg' : 'ai-msg';
    const msg = `<div class="message ${msgClass}">${text}</div>`;
    $('#messagesContainer').append(msg);
  }

  function sendMessage() {
    const text = $('#userInput').val().trim();
    if (!text) return;

    addMessage(text, 'user');
    $('#userInput').val('');

    setTimeout(() => {
      const reply = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      addMessage(reply, 'ai');
    }, 1000);
  }

  $('#sendBtn').click(sendMessage);

  $('#userInput').keypress(function(e) {
    if (e.which === 13) {
      sendMessage();
      return false;
    }
  });

  $('.suggestion-card').click(function () {
    const text = $(this).data('text');
    $('#userInput').val(text);
    sendMessage();
  });

});