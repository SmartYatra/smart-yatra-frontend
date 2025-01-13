import { create } from 'zustand';

type StepState = {
  currentStep: number;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
};

export const useStepStore = create<StepState>(set => ({
  currentStep: 0,
  setStep: step => set({ currentStep: step }),
  nextStep: () =>
    set(state => ({ currentStep: Math.min(state.currentStep + 1, 3) })),
  prevStep: () =>
    set(state => ({ currentStep: Math.max(state.currentStep - 1, 0) })),
}));
