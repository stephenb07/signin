import { motion } from 'framer-motion';
import { useState } from 'react';

interface AnimatedInputProps {
  type: string;
  placeholder: string;
  name: string;
}

export default function AnimatedInput({ type, placeholder, name }: AnimatedInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative mb-4"
    >
      <motion.input
        type={type}
        name={name}
        required
        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
        placeholder={placeholder}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <motion.span
        className="absolute left-0 -top-6 text-sm text-gray-600 transition-all duration-300"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: isFocused ? 1 : 0, y: isFocused ? 0 : 10 }}
      >
        {placeholder}
      </motion.span>
    </motion.div>
  );
}

