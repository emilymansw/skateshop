package com.skateshop.backend.repository;

import com.skateshop.backend.model.Customer;
import com.skateshop.backend.model.OrderRecord;
import com.skateshop.backend.model.reporting.DailyRevenueStatistics;
import com.skateshop.backend.model.reporting.HourlyRevenueStatistics;
import com.skateshop.backend.model.reporting.MonthlyRevenueStatistics;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrderRecordRepository extends JpaRepository<OrderRecord, Long> {
    OrderRecord findByIdAndCustomer(long id, Customer customer);

    @Query(value="SELECT MONTH(`create_date_time`) AS month, SUM(`total_amount`) AS total FROM `order_record` WHERE YEAR(`create_date_time`) = 2022 GROUP BY MONTH(`create_date_time`)", nativeQuery=true)
    List<MonthlyRevenueStatistics> findMonthlyRevenue();
    @Query(value="SELECT DAY(`create_date_time`) AS date, SUM(`total_amount`) AS total FROM `order_record` WHERE `create_date_time` BETWEEN DATE_FORMAT(NOW(), '%Y-%m-01') AND NOW() GROUP BY DAY(`create_date_time`)", nativeQuery=true)
    List<DailyRevenueStatistics> findDailyRevenue();
    @Query(value="SELECT HOUR(`create_date_time`) AS hour, SUM(`total_amount`) AS total FROM`order_record` WHERE `create_date_time` BETWEEN CURDATE() AND NOW() GROUP BY HOUR(`create_date_time`)", nativeQuery=true)
    List<HourlyRevenueStatistics> findHourlyRevenue();


    @Query(value="SELECT COALESCE(SUM(`total_amount`),0) FROM `order_record` WHERE DATE(`create_date_time`) = CURDATE();", nativeQuery=true)
    Float findTodayRevenue();
    @Query(value="SELECT COUNT(`id`) FROM `order_record` WHERE DATE(`create_date_time`) = CURDATE()", nativeQuery=true)
    Long findTodayOrderQty();
    @Query(value="SELECT Round((SUM( IF( DATE(`create_date_time`) = CURDATE(), `total_amount`, 0) ) - SUM( IF( DATE(`create_date_time`) = CURDATE() - INTERVAL 1 DAY, `total_amount`, 0) ) ) / SUM( IF( DATE(`create_date_time`) = CURDATE() - INTERVAL 1 DAY, `total_amount`, 0) ) * 100) FROM `order_record`;", nativeQuery=true)
    Long findTodayRevenuePercentChange();
    @Query(value="SELECT Round((SUM( IF( DATE(`create_date_time`) = CURDATE(), 1, 0) ) - SUM( IF( DATE(`create_date_time`) = CURDATE() - INTERVAL 1 DAY, 1, 0) ) ) / SUM( IF( DATE(`create_date_time`) = CURDATE() - INTERVAL 1 DAY, 1, 0) ) * 100) FROM `order_record`", nativeQuery=true)
    Long findTodayOrderQtyPercentChange();
    @Query(value="SELECT COUNT(`id`) FROM `order_record` WHERE `delivery_status` = 1", nativeQuery=true)
    Long findCountOfUnfulfilledOrder();


}
