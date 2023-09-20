package com.example.covid19api.Controller;

import com.example.covid19api.DTO.CovidData;

import java.text.ParseException;
import java.util.List;

public interface Covid19Controller {

    public  List<CovidData> getArizonaCovidWeekData(String currentDate) throws ParseException;
    public  List<CovidData> getStateDataByPeriod(String state,String startDate,String endDate) throws ParseException;
}
