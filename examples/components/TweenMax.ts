interface TweenOptions {
  duration: number;
  ease?: (t: number) => number;
  onComplete?: () => void;
}

// Easing functions
const Ease = {
  // Linear
  linear: (t: number) => t,
  
  // Quadratic
  quadIn: (t: number) => t * t,
  quadOut: (t: number) => t * (2 - t),
  quadInOut: (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
  
  // Cubic
  cubicIn: (t: number) => t * t * t,
  cubicOut: (t: number) => (--t) * t * t + 1,
  cubicInOut: (t: number) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  
  // Exponential
  expoIn: (t: number) => t === 0 ? 0 : Math.pow(2, 10 * (t - 1)),
  expoOut: (t: number) => t === 1 ? 1 : -Math.pow(2, -10 * t) + 1,
  expoInOut: (t: number) => {
    if (t === 0) return 0;
    if (t === 1) return 1;
    if ((t *= 2) < 1) return 0.5 * Math.pow(2, 10 * (t - 1));
    return 0.5 * (-Math.pow(2, -10 * --t) + 2);
  }
};

class TweenMax {
  static to(element: HTMLElement, duration: number, options: Record<string, any>) {
    const startValues: Record<string, number> = {};
    const endValues: Record<string, number> = {};
    const startTime = performance.now();

    // Parse initial values
    Object.keys(options).forEach(key => {
      if (key === 'ease' || key === 'onComplete') return;
      
      const currentValue = parseFloat(getComputedStyle(element)[key as any]);
      startValues[key] = currentValue;
      endValues[key] = parseFloat(options[key]);
    });

    const animate = (currentTime: number) => {
      const elapsed = (currentTime - startTime) / (duration * 1000);
      const progress = Math.min(elapsed, 1);
      
      // Apply easing function
      const ease = options.ease || Ease.cubicOut;
      const easedProgress = ease(progress);

      // Update values
      Object.keys(startValues).forEach(key => {
        const start = startValues[key];
        const end = endValues[key];
        const current = start + (end - start) * easedProgress;
        element.style[key as any] = `${current}${key === 'scale' ? '' : '%'}`;
      });

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else if (options.onComplete) {
        options.onComplete();
      }
    };

    requestAnimationFrame(animate);
  }

  static get Ease() {
    return Ease;
  }
}

export default TweenMax; 