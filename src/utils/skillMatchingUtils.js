/**
 * Skill Matching Utility
 * Provides robust skill matching functionality with support for synonyms, 
 * case-insensitive matching, and partial matches.
 */

// Comprehensive skill mappings for better matching
const SKILL_MAPPINGS = {
    // JavaScript ecosystem
    'js': ['javascript', 'ecmascript'],
    'javascript': ['js', 'ecmascript'],
    'typescript': ['ts'],
    'ts': ['typescript'],
    
    // React ecosystem
    'react': ['reactjs', 'react.js', 'react native', 'reactnative'],
    'reactjs': ['react', 'react.js'],
    'react.js': ['react', 'reactjs'],
    'react native': ['react', 'reactnative'],
    'reactnative': ['react', 'react native'],
    
    // Node.js ecosystem
    'node': ['nodejs', 'node.js'],
    'nodejs': ['node', 'node.js'],
    'node.js': ['node', 'nodejs'],
    'express': ['expressjs', 'express.js'],
    'expressjs': ['express', 'express.js'],
    'express.js': ['express', 'expressjs'],
    
    // Next.js
    'next': ['nextjs', 'next.js'],
    'nextjs': ['next', 'next.js'],
    'next.js': ['next', 'nextjs'],
    
    // Python ecosystem
    'python': ['py', 'python3'],
    'py': ['python', 'python3'],
    'python3': ['python', 'py'],
    'django': ['python'],
    'flask': ['python'],
    
    // Java ecosystem
    'java': ['j2ee', 'j2se', 'spring', 'spring boot'],
    'j2ee': ['java'],
    'j2se': ['java'],
    'spring': ['java', 'spring boot'],
    'spring boot': ['java', 'spring'],
    
    // .NET ecosystem
    'c#': ['csharp', 'dotnet', '.net', 'asp.net'],
    'csharp': ['c#', 'dotnet', '.net'],
    'dotnet': ['c#', 'csharp', '.net'],
    '.net': ['c#', 'csharp', 'dotnet'],
    'asp.net': ['c#', 'csharp', 'dotnet'],
    
    // C++
    'c++': ['cpp'],
    'cpp': ['c++'],
    
    // Web technologies
    'html': ['html5'],
    'html5': ['html'],
    'css': ['css3'],
    'css3': ['css'],
    
    // Vue ecosystem
    'vue': ['vuejs', 'vue.js'],
    'vuejs': ['vue', 'vue.js'],
    'vue.js': ['vue', 'vuejs'],
    
    // Angular ecosystem
    'angular': ['angularjs'],
    'angularjs': ['angular'],
    
    // Database technologies
    'sql': ['mysql', 'postgresql', 'oracle', 'sql server', 'mssql'],
    'mysql': ['sql'],
    'postgresql': ['postgres', 'sql'],
    'postgres': ['postgresql', 'sql'],
    'oracle': ['sql'],
    'sql server': ['mssql', 'sql'],
    'mssql': ['sql server', 'sql'],
    'mongodb': ['nosql', 'mongo'],
    'nosql': ['mongodb'],
    'mongo': ['mongodb'],
    
    // Cloud platforms
    'aws': ['amazon web services', 'amazon aws'],
    'amazon web services': ['aws'],
    'amazon aws': ['aws'],
    'azure': ['microsoft azure'],
    'microsoft azure': ['azure'],
    'gcp': ['google cloud platform', 'google cloud'],
    'google cloud platform': ['gcp', 'google cloud'],
    'google cloud': ['gcp', 'google cloud platform'],
    
    // AI/ML
    'ai': ['artificial intelligence'],
    'artificial intelligence': ['ai'],
    'ml': ['machine learning'],
    'machine learning': ['ml', 'deep learning'],
    'deep learning': ['machine learning', 'ml'],
    'nlp': ['natural language processing'],
    'natural language processing': ['nlp'],
    
    // UI/UX
    'ui': ['user interface'],
    'user interface': ['ui'],
    'ux': ['user experience'],
    'user experience': ['ux'],
    'ui/ux': ['ui', 'ux', 'user interface', 'user experience'],
    'ui/ux design': ['ui design', 'ux design'],
    'ui design': ['ui/ux design'],
    'ux design': ['ui/ux design'],
    
    // DevOps
    'devops': ['dev ops', 'ci/cd'],
    'dev ops': ['devops'],
    'ci/cd': ['devops', 'continuous integration', 'continuous deployment'],
    'continuous integration': ['ci/cd', 'devops'],
    'continuous deployment': ['ci/cd', 'devops'],
    'docker': ['containerization'],
    'containerization': ['docker', 'kubernetes'],
    'kubernetes': ['k8s', 'containerization'],
    'k8s': ['kubernetes'],
    
    // CSS Frameworks
    'tailwind': ['tailwindcss'],
    'tailwindcss': ['tailwind'],
    'bootstrap': ['css'],
    'material-ui': ['mui', 'react'],
    'mui': ['material-ui', 'react'],
    'ant design': ['antd'],
    'antd': ['ant design'],
    
    // Testing
    'testing': ['jest', 'unit testing', 'integration testing', 'e2e testing'],
    'jest': ['testing'],
    'unit testing': ['testing'],
    'integration testing': ['testing'],
    'e2e testing': ['testing'],
    'cypress': ['testing'],
    'selenium': ['testing'],
    
    // Version Control
    'git': ['version control', 'github', 'gitlab'],
    'version control': ['git'],
    'github': ['git'],
    'gitlab': ['git'],
    
    // APIs
    'api': ['rest api', 'restful api'],
    'rest api': ['api', 'restful api'],
    'restful api': ['api', 'rest api'],
    'graphql': ['api'],
    
    // Architecture
    'microservices': ['architecture'],
    'architecture': ['microservices'],
    
    // Development practices
    'agile': ['agile methodology'],
    'agile methodology': ['agile'],
    'scrum': ['agile'],
    'kanban': ['agile'],
    
    // Management
    'product management': ['product development'],
    'product development': ['product management'],
    'project management': ['program management'],
    'program management': ['project management'],
    
    // Leadership
    'technical leadership': ['leadership'],
    'leadership': ['technical leadership'],
    
    // Quality
    'code quality': ['coding standards'],
    'coding standards': ['code quality'],
    
    // Development types
    'frontend development': ['web frontend development', 'web development'],
    'web frontend development': ['frontend development'],
    'web development': ['frontend development'],
    'software engineering': ['software development'],
    'software development': ['software engineering'],
    
    // Extension development
    'chrome extension development': ['extension development'],
    'extension development': ['chrome extension development'],
    
    // Business models
    'b2b saas': ['saas'],
    'saas': ['b2b saas'],
};

/**
 * Normalize a skill string by removing quotes, braces, and converting to lowercase
 * @param {string} skill - The skill to normalize
 * @returns {string} - The normalized skill
 */
export const normalizeSkill = (skill) => {
    if (typeof skill !== 'string') return '';
    return skill.trim().toLowerCase().replace(/^[{"']+|[}"']+$/g, '');
};

/**
 * Get all possible variations of a skill including synonyms
 * @param {string} skill - The skill to get variations for
 * @returns {string[]} - Array of skill variations
 */
export const getSkillVariations = (skill) => {
    const normalized = normalizeSkill(skill);
    const variations = [normalized];
    
    // Add direct mappings
    if (SKILL_MAPPINGS[normalized]) {
        variations.push(...SKILL_MAPPINGS[normalized]);
    }
    
    // Add reverse mappings (skills that map to this skill)
    Object.entries(SKILL_MAPPINGS).forEach(([key, values]) => {
        if (values.includes(normalized)) {
            variations.push(key);
        }
    });
    
    return [...new Set(variations)]; // Remove duplicates
};

/**
 * Check if two skills match using various matching strategies
 * @param {string} skill1 - First skill
 * @param {string} skill2 - Second skill
 * @returns {boolean} - Whether the skills match
 */
export const skillsMatch = (skill1, skill2) => {
    const normalized1 = normalizeSkill(skill1);
    const normalized2 = normalizeSkill(skill2);
    
    if (!normalized1 || !normalized2) return false;
    
    // Exact match
    if (normalized1 === normalized2) return true;
    
    // Check variations
    const variations1 = getSkillVariations(skill1);
    const variations2 = getSkillVariations(skill2);
    
    // Check if any variation of skill1 matches any variation of skill2
    for (const var1 of variations1) {
        for (const var2 of variations2) {
            if (var1 === var2) return true;
        }
    }
    
    // Partial matching for compound skills
    const words1 = normalized1.split(/[\s\-_]+/).filter(word => word.length > 2);
    const words2 = normalized2.split(/[\s\-_]+/).filter(word => word.length > 2);
    
    // Check if any significant word matches
    for (const word1 of words1) {
        for (const word2 of words2) {
            if (word1 === word2) return true;
        }
    }
    
    return false;
};

/**
 * Check if a user has a specific skill
 * @param {string} jobSkill - The job skill to check
 * @param {string[]} userSkills - Array of user skills
 * @returns {boolean} - Whether the user has the skill
 */
export const userHasSkill = (jobSkill, userSkills) => {
    if (!jobSkill || !Array.isArray(userSkills)) return false;
    
    return userSkills.some(userSkill => skillsMatch(jobSkill, userSkill));
};

/**
 * Parse skills from a comma-separated string
 * @param {string} skillsString - Comma-separated skills string
 * @returns {string[]} - Array of normalized skills
 */
export const parseSkills = (skillsString) => {
    if (!skillsString || typeof skillsString !== 'string') return [];
    
    return skillsString
        .split(',')
        .map(skill => normalizeSkill(skill))
        .filter(skill => skill.length > 0);
};

// Cache for skill match calculations to improve performance
const skillMatchCache = new Map();

/**
 * Calculate skill match percentage between job requirements and user skills
 * @param {string} jobSkillsString - Comma-separated job skills
 * @param {string[]} userSkills - Array of user skills
 * @returns {number} - Match percentage (0-100)
 */
export const calculateSkillMatchPercentage = (jobSkillsString, userSkills) => {
    if (!jobSkillsString || !Array.isArray(userSkills) || userSkills.length === 0) {
        return 0;
    }
    
    // Create cache key for memoization
    const cacheKey = `${jobSkillsString}|${userSkills.join(',')}`;
    if (skillMatchCache.has(cacheKey)) {
        return skillMatchCache.get(cacheKey);
    }
    
    const jobSkills = parseSkills(jobSkillsString);
    if (jobSkills.length === 0) return 0;
    
    const matchingSkills = jobSkills.filter(jobSkill => 
        userHasSkill(jobSkill, userSkills)
    );
    
    const result = Math.round((matchingSkills.length / jobSkills.length) * 100);
    
    // Cache the result (limit cache size to prevent memory issues)
    if (skillMatchCache.size > 1000) {
        skillMatchCache.clear();
    }
    skillMatchCache.set(cacheKey, result);
    
    return result;
};

// Cache for skill match details to improve performance
const skillDetailsCache = new Map();

/**
 * Get detailed skill match information for UI highlighting
 * @param {string} jobSkillsString - Comma-separated job skills
 * @param {string[]} userSkills - Array of user skills
 * @returns {Object} - Detailed match information
 */
export const getSkillMatchDetails = (jobSkillsString, userSkills) => {
    if (!jobSkillsString || !Array.isArray(userSkills)) {
        return {
            percentage: 0,
            matchingSkills: [],
            nonMatchingSkills: [],
            skillDetails: []
        };
    }
    
    // Create cache key for memoization
    const cacheKey = `details_${jobSkillsString}|${userSkills.join(',')}`;
    if (skillDetailsCache.has(cacheKey)) {
        return skillDetailsCache.get(cacheKey);
    }
    
    const jobSkills = parseSkills(jobSkillsString);
    const matchingSkills = [];
    const nonMatchingSkills = [];
    const skillDetails = [];
    
    jobSkills.forEach(jobSkill => {
        const isMatching = userHasSkill(jobSkill, userSkills);
        const skillDetail = {
            skill: jobSkill,
            isMatching,
            displayName: jobSkill // Keep original casing for display
        };
        
        if (isMatching) {
            matchingSkills.push(jobSkill);
        } else {
            nonMatchingSkills.push(jobSkill);
        }
        
        skillDetails.push(skillDetail);
    });
    
    // Find the original skill with proper casing for display
    const originalSkills = jobSkillsString.split(',').map(skill => skill.trim().replace(/^[{"']+|[}"']+$/g, ''));
    skillDetails.forEach((detail, index) => {
        if (originalSkills[index]) {
            detail.displayName = originalSkills[index];
        }
    });
    
    const percentage = jobSkills.length > 0 
        ? Math.round((matchingSkills.length / jobSkills.length) * 100)
        : 0;
    
    const result = {
        percentage,
        matchingSkills,
        nonMatchingSkills,
        skillDetails
    };
    
    // Cache the result (limit cache size to prevent memory issues)
    if (skillDetailsCache.size > 1000) {
        skillDetailsCache.clear();
    }
    skillDetailsCache.set(cacheKey, result);
    
    return result;
};

/**
 * Get skill match color based on percentage
 * @param {number} percentage - Match percentage
 * @returns {string} - Color code
 */
export const getMatchColor = (percentage) => {
    if (percentage >= 70) return '#4CAF50'; // Green
    if (percentage >= 40) return '#FFA500'; // Orange
    return '#FF4444'; // Red
};

export default {
    normalizeSkill,
    getSkillVariations,
    skillsMatch,
    userHasSkill,
    parseSkills,
    calculateSkillMatchPercentage,
    getSkillMatchDetails,
    getMatchColor
}; 
