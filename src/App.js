import React, {useState} from 'react';
import axios from 'axios' 
import './App.css';

function App() {

  const [message, setMessage] = useState({
    'phone':'',
    'textmessage':''
  })


  const handleChanges = (event) => {
    event.preventDefault() 

    //TODO - updating object means copying content + [name]:value
    setMessage({
      ...message,
      [event.target.name]:event.target.value
    })
  }


  return (
    <div className="App">
      practicing microservices 

      <form>
        <input 
          type="text"
          name="phone"
          onChange={handleChanges}
          value={message.phone}
          placeholder="Phone number"
        />
        {/* <input 
          type="textarea"
          name="textmessage"
          onChange={handleChanges}
          value={message.textmessage}
          placeholder="Message"
        /> */}
        <textarea
          name="textmessage"
          onChange={handleChanges}
          value={message.textmessage}
          placeholder="Message"
        >
          Hello this is the text area
        </textarea>
      </form>
    </div>
  );
}

export default App;
