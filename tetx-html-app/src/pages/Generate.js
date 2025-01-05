import React, { useState ,useEffect } from 'react';
import { 
  Sparkles, Code,  Copy, RefreshCw, Bot, 
  ChevronRight, Layout, Settings, MonitorPlay,
  Search, ChevronDown
} from 'lucide-react';
import { useLocation } from 'react-router-dom';



const Generate = () => {
  const [inputText, setInputText] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const location = useLocation();
  const { code } = location.state || {};
  const [activeTab, setActiveTab] = useState('html');
  const [isCopied, setIsCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  // Add these state variables at the top with your other state declarations
const [htmlCode, setHtmlCode] = useState('');
const [cssCode, setCssCode] = useState('');
  const [expandedCategories, setExpandedCategories] = useState({
    Layout: true,
    Components: true,
    Forms: true
  });

  const templates = [
    { name: 'Navigation Bar', category: 'Layout' },
    { name: 'Hero Section', category: 'Layout' },
    { name: 'Glass Card', category: 'Components' },
    { name: 'Gradient button', category: 'Components' },
    { name: 'Features Grid', category: 'Layout' },
    { name: 'Contact Form', category: 'Forms' },
    { name: 'Footer', category: 'Layout' },
    { name: 'Pricing Table', category: 'Components' },
    { name: 'Testimonials', category: 'Components' },
    { name: 'Statistics Grid', category: 'Components' }
  ];


  useEffect(() => {
    // Retrieve the prompt from location.state
    const { code } = location.state || {};
    setInputText(code)
    if (code) {
      // Generate the code based on the prompt
      generateHTML()
    }
  }, [location.state]);



  const generateHTML = async () => {
    try {
      setIsGenerating(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
  
      const response = await fetch("https://text-to-html-ochre.vercel.app/api/prompts/generate-html", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: inputText }),
      });
  
      const data = await response.json();
      
      // Check if the request was successful
      if (!data.success) {
        throw new Error(data.error || 'Failed to generate code');
      }
  
        // Store HTML and CSS separately
      setHtmlCode(data?.data?.html);
      setCssCode(data?.data?.css);
      // Extract HTML and CSS from the response data
      const { html, css } = data.data;
  
      // Combine HTML and CSS with default styling
      const styledHTML = `
        <style>
        ${css}
      </style>
      ${html}
      `;
  
      setGeneratedCode(styledHTML);
    } catch (error) {
      console.error('Error generating HTML:', error);
      // You might want to add error state handling here
    
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = (codeToCopy) => {
    navigator.clipboard.writeText(codeToCopy).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    });
  };

  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const sanitizeHTML = (html) => {
    return html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
               .replace(/on\w+="[^"]*"/g, '');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900">
      <div className="absolute inset-0 bg-[url('../public/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      
      {/* Header */}
      <div className="relative border-b border-purple-500/20 backdrop-blur-xl bg-black/30">
  <div className="flex items-center justify-center p-4">
    <div className="flex items-center gap-4">
      <Bot className="h-8 w-8 text-purple-400" />
      <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
        AI Code Generator
      </h1>
    </div>
    {/* <button className="p-2 hover:bg-purple-500/20 rounded-md transition-colors">
      <Settings className="h-5 w-5 text-purple-400" />
    </button> */}
  </div>
</div>


      <div className="relative flex h-[calc(100vh-64px)]">
        {/* Left Sidebar */}
        <div className="w-96 border-r border-purple-500/20 backdrop-blur-xl bg-black/30 flex flex-col">
          {/* Input Section */}
          <div className="p-4 border-b border-purple-500/20">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-400" />
                <h2 className="text-lg font-bold text-white">AI Input</h2>
              </div>
              <div className="px-3 py-1 rounded-full text-xs bg-purple-500/20 text-purple-300">
                AI Powered
              </div>
            </div>
            <textarea
              className="w-full h-40 bg-black/30 border border-purple-500/20 rounded-lg p-4 text-gray-100 font-mono text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Describe your component..."
            />
            <button 
              className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-all text-white"
              onClick={generateHTML}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="h-4 w-4" />
              )}
              {isGenerating ? 'Generating...' : 'Generate Code'}
            </button>
          </div>

          {/* Templates Section */}
          {/* <div className="flex-1 overflow-auto">
            <div className="p-4">
              <div className="flex items-center gap-2 mb-4">
                <Layout className="h-5 w-5 text-purple-400" />
                <h2 className="text-lg font-bold text-white">Templates</h2>
              </div>
              <div className="relative mb-4">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-purple-400" />
                <input
                  type="text"
                  placeholder="Search templates..."
                  className="w-full bg-black/30 text-gray-300 border border-purple-500/20 rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div className="space-y-2">
                {['Layout', 'Components', 'Forms'].map((category) => (
                  <div key={category} className="border border-purple-500/20 rounded-lg overflow-hidden bg-black/20">
                    <button
                      onClick={() => toggleCategory(category)}
                      className="w-full flex items-center justify-between p-3 hover:bg-purple-500/10 transition-colors"
                    >
                      <span className="text-sm font-medium text-gray-300">{category}</span>
                      <ChevronDown 
                        className={`h-4 w-4 text-purple-400 transition-transform ${
                          expandedCategories[category] ? 'transform rotate-180' : ''
                        }`}
                      />
                    </button>
                    {expandedCategories[category] && (
                      <div className="border-t border-purple-500/20">
                        {templates
                          .filter(t => t.category === category)
                          .map((template) => (
                            <button
                              key={template.name}
                              onClick={() => setInputText(`Generate a ${template.name.toLowerCase()}`)}
                              className="w-full flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-purple-500/10 hover:text-purple-400 transition-colors group"
                            >
                              <ChevronRight className="mr-2 h-4 w-4 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                              {template.name}
                            </button>
                          ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div> */}
        </div>

        {/* Right Content Area */}
        <div className="flex-1 backdrop-blur-xl bg-black/30">
              {/* Modify the tabs section */}
               <div className="flex items-center gap-2 p-4 border-b border-purple-500/20">
                  <button
                    onClick={() => setActiveTab('preview')}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors ${
                      activeTab === 'preview'
                        ? 'bg-purple-500/20 text-purple-400'
                        : 'text-gray-400 hover:text-gray-300'
                    }`}
                  >
                    <MonitorPlay className="h-4 w-4" />
                    Preview
                  </button>
                  <button
                    onClick={() => setActiveTab('html')}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors ${
                      activeTab === 'html'
                        ? 'bg-purple-500/20 text-purple-400'
                        : 'text-gray-400 hover:text-gray-300'
                    }`}
                  >
                    <Code className="h-4 w-4" />
                    HTML
                  </button>
                  <button
                    onClick={() => setActiveTab('css')}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors ${
                      activeTab === 'css'
                        ? 'bg-purple-500/20 text-purple-400'
                        : 'text-gray-400 hover:text-gray-300'
                    }`}
                  >
                    <Code className="h-4 w-4" />
                    CSS
                  </button>
                  <button
                    className="ml-auto flex items-center gap-2 px-3 py-1.5 rounded-md text-sm border border-purple-500/20 hover:bg-purple-500/10 transition-colors text-gray-300"
                    onClick={() => {
                      const codeToCopy =
                        activeTab === 'html' ? htmlCode :
                        activeTab === 'css' ? cssCode :
                        generatedCode;
                      handleCopy(codeToCopy);
                    }}
                  >
                    <Copy className="h-4 w-4" />
                    Copy Code
                  </button>
                  {isCopied && (
                    <div
                      className="absolute top-[-20px] right-4 bg-purple-500 text-white text-xs rounded-md py-1 px-2 animate-fade-in-out"
                      style={{
                        animation: 'fade-in-out 2s ease-in-out',
                      }}
                    >
                      Copied!
                    </div>
                  )}
               </div>

            {/* Update the content section */}
            <div className="p-4">
              {activeTab === 'preview' ? (
                <div className="relative">
                  <div className="absolute inset-0 backdrop-blur-xl bg-white/90 rounded-lg border border-purple-200/20" />
                  <div 
                    className="relative w-full h-[calc(100vh-200px)] rounded-lg p-4 overflow-auto"
                    dangerouslySetInnerHTML={{ __html: sanitizeHTML(generatedCode) }}
                  />
                </div>
              ) : activeTab === 'html' ? (
                <textarea
                  className="w-full h-[calc(100vh-200px)] bg-black/30 border border-purple-500/20 rounded-lg p-4 text-gray-100 font-mono text-sm"
                  value={htmlCode}
                  onChange={(e) => {
                    setHtmlCode(e.target.value);
                    setGeneratedCode(`
                      <style>${cssCode}</style>
                      ${e.target.value}
                    `);
                  }}
                  spellCheck="false"
                  placeholder="HTML code will appear here..."
                />
              ) : (
                <textarea
                  className="w-full h-[calc(100vh-200px)] bg-black/30 border border-purple-500/20 rounded-lg p-4 text-gray-100 font-mono text-sm"
                  value={cssCode}
                  onChange={(e) => {
                    setCssCode(e.target.value);
                    setGeneratedCode(`
                      <style>${e.target.value}</style>
                      ${htmlCode}
                    `);
                  }}
                  spellCheck="false"
                  placeholder="CSS code will appear here..."
                />
              )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Generate;