import React, { useCallback, useEffect } from 'react';

export function useOnOutside<T extends HTMLElement>(
  event: string[],
  ref: React.MutableRefObject<T | null>,
  callback: (event: MouseEvent | TouchEvent) => void,
  dependencies: React.DependencyList = []
): void {
  const handler = useCallback(callback, [callback]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent): void {
      if (!ref.current || !ref.current.contains(event.target as Node)) {
        handler(event);
      }
    }

    const documents = [document];
    const events = Array.isArray(event) ? event : [event];

    if (ref.current && ref.current.ownerDocument !== document) {
      documents.push(ref.current.ownerDocument);
    }

    documents.forEach((currentDocument) => {
      events.forEach((event) => {
        currentDocument.addEventListener(event, handleClickOutside);
      });
    });

    return () => {
      documents.forEach((currentDocument) => {
        events.forEach((event) => {
          currentDocument.removeEventListener(event, handleClickOutside);
        });
      });
    };
  }, dependencies.concat([handler, ref]));
}
