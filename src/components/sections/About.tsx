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
    location: 'Mumbai, India',
    icon: GraduationCap,
  },
  {
    school: 'Nirmala Memorial Foundation College',
    degree: 'Higher Secondary (Science)',
    period: '2021 – 2023',
    grade: 'Percentage: 84.50%',
    location: 'Mumbai, India',
    icon: Calendar,
  },
  {
    school: 'Shanti Nagar High School',
    degree: 'Secondary School (SSC)',
    period: '2012 – 2021',
    grade: 'Percentage: 87.80%',
    location: 'Thane, India',
    icon: Award,
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

      <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Bio */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="p-6 md:p-8 rounded-2xl border border-white/[0.06] bg-[#0d0d0f] h-full">
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                  <span className="text-purple-400 text-lg font-bold">DP</span>
                </div>
                <div>
                  <h3 className="font-medium text-white">Darshan Purohit</h3>
                  <p className="text-sm text-zinc-500">AI Engineer & Backend Developer</p>
                </div>
              </div>
              
              <p className="text-base md:text-lg text-zinc-300 leading-relaxed">
                Passionate about building intelligent systems that solve real-world problems. 
                My expertise spans RAG pipelines, semantic search, and scalable backend infrastructure.
              </p>
              <p className="text-zinc-400 leading-relaxed">
                Currently pursuing B.Tech IT at DJSCE with a 9.11 CGPA. I&apos;ve worked on everything 
                from deepfake detection systems (published at AGC 2026) to trade intelligence platforms 
                processing 30K+ records with AI-powered search.
              </p>
              
              <div className="flex items-center gap-2 text-sm text-zinc-500 pt-4 border-t border-white/[0.06]">
                <MapPin size={16} className="text-purple-400" />
                <span>Mumbai, India</span>
              </div>
            </div>
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
                <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500">
                  <span>{edu.period}</span>
                  <span className="text-purple-400 font-medium">{edu.grade}</span>
                  <span className="flex items-center gap-1">
                    <MapPin size={10} />
                    {edu.location}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Research */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            viewport={{ once: true }}
            className="p-6 rounded-xl border border-purple-500/20 bg-gradient-to-br from-purple-500/10 via-purple-500/5 to-transparent"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-purple-500/20">
                <Award size={20} className="text-purple-400" />
              </div>
              <div>
                <h4 className="font-medium text-white">Research Publication</h4>
                <p className="text-xs text-purple-400">AGC 2026</p>
              </div>
            </div>
            <p className="text-sm text-zinc-300 leading-relaxed">
              Presented paper on <span className="text-white font-medium">Deepfake Detection</span>, achieving 
              <span className="text-purple-400 font-medium"> 88.89% validation accuracy</span> using spatiotemporal 
              analysis with ResNet50 and BiLSTM architectures.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
