import React, { useState, useEffect, useRef, memo } from 'react';

// Re-export icons for convenience
export * from './Icons';

// Re-export optimized AnimatedCounter
export { default as AnimatedCounter } from './AnimatedCounter';

// ===== BUTTON COMPONENT =====
export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon: Icon,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  fullWidth = false,
  className = '',
  ...props 
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-purple-200 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 text-white shadow-lg hover:shadow-xl hover:shadow-purple-500/25 hover:-translate-y-0.5 active:translate-y-0',
    secondary: 'bg-white text-purple-700 border-2 border-purple-200 hover:border-purple-400 hover:bg-purple-50 shadow-sm',
    ghost: 'text-purple-700 hover:bg-purple-50',
    outline: 'border-2 border-purple-600 text-purple-700 hover:bg-purple-600 hover:text-white',
    danger: 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg hover:shadow-xl hover:shadow-red-500/25',
    success: 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg hover:shadow-xl hover:shadow-green-500/25',
    glass: 'bg-white/20 backdrop-blur-md text-white border border-white/30 hover:bg-white/30',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm gap-1.5',
    md: 'px-6 py-3 text-base gap-2',
    lg: 'px-8 py-4 text-lg gap-2.5',
    xl: 'px-10 py-5 text-xl gap-3',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      ) : Icon && iconPosition === 'left' ? (
        <Icon className="h-5 w-5" />
      ) : null}
      <span>{children}</span>
      {!loading && Icon && iconPosition === 'right' && <Icon className="h-5 w-5" />}
    </button>
  );
};

// ===== CARD COMPONENT =====
export const Card = ({ 
  children, 
  variant = 'default',
  hover = true,
  padding = 'md',
  className = '',
  ...props 
}) => {
  const variants = {
    default: 'bg-white border border-purple-100/50 shadow-card',
    elevated: 'bg-white shadow-soft-lg',
    glass: 'bg-white/70 backdrop-blur-xl border border-white/50 shadow-soft',
    gradient: 'bg-gradient-to-br from-white to-purple-50/50 border border-purple-100/50 shadow-card',
    purple: 'bg-gradient-to-br from-purple-600 to-purple-800 text-white shadow-xl',
    outline: 'bg-white border-2 border-purple-200',
  };

  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10',
  };

  const hoverEffect = hover ? 'hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300' : '';

  return (
    <div 
      className={`rounded-2xl ${variants[variant]} ${paddings[padding]} ${hoverEffect} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

// ===== BADGE COMPONENT =====
export const Badge = ({ 
  children, 
  variant = 'purple',
  size = 'md',
  dot = false,
  icon: Icon,
  className = '',
  ...props 
}) => {
  const variants = {
    purple: 'bg-purple-100 text-purple-700',
    success: 'bg-green-100 text-green-700',
    warning: 'bg-amber-100 text-amber-700',
    danger: 'bg-red-100 text-red-700',
    info: 'bg-blue-100 text-blue-700',
    gray: 'bg-gray-100 text-gray-700',
    gradient: 'bg-gradient-to-r from-purple-500 to-purple-600 text-white',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  };

  return (
    <span 
      className={`inline-flex items-center gap-1.5 font-medium rounded-full ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {dot && (
        <span className={`w-2 h-2 rounded-full ${variant === 'success' ? 'bg-green-500' : variant === 'danger' ? 'bg-red-500' : variant === 'warning' ? 'bg-amber-500' : 'bg-purple-500'} ${variant === 'success' || variant === 'danger' ? 'animate-pulse' : ''}`} />
      )}
      {Icon && <Icon className="h-3.5 w-3.5" />}
      {children}
    </span>
  );
};

// ===== INPUT COMPONENT =====
export const Input = ({
  label,
  error,
  icon: Icon,
  iconPosition = 'left',
  className = '',
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && iconPosition === 'left' && (
          <Icon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        )}
        <input
          className={`w-full px-4 py-3.5 bg-white border-2 rounded-xl text-gray-900 placeholder-gray-400 transition-all duration-300 outline-none
            ${Icon && iconPosition === 'left' ? 'pl-12' : ''}
            ${Icon && iconPosition === 'right' ? 'pr-12' : ''}
            ${error ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100' : 'border-purple-100 focus:border-purple-500 focus:ring-4 focus:ring-purple-100'}
            ${className}`}
          {...props}
        />
        {Icon && iconPosition === 'right' && (
          <Icon className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        )}
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

// ===== AVATAR COMPONENT =====
export const Avatar = ({
  src,
  alt = '',
  name = '',
  size = 'md',
  status,
  className = '',
  ...props
}) => {
  const sizes = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-12 h-12 text-base',
    lg: 'w-16 h-16 text-lg',
    xl: 'w-20 h-20 text-xl',
    '2xl': 'w-24 h-24 text-2xl',
  };

  const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-gray-400',
    busy: 'bg-amber-500',
    away: 'bg-yellow-500',
  };

  const statusSizes = {
    xs: 'w-1.5 h-1.5',
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4',
    xl: 'w-5 h-5',
    '2xl': 'w-6 h-6',
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className={`relative inline-block ${className}`} {...props}>
      {src ? (
        <img
          src={src}
          alt={alt || name}
          className={`${sizes[size]} rounded-full object-cover ring-2 ring-white shadow-md`}
        />
      ) : (
        <div className={`${sizes[size]} rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white font-semibold ring-2 ring-white shadow-md`}>
          {getInitials(name) || '?'}
        </div>
      )}
      {status && (
        <span className={`absolute bottom-0 right-0 ${statusSizes[size]} ${statusColors[status]} rounded-full ring-2 ring-white ${status === 'online' ? 'animate-pulse' : ''}`} />
      )}
    </div>
  );
};

// ===== PROGRESS BAR =====
export const ProgressBar = ({
  value = 0,
  max = 100,
  variant = 'purple',
  size = 'md',
  showLabel = false,
  animated = true,
  className = '',
  ...props
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const variants = {
    purple: 'from-purple-500 to-purple-600',
    success: 'from-green-500 to-green-600',
    warning: 'from-amber-500 to-amber-600',
    danger: 'from-red-500 to-red-600',
    info: 'from-blue-500 to-blue-600',
  };

  const sizes = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  return (
    <div className={`w-full ${className}`} {...props}>
      <div className={`w-full bg-purple-100 rounded-full overflow-hidden ${sizes[size]}`}>
        <div
          className={`h-full bg-gradient-to-r ${variants[variant]} rounded-full ${animated ? 'transition-all duration-500 ease-out' : ''}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <span className="mt-1 text-sm text-gray-600">{Math.round(percentage)}%</span>
      )}
    </div>
  );
};

// ===== STAT CARD =====
export const StatCard = ({
  icon: Icon,
  title,
  value,
  subtitle,
  trend,
  trendValue,
  variant = 'default',
  className = '',
  ...props
}) => {
  const iconBgColors = {
    default: 'from-purple-100 to-purple-200',
    success: 'from-green-100 to-green-200',
    warning: 'from-amber-100 to-amber-200',
    danger: 'from-red-100 to-red-200',
    info: 'from-blue-100 to-blue-200',
  };

  const iconColors = {
    default: 'text-purple-600',
    success: 'text-green-600',
    warning: 'text-amber-600',
    danger: 'text-red-600',
    info: 'text-blue-600',
  };

  return (
    <Card className={`${className}`} {...props}>
      <div className="flex items-start justify-between">
        <div className={`p-3 rounded-xl bg-gradient-to-br ${iconBgColors[variant]}`}>
          {Icon && <Icon className={`h-6 w-6 ${iconColors[variant]}`} />}
        </div>
        {trend && (
          <span className={`inline-flex items-center text-sm font-medium ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
            {trend === 'up' ? '↑' : '↓'} {trendValue}
          </span>
        )}
      </div>
      <div className="mt-4">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="mt-1 text-3xl font-bold text-gray-900">{value}</p>
        {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
      </div>
    </Card>
  );
};

// ===== ALERT COMPONENT =====
export const Alert = ({
  title,
  children,
  variant = 'info',
  icon: Icon,
  dismissible = false,
  onDismiss,
  className = '',
  ...props
}) => {
  const variants = {
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    success: 'bg-green-50 border-green-200 text-green-800',
    warning: 'bg-amber-50 border-amber-200 text-amber-800',
    danger: 'bg-red-50 border-red-200 text-red-800',
    purple: 'bg-purple-50 border-purple-200 text-purple-800',
  };

  return (
    <div 
      className={`p-4 rounded-xl border ${variants[variant]} ${className}`}
      role="alert"
      {...props}
    >
      <div className="flex">
        {Icon && <Icon className="h-5 w-5 mr-3 flex-shrink-0 mt-0.5" />}
        <div className="flex-1">
          {title && <p className="font-semibold mb-1">{title}</p>}
          <div className="text-sm">{children}</div>
        </div>
        {dismissible && (
          <button
            onClick={onDismiss}
            className="ml-3 flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity"
          >
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

// ===== TOOLTIP COMPONENT =====
export const Tooltip = ({
  children,
  content,
  position = 'top',
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const positions = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      <div 
        className={`absolute z-50 px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-lg whitespace-nowrap transition-all duration-200 
          ${positions[position]}
          ${isVisible ? 'opacity-100 visible' : 'opacity-0 invisible'}
          ${className}`}
      >
        {content}
        <div className={`absolute w-2 h-2 bg-gray-900 transform rotate-45
          ${position === 'top' ? 'top-full left-1/2 -translate-x-1/2 -mt-1' : ''}
          ${position === 'bottom' ? 'bottom-full left-1/2 -translate-x-1/2 -mb-1' : ''}
          ${position === 'left' ? 'left-full top-1/2 -translate-y-1/2 -ml-1' : ''}
          ${position === 'right' ? 'right-full top-1/2 -translate-y-1/2 -mr-1' : ''}`
        } />
      </div>
    </div>
  );
};

// ===== MODAL COMPONENT =====
export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  className = '',
}) => {
  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-full mx-4',
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity animate-fade-in"
          onClick={onClose}
        />
        <div className={`relative w-full ${sizes[size]} bg-white rounded-2xl shadow-2xl transform transition-all animate-scale-in ${className}`}>
          <div className="flex items-center justify-between p-6 border-b border-purple-100">
            <h3 className="text-xl font-bold text-gray-900">{title}</h3>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          <div className="p-6">{children}</div>
        </div>
      </div>
    </div>
  );
};

// ===== TABS COMPONENT =====
export const Tabs = ({ tabs, activeTab, onChange, className = '' }) => {
  return (
    <div className={`flex space-x-1 bg-purple-50 p-1 rounded-xl ${className}`}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`flex-1 px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200
            ${activeTab === tab.id 
              ? 'bg-white text-purple-700 shadow-sm' 
              : 'text-gray-600 hover:text-purple-600 hover:bg-white/50'
            }`}
        >
          {tab.icon && <tab.icon className="h-4 w-4 mr-2 inline-block" />}
          {tab.label}
        </button>
      ))}
    </div>
  );
};

// ===== SKELETON LOADER =====
export const Skeleton = ({
  variant = 'text',
  width,
  height,
  className = '',
  ...props
}) => {
  const variants = {
    text: 'h-4 rounded',
    title: 'h-8 rounded-lg',
    avatar: 'rounded-full',
    card: 'h-48 rounded-2xl',
    button: 'h-12 rounded-xl',
  };

  return (
    <div
      className={`bg-gradient-to-r from-purple-100 via-purple-50 to-purple-100 animate-shimmer bg-[length:200%_100%] ${variants[variant]} ${className}`}
      style={{ width, height }}
      {...props}
    />
  );
};

// ===== DIVIDER =====
export const Divider = ({ label, className = '' }) => {
  if (label) {
    return (
      <div className={`flex items-center ${className}`}>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-200 to-transparent" />
        <span className="px-4 text-sm text-gray-500">{label}</span>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-200 to-transparent" />
      </div>
    );
  }
  return <div className={`w-full h-px bg-gradient-to-r from-transparent via-purple-200 to-transparent ${className}`} />;
};

// ===== EMPTY STATE =====
export const EmptyState = ({
  icon: Icon,
  title,
  description,
  action,
  className = '',
}) => {
  return (
    <div className={`text-center py-12 ${className}`}>
      {Icon && (
        <div className="mx-auto w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-4">
          <Icon className="h-8 w-8 text-purple-600" />
        </div>
      )}
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      {description && <p className="text-gray-500 mb-6 max-w-sm mx-auto">{description}</p>}
      {action}
    </div>
  );
};

// ===== ANIMATED COUNTER =====
export const AnimatedCounter = ({ value, duration = 2000, prefix = '', suffix = '' }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const startTime = Date.now();
          const endValue = parseInt(value);
          
          const updateCount = () => {
            const now = Date.now();
            const progress = Math.min((now - startTime) / duration, 1);
            const easeOutQuad = 1 - (1 - progress) * (1 - progress);
            setCount(Math.floor(easeOutQuad * endValue));
            
            if (progress < 1) {
              requestAnimationFrame(updateCount);
            }
          };
          
          requestAnimationFrame(updateCount);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <span ref={countRef}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
};

// ===== SCROLL REVEAL HOOK =====
export const useScrollReveal = (options = {}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (options.once !== false) {
            observer.disconnect();
          }
        } else if (options.once === false) {
          setIsVisible(false);
        }
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px 0px -50px 0px',
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [options.threshold, options.rootMargin, options.once]);

  return [ref, isVisible];
};

// ===== GRADIENT TEXT =====
export const GradientText = ({ children, className = '' }) => {
  return (
    <span className={`bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 bg-clip-text text-transparent ${className}`}>
      {children}
    </span>
  );
};

// ===== FEATURE ICON =====
export const FeatureIcon = ({ icon: Icon, variant = 'purple', size = 'md', className = '' }) => {
  const variants = {
    purple: 'from-purple-500 to-purple-700',
    violet: 'from-violet-500 to-purple-600',
    blue: 'from-blue-500 to-blue-700',
    green: 'from-green-500 to-green-700',
    amber: 'from-amber-500 to-amber-700',
    red: 'from-red-500 to-red-700',
  };

  const sizes = {
    sm: 'h-10 w-10 p-2',
    md: 'h-14 w-14 p-3',
    lg: 'h-16 w-16 p-4',
    xl: 'h-20 w-20 p-5',
  };

  const iconSizes = {
    sm: 'h-5 w-5',
    md: 'h-7 w-7',
    lg: 'h-8 w-8',
    xl: 'h-10 w-10',
  };

  return (
    <div className={`bg-gradient-to-br ${variants[variant]} ${sizes[size]} rounded-2xl flex items-center justify-center text-white shadow-lg ${className}`}>
      {Icon && <Icon className={iconSizes[size]} />}
    </div>
  );
};

export default {
  Button,
  Card,
  Badge,
  Input,
  Avatar,
  ProgressBar,
  StatCard,
  Alert,
  Tooltip,
  Modal,
  Tabs,
  Skeleton,
  Divider,
  EmptyState,
  AnimatedCounter,
  useScrollReveal,
  GradientText,
  FeatureIcon,
};
