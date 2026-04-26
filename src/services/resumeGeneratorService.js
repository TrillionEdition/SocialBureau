import axios from 'axios';
import { BASE_URL } from '@/utils/urls';

/**
 * Extract data from a PDF resume using AI
 */
export const extractPdfData = async (file) => {
    try {
        // Validate file before sending
        if (!file) {
            throw new Error('No file selected');
        }

        if (file.type !== 'application/pdf') {
            throw new Error('Please upload a PDF file');
        }

        if (file.size > 5 * 1024 * 1024) {
            throw new Error('File size exceeds 5MB limit');
        }

        console.log(`Extracting PDF: ${file.name} (${(file.size / 1024).toFixed(2)}KB)`);

        const formData = new FormData();
        formData.append('file', file);

        const response = await axios.post(
            `${BASE_URL}/resume/extract-pdf`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                timeout: 30000 // 30 second timeout for large PDFs
            }
        );

        console.log('Extraction response:', response.data);

        if (response.data.success) {
            console.log('PDF extraction successful');
            return response.data.data;
        } else {
            const errorMsg = response.data.message || 'Failed to extract PDF';
            console.error('Extraction failed:', errorMsg);
            throw new Error(errorMsg);
        }
    } catch (error) {
        console.error('PDF extraction error:', error);
        
        // Provide user-friendly error messages
        if (error.response?.status === 400) {
            const msg = error.response?.data?.message || 'Invalid PDF file';
            throw new Error(msg);
        } else if (error.response?.status === 413) {
            throw new Error('File is too large. Maximum size is 5MB.');
        } else if (error.code === 'ECONNREFUSED') {
            throw new Error('Cannot connect to server. Please ensure the backend is running.');
        } else if (error.message) {
            throw error;
        } else {
            throw new Error('Could not extract PDF. Please ensure it contains readable text (not just images) and try again.');
        }
    }
};

/**
 * Generate a resume with custom data
 */
export const generateResume = async (resumeData, template = 'modern') => {
    try {
        const response = await axios.post(
            `${BASE_URL}/resume/generate`,
            {
                data: resumeData,
                template
            }
        );

        if (response.data.success) {
            return response.data.data;
        } else {
            throw new Error(response.data.message || 'Failed to generate resume');
        }
    } catch (error) {
        console.error('Resume generation error:', error);
        throw new Error('Could not generate resume. Please try again.');
    }
};

/**
 * Download resume as PDF
 */
export const downloadResumePDF = async (resumeData, template = 'modern', fileName = 'resume') => {
    try {
        const response = await axios.post(
            `${BASE_URL}/resume/download-pdf`,
            {
                data: resumeData,
                template,
                fileName
            },
            {
                responseType: 'blob'
            }
        );

        // Create blob link to download
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${fileName}.pdf`);
        document.body.appendChild(link);
        link.click();
        link.parentElement.removeChild(link);

        return true;
    } catch (error) {
        console.error('PDF download error:', error);
        throw new Error('Could not download PDF. Please try again.');
    }
};

/**
 * Save resume draft to backend
 */
export const saveDraft = async (userId, resumeData, draftName = 'Untitled') => {
    try {
        const response = await axios.post(
            `${BASE_URL}/resume/save-draft`,
            {
                userId,
                data: resumeData,
                name: draftName
            }
        );

        if (response.data.success) {
            return response.data.data;
        } else {
            throw new Error(response.data.message || 'Failed to save draft');
        }
    } catch (error) {
        console.error('Save draft error:', error);
        throw new Error('Could not save draft. Saving locally instead.');
    }
};

/**
 * Get saved resume drafts
 */
export const getDrafts = async (userId) => {
    try {
        const response = await axios.get(
            `${BASE_URL}/resume/drafts/${userId}`
        );

        if (response.data.success) {
            return response.data.data;
        } else {
            throw new Error('Failed to fetch drafts');
        }
    } catch (error) {
        console.error('Get drafts error:', error);
        return [];
    }
};

/**
 * Delete a resume draft
 */
export const deleteDraft = async (draftId) => {
    try {
        const response = await axios.delete(
            `${BASE_URL}/resume/draft/${draftId}`
        );

        if (response.data.success) {
            return true;
        } else {
            throw new Error('Failed to delete draft');
        }
    } catch (error) {
        console.error('Delete draft error:', error);
        throw new Error('Could not delete draft');
    }
};

/**
 * Analyze resume against job description
 */
export const analyzeResumeMatch = async (resumeData, jobDescription) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/resume/analyze-match`,
            {
                data: resumeData,
                jobDescription
            }
        );

        if (response.data.success) {
            return response.data.data;
        } else {
            throw new Error('Failed to analyze resume');
        }
    } catch (error) {
        console.error('Resume analysis error:', error);
        throw new Error('Could not analyze resume against job description');
    }
};

/**
 * Generate AI-powered resume improvements
 */
export const generateImprovements = async (resumeData) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/resume/improvements`,
            {
                data: resumeData
            }
        );

        if (response.data.success) {
            return response.data.data;
        } else {
            throw new Error('Failed to generate improvements');
        }
    } catch (error) {
        console.error('Improvements error:', error);
        // Return default suggestions if API fails
        return generateLocalImprovements(resumeData);
    }
};

/**
 * Generate improvement suggestions locally
 */
const generateLocalImprovements = (resumeData) => {
    const suggestions = [];
    
    if (!resumeData.softSkills || resumeData.softSkills.length < 3) {
        suggestions.push({
            type: 'soft-skills',
            title: 'Add More Soft Skills',
            description: 'Consider highlighting communication, leadership, teamwork, and problem-solving skills.',
            impact: 'high'
        });
    }

    if (!resumeData.personalInfo?.summary || resumeData.personalInfo.summary.length < 50) {
        suggestions.push({
            type: 'summary',
            title: 'Enhance Professional Summary',
            description: 'A compelling professional summary can increase interview callbacks by 20%.',
            impact: 'high'
        });
    }

    if (!resumeData.achievements || resumeData.achievements.length < 2) {
        suggestions.push({
            type: 'achievements',
            title: 'Add Quantifiable Achievements',
            description: 'Include metrics like "Increased sales by 30%" or "Led team of 5".',
            impact: 'high'
        });
    }

    if (!resumeData.experience || resumeData.experience.length === 0) {
        suggestions.push({
            type: 'experience',
            title: 'Detail Work Experience',
            description: 'Add specific roles, companies, and responsibilities.',
            impact: 'critical'
        });
    }

    if (!resumeData.technicalSkills || resumeData.technicalSkills.length < 3) {
        suggestions.push({
            type: 'technical-skills',
            title: 'Add Technical Skills',
            description: 'Include programming languages, tools, and technologies you know.',
            impact: 'high'
        });
    }

    return suggestions;
};

/**
 * Generate resume score (0-100)
 */
export const calculateResumeScore = async (resumeData) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/resume/score`,
            { data: resumeData }
        );

        if (response.data.success) {
            return response.data.data;
        }
    } catch (error) {
        console.error('Score calculation error:', error);
    }

    // Fallback local calculation
    return calculateLocalScore(resumeData);
};

/**
 * Calculate resume score locally
 */
const calculateLocalScore = (resumeData) => {
    let score = 0;
    let maxScore = 0;

    // Name (10 points)
    maxScore += 10;
    if (resumeData.personalInfo?.fullName) score += 10;

    // Contact (10 points)
    maxScore += 10;
    if (resumeData.personalInfo?.email && resumeData.personalInfo?.phone) score += 10;
    else if (resumeData.personalInfo?.email || resumeData.personalInfo?.phone) score += 5;

    // Summary (15 points)
    maxScore += 15;
    if (resumeData.personalInfo?.summary && resumeData.personalInfo.summary.length > 100) score += 15;
    else if (resumeData.personalInfo?.summary) score += 8;

    // Experience (20 points)
    maxScore += 20;
    if (resumeData.experience && resumeData.experience.length > 0) {
        score += Math.min(resumeData.experience.length * 5, 20);
    }

    // Skills (15 points)
    maxScore += 15;
    const totalSkills = (resumeData.skills?.length || 0) + (resumeData.technicalSkills?.length || 0);
    if (totalSkills > 0) {
        score += Math.min(totalSkills * 1.5, 15);
    }

    // Soft Skills (10 points)
    maxScore += 10;
    if (resumeData.softSkills && resumeData.softSkills.length > 0) {
        score += Math.min(resumeData.softSkills.length * 2, 10);
    }

    // Education (10 points)
    maxScore += 10;
    if (resumeData.education && resumeData.education.length > 0) score += 10;

    // Achievements (10 points)
    maxScore += 10;
    if (resumeData.achievements && resumeData.achievements.length > 0) {
        score += Math.min(resumeData.achievements.length * 2, 10);
    }

    const percentage = Math.round((score / maxScore) * 100);
    return {
        score: percentage,
        breakdown: {
            personalInfo: resumeData.personalInfo?.fullName ? 10 : 0,
            contact: (resumeData.personalInfo?.email && resumeData.personalInfo?.phone) ? 10 : 5,
            summary: resumeData.personalInfo?.summary ? 10 : 0,
            experience: Math.min((resumeData.experience?.length || 0) * 5, 20),
            skills: Math.min(totalSkills * 1.5, 15),
            softSkills: Math.min((resumeData.softSkills?.length || 0) * 2, 10),
            education: resumeData.education?.length ? 10 : 0,
            achievements: Math.min((resumeData.achievements?.length || 0) * 2, 10)
        },
        maxScore
    };
};

