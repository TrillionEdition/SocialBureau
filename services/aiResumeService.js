import axios from 'axios';
import { BASE_URL } from '../utils/urls';

/**
 * AI-powered resume generation from job description
 */
export const generateResumeFromJob = async (jobDescription, userInfo = {}) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/resume/generate-from-job`,
      { jobDescription, userInfo }
    );

    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error(response.data.message || 'Failed to generate resume from job');
    }
  } catch (error) {
    console.error('Job-based resume generation error:', error);
    throw new Error('Could not generate resume from job description. Please try again.');
  }
};

/**
 * Generate AI-powered content suggestions for resume sections
 */
export const generateSectionSuggestions = async (sectionType, context = {}) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/resume/section-suggestions`,
      { sectionType, context }
    );

    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error(response.data.message || 'Failed to generate section suggestions');
    }
  } catch (error) {
    console.error('Section suggestions error:', error);
    throw new Error('Could not generate section suggestions');
  }
};

/**
 * AI-powered resume optimization for specific job
 */
export const optimizeResumeForJob = async (resumeData, jobDescription) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/resume/optimize-for-job`,
      { resumeData, jobDescription }
    );

    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error(response.data.message || 'Failed to optimize resume');
    }
  } catch (error) {
    console.error('Resume optimization error:', error);
    throw new Error('Could not optimize resume for job');
  }
};

/**
 * Generate AI-powered experience descriptions
 */
export const generateExperienceDescription = async (position, company, achievements = []) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/resume/generate-experience`,
      { position, company, achievements }
    );

    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error(response.data.message || 'Failed to generate experience description');
    }
  } catch (error) {
    console.error('Experience generation error:', error);
    throw new Error('Could not generate experience description');
  }
};

/**
 * AI-powered skills recommendations based on job
 */
export const recommendSkills = async (jobTitle, currentSkills = []) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/resume/recommend-skills`,
      { jobTitle, currentSkills }
    );

    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error(response.data.message || 'Failed to recommend skills');
    }
  } catch (error) {
    console.error('Skills recommendation error:', error);
    throw new Error('Could not recommend skills');
  }
};

/**
 * AI-powered resume improvement suggestions
 */
export const getAIResumeImprovements = async (resumeData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/resume/ai-improvements`,
      { resumeData }
    );

    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error(response.data.message || 'Failed to get AI suggestions');
    }
  } catch (error) {
    console.error('AI improvements error:', error);
    throw new Error('Could not generate AI suggestions. Please try again.');
  }
};

/**
 * Get AI-enhanced summary for resume
 */
export const generateAISummary = async (parsedData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/resume/generate-summary`,
      { data: parsedData }
    );

    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error(response.data.message || 'Failed to generate summary');
    }
  } catch (error) {
    console.error('Summary generation error:', error);
    throw new Error('Could not generate summary');
  }
};

/**
 * Improve specific section with AI
 */
export const improveSectionWithAI = async (section, content) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/resume/improve-section`,
      { section, content }
    );

    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error(response.data.message || 'Failed to improve section');
    }
  } catch (error) {
    console.error('Section improvement error:', error);
    throw new Error(`Could not improve ${section}`);
  }
};

/**
 * Get personalized resume tips based on content
 */
export const getResumeTips = async (resumeData, jobTitle = null) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/resume/get-tips`,
      { resumeData, jobTitle }
    );

    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error(response.data.message || 'Failed to get tips');
    }
  } catch (error) {
    console.error('Tips error:', error);
    throw new Error('Could not generate tips');
  }
};

/**
 * Rewrite content with better language
 */
export const rewriteWithAI = async (text, style = 'professional') => {
  try {
    const response = await axios.post(
      `${BASE_URL}/resume/rewrite`,
      { text, style }
    );

    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error(response.data.message || 'Failed to rewrite content');
    }
  } catch (error) {
    console.error('Rewrite error:', error);
    throw new Error('Could not rewrite content');
  }
};

/**
 * Check resume quality score with AI insights
 */
export const checkResumeQuality = async (resumeData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/resume/quality-check`,
      { resumeData }
    );

    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error(response.data.message || 'Failed to check quality');
    }
  } catch (error) {
    console.error('Quality check error:', error);
    throw new Error('Could not check resume quality');
  }
};

/**
 * Extract and analyze SEO keywords from job description
 */
export const extractSEOKeywords = async (jobDescription) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/resume/extract-seo-keywords`,
      { jobDescription }
    );

    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error(response.data.message || 'Failed to extract keywords');
    }
  } catch (error) {
    console.error('SEO keyword extraction error:', error);
    throw new Error('Could not extract SEO keywords');
  }
};

/**
 * Analyze SEO keyword match between resume and job description
 */
export const analyzeSEOMatch = async (resumeData, jobDescription) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/resume/analyze-seo-match`,
      { resumeData, jobDescription }
    );

    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error(response.data.message || 'Failed to analyze match');
    }
  } catch (error) {
    console.error('SEO match analysis error:', error);
    throw new Error('Could not analyze SEO match');
  }
};
