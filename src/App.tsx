/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, ChevronRight, Info, Flame, HelpCircle } from 'lucide-react';

const STEPS = [
  {
    id: 1,
    preHeadline: "Responde 4 preguntas rápidas para conocer cómo funciona el Protocolo Intestino Activo 👇",
    headline: "¿Te ha pasado que aunque comas saludable y hagas ejercicio… tu vientre sigue inflamado?",
    image: "https://iili.io/qfX4K9n.png",
    buttons: [
      { text: "✅ Sí, me pasa constantemente", primary: true },
      { text: "😕 A veces", primary: false }
    ],
    microcopy: "Tus respuestas nos ayudarán a mostrarte cómo este protocolo puede adaptarse a tu situación."
  },
  {
    id: 2,
    headline: "En la mayoría de los casos, el problema no es la grasa… Es la inflamación intestinal que bloquea tu metabolismo.",
    image: "https://iili.io/qfX4fus.jpg",
    bullets: [
      "Metabolismo lento",
      "Hinchazón constante",
      "Retención de líquidos",
      "Cansancio frecuente"
    ],
    buttons: [
      { text: "🔥 Esto tiene sentido", primary: true },
      { text: "🤔 Quiero entender mejor", primary: false }
    ]
  },
  {
    id: 3,
    headline: "Por eso fue creado el Protocolo Natural Intestino Activo",
    image: "https://iili.io/qfX438X.jpg",
    benefits: [
      "Apoya la salud intestinal",
      "Activa el metabolismo",
      "Rutina diaria de 5 minutos",
      "Método natural"
    ],
    buttons: [
      { text: "💚 Sí, quiero mi protocolo", primary: true },
      { text: "❓ Ver cómo funciona", primary: false }
    ]
  },
  {
    id: 4,
    headline: "¿Te gustaría recibir una rutina personalizada para desinflamar tu intestino en los próximos 7 días?",
    subtext: "Diseñada para adaptarse a tu rutina diaria.",
    image: "https://iili.io/qfX4dFI.jpg",
    buttons: [
      { text: "👉 SI QUIERO ACCEDER", primary: true, cta: true }
    ]
  }
];

export default function App() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const REDIRECT_URL = 'http://protocolopresentacion.easymarketpay.com/';

  useEffect(() => {
    if (isFinished && loadingProgress < 100) {
      const timer = setInterval(() => {
        setLoadingProgress(prev => {
          if (prev >= 100) {
            clearInterval(timer);
            setTimeout(() => setShowConfirmation(true), 500);
            return 100;
          }
          return prev + 1;
        });
      }, 30); // ~3 seconds total
      return () => clearInterval(timer);
    }
  }, [isFinished, loadingProgress]);

  useEffect(() => {
    if (showConfirmation) {
      const redirectTimer = setTimeout(() => {
        window.location.href = REDIRECT_URL;
      }, 3500); // Wait 3.5 seconds for user to see the confirmation before redirecting
      return () => clearTimeout(redirectTimer);
    }
  }, [showConfirmation]);

  const currentStep = STEPS[currentStepIndex];
  const progress = ((currentStepIndex + 1) / STEPS.length) * 100;

  const handleNext = () => {
    if (currentStepIndex < STEPS.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      // Redirect directly on the last step, bypassing loading
      window.location.href = REDIRECT_URL;
    }
  };

  if (isFinished) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4 font-sans">
        <div className="w-full max-w-[420px] bg-white rounded-[32px] shadow-2xl overflow-hidden p-8 text-center border border-neutral-100 min-h-[400px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {!showConfirmation ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center"
              >
                <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-6 relative">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="40"
                      cy="40"
                      r="36"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="transparent"
                      className="text-neutral-100"
                    />
                    <circle
                      cx="40"
                      cy="40"
                      r="36"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="transparent"
                      strokeDasharray={226.2}
                      strokeDashoffset={226.2 - (226.2 * loadingProgress) / 100}
                      className="text-[#2bb673] transition-all duration-100 ease-linear"
                    />
                  </svg>
                  <span className="absolute text-sm font-bold text-neutral-700">{loadingProgress}%</span>
                </div>
                <h1 className="text-xl font-bold text-neutral-900 mb-2">Analizando tus respuestas...</h1>
                <p className="text-neutral-500 text-sm">Estamos preparando tu protocolo personalizado.</p>
              </motion.div>
            ) : (
              <motion.div
                key="confirmed"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6"
                >
                  <CheckCircle2 className="text-emerald-600 w-10 h-10" />
                </motion.div>
                <h1 className="text-2xl font-bold text-neutral-900 mb-2">¡Confirmado!</h1>
                <p className="text-neutral-600 mb-6">Tu perfil es apto para el protocolo.</p>
                
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-red-50 border border-red-100 rounded-2xl p-4 mb-8 w-full"
                >
                  <p className="text-red-600 font-bold text-lg">
                    ⚠️ ¡Atención! Solo quedan <span className="underline decoration-2">3 cupos</span> disponibles hoy.
                  </p>
                </motion.div>

                <p className="text-neutral-400 text-xs mb-4 animate-pulse">Redirigiendo automáticamente...</p>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 px-6 bg-red-600 text-white rounded-2xl font-bold text-lg shadow-lg shadow-red-200 animate-pulse-red"
                  onClick={() => window.location.href = 'http://protocolopresentacion.easymarketpay.com/'}
                >
                  👉 QUIERO EL PLAN AHORA
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4 font-sans">
      {/* Mobile Simulator Container */}
      <div className="w-full max-w-[420px] bg-white rounded-[32px] shadow-2xl overflow-hidden flex flex-col relative border border-neutral-100 min-h-[700px]">
        
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-neutral-100 z-10">
          <motion.div 
            className="h-full bg-[#2bb673]"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ type: "spring", stiffness: 50, damping: 15 }}
          />
        </div>

        <div className="flex-1 p-6 pt-10 flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex flex-col flex-1"
            >
              {/* Pre-Headline */}
              {currentStep.preHeadline && (
                <p className="text-sm font-medium text-[#2bb673] mb-2 text-center">
                  {currentStep.preHeadline}
                </p>
              )}

              {/* Headline */}
              <h2 className="text-xl md:text-2xl font-bold text-neutral-900 leading-tight mb-6 text-center">
                {currentStep.headline.split('…').map((part, i, arr) => (
                  <React.Fragment key={i}>
                    {part}
                    {i < arr.length - 1 && <span className="text-[#2bb673]">…</span>}
                  </React.Fragment>
                ))}
              </h2>

              {/* Image */}
              <div className="mb-8 relative group">
                <img 
                  src={currentStep.image} 
                  alt="Gut Health" 
                  className={`w-full h-auto rounded-2xl shadow-md ${currentStepIndex === 2 ? 'object-contain' : 'object-cover aspect-[4/3]'}`}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-black/5 pointer-events-none" />
              </div>

              {/* Content (Bullets/Benefits) */}
              {currentStep.bullets && (
                <ul className="space-y-3 mb-8 px-2">
                  {currentStep.bullets.map((bullet, i) => (
                    <motion.li 
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                      className="flex items-center text-neutral-700 font-medium"
                    >
                      <div className="w-1.5 h-1.5 bg-[#2bb673] rounded-full mr-3" />
                      {bullet}
                    </motion.li>
                  ))}
                </ul>
              )}

              {currentStep.benefits && (
                <ul className="space-y-3 mb-8 px-2">
                  {currentStep.benefits.map((benefit, i) => (
                    <motion.li 
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                      className="flex items-center text-neutral-700 font-medium"
                    >
                      <CheckCircle2 className="text-[#2bb673] w-5 h-5 mr-3 shrink-0" />
                      {benefit}
                    </motion.li>
                  ))}
                </ul>
              )}

              {currentStep.subtext && (
                <p className="text-center text-neutral-500 mb-8 italic">
                  {currentStep.subtext}
                </p>
              )}

              {/* Spacer */}
              <div className="flex-1" />

              {/* Buttons */}
              <div className="space-y-3 mt-auto">
                {currentStep.buttons.map((btn, i) => {
                  const isLastStep = currentStepIndex === STEPS.length - 1;
                  return (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleNext()}
                      className={`
                        w-full py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2
                        ${isLastStep 
                          ? 'bg-red-600 text-white shadow-lg shadow-red-200 hover:bg-red-700 animate-pulse-red' 
                          : btn.primary 
                            ? 'bg-[#2bb673] text-white shadow-lg shadow-emerald-200 hover:bg-[#1f8f5f]' 
                            : 'bg-white text-[#2bb673] border-2 border-[#2bb673] hover:bg-emerald-50'
                        }
                      `}
                    >
                      {btn.text}
                      {btn.cta && <ChevronRight className="w-5 h-5" />}
                    </motion.button>
                  );
                })}
              </div>

              {/* Microcopy */}
              {currentStep.microcopy && (
                <p className="text-[11px] text-neutral-400 mt-4 text-center px-4 leading-relaxed">
                  {currentStep.microcopy}
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer Branding */}
        <div className="p-4 text-center border-t border-neutral-50 bg-neutral-50/50">
          <p className="text-[10px] text-neutral-400 uppercase tracking-widest font-semibold">
            Protocolo Intestino Activo © 2026
          </p>
        </div>
      </div>

      <style>{`
        @keyframes pulse-red {
          0%, 100% {
            box-shadow: 0 10px 15px -3px rgba(220, 38, 38, 0.3), 0 4px 6px -4px rgba(220, 38, 38, 0.3);
            transform: scale(1);
          }
          50% {
            box-shadow: 0 20px 25px -5px rgba(220, 38, 38, 0.5), 0 8px 10px -6px rgba(220, 38, 38, 0.5);
            transform: scale(1.02);
          }
        }
        .animate-pulse-red {
          animation: pulse-red 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
}
