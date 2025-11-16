'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { ArrowRight, Box, Cpu, GitBranch } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

// ToolChain Landing Page — single-file Next.js-ready React component
// Requires Tailwind CSS + Framer Motion + lucide-react
// Place this file in your app/page (app/page.jsx) or components and import into a page

export default function ToolChainLanding() {
  // custom cursor
  const cursorRef = useRef(null)
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 })

  useEffect(() => {
    const move = (e) => setCursorPos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  // 3D card mouse tilt
  const cardRef = useRef(null)
  const handleMove = (e) => {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const cx = rect.width / 2
    const cy = rect.height / 2
    const dx = (x - cx) / cx
    const dy = (y - cy) / cy
    const rotateX = dy * 10
    const rotateY = dx * -10
    el.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`
    // parallax inner
    const inner = el.querySelector('.card-inner')
    if (inner) inner.style.transform = `translateX(${dx * -8}px) translateY(${dy * -8}px)`
  }
  const handleLeave = () => {
    const el = cardRef.current
    if (!el) return
    el.style.transform = `rotateX(0deg) rotateY(0deg)`
    const inner = el.querySelector('.card-inner')
    if (inner) inner.style.transform = `translateX(0px) translateY(0px)`
  }

  // floating shapes animation using framer-motion values
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  useEffect(() => {
    const id = setInterval(() => {
      x.set((Math.random() - 0.5) * 60)
      y.set((Math.random() - 0.5) * 40)
    }, 3000)
    return () => clearInterval(id)
  }, [x, y])

  const floatX = useTransform(x, (v) => `${v}px`)
  const floatY = useTransform(y, (v) => `${v}px`)

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-[#0f172a] to-[#071233] text-slate-100 overflow-hidden relative">
      {/* moving decorative blobs */}
      <motion.div style={{ x: floatX, y: floatY }} className="pointer-events-none fixed -z-10 left-1/4 top-10 opacity-30">
        <div className="w-80 h-80 rounded-full bg-linear-to-tr from-purple-500 to-pink-500 blur-3xl" />
      </motion.div>
      <motion.div style={{ x: floatX, y: floatY }} className="pointer-events-none fixed -z-10 right-1/4 bottom-10 opacity-20">
        <div className="w-72 h-72 rounded-full bg-linear-to-tr from-cyan-400 to-blue-500 blur-3xl" />
      </motion.div>

      {/* navbar */}
      <header className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center shadow-xl">
            <Image src="/logo.svg" alt="logo" width={45} height={45} />
          </div>
          <div className="font-semibold text-lg tracking-wide">ToolChain</div>
        </div>
        <nav className="hidden md:flex gap-6 items-center text-slate-200/80">
          <a className="hover:text-white">Features</a>
          <a className="hover:text-white">Docs</a>
          <a className="hover:text-white">Pricing</a>
          <Link href='/sign-up'><button className="ml-2 bg-linear-to-r from-indigo-600 to-violet-600 px-4 py-2 rounded-lg shadow-md hover:scale-105 transition-transform flex items-center gap-2">
            Get Started <ArrowRight className="w-4 h-4" />
          </button></Link>
        </nav>
        <div className="md:hidden text-slate-300">Menu</div>
      </header>

      {/* hero */}
      <main className="max-w-6xl mx-auto px-6 pt-8 pb-24 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <section>
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">ToolChain — Build & Run AI Agents visually</h1>
          <p className="mt-6 text-lg text-slate-300/80 max-w-xl">Visual workflow builder, safe execution, and live preview for autonomous AI agents. Connect prompts, conditions, and actions — then run an agent that follows your chain.</p>

          <div className="mt-8 flex gap-4">
            <Link href='/sign-up'><button className="px-6 py-3 bg-linear-to-r from-emerald-500 to-teal-400 rounded-lg font-medium shadow-lg hover:scale-105 transition-transform">Try ToolChain</button></Link>
            <button className="px-6 py-3 border border-slate-700 rounded-lg text-slate-200 hover:bg-slate-800">View Demo</button>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-4 text-slate-300">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-slate-800 rounded-md"><Cpu className="w-5 h-5"/></div>
              <div>
                <div className="font-semibold">Run agents</div>
                <div className="text-sm text-slate-400">Connect nodes to define behavior.</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 bg-slate-800 rounded-md"><GitBranch className="w-5 h-5"/></div>
              <div>
                <div className="font-semibold">Versioned flows</div>
                <div className="text-sm text-slate-400">Snapshot and rollback your agent designs.</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 bg-slate-800 rounded-md"><Box className="w-5 h-5"/></div>
              <div>
                <div className="font-semibold">Safe actions</div>
                <div className="text-sm text-slate-400">Sandbox webhooks and rate limits out-of-the-box.</div>
              </div>
            </div>
          </div>
        </section>

        {/* 3D interactive card */}
        <section className="flex justify-center md:justify-end">
          <div
            ref={cardRef}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            className="relative w-[420px] h-[360px] bg-linear-to-br from-[#0b1220]/60 to-[#071233]/60 rounded-2xl shadow-2xl backdrop-blur-md border border-slate-700/30 transform-gpu transition-transform"
            style={{ perspective: 1200 }}
          >
            <div className="card-inner absolute inset-0 p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-slate-300/80 text-sm">Live Preview</div>
                  <div className="text-white font-semibold">Agent: Marketing Assistant</div>
                </div>
                <div className="text-slate-400 text-xs">v0.9</div>
              </div>

              <div className="mt-2 grow flex flex-col gap-2">
                <div className="flex gap-2 items-center">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <div className="text-slate-300 text-sm">Listening for user input...</div>
                </div>

                <div className="mt-4 bg-linear-to-b from-slate-800/50 to-slate-900/30 rounded-lg p-3 flex flex-col gap-2">
                  <div className="text-xs text-slate-400">Prompt</div>
                  <div className="text-sm text-white">Write a short promotional message for our new productivity tool.</div>
                </div>

                <div className="mt-auto flex gap-2 items-center">
                  <button className="px-4 py-2 rounded-md bg-indigo-600/90 hover:scale-105 transition">Run</button>
                  <button className="px-3 py-2 rounded-md border border-slate-700 text-sm">Stop</button>
                  <div className="ml-auto text-xs text-slate-400">Last run: 2m ago</div>
                </div>
              </div>

              <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-linear-to-tr from-pink-500 to-orange-400 blur-2xl opacity-30" />
            </div>
          </div>
        </section>
      </main>

      {/* features */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard title="Visual Builder" desc="Drag & drop nodes, connect logic, inspect runtime." />
          <FeatureCard title="Streaming" desc="Stream model outputs into the UI in real-time." />
          <FeatureCard title="Integrations" desc="HTTP actions, DB connectors and webhooks." />
        </div>
      </section>

      {/* footer */}
      <footer className="mt-12 border-t border-slate-800/60 pt-8 pb-12">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded  flex items-center justify-center"><Image src="/logo.svg" alt="logo" width={24} height={24} /></div>
            <div>© {new Date().getFullYear()} ToolChain</div>
          </div>
          <div className="text-slate-400 text-sm">Built with ❤️ for creators of autonomous agents.</div>
        </div>
      </footer>

      {/* custom cursor */}
      <div
        ref={cursorRef}
        style={{ left: cursorPos.x - 12, top: cursorPos.y - 12 }}
        className="pointer-events-none fixed w-8 h-8 rounded-full bg-white/20 border border-white/30 backdrop-blur-sm transform-gpu transition-all duration-150"
      />
    </div>
  )
}

// small feature card component
function FeatureCard({ title, desc }) {
  return (
    <motion.div whileHover={{ y: -6 }} className="bg-linear-to-b from-slate-800/60 to-slate-900/30 rounded-xl p-6 shadow-lg border border-slate-700/30">
      <div className="font-semibold text-white">{title}</div>
      <div className="mt-2 text-slate-300 text-sm">{desc}</div>
    </motion.div>
  )
}
