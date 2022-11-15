import './App.css';

function App() {
    function sendMessage() {
        fetch('http://localhost:3000/api/v1/thing', {
            method: 'POST',
            body: JSON.stringify({
                topic: "test",
                message: "POST test mqtt"
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => {
                console.log('Sent request')
                console.log(response.json())
            })
    }

    return (
    <div className="App">
      <div>
        <button onClick={sendMessage}>Click me</button>
        <div id={"response"}></div>
      </div>
    </div>
  );
}

export default App;
