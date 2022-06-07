import { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Container } from './styles';
import {
  useGetHourlyRevenue,
  useGetDailyRevenue,
  useGetMonthlyRevenue,
} from '../../../../../api/APIService';
import {
  hourlyDataHolder,
  dailyDataHolder,
  monthlyDataHolder,
} from '../../../../../utils/helperFunctions';
import { LoadingSpinner, SmButton } from '../../../../shared/UI/SharedUI';

interface IHourChartData {
  hour: number;
  total: number;
}

interface IDailyChartData {
  date: number;
  total: number;
}

interface IMonthlyChartData {
  month: number;
  total: number;
}

export const SalesLineChart = () => {
  const [chartData, setChartData] = useState<
    IHourChartData[] | IDailyChartData[] | IMonthlyChartData[]
  >();
  const [hourChartData, setHourChartData] = useState<IHourChartData[]>();
  const [dailyChartData, setDailyChartData] = useState<IDailyChartData[]>();
  const [monthlyChartData, setMonthlyChartData] =
    useState<IMonthlyChartData[]>();
  const [xAxisDataKey, setXAxisDataKey] = useState<string>('hour');
  const { data: hourlyRevenueData, loading: hourLoading } =
    useGetHourlyRevenue();
  const { data: dailyRevenueData, loading: dailyLoading } =
    useGetDailyRevenue();
  const { data: monthlyRevenueData, loading: monthlyLoading } =
    useGetMonthlyRevenue();

  useEffect(() => {
    if (hourlyRevenueData) {
      if (hourlyRevenueData.length > 0) {
        hourlyRevenueData.forEach((entry) => {
          hourlyDataHolder[parseInt(entry.hour) - 1].total = parseInt(
            entry.total
          );
        });
      }
      setChartData(hourlyDataHolder);
      setHourChartData(hourlyDataHolder);
    }
    if (dailyRevenueData) {
      if (dailyRevenueData.length > 0) {
        dailyRevenueData.forEach((entry) => {
          dailyDataHolder[parseInt(entry.date) - 1].total = parseInt(
            entry.total
          );
        });
      }
      setDailyChartData(dailyDataHolder);
    }
    if (monthlyRevenueData) {
      if (monthlyRevenueData.length > 0) {
        monthlyRevenueData.forEach((entry) => {
          monthlyDataHolder[parseInt(entry.month) - 1].total = parseInt(
            entry.total
          );
        });
      }
      setMonthlyChartData(monthlyDataHolder);
    }
  }, [hourLoading, dailyLoading, monthlyLoading]);

  if (!chartData)
    return (
      <Container>
        <LoadingSpinner />
      </Container>
    );
  return (
    <Container>
      <h4>Revenue</h4>
      <SmButton
        type="submit"
        onClick={() => {
          setChartData(hourChartData);
          setXAxisDataKey('hour');
        }}
      >
        Day
      </SmButton>
      <SmButton
        type="submit"
        onClick={() => {
          setChartData(dailyChartData);
          setXAxisDataKey('date');
        }}
      >
        Month
      </SmButton>
      <SmButton
        type="submit"
        onClick={() => {
          setChartData(monthlyChartData);
          setXAxisDataKey('month');
        }}
      >
        Year
      </SmButton>
      <br />
      <ResponsiveContainer>
        <LineChart data={chartData}>
          <Line type="monotone" dataKey="total" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" />
          <XAxis
            dataKey={`${xAxisDataKey}`}
            interval={10}
            tick={{ fontSize: '0.75em' }}
          />
          <YAxis width={40} tick={{ fontSize: '0.75em' }} />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </Container>
  );
};
