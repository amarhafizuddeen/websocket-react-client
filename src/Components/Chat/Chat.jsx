import React, { useState, useEffect } from 'react'
import ChatInput from '../ChatInput/ChatInput'
import ChatMessage from '../ChatMessage/ChatMessage'

const Chat = ({ match }) => {
  const [ws, setWs] = useState()
  const [name, setName] = useState(match.params.id == 1 ? 'Bob' : 'Tom')
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState({})

  const URL = `ws://localhost:3000?id=${match.params.id}&name=${name}&token=supersecrettoken`

  const submitMessage = async messageString => {
    // on submitting the ChatInput form, send the message, add it to the list and reset the input
    const message = { name: name, message: messageString }
    setMessages([message, ...messages])
    ws.send(JSON.stringify(message))
  }

  const chatStart = async () => {
    setWs(new WebSocket(URL))
  }

  const webSocket = () => {
    ws.onopen = () => {
      // on connecting, do nothing but log it to the console
      console.log('connected')
    }

    ws.onmessage = e => {
      // on receiving a message, add it to the list of messages
      const message = JSON.parse(e.data)
      setNewMessage(message)
    }

    ws.onclose = () => {
      console.log('disconnected')
      // automatically try to reconnect on connection loss
      setWs(new WebSocket(URL))
    }
  }

  useEffect(() => {
    chatStart()
  }, [])

  useEffect(() => {
    if (ws) webSocket()
  }, [ws])

  useEffect(() => {
    setMessages([newMessage, ...messages])
  }, [newMessage])

  return (
    <div>
      <label htmlFor="name">
        Name:&nbsp;
        <input type="text" id={'name'} placeholder={'Enter your name...'} value={name} onChange={e => setName(e.target.value)} />
      </label>
      <ChatInput ws={ws} onSubmitMessage={messageString => submitMessage(messageString)} />
      {messages.map((message, index) => (
        <ChatMessage key={index} message={message.message} name={message.name} />
      ))}
    </div>
  )
}

export default Chat
