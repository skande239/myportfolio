/*
Next.js + Tailwind single-file demo page (pages/index.jsx)
Features included:
- Hero with animated avatar (fade-in + scale)
- Fetch GitHub repos (getStaticProps) from https://github.com/skande239
- Animated project cards (Framer Motion) with 3D tilt on hover
- Placeholder resume timeline (expects a parsedResume JSON or PDF path)
- Skills with animated radial / progress bars
- Contact form with animated inputs and success state
- Locomotive Scroll integration (dynamic import)

Notes:
- Add Framer Motion: `npm i framer-motion`
- Add Locomotive Scroll: `npm i locomotive-scroll`
- Add tailwindcss (setup per Tailwind docs). This file assumes Tailwind is configured.
- Set GITHUB_TOKEN in env if you hit rate limits when fetching repos.
- For resume PDF parsing, replace `parsedResume` with actual parsing result or attach a resume file and parse server-side.
*/

import React, { useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

// For server-side fetch
export async function getStaticProps() {
  const username = 'skande239'
  const token = process.env.GITHUB_TOKEN || null
  const headers = token ? { Authorization: `token ${token}` } : {}
  try {
    const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, { headers })
    const repos = await res.json()
    const filtered = Array.isArray(repos)
      ? repos.map(r => ({
          id: r.id,
          name: r.name,
          description: r.description,
          html_url: r.html_url,
          language: r.language,
          stargazers_count: r.stargazers_count,
          updated_at: r.updated_at,
        }))
      : []

    return { props: { repos: filtered }, revalidate: 3600 }
  } catch (err) {
    console.error(err)
    return { props: { repos: [] } }
  }
}

// Simple tilt hook for 3D hover tilt
function useTilt() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    function handleMove(e) {
      const rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height
      const rotateX = (y - 0.5) * 10
      const rotateY = (x - 0.5) * -10
      el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`
      el.style.transition = 'transform 150ms ease'
    }
    function handleLeave() {
      el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)'
      el.style.transition = 'transform 300ms ease'
    }
    el.addEventListener('mousemove', handleMove)
    el.addEventListener('mouseleave', handleLeave)
    return () => {
      el.removeEventListener('mousemove', handleMove)
      el.removeEventListener('mouseleave', handleLeave)
    }
  }, [])
  return ref
}

export default function Home({ repos }) {
  const [contactState, setContactState] = useState('idle') // idle, sending, success
  const tiltRef = useTilt() // demo tilt for single element; we'll use individual refs in cards too

  // Placeholder parsed resume (replace with real parsed PDF content)
  const parsedResume = {
    education: [
      { id: 1, date: '2022', title: 'IT Technical Support Certificate', org: 'Some Institute', details: 'Support, networking, Windows and Linux administration.' },
    ],
    experience: [
      { id: 1, date: '2023-2024', title: 'IT Support', org: 'Company XYZ', details: 'Handled hardware & software support, ticketing, client onboarding.' },
    ],
  }

  useEffect(() => {
    // Locomotive Scroll dynamic import for client-side only
    let loco
    import('locomotive-scroll').then(({ default: LocomotiveScroll }) => {
      if (typeof window === 'undefined') return
      loco = new LocomotiveScroll({ el: document.querySelector('[data-scroll-container]'), smooth: true, multiplier: 1, smartphone: { smooth: true }, tablet: { smooth: true } })
      // refresh on load
      setTimeout(() => loco.update(), 500)
    }).catch(err => console.warn('Locomotive Scroll failed to load', err))
    return () => loco && loco.destroy()
  }, [])

  return (
    <div data-scroll-container className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-slate-100 antialiased">
      <Head>
        <title>Skander Deli — IT Technical Support</title>
        <meta name="description" content="Portfolio of Skander Deli — IT Technical Support, projects, resume and contact." />
      </Head>

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* HERO */}
        <section aria-label="Hero" className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="flex items-center justify-center md:justify-start">
            <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
              {/* Replace with your real image; using next/image optimizes loading */}
              <Image src="/avatar.jpg" alt="Skander Deli avatar" fill style={{ objectFit: 'cover' }} priority sizes="(max-width: 768px) 200px, 300px" />
              <div className="absolute inset-0 pointer-events-none" aria-hidden>
                <motion.div animate={{ scale: [1, 1.02, 1], rotate: [0, 0.3, 0] }} transition={{ duration: 8, repeat: Infinity }} className="w-full h-full bg-gradient-to-tr from-transparent via-white/2 to-transparent mix-blend-overlay" />
              </div>
            </div>
          </motion.div>

          <div>
            <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="text-4xl md:text-5xl font-extrabold tracking-tight">
              Skander Deli
            </motion.h1>
            <motion.h2 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.35 }} className="mt-2 text-lg md:text-xl text-sky-300">
              IT Technical Support
            </motion.h2>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-4 text-slate-300 max-w-xl leading-relaxed">
              I help people and organisations stay productive — troubleshooting hardware, managing networks, and improving user experience.
              Focused on fast diagnosis, clear communication and turning complex problems into simple solutions.
            </motion.p>

            <div className="mt-6 flex gap-4">
              <motion.a whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }} href="#projects" className="inline-flex items-center gap-3 px-4 py-2 bg-sky-600/90 hover:bg-sky-500 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-sky-400">
                View Projects
n              </motion.a>

              <motion.a whileHover={{ scale: 1.03 }} href="#contact" className="inline-flex items-center gap-3 px-4 py-2 border border-white/10 rounded-lg hover:bg-white/5">
                Contact
              </motion.a>
            </div>
          </div>
        </section>

        {/* Background animated shapes (parallax feel) */}
        <div aria-hidden className="pointer-events-none -z-10">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.08 }} transition={{ duration: 1 }} className="fixed right-4 top-20 w-60 h-60 rounded-full blur-3xl bg-gradient-to-r from-fuchsia-600 to-indigo-500" />
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.04 }} transition={{ duration: 1.4 }} className="fixed left-6 bottom-6 w-80 h-80 rounded-full blur-3xl bg-gradient-to-r from-emerald-500 to-green-600" />
        </div>

        {/* PROJECTS */}
        <section id="projects" aria-label="Projects" className="mb-20">
          <motion.h3 initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} className="text-2xl font-semibold mb-6">
            Projects
          </motion.h3>

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {repos.length === 0 && (
              <div className="col-span-full text-slate-400">No public repositories found or failed to fetch. Make sure the GitHub username is correct and consider adding a token to avoid rate limits.</div>
            )}

            {repos.map(repo => (
              <motion.article key={repo.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="bg-slate-850/60 backdrop-blur-md border border-white/6 rounded-xl p-4 shadow-lg">
                {/* 3D tilt container */}
                <div ref={tiltRef} className="group relative rounded-lg overflow-hidden">
                  <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="block">
                    <div className="h-36 md:h-40 flex items-center justify-center bg-gradient-to-br from-white/3 to-white/2 rounded-md mb-3">
                      <div className="text-sm text-slate-200">{repo.name}</div>
                    </div>
                  </a>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-lg">{repo.name}</h4>
                      <p className="text-sm text-slate-400 mt-1 line-clamp-2">{repo.description || 'No description'}</p>
                    </div>
                    <div className="text-right text-xs text-slate-400">
                      <div>{repo.language}</div>
                      <div className="mt-1">⭐ {repo.stargazers_count}</div>
                    </div>
                  </div>

                  <div className="mt-3 flex gap-3">
                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="px-3 py-1 text-sm rounded-md border border-white/6 hover:scale-105 transform transition">
                      View
                    </a>
                    <button className="px-3 py-1 text-sm rounded-md border border-white/6 hover:scale-105 transform transition">
                      Details
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* RESUME TIMELINE */}
        <section id="resume" aria-label="Resume" className="mb-20">
          <h3 className="text-2xl font-semibold mb-6">Resume</h3>

          <div className="space-y-8">
            <div>
              <h4 className="font-semibold">Experience</h4>
              <div className="mt-4 border-l border-white/6 pl-6">
                {parsedResume.experience.map(item => (
                  <motion.div key={item.id} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="mb-6">
                    <div className="text-sm text-sky-300">{item.date}</div>
                    <div className="font-medium">{item.title} — {item.org}</div>
                    <AnimatePresence>
                      <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35 }} className="mt-2 text-slate-300">
                        {item.details}
                      </motion.p>
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold">Education</h4>
              <div className="mt-4 border-l border-white/6 pl-6">
                {parsedResume.education.map(item => (
                  <motion.div key={item.id} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="mb-6">
                    <div className="text-sm text-sky-300">{item.date}</div>
                    <div className="font-medium">{item.title} — {item.org}</div>
                    <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="mt-2 text-slate-300">{item.details}</motion.p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" aria-label="Skills" className="mb-20">
          <h3 className="text-2xl font-semibold mb-6">Skills</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Example skill with progress bar */}
            {[
              { name: 'Linux', level: 85 },
              { name: 'Networking', level: 78 },
              { name: 'Windows', level: 82 },
              { name: 'Scripting', level: 60 },
            ].map(skill => (
              <motion.div key={skill.name} whileHover={{ scale: 1.02 }} className="p-4 rounded-lg bg-slate-850/40 border border-white/6">
                <div className="flex justify-between items-center">
                  <div className="font-medium">{skill.name}</div>
                  <div className="text-sm text-slate-400">{skill.level}%</div>
                </div>
                <div className="mt-3 w-full bg-white/6 rounded-full h-3 overflow-hidden">
                  <motion.div initial={{ width: 0 }} whileInView={{ width: `${skill.level}%` }} viewport={{ once: true }} transition={{ duration: 1.2 }} className="h-3 rounded-full bg-gradient-to-r from-sky-500 to-indigo-500" />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" aria-label="Contact" className="mb-20">
          <h3 className="text-2xl font-semibold mb-6">Contact</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div>
              <div className="flex flex-col gap-4">
                <ContactRow icon="📧" label="Email" value="skander@example.com" />
                <ContactRow icon="📞" label="Phone" value="+216 00 000 000" />
                <ContactRow icon="🐙" label="GitHub" value="github.com/skande239" href="https://github.com/skande239" />
                <ContactRow icon="in" label="LinkedIn" value="linkedin.com/in/your" href="#" />
              </div>
            </div>

            <div>
              <ContactForm onSubmit={() => setContactState('success')} state={contactState} setState={setContactState} />
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 text-center text-slate-400 text-sm">© {new Date().getFullYear()} Skander Deli — Built with Next.js & Tailwind</footer>
      </main>
    </div>
  )
}

function ContactRow({ icon, label, value, href }) {
  return (
    <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex items-center gap-4 p-3 rounded-lg bg-slate-850/30 border border-white/6">
      <div className="w-10 h-10 flex items-center justify-center rounded-md bg-white/6 text-xl" aria-hidden>{icon}</div>
      <div className="flex-1 text-left">
        <div className="text-sm text-slate-400">{label}</div>
        {href ? (
          <a href={href} target="_blank" rel="noopener noreferrer" className="font-medium hover:underline">{value}</a>
        ) : (
          <div className="font-medium">{value}</div>
        )}
      </div>
    </motion.div>
  )
}

function ContactForm({ onSubmit, state, setState }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }
  async function handleSubmit(e) {
    e.preventDefault()
    setState('sending')
    // demo sending: in real use, call API route /api/contact
    await new Promise(res => setTimeout(res, 900))
    setState('success')
    onSubmit()
    setForm({ name: '', email: '', message: '' })
    setTimeout(() => setState('idle'), 2500)
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 rounded-lg bg-slate-850/30 border border-white/6">
      <label className="block text-sm">Name
        <input name="name" value={form.name} onChange={handleChange} required className="mt-1 w-full rounded-md bg-transparent border border-white/6 p-2 focus:outline-none focus:ring-2 focus:ring-sky-400" />
      </label>

      <label className="block text-sm mt-3">Email
        <input name="email" value={form.email} onChange={handleChange} type="email" required className="mt-1 w-full rounded-md bg-transparent border border-white/6 p-2 focus:outline-none focus:ring-2 focus:ring-sky-400" />
      </label>

      <label className="block text-sm mt-3">Message
        <textarea name="message" value={form.message} onChange={handleChange} required rows={4} className="mt-1 w-full rounded-md bg-transparent border border-white/6 p-2 focus:outline-none focus:ring-2 focus:ring-sky-400" />
      </label>

      <div className="mt-4 flex items-center gap-4">
        <button type="submit" disabled={state === 'sending'} className="inline-flex items-center gap-2 px-4 py-2 bg-sky-600 rounded-md hover:scale-105 transform transition focus:outline-none focus:ring-2 focus:ring-sky-400">
          {state === 'sending' ? 'Sending...' : 'Send Message'}
        </button>

        <AnimatePresence>
          {state === 'success' && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="text-sm text-emerald-400">Message sent ✓</motion.div>
          )}
        </AnimatePresence>
      </div>
    </form>
  )
}
