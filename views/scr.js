(function() {
    const sendBtn = document.querySelector('#send');
    const messages = document.querySelector('#messages');
    const messageBox = document.querySelector('#messageBox');

    let ws;

    function showMessage(message) {
        if (message instanceof Blob) {
            message.text().then((text) => {
                messages.textContent += `\n\n${text}`;
                messages.scrollTop = messages.scrollHeight;
                messageBox.value = '';
        });
        } else {
            messages.textContent += `\n\n${message}`;
            messages.scrollTop = messages.scrollHeight;
            messageBox.value = '';
        }
    }

    function init() {
        if (ws) {
            ws.onerror = ws.onopen = ws.onclose = null;
            ws.close();
        }

        ws = new WebSocket('ws://localhost:6969');
        ws.onopen = () => {}
    
        ws.onmessage = ({ data }) => showMessage(data);
        ws.onclose = function() {
            ws = null;
        }
    }

    sendBtn.onclick = function() {
        if (!ws) {
            showMessage("Абонент, не абонент!");
            return;
        }

        ws.send(messageBox.value);
        showMessage(messageBox.value);
    }

    init();
})();