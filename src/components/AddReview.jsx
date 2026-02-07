import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ClientreviewService } from '../../services/clientreviewServices';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, MessageSquare, User, Plus, X, Quote, Trash2, Edit2 } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import Toast from './Toast';

const AddReview = () => {
  const [formData, setFormData] = useState({
    rating: 5,
    title: '',
    comment: '',
  });
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [toast, setToast] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [userReview, setUserReview] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      const userStr = localStorage.getItem('user');
      setIsLoggedIn(!!token);
      if (userStr) {
        setCurrentUser(JSON.parse(userStr));
      } else {
        setCurrentUser(null);
      }
    };

    checkAuth();
    fetchReviews();

    window.addEventListener('authChange', checkAuth);
    return () => window.removeEventListener('authChange', checkAuth);
  }, []);

  useEffect(() => {
    if (currentUser && reviews.length > 0) {
      const currentUserId = currentUser._id || currentUser.id;
      const existingReview = reviews.find(r => {
        const reviewUserId = r.userId?._id || r.userId?.id || r.userId;
        return String(reviewUserId) === String(currentUserId);
      });
      setUserReview(existingReview || null);
    } else {
      setUserReview(null);
    }
  }, [currentUser, reviews]);

  const fetchReviews = async () => {
    try {
      const response = await ClientreviewService.getAllReviews();
      if (response.success) {
        setReviews(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
    } finally {
      setFetching(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'rating' ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      // Hardcode title as it's required by backend but removed from UI
      const submissionData = { ...formData, title: 'Client Review' };

      let response;
      if (isEditing && userReview) {
        response = await ClientreviewService.updateReview(userReview._id, submissionData);
      } else {
        response = await ClientreviewService.createReview(submissionData);
      }

      if (response.success) {
        setToast({ type: 'success', message: response.message });
        setFormData({
          rating: 5,
          title: '',
          comment: '',
        });
        setIsEditing(false);
        fetchReviews(); // Refresh list
        setTimeout(() => {
          setShowForm(false);
        }, 1500);
      } else {
        setToast({ type: 'error', message: response.message });
      }
    } catch (error) {
      setToast({
        type: 'error',
        message: error.message || 'Failed to submit review',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    if (userReview) {
      setFormData({
        rating: userReview.rating,
        title: userReview.title || '',
        comment: userReview.comment,
      });
      setIsEditing(true);
      setShowForm(true);
    }
  };

  const confirmDeleteAction = async () => {
    const reviewId = confirmDelete;
    if (!reviewId) return;

    try {
      setLoading(true);
      const response = await ClientreviewService.deleteReview(reviewId);
      if (response.success) {
        setToast({ type: 'success', message: 'Review deleted successfully' });
        if (reviewId === userReview?._id) {
          setUserReview(null);
          setShowForm(false);
        }
        fetchReviews();
      } else {
        setToast({ type: 'error', message: response.message });
      }
    } catch (error) {
      setToast({ type: 'error', message: error.message || 'Failed to delete review' });
    } finally {
      setLoading(false);
      setConfirmDelete(null);
    }
  };

  const handleDelete = async (id) => {
    const reviewId = typeof id === 'string' ? id : userReview?._id;
    if (!reviewId) return;

    setConfirmDelete(reviewId);
  };

  return (
    <>
      <Navbar />
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}

      {/* Confirmation Dialog */}
      <AnimatePresence>
        {confirmDelete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center"
            onClick={() => setConfirmDelete(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-8 max-w-sm mx-4 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-white mb-3">Delete Review?</h3>
              <p className="text-gray-400 mb-6">
                Are you sure you want to delete your review? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setConfirmDelete(null)}
                  className="flex-1 px-4 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDeleteAction}
                  disabled={loading}
                  className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="min-h-screen bg-black text-white relative overflow-hidden font-sans">
        {/* Background Ambience */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-950 to-black z-0" />
        <div className="absolute inset-0 pointer-events-none z-0">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-blue-500/30"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 0.8, 0],
                scale: [0, 1.5, 0],
                y: ["100%", "-20%"],
                x: i % 2 === 0 ? ["0%", "10%"] : ["0%", "-10%"],
              }}
              transition={{
                duration: 10 + i,
                repeat: Infinity,
                delay: i * 0.5,
              }}
              style={{ left: `${Math.random() * 100}%` }}
            />
          ))}
        </div>

        <div className="relative z-10 container mx-auto px-4 py-20 max-w-7xl">
          {/* Header */}
          <div className="text-center mb-16">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold mb-6 font-serif tracking-tight"
            >
              Client <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">Experiences</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-gray-400 text-lg max-w-2xl mx-auto"
            >
              Hear what our partners and clients have to say about their journey with Social Bureau. Your feedback shapes our excellence.
            </motion.p>
          </div>

          {/* Add Review Button (Floating/Sticky) */}
          {fetching ? (
            <div className="flex justify-center mb-12">
              <div className="w-56 h-14 bg-gray-900/50 rounded-full animate-pulse border border-gray-800" />
            </div>
          ) : (
            <motion.div
              className="flex justify-center mb-12"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              {isLoggedIn ? (
                userReview ? (
                  /* Top buttons removed as requested */
                  null
                ) : (
                  <button
                    onClick={() => setShowForm(!showForm)}
                    className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-700 rounded-full font-bold text-lg shadow-lg shadow-blue-900/20 hover:shadow-blue-600/40 transition-all duration-300 transform hover:-translate-y-1"
                  >
                    {showForm ? <X size={20} /> : <Plus size={20} />}
                    {showForm ? 'Close Form' : 'Share Your Experience'}
                  </button>
                )
              ) : (
                <Link
                  to="/login"
                  state={{ from: location }}
                  className="group flex items-center gap-3 px-8 py-4 bg-gray-800 rounded-full font-bold text-lg shadow-lg hover:bg-gray-700 transition-all duration-300 transform hover:-translate-y-1 border border-gray-700"
                >
                  <User size={20} />
                  Login to Write Review
                </Link>
              )}
            </motion.div>
          )}

          {/* Form Modal / Section */}
          <AnimatePresence>
            {showForm && isLoggedIn && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden mb-16"
              >
                <div className="max-w-2xl mx-auto bg-gray-900/60 backdrop-blur-xl border border-gray-800 rounded-2xl p-8 shadow-2xl relative">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-b-full opacity-70" />

                  <h2 className="text-2xl font-bold mb-8 text-center">
                    {isEditing ? 'Update Your Review' : 'Write a Review'}
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Rating</label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((num) => (
                          <button
                            key={num}
                            type="button"
                            onClick={() => setFormData({ ...formData, rating: num })}
                            className={`p-2 rounded-lg transition-all ${formData.rating >= num ? 'text-yellow-400 scale-110' : 'text-gray-600 hover:text-gray-400'
                              }`}
                          >
                            <Star fill={formData.rating >= num ? "currentColor" : "none"} size={32} />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Title field removed from UI, handled in handleSubmit */}

                    <div>
                      <label htmlFor="comment" className="block text-sm font-medium text-gray-400 mb-2">Review</label>
                      <textarea
                        id="comment"
                        name="comment"
                        value={formData.comment}
                        onChange={handleChange}
                        rows={5}
                        placeholder="Detail your experience with us..."
                        className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors text-white placeholder-gray-600 resize-none"
                        required
                      />
                      <p className="text-right text-xs text-gray-600 mt-2">{formData.comment.length}/1000</p>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                    >
                      {loading ? 'Submitting...' : (isEditing ? 'Update Review' : 'Submit Review')}
                    </button>
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fetching ? (
              [...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-900/30 rounded-2xl p-6 h-64 animate-pulse border border-gray-800" />
              ))
            ) : reviews.length > 0 ? (
              reviews.map((review, index) => (
                <motion.div
                  key={review._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group bg-gray-900/40 backdrop-blur-md border border-gray-800 rounded-2xl p-8 hover:border-blue-500/30 transition-all duration-300 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Quote size={60} />
                  </div>

                  {/* Edit/Delete Icons for user's own review */}
                  {currentUser && (review.userId?._id === (currentUser._id || currentUser.id) || review.userId === (currentUser._id || currentUser.id)) && (
                    <div className="absolute bottom-7 right-4 z-20 flex gap-2">
                      <button
                        onClick={() => handleEdit()}
                        className="p-2 bg-yellow-600/10 text-yellow-500 rounded-full hover:bg-yellow-600/20 transition-all"
                        title="Edit your review"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(review._id)}
                        className="p-2 bg-red-600/10 text-red-500 rounded-full hover:bg-red-600/20 transition-all"
                        title="Delete your review"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  )}

                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-lg font-bold">
                      {review.userId?.name ? review.userId.name.charAt(0).toUpperCase() : <User size={20} />}
                    </div>
                    <div>
                      <h3 className="font-bold text-white leading-tight">
                        {review.userId?.name || 'Anonymous User'}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {new Date(review.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                      </p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex gap-1 mb-2 text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} fill={i < review.rating ? "currentColor" : "none"} strokeWidth={i < review.rating ? 0 : 2} className={i < review.rating ? "" : "text-gray-600"} />
                      ))}
                    </div>
                    {/* Title removed from display as requested */}
                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-4 mt-4">
                      "{review.comment}"
                    </p>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-20 text-gray-500">
                <MessageSquare size={48} className="mx-auto mb-4 opacity-50" />
                <p>No reviews yet. Be the first to share your experience!</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />

    </>
  );
};

export default AddReview;