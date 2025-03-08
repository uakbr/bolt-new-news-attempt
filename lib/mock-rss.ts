// Mock RSS feed data to simulate real tech news feeds

export interface Article {
  title: string
  link: string
  content?: string
  contentSnippet: string
  pubDate: string
  creator?: string
  categories?: string[]
  source: string
}

// Generate a random date within the last 30 days
function randomRecentDate(): string {
  const now = new Date()
  const daysAgo = Math.floor(Math.random() * 30)
  const date = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000)
  return date.toISOString()
}

// Mock tech news articles
const mockArticles: Article[] = [
  // AI Articles
  {
    title: "Google's DeepMind Achieves Breakthrough in Protein Folding Prediction",
    link: "https://example.com/deepmind-protein-folding",
    contentSnippet:
      "DeepMind's latest AI model can predict protein structures with unprecedented accuracy, potentially revolutionizing drug discovery and biological research.",
    pubDate: randomRecentDate(),
    creator: "Sarah Johnson",
    categories: ["AI", "Machine Learning", "Science"],
    source: "TechCrunch",
  },
  {
    title: "OpenAI Releases GPT-5 with Enhanced Reasoning Capabilities",
    link: "https://example.com/openai-gpt5",
    contentSnippet:
      "The latest version of GPT demonstrates significant improvements in logical reasoning, mathematical problem-solving, and understanding complex instructions.",
    pubDate: randomRecentDate(),
    creator: "Michael Chen",
    categories: ["AI", "Natural Language Processing"],
    source: "The Verge",
  },
  {
    title: "AI Ethics Board Proposes New Guidelines for Autonomous Systems",
    link: "https://example.com/ai-ethics-guidelines",
    contentSnippet:
      "A coalition of tech companies and academic institutions has published comprehensive guidelines for developing and deploying ethical AI systems.",
    pubDate: randomRecentDate(),
    creator: "Emily Rodriguez",
    categories: ["AI", "Ethics", "Policy"],
    source: "Wired",
  },
  {
    title: "Meta's New AI Assistant Understands and Generates Visual Content",
    link: "https://example.com/meta-visual-ai",
    contentSnippet:
      "Meta has unveiled a multimodal AI assistant that can understand images and generate visual content based on natural language instructions.",
    pubDate: randomRecentDate(),
    creator: "David Thompson",
    categories: ["AI", "Computer Vision", "Meta"],
    source: "Ars Technica",
  },
  {
    title: "AI-Powered Diagnostic Tool Receives FDA Approval",
    link: "https://example.com/ai-diagnostic-fda",
    contentSnippet:
      "A new AI system that can detect early signs of various diseases from medical images has received FDA approval for clinical use.",
    pubDate: randomRecentDate(),
    creator: "Jessica Williams",
    categories: ["AI", "Healthcare", "FDA"],
    source: "TechCrunch",
  },
  {
    title: "Researchers Develop AI That Can Learn from Fewer Examples",
    link: "https://example.com/ai-few-shot-learning",
    contentSnippet:
      "A new machine learning approach requires significantly fewer training examples to achieve high accuracy, potentially making AI more accessible.",
    pubDate: randomRecentDate(),
    creator: "Robert Kim",
    categories: ["AI", "Machine Learning", "Research"],
    source: "The Verge",
  },
  {
    title: "AI Coding Assistant Improves Developer Productivity by 40%",
    link: "https://example.com/ai-coding-productivity",
    contentSnippet:
      "A study shows that developers using AI coding assistants complete tasks faster and with fewer bugs than those coding manually.",
    pubDate: randomRecentDate(),
    creator: "Alex Martinez",
    categories: ["AI", "Software Development", "Productivity"],
    source: "Wired",
  },
  {
    title: "New AI Chip Promises 3x Performance with Lower Power Consumption",
    link: "https://example.com/ai-chip-performance",
    contentSnippet:
      "A startup has unveiled a specialized AI processor that delivers three times the performance of current chips while using less power.",
    pubDate: randomRecentDate(),
    creator: "Jennifer Lee",
    categories: ["AI", "Hardware", "Technology"],
    source: "Ars Technica",
  },
  {
    title: "AI System Beats World Champion in Strategic Board Game",
    link: "https://example.com/ai-board-game-champion",
    contentSnippet:
      "An AI developed by university researchers has defeated the world champion in a complex strategy board game previously thought to be challenging for AI.",
    pubDate: randomRecentDate(),
    creator: "Thomas Wilson",
    categories: ["AI", "Games", "Competition"],
    source: "TechCrunch",
  },
  {
    title: "AI-Generated Art Wins Major Competition, Sparks Controversy",
    link: "https://example.com/ai-art-competition",
    contentSnippet:
      "An artwork created using AI has won a prestigious art competition, raising questions about creativity, authorship, and the future of art.",
    pubDate: randomRecentDate(),
    creator: "Sophia Garcia",
    categories: ["AI", "Art", "Controversy"],
    source: "The Verge",
  },
  {
    title: "New Framework Makes AI Models More Transparent and Explainable",
    link: "https://example.com/ai-transparency-framework",
    contentSnippet:
      "Researchers have developed a framework that helps explain how AI models reach their decisions, addressing the 'black box' problem.",
    pubDate: randomRecentDate(),
    creator: "Daniel Brown",
    categories: ["AI", "Transparency", "Research"],
    source: "Wired",
  },
  {
    title: "AI Predicts Climate Change Impacts with Unprecedented Accuracy",
    link: "https://example.com/ai-climate-prediction",
    contentSnippet:
      "A new AI model can predict climate change effects at local levels, helping communities prepare for specific environmental challenges.",
    pubDate: randomRecentDate(),
    creator: "Laura Johnson",
    categories: ["AI", "Climate Change", "Science"],
    source: "Ars Technica",
  },

  // Review Articles
  {
    title: "Review: iPhone 15 Pro Max Sets New Standards for Smartphone Photography",
    link: "https://example.com/iphone-15-pro-max-review",
    contentSnippet:
      "Apple's latest flagship impresses with its camera system, offering unprecedented low-light performance and computational photography features.",
    pubDate: randomRecentDate(),
    creator: "Jason Miller",
    categories: ["Reviews", "Smartphones", "Apple"],
    source: "TechCrunch",
  },
  {
    title: "Samsung Galaxy S24 Ultra Review: The Ultimate Android Experience",
    link: "https://example.com/galaxy-s24-ultra-review",
    contentSnippet:
      "Samsung's new flagship combines cutting-edge hardware with innovative AI features, though the high price may be a barrier for many.",
    pubDate: randomRecentDate(),
    creator: "Michelle Park",
    categories: ["Reviews", "Smartphones", "Samsung"],
    source: "The Verge",
  },
  {
    title: "Review: Sony WH-1000XM5 Headphones Deliver Best-in-Class Noise Cancellation",
    link: "https://example.com/sony-wh1000xm5-review",
    contentSnippet:
      "Sony's latest premium headphones offer improved sound quality and noise cancellation, though at a higher price point than predecessors.",
    pubDate: randomRecentDate(),
    creator: "Ryan Thompson",
    categories: ["Reviews", "Audio", "Headphones"],
    source: "Wired",
  },
  {
    title: "MacBook Pro M3 Max Review: A Performance Beast with Impressive Battery Life",
    link: "https://example.com/macbook-pro-m3-max-review",
    contentSnippet:
      "Apple's most powerful laptop delivers exceptional performance for creative professionals while maintaining impressive battery efficiency.",
    pubDate: randomRecentDate(),
    creator: "Amanda Chen",
    categories: ["Reviews", "Laptops", "Apple"],
    source: "Ars Technica",
  },
  {
    title: "Review: Steam Deck OLED Improves on an Already Great Handheld Gaming PC",
    link: "https://example.com/steam-deck-oled-review",
    contentSnippet:
      "Valve's updated handheld gaming device features a better display, longer battery life, and improved ergonomics.",
    pubDate: randomRecentDate(),
    creator: "Chris Johnson",
    categories: ["Reviews", "Gaming", "Hardware"],
    source: "TechCrunch",
  },
  {
    title: "Google Pixel 8 Pro Review: Computational Photography at Its Best",
    link: "https://example.com/pixel-8-pro-review",
    contentSnippet:
      "Google's flagship smartphone excels in photography and AI features, though it faces stiff competition in other areas.",
    pubDate: randomRecentDate(),
    creator: "Sarah Williams",
    categories: ["Reviews", "Smartphones", "Google"],
    source: "The Verge",
  },
  {
    title: "Review: Dell XPS 13 (2023) Balances Performance and Portability",
    link: "https://example.com/dell-xps-13-2023-review",
    contentSnippet:
      "Dell's latest ultrabook offers excellent build quality and performance in a compact form factor, though with some compromises.",
    pubDate: randomRecentDate(),
    creator: "Michael Rodriguez",
    categories: ["Reviews", "Laptops", "Dell"],
    source: "Wired",
  },
  {
    title: "Meta Quest 3 Review: The Best Mixed Reality Headset for Consumers",
    link: "https://example.com/meta-quest-3-review",
    contentSnippet:
      "Meta's new headset offers impressive mixed reality capabilities at a relatively affordable price point compared to competitors.",
    pubDate: randomRecentDate(),
    creator: "Jennifer Davis",
    categories: ["Reviews", "VR", "Meta"],
    source: "Ars Technica",
  },
  {
    title: "Review: Sonos Era 300 Delivers Impressive Spatial Audio Experience",
    link: "https://example.com/sonos-era-300-review",
    contentSnippet:
      "Sonos's latest speaker offers immersive spatial audio and excellent sound quality, though at a premium price.",
    pubDate: randomRecentDate(),
    creator: "David Wilson",
    categories: ["Reviews", "Audio", "Speakers"],
    source: "TechCrunch",
  },
  {
    title: "Microsoft Surface Laptop Studio 2 Review: Versatile but Expensive",
    link: "https://example.com/surface-laptop-studio-2-review",
    contentSnippet:
      "Microsoft's creative-focused laptop offers a unique form factor and good performance, but comes with a high price tag.",
    pubDate: randomRecentDate(),
    creator: "Emily Thompson",
    categories: ["Reviews", "Laptops", "Microsoft"],
    source: "The Verge",
  },
  {
    title: "Review: LG C3 OLED TV Remains the Gold Standard for Gaming and Movies",
    link: "https://example.com/lg-c3-oled-review",
    contentSnippet:
      "LG's latest OLED TV offers exceptional picture quality and gaming features, with incremental improvements over last year's model.",
    pubDate: randomRecentDate(),
    creator: "Robert Martinez",
    categories: ["Reviews", "TVs", "LG"],
    source: "Wired",
  },
  {
    title: "Bose QuietComfort Ultra Headphones Review: Premium Noise Cancellation at a Premium Price",
    link: "https://example.com/bose-quietcomfort-ultra-review",
    contentSnippet:
      "Bose's flagship headphones offer excellent sound quality and noise cancellation, but face tough competition from Sony and Apple.",
    pubDate: randomRecentDate(),
    creator: "Jessica Brown",
    categories: ["Reviews", "Audio", "Headphones"],
    source: "Ars Technica",
  },

  // General Tech News
  {
    title: "EU Passes Landmark AI Regulation: What It Means for Tech Companies",
    link: "https://example.com/eu-ai-regulation",
    contentSnippet:
      "The European Union has approved comprehensive regulations for artificial intelligence, setting global standards for AI development and use.",
    pubDate: randomRecentDate(),
    creator: "Emma Davis",
    categories: ["Policy", "AI", "Regulation"],
    source: "TechCrunch",
  },
  {
    title: "SpaceX Successfully Launches Starship, Achieves Orbital Flight",
    link: "https://example.com/spacex-starship-orbital",
    contentSnippet:
      "SpaceX's Starship rocket has completed its first successful orbital flight, marking a significant milestone for space exploration.",
    pubDate: randomRecentDate(),
    creator: "John Anderson",
    categories: ["Space", "SpaceX", "Technology"],
    source: "The Verge",
  },
  {
    title: "Major Tech Companies Form Coalition to Combat Deepfakes",
    link: "https://example.com/deepfake-coalition",
    contentSnippet:
      "Leading technology companies have announced a joint initiative to develop tools and standards to detect and prevent harmful deepfake content.",
    pubDate: randomRecentDate(),
    creator: "Lisa Wang",
    categories: ["Security", "AI", "Technology"],
    source: "Wired",
  },
  {
    title: "Quantum Computing Startup Raises $500M in Funding Round",
    link: "https://example.com/quantum-computing-funding",
    contentSnippet:
      "A promising quantum computing company has secured significant funding to develop practical quantum computers for commercial applications.",
    pubDate: randomRecentDate(),
    creator: "Mark Johnson",
    categories: ["Quantum Computing", "Startups", "Funding"],
    source: "Ars Technica",
  },
  {
    title: "New Cybersecurity Threat Targets Critical Infrastructure",
    link: "https://example.com/cybersecurity-infrastructure-threat",
    contentSnippet:
      "Security researchers have identified a sophisticated new malware targeting energy and water systems in multiple countries.",
    pubDate: randomRecentDate(),
    creator: "Paul Roberts",
    categories: ["Cybersecurity", "Infrastructure", "Threats"],
    source: "TechCrunch",
  },
  {
    title: "Apple Announces New AR/VR Headset at WWDC",
    link: "https://example.com/apple-ar-vr-headset",
    contentSnippet:
      "Apple has unveiled its long-awaited mixed reality headset, featuring advanced displays and a new operating system.",
    pubDate: randomRecentDate(),
    creator: "Samantha Lee",
    categories: ["Apple", "AR/VR", "Hardware"],
    source: "The Verge",
  },
]

// Sort articles by date (newest first)
mockArticles.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())

export async function fetchMockRSSFeeds() {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300))
  return mockArticles
}

