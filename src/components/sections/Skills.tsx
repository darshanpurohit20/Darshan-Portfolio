'use client';

import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/ui/SectionHeader';

const SKILLS = {
  'AI / ML': {
    color: '#7c5cfc',
    items: ['PyTorch', 'RAG', 'LLMs', 'YOLOv8', 'ResNet50', 'BiLSTM', 'Pinecone', 'Embeddings'],
  },
  'Backend': {
    color: '#3b82f6',
    items: ['FastAPI', 'Flask', 'RESTful APIs', 'Python', 'Docker', 'C++'],
  },
  'Databases': {
    color: '#10b981',
    items: ['MongoDB', 'MySQL', 'Pinecone', 'Vector DB'],
  },
  'Tools': {
    color: '#f59e0b',
    items: ['Git', 'Docker', 'VS Code', 'Postman', 'Jupyter', 'Streamlit'],
  },
};

export function Skills() {
  return (
    <section id="skills" className="py-20 md:py-32 px-4 sm:px-6 max-w-7xl mx-auto">
      <SectionHeader 
        eyebrow="Capabilities" 
        title="Built to build." 
        subtitle="The toolkit behind the systems." 
      />
      
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(SKILLS).map(([category, { color, items }], ci) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: ci * 0.1, duration: 0.6 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-white/[0.06] bg-[#0d0d0f] p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 rounded-full" style={{ background: color, boxShadow: `0 0 10px ${color}` }} />
              <span className="text-sm font-medium text-zinc-300">{category}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {items.map((skill, i) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: ci * 0.1 + i * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, borderColor: color }}
                  className="px-3 py-1.5 rounded-lg text-xs text-zinc-400 border border-white/[0.06] bg-white/[0.02] transition-colors cursor-default"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
