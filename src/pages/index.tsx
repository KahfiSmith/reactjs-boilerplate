import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, Code, Rocket } from 'lucide-react'

export default function HomePage() {
    const [count, setCount] = useState(0)
    
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0c10] overflow-hidden relative">
            {/* Animated background gradient */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
            </div>

            {/* Mesh grid pattern */}
            <div className="absolute inset-0 bg-grid-white bg-[size:50px_50px] opacity-20"></div>
            
            <div className="relative w-full max-w-screen-xl mx-auto px-6 py-16 z-10">
                <div className="flex flex-col items-center justify-center gap-12">
                    {/* Logos with animation */}
                    <div className="flex justify-center items-center gap-10">
                        <motion.a 
                            href="https://vite.dev" 
                            target="_blank"
                            className="relative group"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500"></div>
                            <img src="/icons/vite.svg" className="relative h-16 w-auto" alt="Vite logo" />
                        </motion.a>
                        <motion.a 
                            href="https://react.dev" 
                            target="_blank"
                            className="relative group"
                            whileHover={{ scale: 1.1, rotate: -5 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500"></div>
                            <img src="/icons/react.svg" className="relative h-16 w-auto" alt="React logo" />
                        </motion.a>
                        <motion.a 
                            href="https://github.com/KahfiSmith" 
                            target="_blank"
                            className="relative group"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-500 to-slate-600 rounded-full opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500"></div>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="relative h-16 w-auto">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                        </motion.a>
                    </div>
                    
                    {/* Main heading with gradient */}
                    <motion.h1 
                        className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-500 tracking-tight"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        Vite + React
                    </motion.h1>
                    
                    {/* Counter card with glass effect */}
                    <motion.div 
                        className="w-full max-w-md rounded-2xl bg-white/[0.05] backdrop-blur-xl border border-white/10 overflow-hidden shadow-[0_0_60px_-15px_rgba(156,39,176,0.3)]"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className="p-8">
                            <button 
                                onClick={() => setCount((count) => count + 1)}
                                className="group w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-3 px-6 rounded-xl transition-all relative overflow-hidden mb-6"
                            >
                                <span className="relative z-10 flex items-center">
                                    <span className="mr-2">Count is {count}</span>
                                    <Rocket className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </span>
                                <span className="absolute inset-0 bg-gradient-to-r from-violet-400 to-fuchsia-500 opacity-0 group-hover:opacity-50 blur-2xl transition-opacity duration-500"></span>
                            </button>
                            
                            <div className="flex items-center gap-3 text-gray-300 text-sm border-l-2 border-purple-500/50 pl-3">
                                <Code className="w-4 h-4 text-purple-400" />
                                <p>
                                    Edit <code className="bg-black/20 px-1.5 py-0.5 rounded-md text-sm font-mono text-pink-400">src/pages/index.tsx</code> and save to test HMR
                                </p>
                            </div>
                        </div>
                        
                        <div className="bg-gradient-to-r from-purple-900/20 to-cyan-900/20 px-8 py-4 border-t border-white/10">
                            <div className="flex items-center gap-2 text-gray-400 text-sm">
                                <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                                <span>Click on the logos to learn more</span>
                                <ChevronRight className="w-3 h-3 ml-1" />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
