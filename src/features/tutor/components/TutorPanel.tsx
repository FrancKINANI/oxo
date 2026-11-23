import { useEffect, useRef, useState } from 'react'
import type { FormEvent, KeyboardEvent } from 'react'
import { tutorAnswer } from '../model/tutorAnswer'

type ChatMessage = {
  role: 'assistant' | 'user'
  text: string
}

const initialMessage: ChatMessage = {
  role: 'assistant',
  text: 'Bonjour. Posez une question sur les prix, l’inflation ou la simulation.',
}

const suggestions = [
  'Quelle est la différence entre mon panier et l’IPC ?',
  'Que signifie une hypothèse ?',
]

type TutorPanelProps = {
  onClose: () => void
}

export function TutorPanel({ onClose }: TutorPanelProps) {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([initialMessage])
  const listRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const canSend = input.trim().length > 0

  // Garde la dernière réponse visible sans faire défiler la page.
  useEffect(() => {
    const list = listRef.current
    if (list) list.scrollTop = list.scrollHeight
  }, [messages])

  function ask(question: string) {
    const trimmed = question.trim()
    if (!trimmed) return
    setMessages((current) => [
      ...current,
      { role: 'user', text: trimmed },
      { role: 'assistant', text: tutorAnswer(trimmed) },
    ])
  }

  function submitQuestion(event: FormEvent) {
    event.preventDefault()
    ask(input)
    setInput('')
    inputRef.current?.focus()
  }

  function handleInputKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      ask(input)
      setInput('')
    }
  }

  return (
    <div className="tutor-panel">
      <div className="tutor-heading">
        <div>
          <span className="online-dot" aria-hidden="true" />
          <strong>Demander au tuteur</strong>
        </div>
        <div className="tutor-heading-actions">
          <button
            className="icon-button small"
            type="button"
            aria-label="Effacer la conversation"
            onClick={() => {
              setMessages([initialMessage])
              inputRef.current?.focus()
            }}
          >
            <span aria-hidden="true">↻</span>
          </button>
          <button
            className="icon-button small"
            type="button"
            aria-label="Fermer le tuteur"
            onClick={onClose}
          >
            <span aria-hidden="true">✕</span>
          </button>
        </div>
      </div>

      <div className="chat-messages" ref={listRef} role="log" aria-live="polite" aria-label="Conversation">
        {messages.map((message, index) => (
          <div className={message.role === 'user' ? 'user-message' : 'assistant-message'} key={index}>
            <span className="sr-only">{message.role === 'user' ? 'Vous : ' : 'Tuteur : '}</span>
            {message.text}
          </div>
        ))}
        {messages.length === 1 && suggestions.map((question) => (
          <button className="suggestion" type="button" key={question} onClick={() => ask(question)}>
            {question}
          </button>
        ))}
      </div>

      <form className="chat-form" onSubmit={submitQuestion}>
        <label className="sr-only" htmlFor="chat-input">Votre question</label>
        <textarea
          id="chat-input"
          ref={inputRef}
          rows={2}
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={handleInputKeyDown}
          placeholder="Votre question…"
          maxLength={500}
        />
        <button type="submit" aria-label="Envoyer" disabled={!canSend}>↑</button>
      </form>

      <p className="privacy-note">
        Entrée pour envoyer · Maj+Entrée pour un retour à la ligne. Les questions
        ne sont pas conservées après cette session.
      </p>
    </div>
  )
}
