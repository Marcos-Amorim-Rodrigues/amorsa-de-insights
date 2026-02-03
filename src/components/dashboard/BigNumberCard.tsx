import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BigNumberCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: 'default' | 'primary' | 'success' | 'warning';
  delay?: number;
}

export function BigNumberCard({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  trend, 
  variant = 'default',
  delay = 0 
}: BigNumberCardProps) {
  const variants = {
    default: 'border-border/50',
    primary: 'border-primary/30 card-glow',
    success: 'border-dashboard-success/30',
    warning: 'border-dashboard-warning/30',
  };

  const iconVariants = {
    default: 'bg-secondary text-foreground',
    primary: 'bg-primary/10 text-primary',
    success: 'bg-dashboard-success/10 text-dashboard-success',
    warning: 'bg-dashboard-warning/10 text-dashboard-warning',
  };

  return (
    <div 
      className={cn(
        "glass-card rounded-xl p-6 animate-fade-in",
        variants[variant]
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={cn(
          "p-3 rounded-lg",
          iconVariants[variant]
        )}>
          <Icon className="h-5 w-5" />
        </div>
        {trend && (
          <span className={cn(
            "text-xs font-medium px-2 py-1 rounded-full",
            trend.isPositive 
              ? "bg-dashboard-success/10 text-dashboard-success" 
              : "bg-dashboard-danger/10 text-dashboard-danger"
          )}>
            {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value).toFixed(1)}%
          </span>
        )}
      </div>
      
      <p className="metric-label mb-2">{title}</p>
      <p className={cn(
        "big-number",
        variant === 'primary' ? 'text-primary' : 'text-foreground'
      )}>
        {value}
      </p>
      {subtitle && (
        <p className="text-sm text-muted-foreground mt-2">{subtitle}</p>
      )}
    </div>
  );
}
