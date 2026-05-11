'use client';

import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { GraduationCap, MapPin, Calendar, Award } from 'lucide-react';

const EDUCATION = [
  {
    school: 'Dwarkadas J. Sanghvi College of Engineering',
    degree: 'B.Tech in Information Technology',
    period: '2022 – 2026',
    grade: 'CGPA: 9.11',
    icon: GraduationCap,
  },
  {
    school: 'Pace Junior Science College',
    degree: 'Higher Secondary (HSC)',
    period: '2020 – 2022',
    grade: 'Percentage: 81%',
    icon: Calendar,
  },
  {
    school: 'Childrens Academy',
    degree: 'Secondary (ICSE)',
    period: '2012 – 2020',
    grade: 'Percentage: 94.4%',
    icon: Award,
  },
];

const EXPERIENCE = [
  {
    role: 'Backend Developer Intern',
    company: 'Konnect Insights',
    period: 'Jan 2025 – Jun 2025',
    description: 'Worked on production backend systems for social media analytics platform.',
    highlights: ['FastAPI', 'MongoDB', 'Redis', 'Celery'],
  },
];

export function About() {
  return (
    <section id="about" className="py-32 px-6 max-w-7xl mx-auto">
      <SectionHeader
        eyebrow="About"
        title="The mind behind the machine."
        subtitle="Engineer. Researcher. Problem solver."
      />

      <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Bio */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <div className="p-8 rounded-2xl border border-white/[0.06] bg-[#0d0d0f]">
            <p className="text-lg text-zinc-300 leading-relaxed mb-6">
              I&apos;m Darshan Purohit, an AI Engineer and Backend Developer passionate about building 
              intelligent systems that solve real-world problems. My expertise spans RAG pipelines, 
              semantic search, and scalable backend infrastructure.
            </p>
            <p className="text-zinc-400 leading-relaxed mb-6">
              Currently pursuing B.Tech IT at DJSCE with a 9.11 CGPA, I&apos;ve worked on everything 
              from deepfake detection systems (published at AGC 2026) to trade intelligence platforms 
              processing 30K+ records with AI-powered search.
            </p>
            <div className="flex items-center gap-2 text-sm text-zinc-500">
              <MapPin size={16} />
              <span>Mumbai, India</span>
            </div>
          </div>

          {/* Experience */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-zinc-400 uppercase tracking-wider">Experience</h3>
            {EXPERIENCE.map((exp, i) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="p-6 rounded-xl border border-white/[0.06] bg-[#0d0d0f]"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-white">{exp.role}</h4>
                    <p className="text-sm text-zinc-400">{exp.company}</p>
                  </div>
                  <span className="text-xs text-zinc-500">{exp.period}</span>
                </div>
                <p className="text-sm text-zinc-500 mb-3">{exp.description}</p>
                <div className="flex flex-wrap gap-2">
                  {exp.highlights.map((h) => (
                    <span key={h} className="px-2 py-1 text-xs rounded bg-white/[0.03] text-zinc-400">
                      {h}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <h3 className="text-sm font-medium text-zinc-400 uppercase tracking-wider">Education</h3>
          {EDUCATION.map((edu, i) => (
            <motion.div
              key={edu.school}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="flex gap-4 p-6 rounded-xl border border-white/[0.06] bg-[#0d0d0f]"
            >
              <div className="p-3 rounded-lg bg-purple-500/10 text-purple-400">
                <edu.icon size={20} />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-white mb-1">{edu.school}</h4>
                <p className="text-sm text-zinc-400 mb-1">{edu.degree}</p>
                <div className="flex items-center gap-4 text-xs text-zinc-500">
                  <span>{edu.period}</span>
                  <span className="text-purple-400 font-medium">{edu.grade}</span>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Research */}
          <div className="p-6 rounded-xl border border-white/[0.06] bg-gradient-to-br from-purple-500/5 to-transparent mt-6">
            <div className="flex items-center gap-2 mb-3">
              <Award size={18} className="text-purple-400" />
              <h4 className="font-medium text-white">Research</h4>
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Presented paper on Deepfake Detection at AGC 2026, achieving 88.89% validation accuracy 
              using spatiotemporal analysis with ResNet50 and BiLSTM architectures.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
