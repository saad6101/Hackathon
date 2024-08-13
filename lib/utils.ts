import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type EventHandler<E extends React.SyntheticEvent> = (event: E) => void;

export function mergeEventHandlers<E extends React.SyntheticEvent>(...handlers: (EventHandler<E> | undefined)[]): EventHandler<E> {
  return (event: E) => {
    for (const handler of handlers) {
      handler?.(event);
      if (event.defaultPrevented) {
        break;
      }
    }
  };
}