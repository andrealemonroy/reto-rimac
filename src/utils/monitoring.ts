interface PerformanceMetric {
  name: string;
  value: number;
  timestamp: number;
  metadata?: Record<string, any>;
}

interface NavigationTiming {
  navigationStart: number;
  domContentLoaded: number;
  loadComplete: number;
  firstPaint?: number;
  firstContentfulPaint?: number;
  largestContentfulPaint?: number;
}

class PerformanceMonitor {
  private metrics: PerformanceMetric[] = [];
  private observers: PerformanceObserver[] = [];
  private isInitialized = false;

  constructor() {
    this.initialize();
  }

  private initialize(): void {
    if (this.isInitialized || typeof window === 'undefined') return;

    this.observeCoreWebVitals();

    this.trackNavigationTiming();

    this.observeResourceTiming();

    this.observeLongTasks();

    this.isInitialized = true;
  }

  private observeCoreWebVitals(): void {
    if ('PerformanceObserver' in window) {
      try {
        const lcpObserver = new PerformanceObserver(entryList => {
          const entries = entryList.getEntries();
          const lastEntry = entries[entries.length - 1];

          this.recordMetric({
            name: 'LCP',
            value: lastEntry.startTime,
            timestamp: Date.now(),
            metadata: {
              element: (lastEntry as any).element?.tagName,
              url: (lastEntry as any).url,
            },
          });
        });

        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        this.observers.push(lcpObserver);
      } catch (error) {
        console.warn('LCP observer failed:', error);
      }

      try {
        const fidObserver = new PerformanceObserver(entryList => {
          entryList.getEntries().forEach(entry => {
            const fidEntry = entry as any;
            this.recordMetric({
              name: 'FID',
              value: fidEntry.processingStart - fidEntry.startTime,
              timestamp: Date.now(),
              metadata: {
                eventType: fidEntry.name,
              },
            });
          });
        });

        fidObserver.observe({ entryTypes: ['first-input'] });
        this.observers.push(fidObserver);
      } catch (error) {
        console.warn('FID observer failed:', error);
      }

      try {
        let clsValue = 0;
        const clsObserver = new PerformanceObserver(entryList => {
          entryList.getEntries().forEach(entry => {
            if (!(entry as any).hadRecentInput) {
              clsValue += (entry as any).value;

              this.recordMetric({
                name: 'CLS',
                value: clsValue,
                timestamp: Date.now(),
                metadata: {
                  sources: (entry as any).sources?.map(
                    (s: any) => s.node?.tagName
                  ),
                },
              });
            }
          });
        });

        clsObserver.observe({ entryTypes: ['layout-shift'] });
        this.observers.push(clsObserver);
      } catch (error) {
        console.warn('CLS observer failed:', error);
      }
    }
  }

  private trackNavigationTiming(): void {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const navigation = performance.getEntriesByType('navigation')[0] as any;

        if (navigation) {
          const timing: NavigationTiming = {
            navigationStart: navigation.fetchStart || 0,
            domContentLoaded:
              navigation.domContentLoadedEventEnd - navigation.fetchStart,
            loadComplete: navigation.loadEventEnd - navigation.fetchStart,
          };

          const paintEntries = performance.getEntriesByType('paint');
          paintEntries.forEach(entry => {
            if (entry.name === 'first-paint') {
              timing.firstPaint = entry.startTime;
            } else if (entry.name === 'first-contentful-paint') {
              timing.firstContentfulPaint = entry.startTime;
            }
          });

          this.recordMetric({
            name: 'Navigation',
            value: timing.loadComplete,
            timestamp: Date.now(),
            metadata: timing,
          });
        }
      }, 0);
    });
  }

  private observeResourceTiming(): void {
    if ('PerformanceObserver' in window) {
      try {
        const resourceObserver = new PerformanceObserver(entryList => {
          entryList.getEntries().forEach(entry => {
            const resource = entry as PerformanceResourceTiming;

            if (resource.duration > 1000) {
              this.recordMetric({
                name: 'SlowResource',
                value: resource.duration,
                timestamp: Date.now(),
                metadata: {
                  url: resource.name,
                  type: resource.initiatorType,
                  size: resource.transferSize,
                },
              });
            }
          });
        });

        resourceObserver.observe({ entryTypes: ['resource'] });
        this.observers.push(resourceObserver);
      } catch (error) {
        console.warn('Resource observer failed:', error);
      }
    }
  }

  private observeLongTasks(): void {
    if ('PerformanceObserver' in window) {
      try {
        const longTaskObserver = new PerformanceObserver(entryList => {
          entryList.getEntries().forEach(entry => {
            this.recordMetric({
              name: 'LongTask',
              value: entry.duration,
              timestamp: Date.now(),
              metadata: {
                startTime: entry.startTime,
                attribution: (entry as any).attribution,
              },
            });
          });
        });

        longTaskObserver.observe({ entryTypes: ['longtask'] });
        this.observers.push(longTaskObserver);
      } catch (error) {
        console.warn('Long task observer failed:', error);
      }
    }
  }

  recordMetric(metric: PerformanceMetric): void {
    this.metrics.push(metric);

    if (this.metrics.length > 1000) {
      this.metrics = this.metrics.slice(-500);
    }

    if (this.isCriticalMetric(metric)) {
      console.warn(`🚨 Performance Issue Detected:`, metric);
    }
  }

  private isCriticalMetric(metric: PerformanceMetric): boolean {
    const thresholds = {
      LCP: 2500,
      FID: 100,
      CLS: 0.1,
      LongTask: 50,
    };

    return (
      (thresholds as any)[metric.name] &&
      metric.value > (thresholds as any)[metric.name]
    );
  }

  getMetrics(filterBy?: string): PerformanceMetric[] {
    if (!filterBy) return [...this.metrics];
    return this.metrics.filter(metric => metric.name === filterBy);
  }

  getAverageMetric(name: string): number {
    const relevantMetrics = this.getMetrics(name);
    if (relevantMetrics.length === 0) return 0;

    const sum = relevantMetrics.reduce((acc, metric) => acc + metric.value, 0);
    return sum / relevantMetrics.length;
  }

  getCoreWebVitalsScore(): {
    lcp: number;
    fid: number;
    cls: number;
    score: string;
  } {
    const lcp = this.getAverageMetric('LCP');
    const fid = this.getAverageMetric('FID');
    const cls = this.getAverageMetric('CLS');

    const lcpScore =
      lcp <= 2500 ? 'good' : lcp <= 4000 ? 'needs improvement' : 'poor';
    const fidScore =
      fid <= 100 ? 'good' : fid <= 300 ? 'needs improvement' : 'poor';
    const clsScore =
      cls <= 0.1 ? 'good' : cls <= 0.25 ? 'needs improvement' : 'poor';

    let overallScore = 'good';
    if (lcpScore === 'poor' || fidScore === 'poor' || clsScore === 'poor') {
      overallScore = 'poor';
    } else if (
      lcpScore === 'needs improvement' ||
      fidScore === 'needs improvement' ||
      clsScore === 'needs improvement'
    ) {
      overallScore = 'needs improvement';
    }

    return { lcp, fid, cls, score: overallScore };
  }

  generateReport(): string {
    const coreVitals = this.getCoreWebVitalsScore();
    const longTasks = this.getMetrics('LongTask').length;
    const slowResources = this.getMetrics('SlowResource').length;

    return `
Performance Report:
==================
Core Web Vitals Score: ${coreVitals.score.toUpperCase()}
- LCP: ${coreVitals.lcp.toFixed(0)}ms
- FID: ${coreVitals.fid.toFixed(0)}ms  
- CLS: ${coreVitals.cls.toFixed(3)}

Issues Found:
- Long Tasks: ${longTasks}
- Slow Resources: ${slowResources}

Total Metrics Collected: ${this.metrics.length}
    `.trim();
  }

  clearMetrics(): void {
    this.metrics = [];
  }

  destroy(): void {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
    this.clearMetrics();
    this.isInitialized = false;
  }
}

class AnalyticsTracker {
  private events: Array<{
    event: string;
    properties: Record<string, any>;
    timestamp: number;
  }> = [];

  track(event: string, properties: Record<string, any> = {}): void {
    const trackingData = {
      event,
      properties: {
        ...properties,
        url: window.location.href,
        userAgent: navigator.userAgent,
        timestamp: Date.now(),
      },
      timestamp: Date.now(),
    };

    this.events.push(trackingData);

    if (process.env.NODE_ENV === 'production') {
      this.sendToAnalytics(trackingData);
    }

    console.log('📊 Analytics Event:', trackingData);
  }

  private async sendToAnalytics(data: any): Promise<void> {
    try {
      await fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.warn('Analytics request failed:', error);
    }
  }

  getEvents(): typeof this.events {
    return [...this.events];
  }

  clearEvents(): void {
    this.events = [];
  }
}

class ErrorTracker {
  private errors: Array<{
    message: string;
    stack?: string;
    url: string;
    timestamp: number;
    userAgent: string;
  }> = [];

  constructor() {
    this.setupGlobalErrorHandling();
  }

  private setupGlobalErrorHandling(): void {
    window.addEventListener('error', event => {
      this.trackError({
        message: event.message,
        stack: event.error?.stack,
        url: event.filename || window.location.href,
        line: event.lineno,
        column: event.colno,
      });
    });

    window.addEventListener('unhandledrejection', event => {
      this.trackError({
        message: `Unhandled Promise Rejection: ${event.reason}`,
        stack: event.reason?.stack,
        url: window.location.href,
      });
    });
  }

  trackError(error: {
    message: string;
    stack?: string;
    url?: string;
    line?: number;
    column?: number;
  }): void {
    const errorData = {
      message: error.message,
      stack: error.stack,
      url: error.url || window.location.href,
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      line: error.line,
      column: error.column,
    };

    this.errors.push(errorData);

    if (process.env.NODE_ENV === 'development') {
      console.error('🐛 Error Tracked:', errorData);
    }

    if (process.env.NODE_ENV === 'production') {
      this.sendToErrorService(errorData);
    }
  }

  private async sendToErrorService(errorData: any): Promise<void> {
    try {
      await fetch('/api/errors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(errorData),
      });
    } catch (error) {
      console.warn('Error tracking request failed:', error);
    }
  }

  getErrors(): typeof this.errors {
    return [...this.errors];
  }

  clearErrors(): void {
    this.errors = [];
  }
}

export const performanceMonitor = new PerformanceMonitor();
export const analyticsTracker = new AnalyticsTracker();
export const errorTracker = new ErrorTracker();

export { PerformanceMonitor, AnalyticsTracker, ErrorTracker };
