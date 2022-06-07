package com.skateshop.backend.model.reporting;

import lombok.Data;

@Data
public class TodayOrderHighlight {
    private Float revenue;
    private Long revenueChange;
    private Long numberOfOrder;
    private Long numberOfOrderChange;
    private Long numberOfUnfulfilledOrder;

}
