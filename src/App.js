import React, {useState} from 'react';
import axios from 'axios' 
import './App.css';

function App() {

  const [message, setMessage] = useState({
    'phone':'',
    'textmessage':''
  })
  const [messageID, setMessageID] = useState([])
  const [messageReturn, setMessageReturn] = useState([])


  const handleChanges = (event) => {
    event.preventDefault() 
    //TODO - updating object means copying content + [name]:value
    setMessage({
      ...message,
      [event.target.name]:event.target.value
    })
  }

  const formSubmit = event => {
    event.preventDefault()
  }

  const handleSubmit = event => {
    event.preventDefault()
    axios.get(`http://localhost:4000/?recipient=${message.phone}&textmessage=${message.textmessage}`).then((message) => {
      // console.log(message) //message.data === message.sid
      console.log(message.data)

      //TODO - remember to spread original array and add message.data after
      setMessageID([...messageID, message.data])
    })
    .catch((error) => {
      console.log(error)
    })
  }

  const getMessage = (event) => {
    event.preventDefault()
    axios.get(`http://localhost:4000/get-message/${messageID}`)
    .then((message) => {
      console.log(message.data)
      setMessageReturn([...messageReturn, message.data])
    })
  }

  return (
    <div className="App">
      practicing microservices 

      <form onSubmit={formSubmit}>
        <input 
          type="text"
          name="phone"
          onChange={handleChanges}
          value={message.phone}
          placeholder="Phone number"
        />
        <textarea
          name="textmessage"
          onChange={handleChanges}
          value={message.textmessage}
          placeholder="Message"
        >
          Hello this is the text area
        </textarea>

        <button onClick={handleSubmit}>Submit</button>
      </form>


      <div>
        {messageID.length === 0 ? "Please send a message" : messageID.map((item) => 
        (<div>
          <p key={item.id}>{item}</p>
        </div>
        ))}
      </div>

              <button onClick={getMessage}>Getting message</button>


      <div>
        { messageReturn.length === 0 ? "Please retrieve a message" : messageReturn.map((item) => (<p>{item}</p>))
        }
      </div>
    </div>
  );
}

export default App;
