package com.example.covid19api.Executor;

import com.example.covid19api.DTO.CovidData;

import java.util.List;

public interface Covid19Executor {

    public List<CovidData> fetchArizonaCovidWeekData(String endDate);
    public List<CovidData> fetchStateCovidDataByPeriod(String state,String startDate,String endDate);
}
