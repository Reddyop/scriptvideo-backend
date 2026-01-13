import { ToolDefinition } from '../types';

export const TOOLS: ToolDefinition[] = [
  // --- YOUTUBE TOOLS ---
  {
    id: 'yt-breakdown',
    name: 'Video Breakdown',
    description: 'Reverse engineer any viral video concept into hooks, structure, and retention patterns.',
    category: 'youtube',
    icon: 'Activity',
    cost: 3,
    inputs: [
      { name: 'url', label: 'YouTube URL or Topic', type: 'text', placeholder: 'Enter a link or a concept...', required: true }
    ],
    outputType: 'structured'
  },
  {
    id: 'yt-title',
    name: 'Title Generator',
    description: 'Generate high-CTR, click-worthy titles engineered for the algorithm.',
    category: 'youtube',
    icon: 'Type',
    cost: 1,
    inputs: [
      { name: 'topic', label: 'Video Topic', type: 'text', placeholder: 'e.g., How to build an AI app', required: true }
    ],
    outputType: 'list'
  },
  {
    id: 'yt-keyword',
    name: 'Keyword Research',
    description: 'Find high-volume, low-competition keywords for your specific niche.',
    category: 'youtube',
    icon: 'Search',
    cost: 2,
    inputs: [
      { name: 'topic', label: 'Primary Topic', type: 'text', placeholder: 'e.g., Crypto Trading', required: true }
    ],
    outputType: 'structured'
  },
  {
    id: 'yt-hook',
    name: 'Hook Generator',
    description: 'Create scroll-stopping hooks for the first 3 seconds of your video.',
    category: 'youtube',
    icon: 'Anchor',
    cost: 1,
    inputs: [
      { name: 'topic', label: 'Video Topic', type: 'text', required: true }
    ],
    outputType: 'list'
  },
  {
    id: 'yt-tags',
    name: 'Tag Generator',
    description: 'SEO optimized tags to help the algorithm categorize your content.',
    category: 'youtube',
    icon: 'Hash',
    cost: 1,
    inputs: [
      { name: 'topic', label: 'Video Topic', type: 'text', required: true }
    ],
    outputType: 'list'
  },
  {
    id: 'yt-description',
    name: 'Description Generator',
    description: 'Write keyword-rich descriptions with timestamps and CTA.',
    category: 'youtube',
    icon: 'FileText',
    cost: 2,
    inputs: [
      { name: 'topic', label: 'Video Topic', type: 'text', required: true },
      { name: 'keywords', label: 'Target Keywords', type: 'text' }
    ],
    outputType: 'structured'
  },
  {
    id: 'yt-thumb-text',
    name: 'Thumbnail Text',
    description: 'Psychologically proven text ideas to increase thumbnail CTR.',
    category: 'youtube',
    icon: 'Sparkles',
    cost: 1,
    inputs: [
      { name: 'topic', label: 'Video Topic', type: 'text', required: true }
    ],
    outputType: 'list'
  },
  {
    id: 'yt-transcript',
    name: 'Transcript Planner',
    description: 'Plan the flow of your video transcript for maximum retention.',
    category: 'utility',
    icon: 'FileText',
    cost: 2,
    inputs: [
      { name: 'topic', label: 'Main Script Topic', type: 'textarea', required: true }
    ],
    outputType: 'structured'
  },
  
  // --- STRATEGY TOOLS ---
  {
    id: 'strat-plan',
    name: 'Content Strategy',
    description: 'A full 30-day roadmap tailored for your specific channel growth.',
    category: 'strategy',
    icon: 'Map',
    cost: 5,
    inputs: [
      { name: 'niche', label: 'Channel Niche', type: 'text', required: true },
      { name: 'goal', label: 'Current Goal', type: 'select', options: ['Get Monetized', 'Scale Brand', 'Find Audience'], required: true }
    ],
    outputType: 'structured'
  },
  {
    id: 'strat-ideas',
    name: 'Video Ideas',
    description: '20+ viral-worthy video concepts designed for your sub-niche.',
    category: 'strategy',
    icon: 'Lightbulb',
    cost: 2,
    inputs: [
      { name: 'niche', label: 'Channel Niche', type: 'text', required: true }
    ],
    outputType: 'list'
  },
  {
    id: 'strat-names',
    name: 'Channel Names',
    description: 'Brandable, memorable names for your new YouTube venture.',
    category: 'strategy',
    icon: 'AtSign',
    cost: 1,
    inputs: [
      { name: 'vibe', label: 'Brand Vibe', type: 'text', placeholder: 'e.g., Tech, Minimalism, Hype', required: true }
    ],
    outputType: 'list'
  },
  {
    id: 'strat-niche',
    name: 'Niche Finder',
    description: 'Drill down into highly profitable sub-niches with low competition.',
    category: 'strategy',
    icon: 'Target',
    cost: 2,
    inputs: [
      { name: 'interest', label: 'Broad Interest', type: 'text', placeholder: 'e.g., Cooking, Fitness', required: true }
    ],
    outputType: 'list'
  }
];

export const getToolById = (id: string) => TOOLS.find(t => t.id === id);