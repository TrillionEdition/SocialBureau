/**
 * Optimizes Cloudinary URLs for better performance.
 * Supports both images and videos.
 * Handles automatic format selection (WebP/AVIF), smart quality, and responsive cropping.
 * 
 * @param {string} url - The original Cloudinary URL.
 * @param {number} width - The desired width in pixels.
 * @param {boolean} isVideo - Whether the asset is a video.
 * @returns {string} - The optimized URL.
 */
export const getOptimizedCloudinaryUrl = (url, width = 800, isVideo = false) => {
    if (!url || !url.includes('cloudinary.com')) return url;

    // Standardize transformations
    // f_auto: Automatic format selection (WebP, AVIF, etc.)
    // q_auto: Automatic quality adjustment
    // w_<width>: Specify width
    // c_scale: Scale to width while maintaining aspect ratio
    const transformations = `f_auto,q_auto,w_${width},c_scale`;

    // Handle videos
    if (isVideo || url.includes('/video/upload/')) {
        if (url.includes('/video/upload/')) {
            return url.replace('/video/upload/', `/video/upload/${transformations}/`);
        }
    }

    // Handle images
    if (url.includes('/image/upload/')) {
        // Some URLs might already have transformations or version strings
        // We want to insert our transformations right after /upload/
        return url.replace('/image/upload/', `/image/upload/${transformations}/`);
    }

    // Fallback for generic /upload/ if /image/ or /video/ is missing
    if (url.includes('/upload/')) {
        return url.replace('/upload/', `/upload/${transformations}/`);
    }

    return url;
};
