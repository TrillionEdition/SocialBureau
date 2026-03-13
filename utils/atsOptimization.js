/**
 * ATS Optimization Utilities
 * Provides functions to calculate ATS scores and generate suggestions
 */

// Action verbs commonly used in resumes for better ATS matching
const ACTION_VERBS = [
    'accelerated', 'achieved', 'acquired', 'administered', 'advanced',
    'advocated', 'aided', 'allocated', 'amended', 'amplified', 'analyzed',
    'anchored', 'appointed', 'apprised', 'approved', 'arbitrated', 'arranged',
    'articulated', 'ascertained', 'assessed', 'assigned', 'assimilated',
    'assisted', 'assured', 'attached', 'attained', 'attended', 'audited',
    'augmented', 'authenticated', 'authored', 'automated', 'averted',
    'awarded', 'backed', 'balanced', 'barriered', 'based', 'began',
    'benefited', 'bid', 'briefed', 'broadened', 'brought', 'budgeted',
    'built', 'calculated', 'calibrated', 'called', 'canceled', 'capitalized',
    'captured', 'cared', 'cascaded', 'catalogued', 'categorized', 'caught',
    'caused', 'centralized', 'certified', 'chaired', 'challenged', 'championed',
    'changed', 'channeled', 'charged', 'charted', 'chased', 'checked',
    'clarified', 'classified', 'cleaned', 'closed', 'coalesced', 'coached',
    'coded', 'collected', 'combined', 'commanded', 'commented', 'commissioned',
    'committed', 'compared', 'competed', 'compiled', 'complemented', 'completed',
    'complied', 'composed', 'computed', 'conceptualized', 'concluded', 'conducted',
    'configured', 'confirmed', 'consolidated', 'constructed', 'consulted',
    'consumed', 'contemplated', 'contributed', 'controlled', 'convinced',
    'coordinated', 'copied', 'corrected', 'corresponded', 'created', 'credited',
    'customized', 'debugged', 'decentralized', 'decided', 'decreased', 'dedicated',
    'deduced', 'deepened', 'delegated', 'delivered', 'demanded', 'demonstrated',
    'deployed', 'deprecated', 'derived', 'described', 'designated', 'designed',
    'desired', 'detailed', 'detected', 'determined', 'developed', 'deviated',
    'devised', 'diagnosed', 'diagrammed', 'dialed', 'dictated', 'differentiated',
    'directed', 'discarded', 'disciplined', 'disclosed', 'discovered', 'discussed',
    'disestablished', 'disguised', 'disorganized', 'dispatched', 'displaced',
    'displayed', 'disproved', 'disputed', 'dissolved', 'distinguished', 'distorted',
    'distributed', 'diversified', 'diverted', 'divided', 'documented', 'dominated',
    'donated', 'drafted', 'dragged', 'drained', 'dramatized', 'drew', 'drove',
    'drummed', 'dubbed', 'duplicated', 'earned', 'eased', 'echoed', 'eclipsed',
    'edited', 'educated', 'effected', 'elected', 'elevated', 'eliminated', 'eluded',
    'emailed', 'emanated', 'emancipated', 'embedded', 'embodied', 'embraced',
    'emerged', 'emulated', 'enabled', 'enacted', 'enclosed', 'encompassed',
    'encountered', 'encouraged', 'endorsed', 'ended', 'endured', 'enforced',
    'engaged', 'engineered', 'enhanced', 'enlarged', 'enlightened', 'enlisted',
    'enough', 'enriched', 'enshrined', 'ensured', 'entailed', 'entered',
    'entertained', 'enticed', 'entitled', 'entrusted', 'enumerated', 'envisioned',
    'equipped', 'equated', 'erected', 'eroded', 'erred', 'escalated', 'escaped',
    'escorted', 'espoused', 'established', 'estimated', 'estranged', 'evaluated',
    'evaded', 'evaluated', 'evaporated', 'even', 'evened', 'eventually', 'eventually',
];

// Common skills and keywords that ATS systems look for
const ATS_KEYWORDS = [
    'leadership', 'management', 'team', 'communication', 'project',
    'analysis', 'problem solving', 'customer', 'sales', 'marketing',
    'strategy', 'planning', 'development', 'implementation', 'optimization',
    'budget', 'revenue', 'growth', 'efficiency', 'quality', 'training',
    'technical', 'software', 'data', 'system', 'network', 'database',
    'programming', 'design', 'creative', 'research', 'innovation'
];

/**
 * Calculate ATS score for a resume
 * Returns a score from 0-100 with detailed breakdown
 */
export const calculateATSScore = (resumeData) => {
    const breakdown = {};
    let totalScore = 0;
    let detailedExperienceCount = 0;

    // 1. Contact Information (10 points) - CRITICAL
    breakdown.contact = 0;
    if (resumeData.personalInfo?.fullName && resumeData.personalInfo.fullName.length > 0) {
        breakdown.contact += 3;
    }
    if (resumeData.personalInfo?.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(resumeData.personalInfo.email)) {
        breakdown.contact += 4;
    }
    if (resumeData.personalInfo?.phone && resumeData.personalInfo.phone.replace(/\D/g, '').length >= 10) {
        breakdown.contact += 3;
    }

    // 2. Professional Summary/Title (8 points)
    breakdown.summary = 0;
    if (resumeData.personalInfo?.title && resumeData.personalInfo.title.length > 5) {
        breakdown.summary += 4;
    }
    if (resumeData.personalInfo?.summary && resumeData.personalInfo.summary.length >= 100) {
        breakdown.summary += 4;
    }

    // 3. Work Experience Quality (20 points) - CRITICAL
    breakdown.experience = 0;
    if (resumeData.experience && resumeData.experience.length > 0) {
        breakdown.experience += 8; // Has experience

        // Bonus for multiple entries
        if (resumeData.experience.length >= 2) {
            breakdown.experience += 4;
        }

        // Bonus for detailed descriptions with metrics/numbers
        const detailedExperience = resumeData.experience.filter(exp =>
            exp.description && exp.description.length >= 150 && /\d+%|increased|decreased|grew|improved|achieved/.test(exp.description)
        );
        detailedExperienceCount = detailedExperience.length;
        breakdown.experience += Math.min(detailedExperience.length * 2, 8);
    }

    // 4. Education (12 points)
    breakdown.education = 0;
    if (resumeData.education && resumeData.education.length > 0) {
        breakdown.education += 8;
        if (resumeData.education.some(edu => edu.degree && edu.degree.toLowerCase().includes('master'))) {
            breakdown.education += 2;
        }
        if (resumeData.education.length >= 2) {
            breakdown.education += 2;
        }
    }

    // 5. Skills (12 points)
    breakdown.skills = 0;
    if (resumeData.skills && resumeData.skills.length >= 5) {
        breakdown.skills += 6;
        if (resumeData.skills.length >= 10) {
            breakdown.skills += 6;
        }
    } else if (resumeData.skills && resumeData.skills.length > 0) {
        breakdown.skills += 3;
    }

    // 6. Action Verbs & Keywords (15 points)
    breakdown.keywords = 0;
    const verbCount = countActionVerbs(resumeData);
    breakdown.keywords += Math.min(Math.floor(verbCount / 2), 8);

    const keywordCount = countRelevantKeywords(resumeData);
    breakdown.keywords += Math.min(Math.floor(keywordCount / 3), 7);

    // 7. Formatting & Consistency (10 points)
    breakdown.formatting = 0;
    if (hasConsistentFormatting(resumeData)) {
        breakdown.formatting += 7;
    }
    if (resumeData.experience && resumeData.experience.every(e => e.company && e.position && e.duration)) {
        breakdown.formatting += 3;
    }

    // 8. Online Presence (5 points)
    breakdown.links = 0;
    if (resumeData.personalInfo?.linkedin) breakdown.links += 3;
    if (resumeData.personalInfo?.portfolio) breakdown.links += 2;
    if (resumeData.projects && resumeData.projects.length > 0) breakdown.links += Math.min(resumeData.projects.length, 2);

    // 9. Projects (8 points) - shows initiative
    breakdown.projects = 0;
    if (resumeData.projects && resumeData.projects.length > 0) {
        breakdown.projects += 4;
        if (resumeData.projects.length >= 3) {
            breakdown.projects += 4;
        }
    }

    // Calculate total
    totalScore = Object.values(breakdown).reduce((a, b) => a + b, 0);

    // Bonus points for excellence (up to 8 points)
    let bonus = 0;
    if (verbCount >= 8) bonus += 2;
    if (resumeData.experience && resumeData.experience.length >= 3) bonus += 2;
    if (keywordCount >= 10) bonus += 2;
    if (resumeData.skills && resumeData.skills.length >= 15) bonus += 2;

    totalScore += Math.min(bonus, 8);

    return {
        overall: Math.min(totalScore, 100),
        breakdown,
        details: {
            actionVerbs: verbCount,
            keywords: keywordCount,
            experienceQuality: detailedExperienceCount
        }
    };
};

const countActionVerbs = (resumeData) => {
    const text = JSON.stringify(resumeData).toLowerCase();
    let count = 0;
    for (const verb of ACTION_VERBS) {
        const regex = new RegExp(`\\b${verb}\\b`, 'g');
        const matches = text.match(regex);
        if (matches) count += matches.length;
    }
    return count;
};

const countRelevantKeywords = (resumeData) => {
    const text = JSON.stringify(resumeData).toLowerCase();
    let count = 0;
    for (const keyword of ATS_KEYWORDS) {
        const regex = new RegExp(`\\b${keyword}\\b`, 'g');
        const matches = text.match(regex);
        if (matches) count += matches.length;
    }
    return count;
};

const hasConsistentFormatting = (resumeData) => {
    if (!resumeData.experience || resumeData.experience.length === 0) return false;
    return resumeData.experience.every(exp => exp.company && exp.position && exp.duration);
};

/**
 * Check if resume has proper formatting
 */
const hasProperFormatting = (resumeData) => {
    // Check if essential sections are present and properly filled
    const hasName = resumeData.personalInfo?.fullName?.length > 0;
    const hasEmail = resumeData.personalInfo?.email?.length > 0;
    const hasExperience = resumeData.experience?.length > 0;

    return hasName && hasEmail && hasExperience;
};

/**
 * Check if resume contains action verbs
 */
const hasActionVerbs = (resumeData) => {
    const experienceText = (resumeData.experience || [])
        .map(exp => exp.description?.toLowerCase() || '')
        .join(' ');

    const projectText = (resumeData.projects || [])
        .map(proj => proj.description?.toLowerCase() || '')
        .join(' ');

    const combinedText = (experienceText + projectText).toLowerCase();

    // Check if at least 3 action verbs are present
    let verbCount = 0;
    for (const verb of ACTION_VERBS) {
        if (combinedText.includes(' ' + verb + ' ') || combinedText.startsWith(verb + ' ')) {
            verbCount++;
        }
    }

    return verbCount >= 3;
};

/**
 * Check if resume contains relevant keywords
 */
const hasRelevantKeywords = (resumeData) => {
    const allText = JSON.stringify(resumeData).toLowerCase();

    let keywordCount = 0;
    for (const keyword of ATS_KEYWORDS) {
        if (allText.includes(keyword)) {
            keywordCount++;
        }
    }

    return keywordCount >= 5;
};

/**
 * Get ATS optimization suggestions
 */
export const getATSSuggestions = (resumeData) => {
    const suggestions = [];

    // Critical Issues
    if (!resumeData.personalInfo?.fullName) {
        suggestions.push({
            title: 'Missing Full Name',
            description: 'Add your full name at the top of your resume',
            priority: 'critical',
            example: 'John Doe',
            action: null
        });
    }

    if (!resumeData.personalInfo?.email) {
        suggestions.push({
            title: 'Missing Email Address',
            description: 'Include a professional email address',
            priority: 'critical',
            example: 'john.doe@email.com',
            action: null
        });
    }

    if (!resumeData.personalInfo?.phone) {
        suggestions.push({
            title: 'Missing Phone Number',
            description: 'Add a phone number where you can be reached',
            priority: 'critical',
            example: '+1 (555) 123-4567',
            action: null
        });
    }

    if (!resumeData.experience || resumeData.experience.length === 0) {
        suggestions.push({
            title: 'No Work Experience Listed',
            description: 'Add at least one work experience entry',
            priority: 'critical',
            action: null
        });
    }

    // High Priority
    if (!resumeData.personalInfo?.summary || resumeData.personalInfo.summary.length < 50) {
        suggestions.push({
            title: 'Weak Professional Summary',
            description: 'Write a detailed professional summary (at least 50 characters)',
            priority: 'high',
            example: 'Results-driven professional with 5+ years of experience...',
            action: null
        });
    }

    if (!resumeData.education || resumeData.education.length === 0) {
        suggestions.push({
            title: 'No Education Listed',
            description: 'Add your educational background',
            priority: 'high',
            action: null
        });
    }

    if (!resumeData.skills || resumeData.skills.length < 5) {
        suggestions.push({
            title: 'Limited Skills Listed',
            description: `Add more skills (you have ${resumeData.skills?.length || 0}, aim for at least 5)`,
            priority: 'high',
            action: null
        });
    }

    // Medium Priority
    if (!hasActionVerbs(resumeData)) {
        suggestions.push({
            title: 'Use Action Verbs',
            description: 'Start bullet points with powerful action verbs like "developed", "created", "implemented"',
            priority: 'medium',
            example: 'Developed a new customer onboarding system...',
            action: null
        });
    }

    if (!resumeData.personalInfo?.linkedin && !resumeData.personalInfo?.portfolio) {
        suggestions.push({
            title: 'Add Online Links',
            description: 'Include your LinkedIn profile or portfolio website',
            priority: 'medium',
            example: 'LinkedIn: linkedin.com/in/johndoe or Portfolio: johndoe.com',
            action: null
        });
    }

    if (resumeData.experience.some(exp => !exp.description || exp.description.length < 100)) {
        suggestions.push({
            title: 'Expand Work Descriptions',
            description: 'Add more detailed descriptions of your responsibilities and achievements',
            priority: 'medium',
            example: 'Led a team of 5 developers to build a customer portal that increased engagement by 40%',
            action: null
        });
    }

    // Low Priority
    if (!resumeData.projects || resumeData.projects.length === 0) {
        suggestions.push({
            title: 'Add Notable Projects',
            description: "Include key projects you've worked on to showcase your capabilities",
            priority: 'low',
            action: null
        });
    }

    if (!hasRelevantKeywords(resumeData)) {
        suggestions.push({
            title: 'Include Industry Keywords',
            description: 'Add relevant industry keywords and technical terms to match job descriptions',
            priority: 'low',
            example: 'Include skills like "project management", "data analysis", "process optimization"',
            action: null
        });
    }

    return suggestions;
};

/**
 * Validate resume data for ATS compatibility
 */
export const validateATSCompatibility = (resumeData) => {
    const issues = [];

    if (!resumeData.personalInfo?.fullName) issues.push('Full name is required');
    if (!resumeData.personalInfo?.email) issues.push('Email address is required');
    if (!resumeData.personalInfo?.phone) issues.push('Phone number is required');
    if (!resumeData.experience || resumeData.experience.length === 0) issues.push('At least one work experience is required');

    return {
        isValid: issues.length === 0,
        issues
    };
};

/**
 * Format resume text to be ATS-friendly
 */
export const formatForATS = (text) => {
    if (!text) return '';

    // Remove special characters and extra spaces
    return text
        .replace(/[^\w\s.,-]/g, '')
        .replace(/\s+/g, ' ')
        .trim();
};

/**
 * Get keyword matches from a job description
 */
export const getKeywordMatches = (resumeData, jobDescription) => {
    if (!jobDescription) return { matched: [], missing: [] };

    const jobKeywords = jobDescription
        .toLowerCase()
        .split(/[\s,.\-()]+/)
        .filter(w => w.length > 3);

    const resumeText = JSON.stringify(resumeData).toLowerCase();

    const matched = [];
    const missing = [];

    for (const keyword of jobKeywords) {
        if (resumeText.includes(keyword)) {
            matched.push(keyword);
        } else {
            missing.push(keyword);
        }
    }

    return {
        matched: [...new Set(matched)].slice(0, 20),
        missing: [...new Set(missing)].slice(0, 20)
    };
};
