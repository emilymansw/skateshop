import {
  Container,
  EarningsCard,
  CardContent,
  EarningsText,
  Earning,
  EarningsIncrease,
} from './styles';
import { useGetTodayHighlight } from '../../../../../api/APIService';
import { LoadingSpinner } from '../../../../shared/UI/SharedUI';

export const TodayStats = () => {
  const { loading, data: todayHighlightData, error } = useGetTodayHighlight();
  if (loading) return <LoadingSpinner />;
  return (
    <Container>
      {todayHighlightData && (
        <>
          <EarningsCard>
            <CardContent>
              <EarningsText>Today Revenue</EarningsText>
              <Earning>${todayHighlightData.revenue}</Earning>
              <EarningsIncrease>
                {todayHighlightData.revenueChange !== null ? (
                  <>{todayHighlightData.revenueChange}% from yesterday</>
                ) : (
                  <>n/a</>
                )}
              </EarningsIncrease>
            </CardContent>
          </EarningsCard>
          <EarningsCard>
            <CardContent>
              <EarningsText>Today Order</EarningsText>
              <Earning>{todayHighlightData.numberOfOrder}</Earning>
              <EarningsIncrease>
                {todayHighlightData.numberOfOrderChange !== null ? (
                  <>{todayHighlightData.numberOfOrderChange}% from yesterday</>
                ) : (
                  <>n/a</>
                )}
              </EarningsIncrease>
            </CardContent>
          </EarningsCard>
          <EarningsCard>
            <CardContent>
              <EarningsText>Unfulfilled Orders</EarningsText>
              <Earning>{todayHighlightData.numberOfUnfulfilledOrder}</Earning>
            </CardContent>
          </EarningsCard>
        </>
      )}
    </Container>
  );
};
