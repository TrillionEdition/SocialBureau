import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Building2, Target, DollarSign, MessageSquare, Download, BarChart3, TrendingUp, AlertTriangle, CheckCircle, Loader } from 'lucide-react';
import emailjs from 'emailjs-com';

const InteractiveForm = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    industry: "",
    size: "",
    contactEmail: "",
    contactPhone: "",
    vision: "",
    mission: "",
    usp: "",
    mainServices: "",
    apiSpend: "",
    perfMarketingBudget: "",
    socialMediaSpend: "",
    digitalCampaignSpend: "",
    contentMarketingBudget: "",
    metrics: "",
    priorities: "",
    challenges: "",
    goals: "",
  });
  
  const industries = [
    "Technology",
    "Healthcare",
    "Finance",
    "Retail",
    "Manufacturing",
    "Consulting",
    "Others",
  ];

  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [showReport, setShowReport] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const sendEmail = (recipient, subject, message) => {
  return emailjs.send(
    import.meta.env.VITE_EMAILJS_SERVICE_ID,   // ✅ Correct
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID,  // ✅ Correct
    {
      to_email: recipient,
      subject,
      message,
    },
    import.meta.env.VITE_EMAILJS_PUBLIC_KEY 
  );
};
function formatKey(key) {
  // Split camelCase or snake_case into words and capitalize each
  return key
    .replace(/([A-Z])/g, " $1") // add space before capital letters
    .replace(/[_-]/g, " ") // replace underscores/dashes with space
    .replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1)); // capitalize each word
}



// Send to user and admin (can be parallel)

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "companyName":
        if (!value.trim()) error = "Company name is required";
        break;
      case "industry":
        if (!value.trim()) error = "Please select an industry";
        break;
      case "size":
        if (!value || value <= 0) error = "Enter a valid company size";
        break;
      case "apiSpend":
      case "perfMarketingBudget":
      case "socialMediaSpend":
      case "digitalCampaignSpend":
      case "contentMarketingBudget":
        if (value && value < 0) error = "Enter a positive value";
        break;
      case "contactEmail":
        if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          error = "Enter a valid email address";
        break;
      case "contactPhone":
        if (value && !/^\+?[0-9]{7,15}$/.test(value))
          error = "Enter a valid phone number";
        break;
      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const analyzeWithOpenAI = async () => {
    setIsAnalyzing(true);
    
    try {
      const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
      
      if (!apiKey) {
        throw new Error("OpenAI API key not found. Please add VITE_OPENAI_API_KEY to your environment variables.");
      }

      // Prepare the business data for analysis
      const businessData = {
        companyInfo: {
          name: formData.companyName,
          industry: formData.industry,
          size: formData.size,
          contact: {
            email: formData.contactEmail,
            phone: formData.contactPhone
          }
        },
        strategy: {
          vision: formData.vision,
          mission: formData.mission,
          valueProposition: formData.usp,
          services: formData.mainServices,
          priorities: formData.priorities,
          goals: formData.goals,
          challenges: formData.challenges,
          metrics: formData.metrics
        },
        budget: {
          apiSpend: formData.apiSpend ? parseInt(formData.apiSpend) : 0,
          performanceMarketing: formData.perfMarketingBudget ? parseInt(formData.perfMarketingBudget) : 0,
          socialMedia: formData.socialMediaSpend ? parseInt(formData.socialMediaSpend) : 0,
          digitalCampaigns: formData.digitalCampaignSpend ? parseInt(formData.digitalCampaignSpend) : 0,
          contentMarketing: formData.contentMarketingBudget ? parseInt(formData.contentMarketingBudget) : 0
        }
      };

      const prompt = `
You are a senior business analyst with 20+ years of experience evaluating companies across various industries. Please analyze the following business data and provide a comprehensive assessment.

Business Data:
${JSON.stringify(businessData, null, 2)}

Please provide your analysis in the following JSON format:

{
  "overallScore": [score out of 100],
  "categoryScores": {
    "companyInfo": [score out of 20],
    "visionMissionUSP": [score out of 25], 
    "marketingEffectiveness": [score out of 20],
    "budgetAllocation": [score out of 15],
    "strategicPlanning": [score out of 20]
  },
  "industryBenchmark": [typical score for this industry out of 100],
  "performance": {
    "level": "[Excellent/Good/Fair/Needs Improvement]",
    "color": "[CSS color class like text-green-700]",
    "description": "[brief description]"
  },
  "strengths": [
    "Array of specific strengths identified"
  ],
  "weaknesses": [
    "Array of specific weaknesses identified"  
  ],
  "recommendations": [
    "Array of actionable, specific recommendations"
  ],
  "detailedAnalysis": {
    "companyInfo": "Detailed analysis of company information completeness and quality",
    "visionMission": "Analysis of vision, mission, and value proposition clarity and strength",
    "marketingEffectiveness": "Assessment of marketing budget allocation and strategy",
    "budgetAllocation": "Analysis of budget distribution and efficiency",
    "strategicPlanning": "Evaluation of goals, priorities, and strategic thinking"
  }
}

Scoring Guidelines:
- Company Info (20 points): Completeness of basic information, contact details, company size appropriateness
- Vision/Mission/USP (25 points): Clarity, specificity, differentiation, alignment with industry
- Marketing Effectiveness (20 points): Budget adequacy, channel diversification, metrics tracking
- Budget Allocation (15 points): Efficiency, balance across channels, appropriate spend levels
- Strategic Planning (20 points): Goal clarity, priority setting, challenge identification, metric definition

Be precise, data-driven, and provide specific, actionable insights. Consider industry benchmarks and best practices.
`;

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: 'You are a senior business analyst providing comprehensive business assessments. Always respond with valid JSON only.'
            },
            {
              role: 'user', 
              content: prompt
            }
          ],
          temperature: 0.3,
          max_tokens: 2000
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('OpenAI API Error Response:', errorText);
        throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('OpenAI Response Data:', data);
      
      if (!data.choices || !data.choices[0] || !data.choices[0].message) {
        throw new Error('Invalid response structure from OpenAI API');
      }
      
      let responseContent = data.choices[0].message.content;
      console.log('Raw AI Response:', responseContent);
      
      // Clean up the response if it's wrapped in markdown code blocks
      responseContent = responseContent.replace(/```json\s*|\s*```/g, '').trim();
      console.log('Cleaned Response:', responseContent);
      
      // Parse the cleaned JSON
      let analysisResult;
      try {
        analysisResult = JSON.parse(responseContent);
      } catch (parseError) {
        console.error('JSON Parse Error:', parseError);
        console.error('Content that failed to parse:', responseContent);
        throw new Error(`Failed to parse AI response as JSON: ${parseError.message}`);
      }
      
      setAnalysis(analysisResult);
      setShowReport(true);

    } catch (error) {
      console.error('Analysis error:', error);
      alert(`Analysis failed: ${error.message}`);
    } finally {
      setIsAnalyzing(false);
    }
      // After setAnalysis(analysisResult); and before setShowReport(true);
const userEmail = formData.contactEmail;
const adminEmail = 'web.socialbureau@gmail.com'; // put your admin email here

const subject = `TrillionEdition AI Business Analysis Report for ${formData.companyName}`;
console.log(analysis || '');

const message = `
  <h2>Company Details</h2>
  <table border="1" cellpadding="6" cellspacing="0" 
    style="border-collapse: collapse; width: 100%; font-family: Arial, sans-serif; font-size: 14px;">
    <tr><td><strong>Company Name</strong></td><td>${formData.companyName}</td></tr>
    <tr><td><strong>Industry</strong></td><td>${formData.industry}</td></tr>
    <tr><td><strong>Size</strong></td><td>${formData.size}</td></tr>
    <tr><td><strong>Email</strong></td><td>${formData.contactEmail}</td></tr>
    <tr><td><strong>Phone</strong></td><td>${formData.contactPhone}</td></tr>
    <tr><td><strong>Vision</strong></td><td>${formData.vision}</td></tr>
    <tr><td><strong>Mission</strong></td><td>${formData.mission}</td></tr>
    <tr><td><strong>USP</strong></td><td>${formData.usp}</td></tr>
    <tr><td><strong>Main Services</strong></td><td>${formData.mainServices}</td></tr>
    <tr><td><strong>API Spend</strong></td><td>${formData.apiSpend}</td></tr>
    <tr><td><strong>Performance Marketing Budget</strong></td><td>${formData.perfMarketingBudget}</td></tr>
    <tr><td><strong>Social Media Spend</strong></td><td>${formData.socialMediaSpend}</td></tr>
    <tr><td><strong>Digital Campaign Spend</strong></td><td>${formData.digitalCampaignSpend}</td></tr>
    <tr><td><strong>Content Marketing Budget</strong></td><td>${formData.contentMarketingBudget}</td></tr>
    <tr><td><strong>Metrics</strong></td><td>${formData.metrics}</td></tr>
    <tr><td><strong>Priorities</strong></td><td>${formData.priorities}</td></tr>
    <tr><td><strong>Challenges</strong></td><td>${formData.challenges}</td></tr>
    <tr><td><strong>Goals</strong></td><td>${formData.goals}</td></tr>
  </table>

  <h2>Analysis Result</h2>
  <table border="1" cellpadding="6" cellspacing="0" 
    style="border-collapse: collapse; width: 100%; font-family: Arial, sans-serif; font-size: 14px;">
    <tr><td><strong>Overall Score</strong></td>
        <td style="color:${analysis.overallScore >= 70 ? 'green' : analysis.overallScore >= 50 ? 'orange' : 'red'};">
          ${analysis.overallScore}
        </td></tr>
    <tr><td><strong>Industry Benchmark</strong></td><td>${analysis.industryBenchmark}</td></tr>
    <tr><td><strong>Performance Level</strong></td>
        <td style="color:${analysis.performance.level === 'Good' ? 'green' : analysis.performance.level === 'Fair' ? 'orange' : 'red'};">
          ${analysis.performance.level}
        </td></tr>
    <tr><td><strong>Description</strong></td><td>${analysis.performance.description}</td></tr>
  </table>

  <h3>Category Scores</h3>
  <table border="1" cellpadding="6" cellspacing="0" 
    style="border-collapse: collapse; width: 100%; font-family: Arial, sans-serif; font-size: 14px;">
    ${Object.entries(analysis.categoryScores)
      .map(([k, v]) => {
        let color = v >= 15 ? "green" : v >= 10 ? "orange" : "red";
        return `<tr><td><strong>${formatKey(k)}</strong></td><td style="color:${color};">${v}</td></tr>`;
      })
      .join("")}
  </table>

  <h3>Strengths</h3>
  <ul>
    ${analysis.strengths.map(s => `<li>${s}</li>`).join("")}
  </ul>

  <h3>Weaknesses</h3>
  <ul>
    ${analysis.weaknesses.map(w => `<li>${w}</li>`).join("")}
  </ul>

  <h3>Recommendations</h3>
  <ul>
    ${analysis.recommendations.map(r => `<li>${r}</li>`).join("")}
  </ul>

  <h3>Detailed Analysis</h3>
  <ul>
    ${Object.entries(analysis.detailedAnalysis)
      .map(([k, v]) => `<li><strong>${k}:</strong> ${v}</li>`)
      .join("")}
  </ul>

  <p style="margin-top:20px;">Best regards,<br><strong><a style={{ fontFamily: "MyFont, sans-serif" }} href='https://socialbureau.in'>
              Social<span className="text-[#ff0000]">B</span>ureau
            </a> Team</strong></p>
`;

    sendEmail(userEmail, subject, message)
      .then(() => console.log('Email sent to user'))
      .catch(err => console.error('User email error:', err));

    sendEmail(adminEmail, subject, message)
      .then(() => console.log('Email sent to admin'))
      .catch(err => console.error('Admin email error:', err));

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
  if (!formData.contactEmail.trim()) {
    setErrors({ contactEmail: "Company email id is required" });
    return;
  }
  else if (!formData.contactPhone.trim()) {
    setErrors({ contactPhone: "Phone number is required" });
    return;
  }
    analyzeWithOpenAI();
  };

  const generateDetailedPDF = () => {
    if (!analysis) return;
    
    const reportWindow = window.open('', '_blank');
    
    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>AI Business Analysis Report</title>
        <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { 
                font-family: 'Segoe UI', Arial, sans-serif; 
                line-height: 1.6; 
                color: #333; 
                max-width: 80%;
                margin: 0 auto;
                background: linear-gradient(135deg, #eff6ff, #f0f9ff);
                padding: 20px;
                text-align: center; 
            }
            .header { 
                text-align: center; 
                margin-bottom: 30px; 
                border-bottom: 3px solid #dc2626;
                padding-bottom: 20px;
            }
            .header h1 { 
                color: #000000ff; 
                font-size: 28px; 
                margin-bottom: 10px; 
            }
            .header p { color: #666; font-size: 14px; }
            
            .score-section { 
                background: linear-gradient(135deg, #eff6ff, #f0f9ff); 
                padding: 25px; 
                border-radius: 12px; 
                margin: 20px 0; 
                border: 2px solid #dc2626;
                text-align: center;
            }
            .score-number { 
                font-size: 48px; 
                font-weight: bold; 
                color: #dc2626; 
                margin: 10px 0;
            }
            .performance-level { 
                display: inline-block;
                padding: 8px 16px; 
                border-radius: 20px; 
                font-weight: bold;
                margin: 10px 0;
            }
            .excellent { background: #dcfce7; color: #166534; }
            .good { background: #dbeafe; color: #1d4ed8; }
            .fair { background: #fef3c7; color: #d97706; }
            .needs-improvement { background: #fee2e2; color: #dc2626; }
            
            .section { 
                margin: 25px 0; 
                padding: 20px; 
                border-radius: 8px; 
                border-left: 4px solid #dc2626;
                background: #f9fafb;
            }
            .section h3 { 
                color: #dc2626; 
                font-size: 18px; 
                margin-bottom: 15px; 
            }
            
            .category-grid { 
                display: grid; 
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); 
                gap: 15px; 
                margin: 15px 0;
            }
            .category-item { 
                background: white; 
                padding: 15px; 
                border-radius: 8px; 
                border: 1px solid #e5e7eb;
                box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            }
            .category-label { 
                font-size: 12px; 
                color: #666; 
                margin-bottom: 5px; 
            }
            .category-score { 
                font-size: 18px; 
                font-weight: bold; 
                color: #dc2626; 
            }
            
            .list-section ul { 
                list-style: none; 
                padding-left: 0; 
            }
            .list-section li { 
                margin: 8px 0; 
                padding: 10px; 
                background: white; 
                border-radius: 6px; 
                border-left: 4px solid #dc2626;
                box-shadow: 0 1px 2px rgba(0,0,0,0.05);
            }
            .strength-item { border-left-color: #16a34a; }
            .weakness-item { border-left-color: #ea580c; }
            .recommendation-item { 
                border-left-color: #6366f1; 
                position: relative;
                padding-left: 40px;
            }
            .recommendation-number {
                position: absolute;
                left: 10px;
                top: 50%;
                transform: translateY(-50%);
                background: #6366f1;
                color: white;
                width: 20px;
                height: 20px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 12px;
                font-weight: bold;
            }
            
            @media print {
                body { padding: 0; }
            }
        </style>
    </head>
    <body>
        <div class="header">
            <h1>AI Business Analysis Report</h1>
            <p>Generated by OpenAI on ${new Date().toLocaleDateString()} for ${formData.companyName || 'Your Company'}</p>
        </div>

        <div class="score-section">
            <h2>Overall Business Score</h2>
            <div class="score-number">${analysis.overallScore}</div>
            <div>out of 100</div>
            <div class="performance-level ${analysis.performance.level.toLowerCase().replace(' ', '-')}">${analysis.performance.level}</div>
            <p style="margin-top: 10px; color: #666;">${analysis.performance.description}</p>
        </div>

        <div class="section">
            <h3>Category Breakdown</h3>
            <div class="category-grid">
                <div class="category-item">
                    <div class="category-label">Company Information</div>
                    <div class="category-score">${analysis.categoryScores.companyInfo}/20</div>
                </div>
                <div class="category-item">
                    <div class="category-label">Vision & Mission</div>
                    <div class="category-score">${analysis.categoryScores.visionMissionUSP}/25</div>
                </div>
                <div class="category-item">
                    <div class="category-label">Marketing Effectiveness</div>
                    <div class="category-score">${analysis.categoryScores.marketingEffectiveness}/20</div>
                </div>
                <div class="category-item">
                    <div class="category-label">Budget Allocation</div>
                    <div class="category-score">${analysis.categoryScores.budgetAllocation}/15</div>
                </div>
                <div class="category-item">
                    <div class="category-label">Strategic Planning</div>
                    <div class="category-score">${analysis.categoryScores.strategicPlanning}/20</div>
                </div>
            </div>
        </div>

        ${analysis.strengths.length > 0 ? `
        <div class="section">
            <h3>Key Strengths</h3>
            <div class="list-section">
                <ul>
                    ${analysis.strengths.map(strength => `<li class="strength-item">${strength}</li>`).join('')}
                </ul>
            </div>
        </div>
        ` : ''}

        ${analysis.weaknesses.length > 0 ? `
        <div class="section">
            <h3>Areas for Improvement</h3>
            <div class="list-section">
                <ul>
                    ${analysis.weaknesses.map(weakness => `<li class="weakness-item">${weakness}</li>`).join('')}
                </ul>
            </div>
        </div>
        ` : ''}

        ${analysis.recommendations.length > 0 ? `
        <div class="section">
            <h3>AI-Generated Recommendations</h3>
            <div class="list-section">
                <ul>
                    ${analysis.recommendations.map((rec, index) => `
                        <li class="recommendation-item">
                            <div class="recommendation-number">${index + 1}</div>
                            ${rec}
                        </li>
                    `).join('')}
                </ul>
            </div>
        </div>
        ` : ''}

        ${analysis.detailedAnalysis ? `
        <div class="section">
            <h3>Detailed Analysis</h3>
            ${Object.entries(analysis.detailedAnalysis).map(([key, value]) => `
                <div style="margin: 15px 0; padding: 15px; background: white; border-radius: 8px;">
                    <strong>${key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</strong>
                    <p style="margin-top: 8px;">${value}</p>
                </div>
            `).join('')}
        </div>
        ` : ''}

        <div style="margin-top: 30px; padding: 20px; background: #f3f4f6; border-radius: 8px; text-align: center; font-size: 12px; color: #666;">
            This report was generated using OpenAI's advanced AI analysis.
        </div>

        <script>
            window.onload = function() {
                setTimeout(() => {
                    window.print();
                }, 500);
            };
        </script>
    </body>
    </html>
    `;
    
    reportWindow.document.write(htmlContent);
    reportWindow.document.close();
  };

  const [collapsedSections, setCollapsedSections] = useState({
    basic: false,
    statements: true,
    budget: true,
    strategy: true
  });

  const toggleSection = (section) => {
    setCollapsedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const hasContent = (fields) => {
    return fields.some(field => formData[field] && formData[field].trim() !== '');
  };

  const getSectionProgress = (fields) => {
    const filledFields = fields.filter(field => formData[field] && formData[field].trim() !== '');
    return `${filledFields.length}/${fields.length}`;
  };

  const sections = [
    {
      key: 'basic',
      title: 'Company Information',
      icon: Building2,
      fields: ['companyName', 'industry', 'size', 'contactEmail', 'contactPhone'],
      content: (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <input 
              required
              type="text"
              name="companyName"
              placeholder="Company Name"
              value={formData.companyName}
              onChange={handleChange}
              className={`w-full bg-gradient-to-br from-black to-[#3f0000] text-gray-300 p-3 rounded-lg border 
                ${errors.companyName ? "border-red-500" : "border-gray-700"} 
                focus:border-red-500 focus:outline-none transition-all duration-200 text-sm sm:text-base`}
            />
            {errors.companyName && (
              <p className="text-red-500 text-xs mt-1">{errors.companyName}</p>
            )}
          </div>
          <div>
            <button name='industry'
              type="button"
              onClick={() => setOpen(!open)}
              className="w-full bg-black text-gray-300 p-3 rounded-lg border border-gray-700 text-left focus:outline-none"
            >
              {selected || "Select Industry / Sector"}
            </button>
            {open && (
              <ul className="absolute mt-1 w-full bg-black rounded-lg border border-gray-700 shadow-lg z-20 max-h-40 overflow-y-auto">
                {industries.map((industry, idx) => (
                  <li
                    key={idx}
                    onClick={() => {
                      setSelected(industry);
                      setFormData((prev) => ({ ...prev, industry })); 
                      validateField("industry", industry);
                      setOpen(false);
                    }}
                    className="cursor-pointer px-4 py-2 text-gray-300 hover:bg-red-700 hover:text-white"
                  >
                    {industry}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <input
              type="number"
              name="size"
              placeholder="Company Size (employees)"
              value={formData.size}
              onChange={handleChange}
              className={`w-full bg-gradient-to-br from-black to-[#3f0000] text-gray-300 p-3 rounded-lg border 
                ${errors.size ? "border-red-500" : "border-gray-700"} 
                focus:border-red-500 focus:outline-none transition-all duration-200 text-sm sm:text-base`}
            />
            {errors.size && (
              <p className="text-red-500 text-xs mt-1">{errors.size}</p>
            )}
          </div>
          <div>
            <input
              type="email" required
              name="contactEmail"
              placeholder="Email Address"
              value={formData.contactEmail}
              onChange={handleChange}
              className={`w-full bg-gradient-to-br from-black to-[#3f0000] text-gray-300 p-3 rounded-lg border 
                ${errors.contactEmail ? "border-red-500" : "border-gray-700"} 
                focus:border-red-500 focus:outline-none transition-all duration-200 text-sm sm:text-base`}
            />
            {errors.contactEmail && (
              <p className="text-red-500 text-xs mt-1">{errors.contactEmail}</p>
            )}
          </div>
          <div>
            <input
              type="text"
              name="contactPhone" required
              placeholder="Phone Number"
              value={formData.contactPhone}
              onChange={handleChange}
              className={`w-full bg-gradient-to-br from-black to-[#3f0000] text-gray-300 p-3 rounded-lg border 
                ${errors.contactPhone ? "border-red-500" : "border-gray-700"} 
                focus:border-red-500 focus:outline-none transition-all duration-200 text-sm sm:text-base`}
            />
            {errors.contactPhone && (
              <p className="text-red-500 text-xs mt-1">{errors.contactPhone}</p>
            )}
          </div>
        </div>
      )
    },
    {
      key: 'statements',
      title: 'Vision & Mission',
      icon: Target,
      fields: ['vision', 'mission', 'usp', 'mainServices'],
      content: (
        <div className="space-y-4">
          <textarea
            name="vision"
            placeholder="Vision Statement - Where do you see your company in the future?"
            value={formData.vision}
            onChange={handleChange}
            className="w-full h-20 bg-gradient-to-br from-black to-[#3f0000] text-gray-300 p-3 rounded-lg border border-gray-700 focus:border-red-500 focus:outline-none transition-all duration-200 text-sm sm:text-base resize-y"
          />
          <textarea
            name="mission"
            placeholder="Mission Statement - What is your company's core purpose?"
            value={formData.mission}
            onChange={handleChange}
            className="w-full h-20 bg-gradient-to-br from-black to-[#3f0000] text-gray-300 p-3 rounded-lg border border-gray-700 focus:border-red-500 focus:outline-none transition-all duration-200 text-sm sm:text-base resize-y"
          />
          <textarea
            name="usp"
            placeholder="Key Selling Points / Value Proposition - What makes you unique?"
            value={formData.usp}
            onChange={handleChange}
            className="w-full h-24 bg-gradient-to-br from-black to-[#3f0000] text-gray-300 p-3 rounded-lg border border-gray-700 focus:border-red-500 focus:outline-none transition-all duration-200 text-sm sm:text-base resize-y"
          />
          <textarea
            name="mainServices"
            placeholder="Services - What products or services do you offer?"
            value={formData.mainServices}
            onChange={handleChange}
            className="w-full h-24 bg-gradient-to-br from-black to-[#3f0000] text-gray-300 p-3 rounded-lg border border-gray-700 focus:border-red-500 focus:outline-none transition-all duration-200 text-sm sm:text-base resize-y"
          />
        </div>
      )
    },
    {
      key: 'budget',
      title: 'Budget Information',
      icon: DollarSign,
      fields: ['apiSpend', 'perfMarketingBudget', 'socialMediaSpend', 'digitalCampaignSpend', 'contentMarketingBudget'],
      content: (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <input
              type="number"
              name="apiSpend"
              placeholder="Digital Marketing Spend (Annual $)"
              value={formData.apiSpend}
              onChange={handleChange}
              className={`w-full bg-gradient-to-br from-black to-[#3f0000] text-gray-300 p-3 rounded-lg border 
                ${errors.apiSpend ? "border-red-500" : "border-gray-700"} 
                focus:border-red-500 focus:outline-none transition-all duration-200 text-sm sm:text-base`}
            />
            {errors.apiSpend && (
              <p className="text-red-500 text-xs mt-1">{errors.apiSpend}</p>
            )}
          </div>
          <div>
            <input
              type="number"
              name="perfMarketingBudget"
              placeholder="Performance Marketing Budget (Annual $)"
              value={formData.perfMarketingBudget}
              onChange={handleChange}
              className={`w-full bg-gradient-to-br from-black to-[#3f0000] text-gray-300 p-3 rounded-lg border 
                ${errors.perfMarketingBudget ? "border-red-500" : "border-gray-700"} 
                focus:border-red-500 focus:outline-none transition-all duration-200 text-sm sm:text-base`}
            />
            {errors.perfMarketingBudget && (
              <p className="text-red-500 text-xs mt-1">{errors.perfMarketingBudget}</p>
            )}
          </div>
          <div>
            <input
              type="number"
              name="socialMediaSpend"
              placeholder="Social Media Spend (Annual $)"
              value={formData.socialMediaSpend}
              onChange={handleChange}
              className={`w-full bg-gradient-to-br from-black to-[#3f0000] text-gray-300 p-3 rounded-lg border 
                ${errors.socialMediaSpend ? "border-red-500" : "border-gray-700"} 
                focus:border-red-500 focus:outline-none transition-all duration-200 text-sm sm:text-base`}
            />
            {errors.socialMediaSpend && (
              <p className="text-red-500 text-xs mt-1">{errors.socialMediaSpend}</p>
            )}
          </div>
          <div>
            <input
              type="number"
              name="digitalCampaignSpend"
              placeholder="Digital Campaign Spend (Annual $)"
              value={formData.digitalCampaignSpend}
              onChange={handleChange}
              className={`w-full bg-gradient-to-br from-black to-[#3f0000] text-gray-300 p-3 rounded-lg border 
                ${errors.digitalCampaignSpend ? "border-red-500" : "border-gray-700"} 
                focus:border-red-500 focus:outline-none transition-all duration-200 text-sm sm:text-base`}
            />
            {errors.digitalCampaignSpend && (
              <p className="text-red-500 text-xs mt-1">{errors.digitalCampaignSpend}</p>
            )}
          </div>
          <div>
            <input
              type="number"
              name="contentMarketingBudget"
              placeholder="Content Marketing Budget (Annual $)"
              value={formData.contentMarketingBudget}
              onChange={handleChange}
              className={`w-full bg-gradient-to-br from-black to-[#3f0000] text-gray-300 p-3 rounded-lg border 
                ${errors.contentMarketingBudget ? "border-red-500" : "border-gray-700"} 
                focus:border-red-500 focus:outline-none transition-all duration-200 text-sm sm:text-base`}
            />
            {errors.contentMarketingBudget && (
              <p className="text-red-500 text-xs mt-1">{errors.contentMarketingBudget}</p>
            )}
          </div>
        </div>
      )
    },
   {
  key: 'strategy',
  title: 'Strategic Planning',
  icon: MessageSquare,
  fields: ['priorities', 'challenges', 'goals', 'metrics'],
  content: (
    <div className="space-y-4">

      {/* Checklist - Priorities */}
      <div className="space-y-2">
        <p className="text-gray-300 text-sm">Business Priorities</p>
        {["Growth", "Cost Reduction", "Innovation", "Customer Retention", "Other"].map((priority) => (
          <label key={priority} className="flex items-center space-x-2 text-gray-300">
            <input
              type="checkbox"
              name="priorities"
              value={priority}
              checked={formData.priorities.includes(priority)}
              onChange={handleChange}
              className="accent-red-500 h-4 w-4"
            />
            <span>{priority}</span>
          </label>
        ))}
        {/* Text field for "Other" */}
        {formData.priorities.includes("Other") && (
          <input
            type="text"
            name="prioritiesOther"
            placeholder="Please specify"
            value={formData.prioritiesOther || ""}
            onChange={handleChange}
            className="w-full bg-black text-gray-300 p-2 rounded-lg border border-gray-700 focus:border-red-500 focus:outline-none text-sm"
          />
        )}
      </div>

      {/* Dropdown - Challenges */}
      <div className="space-y-2">
        <select
          name="challenges"
          value={formData.challenges}
          onChange={handleChange}
          className="w-full bg-black text-gray-300 p-3 rounded-lg border border-gray-700 focus:border-red-500 focus:outline-none transition-all duration-200 text-sm sm:text-base"
        >
          <option value="">Select Key Challenge</option>
          <option value="competition">High Competition</option>
          <option value="hiring">Talent Acquisition</option>
          <option value="scaling">Scaling Operations</option>
          <option value="cashflow">Cash Flow Management</option>
          <option value="other">Other</option>
        </select>
        {formData.challenges === "other" && (
          <input
            type="text"
            name="challengesOther"
            placeholder="Please specify"
            value={formData.challengesOther || ""}
            onChange={handleChange}
            className="w-full bg-black text-gray-300 p-2 rounded-lg border border-gray-700 focus:border-red-500 focus:outline-none text-sm"
          />
        )}
      </div>

      {/* Checklist - Goals */}
      <div className="space-y-2">
        <p className="text-gray-300 text-sm">Next 12-Month Goals</p>
        {["Expand Market", "Launch New Product", "Increase Revenue", "Improve Efficiency", "Other"].map((goal) => (
          <label key={goal} className="flex items-center space-x-2 text-gray-300">
            <input
              type="checkbox"
              name="goals"
              value={goal}
              checked={formData.goals.includes(goal)}
              onChange={handleChange}
              className="accent-red-500 h-4 w-4"
            />
            <span>{goal}</span>
          </label>
        ))}
        {formData.goals.includes("Other") && (
          <input
            type="text"
            name="goalsOther"
            placeholder="Please specify"
            value={formData.goalsOther || ""}
            onChange={handleChange}
            className="w-full bg-black text-gray-300 p-2 rounded-lg border border-gray-700 focus:border-red-500 focus:outline-none text-sm"
          />
        )}
      </div>

      {/* Checklist - Metrics */}
      <div className="space-y-2">
        <p className="text-gray-300 text-sm">Key Metrics (How you measure success)</p>
        {["Revenue Growth", "Customer Satisfaction", "Market Share", "Employee Productivity", "Other"].map((metric) => (
          <label key={metric} className="flex items-center space-x-2 text-gray-300">
            <input
              type="checkbox"
              name="metrics"
              value={metric}
              checked={formData.metrics.includes(metric)}
              onChange={handleChange}
              className="accent-red-500 h-4 w-4"
            />
            <span>{metric}</span>
          </label>
        ))}
        {formData.metrics.includes("Other") && (
          <input
            type="text"
            name="metricsOther"
            placeholder="Please specify"
            value={formData.metricsOther || ""}
            onChange={handleChange}
            className="w-full bg-black text-gray-300 p-2 rounded-lg border border-gray-700 focus:border-red-500 focus:outline-none text-sm"
          />
        )}
      </div>
    </div>
  )
}

  ];

  const ScoreBar = ({ label, score, maxScore, color = "bg-red-500" }) => (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-300">{label}</span>
        <span className="text-sm text-gray-400">{score}/{maxScore}</span>
      </div>
      <div className="w-full bg-black rounded-full h-2">
        <div 
          className={`${color} h-2 rounded-full transition-all duration-500`}
          style={{ width: `${(score / maxScore) * 100}%` }}
        ></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-black to-red-900 p-4 lg:pt-20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            AI Business Score Analyzer
          </h1>
          <p className="text-gray-400">
            Complete the sections below to get AI-powered comprehensive business analysis
          </p>
        </div>

        {!showReport ? (
          <div className="space-y-6">
            {sections.map((section) => {
              const isCollapsed = collapsedSections[section.key];
              const sectionHasContent = hasContent(section.fields);
              const progress = getSectionProgress(section.fields);
              const IconComponent = section.icon;

              return (
                <div key={section.key} className="bg-gradient-to-br from-red-800/50 to-black/50 rounded-xl border border-red-700/50 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-red-500/30">
                  <button name='progress'
                    type="button"
                    onClick={() => toggleSection(section.key)}
                    className="w-full p-4 sm:p-6 flex items-center justify-between hover:bg-red-800/30 transition-all duration-200"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gradient-to-br from-red-600 to-red-800 rounded-lg">
                        <IconComponent size={20} className="text-white" />
                      </div>
                      <div className="text-left">
                        <h3 className="text-lg sm:text-xl font-semibold text-white">
                          {section.title}
                        </h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-sm text-gray-400">
                            Progress: {progress}
                          </span>
                          {sectionHasContent && (
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {isCollapsed ? (
                        <ChevronDown className="text-gray-400 transition-transform duration-200" size={20} />
                      ) : (
                        <ChevronUp className="text-gray-400 transition-transform duration-200" size={20} />
                      )}
                    </div>
                  </button>

                  {!isCollapsed && (
                    <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                      <div className="border-t border-gray-700/50 pt-4">
                        {section.content}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Submit Section */}
            <div className="pt-6">
              <button name='analyze'
                type="submit" 
                onClick={handleSubmit}
                disabled={isAnalyzing}
                className="w-full bg-gradient-to-b from-[#3f0000] to-black text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isAnalyzing ? (
                  <>
                    <Loader className="animate-spin" size={20} />
                    <span>AI Analyzing Your Business...</span>
                  </>
                ) : (
                  <>
                    <BarChart3 size={20} />
                    <span>Generate AI Business Analysis</span>
                  </>
                )}
              </button>
            </div>

            {/* Progress Summary */}
            <div className="mt-8 bg-gradient-to-br from-red-800/30 to-black/30 rounded-xl p-4 sm:p-6 border border-red-700/50">
              <h3 className="text-lg font-semibold text-white mb-4">Completion Status</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {sections.map((section) => {
                  const progress = getSectionProgress(section.fields);
                  const IconComponent = section.icon;
                  const isComplete = progress.split('/')[0] === progress.split('/')[1];
                  
                  return (
                    <div key={section.key} className="text-center">
                      <div className={`inline-flex p-3 rounded-lg mb-2 ${isComplete ? 'bg-green-600/30 text-green-400' : 'bg-red-700/50 text-gray-400'}`}>
                        <IconComponent size={20} />
                      </div>
                      <div className="text-sm text-white">{section.title}</div>
                      <div className={`text-xs font-medium ${isComplete ? 'text-green-400' : 'text-gray-500'}`}>
                        {progress} complete
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          // AI Report Display
          <div className="space-y-8">
            {/* Overall Score */}
            <div className="bg-gradient-to-br from-red-800/50 to-black/50 rounded-xl border border-red-700/50 p-6 text-center">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <TrendingUp size={32} className="text-red-400" />
                <h2 className="text-3xl font-bold text-white">AI Business Analysis Score</h2>
              </div>
              <div className="text-6xl font-bold text-red-400 mb-2">{analysis.overallScore}</div>
              <div className="text-xl text-gray-300 mb-4">out of 100</div>
              <div className={`inline-flex items-center px-4 py-2 rounded-full ${analysis.performance.color} bg-opacity-20 border border-current`}>
                <span className="font-semibold">{analysis.performance.level}</span>
              </div>
              <p className="text-gray-400 mt-2">{analysis.performance.description}</p>
            </div>

            {/* Industry Benchmark */}
            {analysis.industryBenchmark && (
              <div className="bg-gradient-to-br from-red-800/30 to-black/30 rounded-xl border border-red-700/50 p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <BarChart3 className="mr-2" size={24} />
                  Industry Benchmark Comparison
                </h3>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-300">Your Score</span>
                  <span className="text-2xl font-bold text-white">{analysis.overallScore}</span>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-300">Industry Average ({formData.industry || 'General'})</span>
                  <span className="text-2xl font-bold text-red-400">{analysis.industryBenchmark}</span>
                </div>
                <div className="bg-black rounded-full h-3 relative">
                  <div 
                    className="bg-red-400 h-3 rounded-full absolute"
                    style={{ width: `${(analysis.overallScore / 100) * 100}%` }}
                  ></div>
                  <div 
                    className="w-1 h-6 bg-blue-400 absolute -top-1.5"
                    style={{ left: `${(analysis.industryBenchmark / 100) * 100}%` }}
                  ></div>
                </div>
                <div className="text-sm text-gray-400 mt-2">
                  {analysis.overallScore >= analysis.industryBenchmark ? 
                    `You're performing ${analysis.overallScore - analysis.industryBenchmark} points above industry average` :
                    `You're ${analysis.industryBenchmark - analysis.overallScore} points below industry average`}
                </div>
              </div>
            )}

            {/* Category Breakdown */}
            <div className="bg-gradient-to-br from-red-800/30 to-black/30 rounded-xl border border-red-700/50 p-6">
              <h3 className="text-xl font-bold text-white mb-6">AI Category Analysis</h3>
              <div className="space-y-4">
                <ScoreBar label="Company Information" score={analysis.categoryScores.companyInfo} maxScore={20} />
                <ScoreBar label="Vision & Mission" score={analysis.categoryScores.visionMissionUSP} maxScore={25} />
                <ScoreBar label="Marketing Effectiveness" score={analysis.categoryScores.marketingEffectiveness} maxScore={20} />
                <ScoreBar label="Budget Allocation" score={analysis.categoryScores.budgetAllocation} maxScore={15} />
                <ScoreBar label="Strategic Planning" score={analysis.categoryScores.strategicPlanning} maxScore={20} />
              </div>
            </div>

            {/* Strengths & Weaknesses */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-red-800/30 to-black/30 rounded-xl border border-red-700/50 p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <CheckCircle className="mr-2 text-green-400" size={24} />
                  AI-Identified Strengths
                </h3>
                <div className="space-y-3">
                  {analysis.strengths.length > 0 ? (
                    analysis.strengths.map((strength, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-300">{strength}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400 italic">Complete more sections to identify your strengths</p>
                  )}
                </div>
              </div>

              <div className="bg-gradient-to-br from-red-800/30 to-black/30 rounded-xl border border-red-700/50 p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <AlertTriangle className="mr-2 text-yellow-400" size={24} />
                  Areas for Improvement
                </h3>
                <div className="space-y-3">
                  {analysis.weaknesses.length > 0 ? (
                    analysis.weaknesses.map((weakness, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-300">{weakness}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400 italic">Excellent! No major areas of concern identified</p>
                  )}
                </div>
              </div>
            </div>

            {/* AI Recommendations */}
            <div className="bg-gradient-to-br from-red-800/30 to-black/30 rounded-xl border border-red-700/50 p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <Target className="mr-2 text-blue-400" size={24} />
                AI-Generated Recommendations
              </h3>
              <div className="space-y-4">
                {analysis.recommendations.length > 0 ? (
                  analysis.recommendations.map((recommendation, index) => (
                    <div key={index} className="bg-black/30 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">
                          {index + 1}
                        </div>
                        <p className="text-gray-300">{recommendation}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 italic">Complete your assessment to receive personalized AI recommendations</p>
                )}
              </div>
            </div>

            {/* Detailed Analysis */}
            {analysis.detailedAnalysis && (
              <div className="bg-gradient-to-br from-red-800/30 to-black/30 rounded-xl border border-red-700/50 p-6">
                <h3 className="text-xl font-bold text-white mb-4">Detailed AI Analysis</h3>
                <div className="space-y-4">
                  {Object.entries(analysis.detailedAnalysis).map(([key, value]) => (
                    <div key={key} className="bg-black/30 rounded-lg p-4">
                      <h4 className="font-semibold text-red-400 mb-2">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </h4>
                      <p className="text-gray-300">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button name='download'
                onClick={generateDetailedPDF}
                className="flex-1 bg-gradient-to-r from-red-600 to-red-800 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg flex items-center justify-center space-x-2"
              >
                <Download size={20} />
                <span>Download AI Report</span>
              </button>
              <button name='edit'
                onClick={() => setShowReport(false)}
                className="flex-1 bg-black text-white py-4 px-6 rounded-xl font-semibold transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg"
              >
                Edit Assessment
              </button>
            </div>

            <div className="bg-gradient-to-br from-black to-black/30 rounded-xl border border-[#3f0000] p-6 text-center">
              <h3 className="text-lg font-bold text-white mb-2">Powered by TrillionEdition</h3>
              <p className="text-gray-400 text-sm">
                This analysis was generated using advanced AI to provide you with data-driven insights and recommendations for your business.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InteractiveForm;