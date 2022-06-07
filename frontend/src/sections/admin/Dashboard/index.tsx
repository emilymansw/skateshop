import { Container } from './styles';
import { SalesLineChart, TodayStats } from './Components';

export const Dashboard = () => (
  <Container>
    <TodayStats />
    <SalesLineChart />
  </Container>
);
