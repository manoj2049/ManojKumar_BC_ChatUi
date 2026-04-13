// ============================================
//  ChatUI — chat.js
//  All interaction logic using jQuery
// ============================================

$(function () {

  // ----- Mock AI responses -----
  const aiResponses = [
    "That's a great question! Let me think through it carefully. The short answer is: it depends on context, but generally speaking, there are a few key things to keep in mind.",
    "Sure! Here's a simple breakdown: start with the fundamentals, build small projects, then gradually increase complexity. Consistency beats intensity every time.",
    "Interesting topic! There are multiple perspectives here. From a practical standpoint, the most effective approach tends to be iterative — try, learn, adjust, repeat.",
    "Great point. In essence, the idea connects to a broader principle: clarity of purpose drives better outcomes. When you know *why* you're doing something, the *how* becomes easier.",
    "I'd be happy to help with that! The key insight is that breaking complex problems into smaller, manageable steps makes them much less overwhelming.",
    "Absolutely! One useful mental model here is to think about first principles — strip away assumptions and ask: what do we actually know for certain?",
    "Good question. The research suggests that spaced repetition and active recall are far more effective for learning than passive re-reading. Try it!",
    "Of course! Here's a quick summary: the most important thing is to get started, even imperfectly. Progress over perfection is the real goal.",
  ];

  // ----- Helpers -----

  // Returns current time as HH:MM AM/PM
  function getTime() {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  // Scroll messages area to bottom
  function scrollToBottom() {
    const $mc = $('#messagesContainer');
    $mc.scrollTop($mc[0].scrollHeight);
  }

  // Add a message bubble to the chat
  // sender: 'user' | 'ai'
  function addMessage(text, sender) {
    const isUser   = sender === 'user';
    const name     = isUser ? 'You' : 'ChatUI';
    const msgClass = isUser ? 'user-msg' : 'ai-msg';
    const avatarClass = isUser ? 'user-avatar' : 'ai-avatar';
    const avatarContent = isUser
      ? 'S'
      : '<i class="fa-solid fa-robot"></i>';

    const $msg = $(`
      <div class="message ${msgClass}">
        <div class="msg-avatar ${avatarClass}">${avatarContent}</div>
        <div class="msg-body">
          <div class="msg-header">
            <span class="msg-name">${name}</span>
            <span class="msg-time">${getTime()}</span>
          </div>
          <div class="msg-bubble">${$('<div>').text(text).html()}</div>
        </div>
      </div>
    `);

    $('#messagesContainer').append($msg);
    scrollToBottom();
  }

  // Pick a random AI reply
  function getAIResponse() {
    return aiResponses[Math.floor(Math.random() * aiResponses.length)];
  }

  // ----- Send message flow -----
  function sendMessage() {
    const text = $('#userInput').val().trim();
    if (!text) return;

    // Hide welcome screen and show messages area (first message)
    if ($('#welcomeScreen').is(':visible')) {
      $('#welcomeScreen').fadeOut(200, function () {
        $('#messagesContainer').css('display', 'flex').hide().fadeIn(200);
      });
    }

    // Add user message
    addMessage(text, 'user');

    // Clear & reset textarea
    $('#userInput').val('').css('height', 'auto');
    $('#sendBtn').prop('disabled', true);

    // Show typing indicator after a tiny delay
    const delay = 1000 + Math.random() * 1000; // 1–2 s
    setTimeout(() => {
      $('#typingIndicator').fadeIn(150);
      scrollToBottom();
    }, 200);

    // Hide typing indicator and show AI response
    setTimeout(() => {
      $('#typingIndicator').fadeOut(150, function () {
        addMessage(getAIResponse(), 'ai');
      });
    }, delay);
  }

  // ----- Event: send button -----
  $('#sendBtn').on('click', sendMessage);

  // ----- Event: Enter key (Shift+Enter = new line) -----
  $('#userInput').on('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  // ----- Event: enable/disable send + auto-resize textarea -----
  $('#userInput').on('input', function () {
    // Toggle send button
    const hasText = $(this).val().trim().length > 0;
    $('#sendBtn').prop('disabled', !hasText);

    // Auto-resize
    this.style.height = 'auto';
    this.style.height = this.scrollHeight + 'px';
  });

  // ----- Event: suggestion cards -----
  $('.suggestion-card').on('click', function () {
    const text = $(this).data('text');
    $('#userInput').val(text).trigger('input').focus();
    sendMessage();
  });

  // ----- Sidebar: mobile toggle -----
  $('#hamburger').on('click', function () {
    $('#sidebar').addClass('open');
    $('#overlay').addClass('open');
  });

  $('#overlay').on('click', function () {
    $('#sidebar').removeClass('open');
    $('#overlay').removeClass('open');
  });

  // ----- New Chat button: reset UI -----
  $('.new-chat-btn').on('click', function () {
    $('#messagesContainer').empty().hide();
    $('#typingIndicator').hide();
    $('#welcomeScreen').fadeIn(200);
    $('#userInput').val('').css('height', 'auto');
    $('#sendBtn').prop('disabled', true);

    // Close sidebar on mobile after click
    $('#sidebar').removeClass('open');
    $('#overlay').removeClass('open');
  });

});
