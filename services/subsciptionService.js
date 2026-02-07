// import axios from 'axios';
// import { BASE_URL } from '../utils/urls';

// const subscriptionService = {
//   // Get all plans
//   getPlans: async () => {
//     try {
//       const response = await axios.get(`${BASE_URL}/subscription/plans`);
//       return response.data;
//     } catch (error) {
//       throw error.response?.data || error;
//     }
//   },

//   // Create subscription
//   createSubscription: async (planType, token) => {
//     try {
//       const response = await axios.post(
//         `${BASE_URL}/subscription`,
//         { planType },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       return response.data;
//     } catch (error) {
//       throw error.response?.data || error;
//     }
//   },

//   // Verify payment
//   verifyPayment: async (paymentData, token) => {
//     try {
//       const response = await axios.post(
//         `${BASE_URL}/subscription/verify`,
//         paymentData,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       return response.data;
//     } catch (error) {
//       throw error.response?.data || error;
//     }
//   },

//   // Get current subscription
//   getCurrentSubscription: async (token) => {
//     try {
//       const response = await axios.get(`${BASE_URL}/subscription/current`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       return response.data;
//     } catch (error) {
//       throw error.response?.data || error;
//     }
//   },

//   // Get subscription history
//   getHistory: async (token) => {
//     try {
//       const response = await axios.get(`${BASE_URL}/subscription/history`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       return response.data;
//     } catch (error) {
//       throw error.response?.data || error;
//     }
//   },

//   // Pause subscription
//   pauseSubscription: async (subscriptionId, token) => {
//     try {
//       const response = await axios.post(
//         `${BASE_URL}/subscription/pause`,
//         { subscriptionId },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       return response.data;
//     } catch (error) {
//       throw error.response?.data || error;
//     }
//   },

//   // Resume subscription
//   resumeSubscription: async (subscriptionId, token) => {
//     try {
//       const response = await axios.post(
//         `${BASE_URL}/subscription/resume`,
//         { subscriptionId },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       return response.data;
//     } catch (error) {
//       throw error.response?.data || error;
//     }
//   },

//   // Cancel subscription
//   cancelSubscription: async (subscriptionId, token) => {
//     try {
//       const response = await axios.post(
//         `${BASE_URL}/subscription/cancel`,
//         { subscriptionId },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       return response.data;
//     } catch (error) {
//       throw error.response?.data || error;
//     }
//   },
// };

// export default subscriptionService;