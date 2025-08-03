import { Step } from "@/app/auth/signup/types";
import { Check } from "lucide-react";
import React from "react";

interface Props {
 steps: Step[]
 currentStep: number
 isStepComplete: (stepId: number) => boolean | "" | 0
}

function ProgressStepper({steps, currentStep, isStepComplete}: Props) {
  return (
    <div className="mb-5">
      <div className="flex items-center justify-center">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = currentStep === step.id;
          const isCompleted = currentStep > step.id || isStepComplete(step.id);

          return (
            <div key={step.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`
                      w-10 h-10 rounded-full flex items-center justify-center border-4 transition-all duration-300
                      ${
                        isCompleted
                          ? "bg-black border-black text-white"
                          : isActive
                          ? "bg-gray-300 border-gray-400 text-white"
                          : "bg-white border-gray-300 text-gray-400"
                      }
                    `}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <Icon className="w-5 h-5" />
                  )}
                </div>
                <div className="mt-3 text-center">
                  <p
                    className={`font-semibold ${
                      isActive ? "text-black" : isCompleted ? "text-black" : "text-gray-600"
                    }`}
                  >
                    {step.title}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {step.description}
                  </p>
                </div>
              </div>

              {index < steps.length - 1 && (
                <div
                  className={`
                      h-0.5 w-24 mx-8 mt-8 rounded transition-all duration-300
                      ${isCompleted ? "bg-black" : "bg-gray-200"}
                    `}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProgressStepper;
