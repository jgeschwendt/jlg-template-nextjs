/* eslint-disable -- todo */
/* eslint eslint-comments/no-unlimited-disable: off */
import type React from "react";
import { useCallback, useEffect } from "react";

export function useOnOutside<T extends HTMLElement> (
  eventOrEvents: string | string[],
  ref: React.MutableRefObject<T | null>,
  callback: (event: MouseEvent | TouchEvent) => void,
  dependencies: React.DependencyList = [],
): void {
  const handler = useCallback(callback, [callback]);

  useEffect(() => {
    function handleClickOutside (event: MouseEvent | TouchEvent): void {
      if (!ref.current || !ref.current.contains(event.target as Node)) {
        handler(event);
      }
    }

    const documents = [document];

    if (ref.current && ref.current.ownerDocument !== document) {
      documents.push(ref.current.ownerDocument);
    }

    const events = Array.isArray(eventOrEvents) ? eventOrEvents : [eventOrEvents];

    if (ref.current && ref.current.ownerDocument !== document) {
      documents.push(ref.current.ownerDocument);
    }

    documents.forEach((currentDocument) => {
      events.forEach((event) => {
        currentDocument.addEventListener(event, handleClickOutside as EventListener);
      });
    });

    return () => {
      documents.forEach((currentDocument) => {
        events.forEach((event) => {
          currentDocument.removeEventListener(event, handleClickOutside as EventListener);
        });
      });
    };
  }, dependencies.concat([handler, ref]));
}
/* eslint-enable */
