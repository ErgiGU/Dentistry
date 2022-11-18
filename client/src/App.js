import './App.css';

function App() {

    function sendMessage(type, url, topic, message) {
        fetch(url, {
            method: type,
            body: JSON.stringify({
                topic: topic,
                message: message
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then((response) => {
            console.log('Sent request')
            console.log(response.json())
        })
        return ""
    }

    return (
    <div className="App">
      <div>
        <div className="btn btn-primary" onClick={() => sendMessage('POST', 'http://localhost:3001/api/v1/auth', 'auth', 'true')}>Click me</div>
        <div id={"response"}></div>
      </div>
    </div>
  );
}

export default App;
