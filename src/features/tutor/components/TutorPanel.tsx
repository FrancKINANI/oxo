import { useEffect, useRef, useState } from 'react'
import type { FormEvent, KeyboardEvent } from 'react'
import { tutorCopy } from '../../../content/lesson'
import { TUTOR_ABSTENTION_RESPONSE, tutorAnswer } from '../model/tutorAnswer'
import { fr } from '../../../content/locales/fr'

type ChatMessage = {
  role: 'assistant' | 'user'
  text: string
}

const initialMessage: ChatMessage = { role: 'assistant', text: tutorCopy.initialMessage }

type TutorPanelProps = {
  onClose: () => void
  onAbstention: () => void
}

export function TutorPanel({ onClose, onAbstention }: TutorPanelProps) {
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
    const response = tutorAnswer(trimmed)
    if (response === TUTOR_ABSTENTION_RESPONSE) onAbstention()
    setMessages((current) => [
      ...current,
      { role: 'user', text: trimmed },
      { role: 'assistant', text: response },
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
          <strong>{fr.tutor.heading}</strong>
        </div>
        <div className="tutor-heading-actions">
          <button
            className="icon-button small"
            type="button"
            aria-label={fr.tutor.clear}
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
            aria-label={fr.tutor.close}
            onClick={onClose}
          >
            <span aria-hidden="true">✕</span>
          </button>
        </div>
      </div>

      <div className="chat-messages" ref={listRef} role="log" aria-live="polite" aria-label={fr.tutor.conversation}>
        {messages.map((message, index) => (
          <div className={message.role === 'user' ? 'user-message' : 'assistant-message'} key={index}>
            <span className="sr-only">{message.role === 'user' ? fr.tutor.userPrefix : fr.tutor.assistantPrefix}</span>
            {message.text}
          </div>
        ))}
        {messages.length === 1 && tutorCopy.suggestions.map((question) => (
          <button className="suggestion" type="button" key={question} onClick={() => ask(question)}>
            {question}
          </button>
        ))}
      </div>

      <form className="chat-form" onSubmit={submitQuestion}>
        <label className="sr-only" htmlFor="chat-input">{fr.tutor.question}</label>
        <textarea
          id="chat-input"
          ref={inputRef}
          rows={2}
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={handleInputKeyDown}
          placeholder={fr.tutor.placeholder}
          maxLength={500}
        />
        <button type="submit" aria-label={fr.tutor.send} disabled={!canSend}>↑</button>
      </form>

      <p className="privacy-note">
        {tutorCopy.scope} {fr.tutor.privacySuffix}
      </p>
    </div>
  )
}
