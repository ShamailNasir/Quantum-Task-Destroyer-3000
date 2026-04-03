import { useState, useEffect } from 'react';
import styles from './AI.module.css';

export default function QuoteCard() {
  const [quote, setQuote] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const cached = localStorage.getItem('daily_quote');
    const cachedDate = localStorage.getItem('quote_date'); 
    const today = new Date().toDateString();

    if (cached && cachedDate === today) {
      setQuote(cached);
      return;
    }

    const fetchQuote = async () => {
      setLoading(true);
      try {
        const res = await fetch('http://localhost:8000/ai/quote', { method: 'POST' });
        if (res.ok) {
          const data = await res.json();
          // Filter out aggressive newlines and explicit author attributions cleanly
          let cleanQuote = data.quote.replace(/\\s+/g, ' ').trim();
          cleanQuote = cleanQuote.replace(/[-~—](.*)$/, '').trim(); // Remove author
          cleanQuote = cleanQuote.replace(/^["']|["']$/g, '').trim(); // Remove surrounding quotes
          setQuote(cleanQuote);
          localStorage.setItem('daily_quote', cleanQuote);
          localStorage.setItem('quote_date', today);
        }
      } catch (err) {
        console.error('Quote API failed', err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuote();
  }, []);

  if (!quote && !loading) return null;

  return (
    <div className={styles.quoteCard}>
      {loading ? (
        <span className={styles.loader}></span>
      ) : (
        <p className={styles.quoteText}>{quote}</p>
      )}
    </div>
  );
}
