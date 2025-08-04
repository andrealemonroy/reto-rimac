import React, { memo, useMemo, useCallback } from 'react';
import {
  getCLS,
  getFID,
  getFCP,
  getLCP,
  getTTFB,
  ReportHandler,
} from 'web-vitals';

export const initializePerformanceMonitoring = () => {
  const reportWebVitals: ReportHandler = metric => {
    console.log(`${metric.name}: ${metric.value}`);

    if (process.env.NODE_ENV === 'production') {
      gtag('event', metric.name, {
        event_category: 'Web Vitals',
        event_label: metric.id,
        value: Math.round(
          metric.name === 'CLS' ? metric.value * 1000 : metric.value
        ),
        non_interaction: true,
      });
    }
  };

  getCLS(reportWebVitals);
  getFID(reportWebVitals);
  getFCP(reportWebVitals);
  getLCP(reportWebVitals);
  getTTFB(reportWebVitals);
};

export const withMemoization = <P extends object>(
  Component: React.ComponentType<P>,
  areEqual?: (prevProps: P, nextProps: P) => boolean
) => {
  return memo(Component, areEqual);
};

export const useExpensiveCalculation = <T>(
  calculation: () => T,
  dependencies: React.DependencyList
): T => {
  return useMemo(calculation, dependencies);
};

export const useStableCallback = <T extends (...args: any[]) => any>(
  callback: T,
  dependencies: React.DependencyList
): T => {
  return useCallback(callback, dependencies);
};

export const createLazyComponent = (
  importFunction: () => Promise<{ default: React.ComponentType<any> }>,
  fallback: React.ReactElement = React.createElement('div', null, 'Loading...')
) => {
  const LazyComponent = React.lazy(importFunction);

  return (props: any) =>
    React.createElement(
      React.Suspense,
      { fallback },
      React.createElement(LazyComponent, props)
    );
};

export const LazyImage: React.FC<{
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
}> = ({ src, alt, className, placeholder = '/images/placeholder.svg' }) => {
  const [imageSrc, setImageSrc] = React.useState(placeholder);
  const [imageRef, setImageRef] = React.useState<HTMLImageElement | null>(null);

  React.useEffect(() => {
    let observer: IntersectionObserver;

    if (imageRef && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setImageSrc(src);
              observer.unobserve(imageRef);
            }
          });
        },
        { threshold: 0.1 }
      );
      observer.observe(imageRef);
    }

    return () => {
      if (observer && imageRef) {
        observer.unobserve(imageRef);
      }
    };
  }, [imageRef, src]);

  return React.createElement('img', {
    ref: setImageRef,
    src: imageSrc,
    alt: alt,
    className: className,
    loading: 'lazy' as const,
  });
};

export const loadFeature = async (featureName: string) => {
  switch (featureName) {
    case 'plans':
      return import('../pages/plans');
    case 'summary':
      return import('../pages/summary');
    default:
      throw new Error(`Unknown feature: ${featureName}`);
  }
};

export const registerServiceWorker = () => {
  if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then(registration => {
          console.log('SW registered: ', registration);
        })
        .catch(registrationError => {
          console.log('SW registration failed: ', registrationError);
        });
    });
  }
};

export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export const useThrottle = <T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T => {
  const lastRun = React.useRef(Date.now());

  return useCallback(
    ((...args) => {
      if (Date.now() - lastRun.current >= delay) {
        callback(...args);
        lastRun.current = Date.now();
      }
    }) as T,
    [callback, delay]
  );
};

export const useRenderTime = (componentName: string) => {
  React.useEffect(() => {
    const startTime = performance.now();

    return () => {
      const endTime = performance.now();
      const renderTime = endTime - startTime;

      if (process.env.NODE_ENV === 'development') {
        console.log(`${componentName} render time: ${renderTime.toFixed(2)}ms`);
      }
    };
  });
};

export const useCleanup = (
  cleanup: () => void,
  dependencies: React.DependencyList = []
) => {
  React.useEffect(() => {
    return cleanup;
  }, dependencies);
};

export const useIsMounted = () => {
  const isMountedRef = React.useRef(true);

  React.useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  return React.useCallback(() => isMountedRef.current, []);
};

export const preloadCriticalResources = () => {
  const fontPreload = document.createElement('link');
  fontPreload.rel = 'preload';
  fontPreload.href = '/fonts/BRSonoma-Regular.otf';
  fontPreload.as = 'font';
  fontPreload.type = 'font/otf';
  fontPreload.crossOrigin = 'anonymous';
  document.head.appendChild(fontPreload);

  const imagePreload = document.createElement('link');
  imagePreload.rel = 'preload';
  imagePreload.href = '/images/hero-image.png';
  imagePreload.as = 'image';
  document.head.appendChild(imagePreload);
};

export const cleanupResources = () => {
  const highestTimeoutId = Number(setTimeout(() => {}, 0));
  for (let i = 0; i < highestTimeoutId; i++) {
    clearTimeout(i);
  }

  const highestIntervalId = Number(setInterval(() => {}, 0));
  for (let i = 0; i < highestIntervalId; i++) {
    clearInterval(i);
  }
};

export class PerformanceMonitor {
  private metrics: Map<string, number[]> = new Map();

  recordMetric(name: string, value: number) {
    if (!this.metrics.has(name)) {
      this.metrics.set(name, []);
    }
    this.metrics.get(name)?.push(value);
  }

  getAverage(name: string): number {
    const values = this.metrics.get(name) || [];
    return values.length > 0
      ? values.reduce((a, b) => a + b, 0) / values.length
      : 0;
  }

  getMetrics() {
    const result: Record<string, { average: number; count: number }> = {};

    this.metrics.forEach((values, name) => {
      result[name] = {
        average: this.getAverage(name),
        count: values.length,
      };
    });

    return result;
  }

  clear() {
    this.metrics.clear();
  }
}

export const performanceMonitor = new PerformanceMonitor();

declare global {
  function gtag(...args: any[]): void;
}

export default {
  initializePerformanceMonitoring,
  withMemoization,
  useExpensiveCalculation,
  useStableCallback,
  createLazyComponent,
  LazyImage,
  loadFeature,
  registerServiceWorker,
  useDebounce,
  useThrottle,
  useRenderTime,
  useCleanup,
  useIsMounted,
  preloadCriticalResources,
  cleanupResources,
  PerformanceMonitor,
  performanceMonitor,
};
