import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Check, ArrowRight, ChevronDown } from 'lucide-react'
import { pricingPlans } from '../data/projects'
import { variants } from '../lib/motion'

export default function PricingSection() {
    const sectionRef = useRef()
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

    return (
        <section
            ref={sectionRef}
            id="pricing"
            className="relative section-padding bg-dark-500"
        >
            {/* Grid background */}
            <div className="absolute inset-0 grid-background-subtle opacity-30" />

            <div className="section-container relative z-10">
                {/* Section Header */}
                <motion.div
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    variants={variants.staggerContainer}
                    className="text-center max-w-2xl mx-auto mb-16"
                >
                    <motion.span
                        variants={variants.staggerItem}
                        className="inline-block text-neon-500 font-mono text-sm mb-4"
                    >
                        SERVICES
                    </motion.span>

                    <motion.h2
                        variants={variants.staggerItem}
                        className="text-display-2 font-light mb-4"
                    >
                        Pricing
                    </motion.h2>

                    <motion.p
                        variants={variants.staggerItem}
                        className="text-lg text-white/60"
                    >
                        Whether you're a one-person army or a large team, I have a plan for you.
                    </motion.p>
                </motion.div>

                {/* Pricing Cards */}
                <motion.div
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    variants={variants.staggerContainer}
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto"
                >
                    {pricingPlans.map((plan, index) => (
                        <PricingCard
                            key={plan.id}
                            plan={plan}
                            index={index}
                        />
                    ))}
                </motion.div>
            </div>
        </section>
    )
}

function PricingCard({ plan, index }) {
    const [isExpanded, setIsExpanded] = useState(false)
    const [isHovered, setIsHovered] = useState(false)
    const showToggle = plan.features.length > 4
    const visibleFeatures = isExpanded ? plan.features : plan.features.slice(0, 4)

    return (
        <motion.div
            variants={variants.staggerItem}
            className={`relative group ${plan.recommended ? 'lg:-mt-4 lg:mb-4' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Recommended badge */}
            {plan.recommended && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <span className="px-4 py-1 bg-neon-500 text-dark-500 text-xs font-mono font-bold rounded-full">
                        RECOMMENDED
                    </span>
                </div>
            )}

            <motion.div
                className={`relative h-full rounded-2xl overflow-hidden ${plan.recommended
                        ? 'bg-white/10 border-2 border-neon-500/50'
                        : 'bg-white/5 border border-white/10'
                    }`}
                animate={{
                    boxShadow: isHovered
                        ? plan.recommended
                            ? '0 0 40px rgba(0, 255, 102, 0.3), 0 20px 60px rgba(0, 0, 0, 0.4)'
                            : '0 20px 60px rgba(0, 0, 0, 0.4)'
                        : '0 4px 24px rgba(0, 0, 0, 0.2)',
                }}
                transition={{ duration: 0.3 }}
            >
                {/* Card content */}
                <div className="p-6 lg:p-8">
                    {/* Plan name */}
                    <div className="mb-6">
                        <span className="text-sm font-mono text-white/50 uppercase tracking-wider">
                            {plan.name}
                        </span>
                    </div>

                    {/* Price */}
                    <div className="mb-6">
                        <div className="flex items-baseline gap-2">
                            <span className="text-4xl lg:text-5xl font-light">
                                {plan.price}
                            </span>
                            {plan.price !== 'Free' && plan.price !== 'Custom' && (
                                <span className="text-sm font-mono px-2 py-0.5 rounded bg-neon-500/10 text-neon-400">
                                    USD
                                </span>
                            )}
                        </div>
                        <p className="text-sm text-white/40 font-mono mt-1">
                            {plan.period}
                        </p>
                    </div>

                    {/* Description */}
                    <p className="text-white/60 text-sm leading-relaxed mb-6">
                        {plan.description}
                    </p>

                    {/* CTA Button */}
                    <motion.a
                        href={plan.ctaLink}
                        target={plan.ctaLink.startsWith('http') ? '_blank' : undefined}
                        rel={plan.ctaLink.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className={`flex items-center justify-between w-full px-5 py-3.5 rounded-lg font-mono text-sm transition-all ${plan.recommended
                                ? 'bg-neon-500 text-dark-500 hover:bg-neon-400'
                                : 'bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-white/20'
                            }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <span>{plan.cta}</span>
                        <ArrowRight className="w-4 h-4" />
                    </motion.a>

                    {/* Features divider */}
                    <div className="mt-8 mb-6">
                        <span className="text-xs font-mono text-white/30 uppercase tracking-wider">
                            What you get
                        </span>
                    </div>

                    {/* Features list */}
                    <ul className="space-y-3">
                        {visibleFeatures.map((feature, i) => (
                            <motion.li
                                key={i}
                                className="flex items-start gap-3 text-sm"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                            >
                                <span className={`w-1.5 h-1.5 mt-1.5 rounded-full flex-shrink-0 ${plan.recommended ? 'bg-neon-500' : 'bg-neon-500/70'
                                    }`} />
                                <span className="text-white/70">{feature}</span>
                            </motion.li>
                        ))}
                    </ul>

                    {/* Show more toggle */}
                    {showToggle && (
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="flex items-center gap-2 mt-4 text-sm text-white/40 hover:text-white/60 transition-colors"
                        >
                            <span>{isExpanded ? 'Show less' : 'Show more'}</span>
                            <motion.span
                                animate={{ rotate: isExpanded ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <ChevronDown className="w-4 h-4" />
                            </motion.span>
                        </button>
                    )}
                </div>

                {/* Animated border for recommended */}
                {plan.recommended && (
                    <motion.div
                        className="absolute inset-0 rounded-2xl pointer-events-none"
                        style={{
                            background: 'linear-gradient(90deg, transparent, rgba(0, 255, 102, 0.2), transparent)',
                        }}
                        animate={{
                            opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    />
                )}
            </motion.div>
        </motion.div>
    )
}
