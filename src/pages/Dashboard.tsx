import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { PerformanceChart } from "@/components/dashboard/PerformanceChart";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <DashboardHeader />
        
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2 space-y-8">
            <PerformanceChart />
            <QuickActions />
          </div>
          <div className="space-y-8">
            <RecentActivity />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}