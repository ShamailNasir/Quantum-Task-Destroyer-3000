'use client';

import { useState } from 'react';
import useTasks from '@/features/tasks/hooks/useTasks';
import styles from './Insights.module.css';

export default function InsightsPage() {
  const { tasks } = useTasks();
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [helpQuery, setHelpQuery] = useState('');
  const [helpResponse, setHelpResponse] = useState(null);
  const [helpLoading, setHelpLoading] = useState(false);

  const fetchDeepFeedback = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('http://localhost:8000/ai/suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tasks, stats: {}, mode: 'deep' })
      });
      if (res.ok) {
        const data = await res.json();
        setFeedback(data.feedback);
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (err) {
      setError("AI processing failed. Please ensure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const askHelp = async (e) => {
    e.preventDefault();
    if (!helpQuery.trim()) return;
    
    setHelpLoading(true);
    try {
      const res = await fetch('http://localhost:8000/ai/help', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: helpQuery, tasks, mode: 'fast' })
      });
      if (res.ok) {
        const data = await res.json();
        setHelpResponse(data.response);
      }
    } catch (err) {
      setHelpResponse("AI Assistant unavailable.");
    } finally {
      setHelpLoading(false);
      setHelpQuery('');
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.heading}>Productivity Insights</h2>
          <p className={styles.subheading}>Deep analytical tracking and on-demand AI assistance</p>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.badge}>🧠 On-Demand Deep Analysis</span>
            <button onClick={fetchDeepFeedback} disabled={loading} className={styles.analyzeBtn}>
              {loading ? 'Analyzing...' : 'Generate New Insights'}
            </button>
          </div>

          <div className={styles.content}>
            {error && <p className={styles.errorText}>{error}</p>}
            
            {!error && feedback && (
              <div className={styles.feedbackContainer}>
                {feedback.split('\\n').map((para, i) => (
                  para ? <p key={i} className={styles.aiText}>{para}</p> : <br key={i}/>
                ))}
              </div>
            )}
            
            {!error && !feedback && !loading && (
              <p className={styles.emptyText}>Click the button above to deeply analyze your current task distribution and productivity health globally.</p>
            )}
          </div>
        </div>

        <div className={styles.chatCard}>
          <div className={styles.cardHeader}>
            <span className={styles.badge}>💬 Quick Help Mode</span>
          </div>
          
          {helpResponse && (
            <div className={styles.responseBox}>
              <p className={styles.aiText}>{helpResponse}</p>
            </div>
          )}

          <form className={styles.chatForm} onSubmit={askHelp}>
            <input 
              type="text" 
              className={styles.chatInput} 
              placeholder="E.g. What should I prioritize right now?"
              value={helpQuery}
              onChange={e => setHelpQuery(e.target.value)}
              disabled={helpLoading}
            />
            <button type="submit" className={styles.chatBtn} disabled={helpLoading || !helpQuery.trim()}>
              {helpLoading ? 'Thinking...' : 'Ask AI'}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
