
// import React, { createContext, useState, useCallback } from 'react';

// export const SubscriptionContext = createContext();

// export const SubscriptionProvider = ({ children }) => {
//   const [currentSubscription, setCurrentSubscription] = useState(null);
//   const [subscriptionHistory, setSubscriptionHistory] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const updateCurrentSubscription = useCallback((subscription) => {
//     setCurrentSubscription(subscription);
//   }, []);

//   const updateHistory = useCallback((history) => {
//     setSubscriptionHistory(history);
//   }, []);

//   const clearError = useCallback(() => {
//     setError(null);
//   }, []);

//   const value = {
//     currentSubscription,
//     subscriptionHistory,
//     loading,
//     error,
//     setLoading,
//     setError,
//     updateCurrentSubscription,
//     updateHistory,
//     clearError,
//   };

//   return (
//     <SubscriptionContext.Provider value={value}>
//       {children}
//     </SubscriptionContext.Provider>
//   );
// };
