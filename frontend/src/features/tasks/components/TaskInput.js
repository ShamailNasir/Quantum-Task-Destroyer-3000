'use client';

import { useState } from 'react';
import styles from './TaskInput.module.css';

export default function TaskInput({ onAdd }) {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('daily');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd({ title, type, category, date: date || undefined });
    setTitle('');
    setCategory('');
    setDate('');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <input
          type="text"
          className={styles.input}
          placeholder="What needs to be done?"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <button type="submit" className={styles.button} disabled={!title.trim()}>
          + Add
        </button>
      </div>

      <div className={styles.options}>
        <div className={styles.toggle}>
          <button
            type="button"
            className={`${styles.toggleBtn} ${type === 'daily' ? styles.toggleActive : ''}`}
            onClick={() => setType('daily')}
          >
            🔁 Daily
          </button>
          <button
            type="button"
            className={`${styles.toggleBtn} ${type === 'one-time' ? styles.toggleActive : ''}`}
            onClick={() => setType('one-time')}
          >
            📌 One-time
          </button>
        </div>

        <input
          type="text"
          className={styles.optionInput}
          placeholder="Category (e.g. Study)"
          value={category}
          onChange={e => setCategory(e.target.value)}
        />

        {type === 'one-time' && (
          <input
            type="date"
            className={styles.optionInput}
            value={date}
            onChange={e => setDate(e.target.value)}
          />
        )}
      </div>
    </form>
  );
}
