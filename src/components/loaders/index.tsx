import { twMerge } from "tailwind-merge"

interface Props {
  className?: string
}

export function BouncingDots({ className }: Props) {
  return (
    <div className="flex space-x-2">
      <div
        className={twMerge(
          "animate-bounce bg-primary rounded-full h-3 w-3",
          className
        )}
      ></div>
      <div
        className={twMerge(
          "animate-bounce bg-primary rounded-full h-3 w-3",
          className
        )}
        style={{ animationDelay: "0.1s" }}
      ></div>
      <div
        className={twMerge(
          "animate-bounce bg-primary rounded-full h-3 w-3",
          className
        )}
        style={{ animationDelay: "0.2s" }}
      ></div>
    </div>
  )
}


export function DoubleRing({ className }: Props) {
  return (
    <div className="relative">
      <div
        className={twMerge(
          "animate-spin rounded-full h-12 w-12 border-2 border-gray-200 border-t-blue-600",
          className
        )}
      ></div>
      <div
        className={twMerge(
          "absolute top-1 left-1 animate-spin rounded-full h-10 w-10 border-2 border-gray-200 border-b-primary",
          className
        )}
        style={{ animationDirection: "reverse" }}
      ></div>
    </div>
  )
}

export function GradientSpinner({ className }: Props) {
  return (
    <div
      className={twMerge(
        "animate-spin rounded-full h-12 w-12 bg-gradient-to-r from-blue-600 to-primary",
        className
      )}
      style={{
        maskImage:
          "conic-gradient(from 0deg, transparent 0deg, black 40deg, transparent 120deg)",
        WebkitMaskImage:
          "conic-gradient(from 0deg, transparent 0deg, black 40deg, transparent 120deg)",
      }}
    ></div>
  )
}


export function LoadingBars({ className }: Props) {
  return (
    <div className="flex space-x-1">
      <div
        className={twMerge(
          "animate-pulse bg-primary h-8 w-2 rounded",
          className
        )}
      ></div>
      <div
        className={twMerge(
          "animate-pulse bg-primary h-8 w-2 rounded",
          className
        )}
        style={{ animationDelay: "0.2s" }}
      ></div>
      <div
        className={twMerge(
          "animate-pulse bg-primary h-8 w-2 rounded",
          className
        )}
        style={{ animationDelay: "0.4s" }}
      ></div>
      <div
        className={twMerge(
          "animate-pulse bg-primary h-8 w-2 rounded",
          className
        )}
        style={{ animationDelay: "0.6s" }}
      ></div>
    </div>
  )
}

export function ProgressBar({ className }: Props) {
  return (
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div
        className={twMerge(
          "bg-primary h-2 rounded-full animate-pulse",
          className
        )}
        style={{ width: "70%" }}
      ></div>
    </div>
  )
}

export function PulsingDot({ className }: Props) {
  return (
    <div
      className={twMerge(
        "animate-pulse bg-primary rounded-full h-12 w-12",
        className
      )}
    />
  )
}

export function SpinnerCircle({ className }: Props) {
  return (
    <div
      className={twMerge(
        "animate-spin rounded-full h-12 w-12 border-b-2 border-primary",
        className
      )}
    />
  )
}

export function SpinnerGrow({ className }: Props) {
  return (
    <div
      className={twMerge(
        "animate-ping bg-primary rounded-full h-12 w-12",
        className
      )}
    />
  )
}

export function SpinnerRipple({ className }: Props) {
  return (
    <div className="relative">
      <div
        className={twMerge(
          "animate-ping absolute h-12 w-12 rounded-full bg-orange-400 opacity-75",
          className
        )}
      ></div>
      <div
        className={twMerge(
          "animate-ping absolute h-12 w-12 rounded-full bg-orange-400 opacity-75",
          className
        )}
        style={{ animationDelay: "0.5s" }}
      ></div>
      <div
        className={twMerge(
          "relative h-12 w-12 rounded-full bg-orange-600",
          className
        )}
      ></div>
    </div>
  )
}

export function Spinner({ className }: Props) {
  return (
    <div
      className={twMerge(
        "animate-pulse bg-primary rounded-full h-12 w-12",
        className
      )}
    />
  )
}

export function TypingDots({ className }: Props) {
  return (
    <div className="flex space-x-1">
      <div
        className={twMerge(
          "animate-bounce bg-primary rounded-full h-2 w-2",
          className
        )}
        style={{ animationDelay: "0s" }}
      ></div>
      <div
        className={twMerge(
          "animate-bounce bg-primary rounded-full h-2 w-2",
          className
        )}
        style={{ animationDelay: "0.1s" }}
      ></div>
      <div
        className={twMerge(
          "animate-bounce bg-primary rounded-full h-2 w-2",
          className
        )}
        style={{ animationDelay: "0.2s" }}
      ></div>
    </div>
  )
}