// healthMetricsService.ts
import axios from "axios";
import { API_BASE_URL } from "@env";

// Type definitions
export interface WeightRecord {
  id?: number;
  date: string;
  weight: number;
  notes?: string;
  created_at?: string;
}

export interface StepsRecord {
  id?: number;
  date: string;
  steps_count: number;
  steps_goal: number;
  calories_burned: number;
  source: string;
  created_at?: string;
  updated_at?: string;
}

export interface WaterEntry {
  id?: number;
  amount_ml: number;
  time: string;
  created_at?: string;
}

export interface WaterRecord {
  id?: number;
  date: string;
  total_ml: number;
  goal_ml: number;
  entries: WaterEntry[];
  created_at?: string;
  updated_at?: string;
}

// API service functions
const healthMetricsApi = {
  // Weight tracking
  getWeightHistory: async (startDate?: string, endDate?: string) => {
    const params = { start_date: startDate, end_date: endDate };
    const response = await axios.get(`${API_BASE_URL}/health-metrics/weight/`, {
      params,
    });
    return response.data;
  },

  addWeightRecord: async (record: WeightRecord) => {
    const response = await axios.post(
      `${API_BASE_URL}/health-metrics/weight/`,
      record
    );
    return response.data;
  },

  getLatestWeight: async () => {
    const response = await axios.get(
      `${API_BASE_URL}/health-metrics/weight/latest/`
    );
    return response.data;
  },

  // Steps tracking
  getTodaySteps: async () => {
    const response = await axios.get(
      `${API_BASE_URL}/health-metrics/steps/today/`
    );
    return response.data;
  },

  incrementSteps: async (steps: number) => {
    const response = await axios.post(
      `${API_BASE_URL}/health-metrics/steps/increment/`,
      { steps }
    );
    return response.data;
  },

  updateStepsGoal: async (goal: number) => {
    const response = await axios.post(
      `${API_BASE_URL}/health-metrics/steps/update_goal/`,
      { goal }
    );
    return response.data;
  },

  getWeeklySteps: async () => {
    const response = await axios.get(
      `${API_BASE_URL}/health-metrics/steps/weekly/`
    );
    return response.data;
  },

  // Water intake
  getTodayWater: async () => {
    const response = await axios.get(
      `${API_BASE_URL}/health-metrics/water/today/`
    );
    return response.data;
  },

  addWater: async (amount_ml: number) => {
    const response = await axios.post(
      `${API_BASE_URL}/health-metrics/water/add_water/`,
      { amount_ml }
    );
    return response.data;
  },

  updateWaterGoal: async (goal_ml: number) => {
    const response = await axios.post(
      `${API_BASE_URL}/health-metrics/water/update_goal/`,
      { goal_ml }
    );
    return response.data;
  },

  getWeeklyWater: async () => {
    const response = await axios.get(
      `${API_BASE_URL}/health-metrics/water/weekly/`
    );
    return response.data;
  },
};

export default healthMetricsApi;
