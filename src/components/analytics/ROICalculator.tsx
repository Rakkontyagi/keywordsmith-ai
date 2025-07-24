import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calculator, DollarSign, TrendingUp } from "lucide-react";

interface ROICalculatorProps {
  timeRange: 'day' | 'week' | 'month' | 'year';
}

export function ROICalculator({ timeRange }: ROICalculatorProps) {
  const [costs, setCosts] = useState({
    toolSubscription: 99,
    timeInvestment: 20,
    hourlyRate: 50
  });

  const [results, setResults] = useState({
    contentGenerated: 150,
    trafficIncrease: 35,
    conversionRate: 2.5,
    avgOrderValue: 150
  });

  const calculateROI = () => {
    const totalCosts = costs.toolSubscription + (costs.timeInvestment * costs.hourlyRate);
    const revenue = (results.trafficIncrease * 1000) * (results.conversionRate / 100) * results.avgOrderValue;
    const roi = ((revenue - totalCosts) / totalCosts) * 100;
    
    return {
      totalCosts,
      revenue,
      roi,
      profit: revenue - totalCosts
    };
  };

  const roiData = calculateROI();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* ROI Calculator Inputs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            ROI Calculator
          </CardTitle>
          <CardDescription>
            Calculate the return on investment for your SEO automation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Costs Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Monthly Costs</h3>
            
            <div className="space-y-2">
              <Label htmlFor="toolSubscription">Tool Subscription ($)</Label>
              <Input
                id="toolSubscription"
                type="number"
                value={costs.toolSubscription}
                onChange={(e) => setCosts({...costs, toolSubscription: Number(e.target.value)})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="timeInvestment">Time Investment (hours/month)</Label>
              <Input
                id="timeInvestment"
                type="number"
                value={costs.timeInvestment}
                onChange={(e) => setCosts({...costs, timeInvestment: Number(e.target.value)})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="hourlyRate">Your Hourly Rate ($)</Label>
              <Input
                id="hourlyRate"
                type="number"
                value={costs.hourlyRate}
                onChange={(e) => setCosts({...costs, hourlyRate: Number(e.target.value)})}
              />
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Expected Results</h3>
            
            <div className="space-y-2">
              <Label htmlFor="contentGenerated">Content Pieces Generated</Label>
              <Input
                id="contentGenerated"
                type="number"
                value={results.contentGenerated}
                onChange={(e) => setResults({...results, contentGenerated: Number(e.target.value)})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="trafficIncrease">Traffic Increase (%)</Label>
              <Input
                id="trafficIncrease"
                type="number"
                value={results.trafficIncrease}
                onChange={(e) => setResults({...results, trafficIncrease: Number(e.target.value)})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="conversionRate">Conversion Rate (%)</Label>
              <Input
                id="conversionRate"
                type="number"
                step="0.1"
                value={results.conversionRate}
                onChange={(e) => setResults({...results, conversionRate: Number(e.target.value)})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="avgOrderValue">Average Order Value ($)</Label>
              <Input
                id="avgOrderValue"
                type="number"
                value={results.avgOrderValue}
                onChange={(e) => setResults({...results, avgOrderValue: Number(e.target.value)})}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ROI Results */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            ROI Analysis
          </CardTitle>
          <CardDescription>
            Your projected return on investment
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-destructive">
                ${roiData.totalCosts.toFixed(0)}
              </div>
              <div className="text-sm text-muted-foreground">Total Monthly Costs</div>
            </div>

            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-success">
                ${roiData.revenue.toFixed(0)}
              </div>
              <div className="text-sm text-muted-foreground">Projected Revenue</div>
            </div>

            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-primary">
                ${roiData.profit.toFixed(0)}
              </div>
              <div className="text-sm text-muted-foreground">Net Profit</div>
            </div>

            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className={`text-2xl font-bold ${roiData.roi > 0 ? 'text-success' : 'text-destructive'}`}>
                {roiData.roi.toFixed(1)}%
              </div>
              <div className="text-sm text-muted-foreground">ROI</div>
            </div>
          </div>

          {/* ROI Breakdown */}
          <div className="space-y-4">
            <h3 className="font-semibold">Breakdown</h3>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Content pieces generated:</span>
                <span className="font-medium">{results.contentGenerated} pieces</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">Additional monthly visitors:</span>
                <span className="font-medium">{(results.trafficIncrease * 1000).toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">Expected conversions:</span>
                <span className="font-medium">
                  {((results.trafficIncrease * 1000) * (results.conversionRate / 100)).toFixed(0)}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">Time saved per month:</span>
                <span className="font-medium">{(results.contentGenerated * 2).toFixed(0)} hours</span>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Button className="w-full" size="lg">
              <TrendingUp className="mr-2 h-4 w-4" />
              Start Maximizing Your ROI
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}