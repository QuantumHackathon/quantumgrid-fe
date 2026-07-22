/**
 * Custom React Hooks
 * Export all hooks from this file
 */

// Re-export store hooks
export {
  useUIStore,
  useSidebarOpen,
  useSidebarCollapsed,
  useTheme,
  useNotifications,
  useGlobalLoading,
} from '@/store/ui-store';

// Dashboard hooks
export {
  dashboardKeys,
  useDashboardOverview,
  useDashboardMetrics,
  useConsumptionData,
  useGenerationMix,
  useAlerts,
  useMarkAlertRead,
  useDismissAlert,
} from './use-dashboard';

// Analysis hooks
export {
  analysisKeys,
  useHistoricalData,
  useStatistics,
  useComparison,
  useExportData,
} from './use-analysis';

// Insights hooks
export {
  insightsKeys,
  useInsights,
  useInsight,
  useInsightsSummary,
  useMarkInsightViewed,
  useDismissInsight,
  useAssignInsight,
} from './use-insights';

// Upload hooks
export {
  uploadKeys,
  useUploadHistory,
  useUpload,
  useUploadFile,
  useValidateFile,
  useProcessFile,
  useDeleteUpload,
  useDownloadTemplate,
} from './use-upload';

// Infrastructure hooks
export {
  infrastructureKeys,
  useGridStatus,
  usePlants,
  usePlant,
  usePlantHistory,
  useInfrastructureSummary,
} from './use-infrastructure';

// Auth hooks
export {
  authKeys,
  useSession,
  useCurrentUser,
  useLogin,
  useLogout,
  useRequestPasswordReset,
  useResetPassword,
  useChangePassword,
} from './use-auth';
