// Projects data for the portfolio
export const highlightedProjects = [
    {
        id: 'rigledger',
        title: 'RigLedger',
        shortDescription: 'Fast native offline Flutter app for equipment and asset tracking with real-time sync and logging capabilities.',
        fullDescription: 'A comprehensive equipment management solution built for field operations. Features offline-first architecture with smart synchronization, real-time tracking, and detailed logging. Designed for multi-platform performance with native speed.',
        features: [
            'Offline-first architecture with smart sync',
            'Real-time equipment tracking and logging',
            'Multi-platform native performance'
        ],
        techStack: ['Flutter', 'Dart', 'SQLite', 'Firebase'],
        github: 'https://github.com/ashwinsdk/rig-ledger',
        preview: 'https://rig-ledger.ashwinsdk.store/',
        media: {
            type: 'image',
            poster: '/projects/rigledger/poster.webp',
            video: null,
            videoFallback: null,
            screenshots: ['/projects/rigledger/01.jpg', '/projects/rigledger/02.jpg', '/projects/rigledger/03.jpg']
        },
        priority: 1,
        featured: true,
    },
    {
        id: 'urbandao',
        title: 'Urban DAO',
        shortDescription: 'UrbanDAO is a blockchain-powered smart-city management platform built as an Angular PWA with a gasless, role-based decentralized governance system.',
        fullDescription: 'The project combines on-chain transparency, operational efficiency, and frictionless user experience to coordinate every aspect of municipal interaction—from citizen grievances and taxation to project funding and feedback—through a multi-level DAO fueled by Ethereum (Sepolia, Polygon mainnet soon) and a robust Hardhat development environment.',
        features: [
            'Gasless UX',
            'Upgradeable Contracts',
            'Multilevel DAO'
        ],
        techStack: ['Blockchain', 'Angular', 'Typescript', 'Solidity'],
        github: 'https://github.com/ashwinsdk/urbanDAO',
        preview: 'https://urbandao.ashwinsdk.store/',
        media: {
            type: 'image',
            poster: '/projects/urbandao/poster.webp',
            video: null,
            videoFallback: null,
            screenshots: ['/projects/urbandao/poster.webp', '/projects/urbandao/preview-02.webp', '/projects/urbandao/preview-03.webp', '/projects/urbandao/preview-04.webp', '/projects/urbandao/preview-05.webp', '/projects/urbandao/preview-06.webp', '/projects/urbandao/preview-07.webp', '/projects/urbandao/preview-08.webp', '/projects/urbandao/preview-09.webp', '/projects/urbandao/preview-010.webp', '/projects/urbandao/preview-011.webp', '/projects/urbandao/preview-012.webp', '/projects/urbandao/preview-013.webp', '/projects/urbandao/preview-014.webp', '/projects/urbandao/preview-015.webp', '/projects/urbandao/preview-016.webp',]
        },
        priority: 2,
        featured: true,
    },
    {
        id: 'project-xylen',
        title: 'Project Xylen',
        shortDescription: 'Automated ensemble ML trading system with multi-model predictions and advanced risk management.',
        fullDescription: 'An intelligent trading platform leveraging ensemble machine learning for market predictions. Combines multiple models for robust decision-making with real-time data processing and sophisticated risk management algorithms.',
        features: [
            'Multi-model ensemble predictions',
            'Real-time market data processing',
            'Advanced risk management algorithms'
        ],
        techStack: ['Python', 'TensorFlow', 'PostgreSQL', 'Docker'],
        github: 'https://github.com/ashwinsdk/project-xylen',
        preview: 'https://project-xylen.ashwinsdk.store/',
        media: {
            type: 'image',
            poster: '/projects/xylen/poster.webp',
            video: null,
            videoFallback: null,
            screenshots: ['/projects/xylen/poster.webp', '/projects/xylen/preview-02.webp']
        },
        priority: 4,
        featured: true,
    },
]

export const moreProjects = [
    {
        id: 'metatask',
        title: 'MetaTask',
        shortDescription: 'A decentralized task management application with wallet authentication, task creation, and task completion tracking.',
        techStack: ['Blockchain', 'Solidity', 'Hardhat'],
        github: 'https://github.com/ashwinsdk/metatask',
        preview: 'https://meta-task.ashwinsdk.store/',
        media: {
            poster: '/projects/cli-toolkit/poster.webp',
        },
    },
    {
        id: 'kairo',
        title: 'Kairo',
        shortDescription: 'A comprehensive hyperlocal platform connecting residents with verified local service providers and vendors.',
        techStack: ['Flutter', 'Node', 'Docker'],
        github: null,
        preview: null,
        media: {
            poster: '/projects/api-gateway/poster.webp',
        },
    },
    {
        id: 'portfolio',
        title: 'Portfolio',
        shortDescription: 'Personal Portfolio',
        techStack: ['Next.js', 'JavaScript'],
        github: 'https://github.com/ashwinsdk/portfolio',
        preview: 'https://portfolio.ashwinsdk.store/',
        media: {
            poster: '/projects/ml-pipeline/poster.webp',
        },
    },
    {
        id: 'grievx',
        title: 'GrievX',
        shortDescription: 'Blockchain-powered transparency and trust in urban governance.',
        techStack: ['Blockchain', 'Solidity', 'Hardhat', 'React'],
        github: 'https://github.com/ashwinsdk/grievx',
        preview: 'https://grievx.ashwinsdk.store/',
        media: {
            poster: '/projects/design-system/poster.webp',
        },
    },
]

// Navigation items
export const navItems = [
    { label: 'Home', href: '#hero', active: true },
    { label: 'Projects', href: '#projects' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
]

// Social links
export const socialLinks = [
    {
        name: 'GitHub',
        href: 'https://github.com/ashwinsdk',
        icon: 'github'
    },
    {
        name: 'LinkedIn',
        href: 'https://linkedin.com/in/ashwinsdk',
        icon: 'linkedin'
    },
    {
        name: 'Twitter',
        href: 'https://twitter.com/ashwinsdk',
        icon: 'twitter'
    },
]

// Contact info
export const contact = {
    email: 'ashwinsdk.dev@gmail.com',
    github: 'https://github.com/ashwinsdk',
}

// Pricing plans (if applicable for services)
export const pricingPlans = [
    {
        id: 'starter',
        name: 'Starter',
        price: 'Free',
        period: 'Open Source',
        description: 'Access to all open-source projects and documentation.',
        features: [
            'Full source code access',
            'MIT licensed',
            'Community support',
            'Documentation included',
        ],
        cta: 'View on GitHub',
        ctaLink: 'https://github.com/ashwinsdk',
        recommended: false,
    },
    {
        id: 'consulting',
        name: 'Consulting',
        price: '₹900',
        period: 'per hour',
        description: 'Direct consulting for your technical challenges.',
        features: [
            'Architecture review',
            'Code review & optimization',
            'Technical mentorship',
            'Priority support',
            'Custom solutions',
        ],
        cta: 'Get in Touch',
        ctaLink: 'mailto:ashwinsdk.dev@gmail.com',
        recommended: true,
    },
    {
        id: 'enterprise',
        name: 'Enterprise',
        price: 'Custom',
        period: 'project-based',
        description: 'Full project development and dedicated support.',
        features: [
            'End-to-end development',
            'Dedicated support',
            'SLA guarantees',
            'Source code ownership',
            'Documentation & training',
            'Maintenance included',
        ],
        cta: 'Contact Me',
        ctaLink: 'mailto:ashwinsdk.dev@gmail.com',
        recommended: false,
    },
]
