
import React, { useEffect, useState, useContext } from 'react';
import subscriptionService from '../services/subscriptionService';
import { SubscriptionContext } from '../context/SubscriptionContext';
import './SubscriptionHistory.css';

const SubscriptionHistory = () => {
  const { subscriptionHistory, setLoading, setError } = useContext(SubscriptionContext);
  const token = localStorage.getItem('token');
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const data = await subscriptionService.getHistory(token);
      setHistory(data.subscriptions || []);
    } catch (error) {
      setError(error.error || 'Failed to load history');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="subscription-history">
      <h3>Subscription History</h3>

      {history.length === 0 ? (
        <p className="no-data">No subscription history</p>
      ) : (
        <div className="history-table">
          <table>
            <thead>
              <tr>
                <th>Plan</th>
                <th>Amount</th>
                <th>Start Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {history.map((sub) => (
                <tr key={sub._id}>
                  <td className="plan-type">
                    {sub.planType.charAt(0).toUpperCase() + sub.planType.slice(1)}
                  </td>
                  <td>₹{sub.planAmount / 100}</td>
                  <td>{new Date(sub.createdAt).toLocaleDateString()}</td>
                  <td>
                    <span className={`status-badge status-${sub.status}`}>
                      {sub.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SubscriptionHistory;
