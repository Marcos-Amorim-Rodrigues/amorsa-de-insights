import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { CampaignTrend, formatCurrency } from '@/lib/csvParser';
import { cn } from '@/lib/utils';

interface TrendsTableProps {
  trends: CampaignTrend[];
}

function TrendIndicator({ current, previous }: { current: number; previous: number }) {
  if (current === 0 && previous === 0) {
    return <Minus className="h-4 w-4 text-muted-foreground" />;
  }
  
  const change = previous > 0 ? ((current - previous) / previous) * 100 : 0;
  
  // For CPA, lower is better
  if (change < -5) {
    return (
      <span className="flex items-center gap-1 text-dashboard-success text-xs font-medium">
        <TrendingDown className="h-3 w-3" />
        {Math.abs(change).toFixed(0)}%
      </span>
    );
  } else if (change > 5) {
    return (
      <span className="flex items-center gap-1 text-dashboard-danger text-xs font-medium">
        <TrendingUp className="h-3 w-3" />
        {change.toFixed(0)}%
      </span>
    );
  }
  return <Minus className="h-4 w-4 text-muted-foreground" />;
}

export function TrendsTable({ trends }: TrendsTableProps) {
  const displayTrends = trends.slice(0, 8);

  return (
    <div className="glass-card rounded-xl overflow-hidden animate-fade-in" style={{ animationDelay: '400ms' }}>
      <div className="p-6 border-b border-border/50">
        <h3 className="text-lg font-semibold">Tendências de Campanhas</h3>
        <p className="text-sm text-muted-foreground mt-1">Custo por Resultado nos últimos períodos</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-secondary/30">
              <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Campanha
              </th>
              <th className="text-center p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                7 dias
              </th>
              <th className="text-center p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                14 dias
              </th>
              <th className="text-center p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                30 dias
              </th>
              <th className="text-center p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Tendência
              </th>
            </tr>
          </thead>
          <tbody>
            {displayTrends.map((trend, index) => (
              <tr 
                key={trend.campaignName}
                className={cn(
                  "border-b border-border/30 hover:bg-secondary/20 transition-colors",
                  index % 2 === 0 ? 'bg-transparent' : 'bg-secondary/10'
                )}
              >
                <td className="p-4">
                  <p className="font-medium text-sm line-clamp-2 max-w-xs" title={trend.campaignName}>
                    {trend.campaignName.replace(/\[/g, '').replace(/\]/g, ' ').trim()}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {trend.conversions30d} conv. (30d)
                  </p>
                </td>
                <td className="p-4 text-center">
                  <span className={cn(
                    "font-semibold text-sm",
                    trend.cpa7d > 0 ? 'text-foreground' : 'text-muted-foreground'
                  )}>
                    {trend.cpa7d > 0 ? formatCurrency(trend.cpa7d) : '-'}
                  </span>
                </td>
                <td className="p-4 text-center">
                  <span className={cn(
                    "font-semibold text-sm",
                    trend.cpa14d > 0 ? 'text-foreground' : 'text-muted-foreground'
                  )}>
                    {trend.cpa14d > 0 ? formatCurrency(trend.cpa14d) : '-'}
                  </span>
                </td>
                <td className="p-4 text-center">
                  <span className={cn(
                    "font-semibold text-sm",
                    trend.cpa30d > 0 ? 'text-primary' : 'text-muted-foreground'
                  )}>
                    {trend.cpa30d > 0 ? formatCurrency(trend.cpa30d) : '-'}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex justify-center">
                    <TrendIndicator current={trend.cpa7d} previous={trend.cpa30d} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {trends.length === 0 && (
        <div className="p-8 text-center text-muted-foreground">
          Nenhum dado de tendência disponível
        </div>
      )}
    </div>
  );
}
