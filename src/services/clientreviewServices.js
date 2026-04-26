import { BASE_URL } from '@/utils/urls';

const REVIEW_API = `${BASE_URL}/client-reviews`;

export const ClientreviewService = {
  createReview: async (reviewData) => {
    try {
      const response = await fetch(REVIEW_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(reviewData),
      });
      if (!response.ok) throw new Error('Failed to create review');
      return await response.json();
    } catch (error) {
      console.error('Error creating review:', error);
      throw error;
    }
  },

  getAllReviews: async () => {
    try {
      const response = await fetch(REVIEW_API, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw new Error('Failed to fetch reviews');
      return await response.json();
    } catch (error) {
      console.error('Error fetching reviews:', error);
      throw error;
    }
  },

  updateReview: async (id, reviewData) => {
    try {
      const response = await fetch(`${REVIEW_API}/${id}`, {
        method: 'PUT', // or PATCH
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(reviewData),
      });
      if (!response.ok) throw new Error('Failed to update review');
      return await response.json();
    } catch (error) {
      console.error('Error updating review:', error);
      throw error;
    }
  },

  deleteReview: async (id) => {
    try {
      const response = await fetch(`${REVIEW_API}/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!response.ok) throw new Error('Failed to delete review');
      return await response.json();
    } catch (error) {
      console.error('Error deleting review:', error);
      throw error;
    }
  },
};
